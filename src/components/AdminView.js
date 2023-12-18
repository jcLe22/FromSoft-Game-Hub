import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(games => {
            return (
                <tr key={games._id}>
                    <td>{games._id}</td>
                    <td>{games.title}</td>
                    <td>{games.description}</td>
                    <td>{games.price}</td>
                    <td className={games.isActive ? 'text-success' : 'text-danger'}>{games.isActive ? "Available" : "Unavailable"}</td>
                    <td><EditProduct games={games._id} fetchData={fetchData} /></td>
                    <td><ArchiveProduct games={games._id} isActive={games.isActive} fetchData={fetchData} /></td>
                </tr>
            )
        })

        setProducts(productsArr)

    }, [productsData])

    return (
        <Container fluid>
            <h1 className="text-light text-center page-title">Admin Dashboard</h1>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>
        </Container>
    )
}