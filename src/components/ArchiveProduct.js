import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProduct({ games, isActive, fetchData }) {

    const archiveProduct = (e, gameId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${gameId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data) {
                Swal.fire({
                    title: 'Successfully Archived!',
                    icon: 'success',
                    text: "Game product has been archived successfully."
                })
                fetchData()
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: "Please try again."
                })
                fetchData()
            }
        })
    }

    const activateProduct = (e, gameId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${gameId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data) {
                Swal.fire({
                    title: 'Successfully Activated!',
                    icon: 'success',
                    text: "Game product is now open for purchase."
                })
                fetchData()
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Please try again.'
                })
                fetchData()
            }
        })
    }

    return (
        <>
            {
                isActive
                ?
                (
                    <Button variant='danger' size='sm' onClick={e => archiveProduct(e, games)}>Archive</Button>
                )
                :
                (
                    <Button variant='success' size='sm' onClick={e => activateProduct(e, games)}>Activate</Button>
                )
            }
        </>
    )
}