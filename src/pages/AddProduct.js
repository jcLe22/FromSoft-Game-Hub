import { Form, Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import UserContext from "../UserContext";


export default function AddProduct() {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(title !== "" && description !== "" && price !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [title, description, price, imgUrl, videoUrl]);

    function addProduct(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_URL}/products/add-game`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({

                title: title,
                description: description,
                price: price,
                imgUrl: imgUrl,
                videoUrl: videoUrl

            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data) {
                Swal.fire({
                    title: 'Successfully Added a New Product',
                    icon: 'success',
                    text: "A new game product has been added to the database."
                })

                navigate('/products');
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Unsuccessful product creation.'
                })
            }
        })

        setTitle("");
        setDescription("");
        setPrice(0);
        setImgUrl("");
        setVideoUrl("");
    }

    return (

        (user.isAdmin === true)
        ?
        <Container fluid className="section-column d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light text-center page-title">Add Product</h1>
            <Form onSubmit={e => addProduct(e)} className="text-light addgame-container d-flex flex-column">
                <Form.Group>
                    <Form.Label className="my-1">Title:</Form.Label>
                    <Form.Control type='text' placeholder='Enter title of game product' value={title} onChange={e => {setTitle(e.target.value)}} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="my-1">Description:</Form.Label>
                    <Form.Control type='text' placeholder='Enter a description for the game product' value={description} onChange={e => {setDescription(e.target.value)}} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="my-1">Price:</Form.Label>
                    <Form.Control type='number' placeholder='Enter a price for the game product' value={price} onChange={e => {setPrice(e.target.value)}} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="my-1">Game Cover:</Form.Label>
                    <Form.Control type='text' placeholder='Please provide image hyperlink' value={imgUrl} onChange={e => {setImgUrl(e.target.value)}} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="my-1">Game Trailer:</Form.Label>
                    <Form.Control type='text' placeholder='Please provide image hyperlink' value={videoUrl} onChange={e => {setVideoUrl(e.target.value)}} />
                </Form.Group>
                {
                    isActive
                    ? <Button className="my-3" variant="primary" type="submit">Add Game Product</Button>
                    : <Button className="my-3" variant="secondary" disabled>Add Game Product</Button>
                }
            </Form>
        </Container>
        :
        <Navigate to="/products" />
    )
}