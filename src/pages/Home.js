import { Container, Row, Col } from "react-bootstrap";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <Container fluid>
            <Row>
                <Col className="text-light d-flex flex-column align-items-center justify-content-center text-center">
                    <h2 className="slogan-sub">Forge Your Legacy, Conquer the Shadows</h2>
                    <h1 className="slogan-main">A FromSoftware Games Hub</h1>
                    <h3 className="slogan-sub2">Where Legends Embrace the Challenge!</h3>
                    {
                        (user.id !== null) ?

                            user.isAdmin ?
                            <Link className="btn btn-danger my-3" to={`/products`}>Check Our Dashboard</Link>
                            :
                            <Link className="btn btn-danger my-3" to={`/products`}>View Our Products</Link>
                        :
                        <Link className='btn btn-danger my-3' to={`/register`}>Join Us Now!</Link>
                    }
                </Col>
                <Col lg={5}>
                    <FeaturedProducts />
                </Col>
            </Row>
        </Container>
    )
}