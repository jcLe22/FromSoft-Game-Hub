import { Card, Col, Row, Button, Container, Form, InputGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Swal from "sweetalert2";
import UserContext from "../UserContext";


export default function ProductView() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { gameId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [videoUrl, setVideoUrl] = useState("");

    const handleQuantityChange = (e, type) => {
        const currentQuantity = parseInt(quantity, 10);
        let newQuantity;

        if( type === 'increase') {
            newQuantity = currentQuantity + 1;
        } else if ( type === 'decrease' && currentQuantity > 1) {
            newQuantity = currentQuantity - 1;
        } else {
            newQuantity = currentQuantity;
        }

        setQuantity(newQuantity);
    };

    const calculateTotalAmount = () => {
        return price * quantity;
    };

    const order = (gameId) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/create-order`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: gameId,
                quantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.message === "Ordered successfully!") {
                Swal.fire({
                    title: "Ordered!",
                    icon: 'success',
                    text: "Game product successfully ordered."
                })

                navigate("/products");
            } else {

                Swal.fire({
                    title: "Something went wrong.",
                    icon: 'error',
                    text: "Please try again."
                })
            }
        })
    }

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/products/${gameId}`)
        .then(res => res.json())
        .then(data => {

            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setVideoUrl(data.videoUrl);

        })

    }, [gameId]);

    return (
        <Container fluid className="bg-dark text-light">
            <Row>
                <Col lg={8} className="section-column d-flex flex-column justify-content-center">
                    <iframe width="100%" height="523em" src={videoUrl} title="Game Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="d-lg-none"></iframe>

                    <div className="d-none d-lg-block">
                        <iframe
                            width="100%"
                            height="500"
                            src={videoUrl}
                            title="Product Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>

                <Col lg={4} className="section-column d-flex flex-column justify-content-center px-5">
                    <Card.Title className="mb-3 text-center" id="product-title">{title}</Card.Title>
                    <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>&#8369;{price}</Card.Text>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity:</Form.Label>
                        <InputGroup>
                            <Button variant="secondary" onClick={(e) => handleQuantityChange(e, 'decrease')}>-</Button>

                            <Form.Control type="number" value={quantity} onChange={(e) => handleQuantityChange(e, 'input')} min={1} />

                            <Button variant="secondary" onClick={(e) => handleQuantityChange(e, 'increase')}>+</Button>
                        </InputGroup>
                    </Form.Group>
                    <Card.Subtitle>Total Amount:</Card.Subtitle>
                    <Card.Text>&#8369; {calculateTotalAmount()}</Card.Text>
                    {
                        user.id !== null
                        ? <Button variant='primary' block onClick={() => order(gameId)}>Order Now</Button>
                        : <Link className='btn btn-warning btn-block' to="/login">Log In To Order</Link>
                    }
                </Col>
            </Row>
        </Container>
    )
}