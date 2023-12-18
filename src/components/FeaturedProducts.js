import { Carousel, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProducts(data);
        })
    }, []);

    return (
        <Carousel>
            {products.map(games => (
                <Carousel.Item key={games.id}>
                    <img className='prodprev-img d-block w-100' src={games.imgUrl} alt={games.title} />
                    <Carousel.Caption>
                        <Link className='btn btn-warning' to={`/products/${games._id}`}>See Details</Link> 
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}