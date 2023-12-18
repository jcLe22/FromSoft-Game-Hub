import { Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export default function ProductCard({productsProp}) {

    const {_id, title, description, price, imgUrl} = productsProp;
    
    return (
        <Container fluid>
            <Row fluid className="mx-3 mt-3">
                <Col lg={3} className="d-flex align-items-center justify-content-center bg-secondary py-2">
                    <Card className="w-100 bg-dark">
                        <Card.Body>
                            <Card.Img src={imgUrl} id="game-cover"/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={9} className="d-flex align-items-center bg-secondary">
                    <Card className="h-60 bg-dark text-light">
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>&#8369; {price}</Card.Text>
                            <Link className="btn btn-primary" to={`/products/${_id}`}>Proceed to Order</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

ProductCard.propTypes = {

    product: PropTypes.shape({

        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}