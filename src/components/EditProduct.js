import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";


export default function EditProduct({ games, fetchData }) {

    const [gameId, setGameId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imgUrl, setImgUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [showEdit, setShowEdit] = useState(false);

    const editProduct = (e, gameId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${gameId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
                    title: 'Successfully Updated!',
                    icon: 'success',
                    text: "Product information updated successfully."
                })
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Please try again.'
                })
                closeEdit();
                fetchData();
            }
        })
    }

    const openEdit = (gameId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${gameId}`)
        .then(res => res.json())
        .then(data => {

            setGameId(data._id);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setImgUrl(data.imgUrl);
            setVideoUrl(data.videoUrl);
        })

        setShowEdit(true);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setTitle('');
        setDescription('');
        setPrice(0);
        setImgUrl('');
        setVideoUrl('');
    }

    return (
        <>
            <Button variant='primary' size='sm' onClick={() => openEdit(games)}>Edit</Button>
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, gameId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='gameTitle'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={e => setTitle(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='gameDescription'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' value={description} onChange={e => setDescription(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='gamePrice'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' value={price} onChange={e => setPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='gameImgUrl'>
                            <Form.Label>Image Hyperlink</Form.Label>
                            <Form.Control type='text' value={imgUrl} onChange={e => setImgUrl(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='gameVideoUrl'>
                            <Form.Label>Game Trailer Hyperlink</Form.Label>
                            <Form.Control type='text' value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' size='sm' onClick={closeEdit}>Close</Button>
                        <Button variant='success' type='submit'>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}