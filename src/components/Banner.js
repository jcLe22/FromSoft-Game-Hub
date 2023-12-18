import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({data}) {
    const {title, content, destination, label} = data;

    return (
        <Container fluid className="error-container d-flex align-items-center justify-content-center">
        <Row>
            <Col className='p-5 text-center'>
                <h1 className="text-light">{title}</h1>
                <p className="text-light">{content}</p>
                <Link className='btn btn-secondary' to={destination}>{label}</Link>
            </Col>
        </Row>
        </Container>
    )
}