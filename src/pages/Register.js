import { useContext, useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';

export default function Register() {

    const { user } = useContext(UserContext);
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();
        // console.log(`${process.env.REACT_APP_API_URL}`);
        
        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);

                Swal.fire({
                    title: 'Successfully registered!',
                    icon: 'success',
                    text: 'You have successfully created an account.'
                })

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        })
        .catch(error => {

            console.error(error);

        if (error.message === "Username is already taken.") {
            Swal.fire({
                title: 'Error occurred',
                icon: 'error',
                text: 'Username is already taken. Please choose a different username.'
            });
        } else if (error.message === "Email already has an existing account.") {
            Swal.fire({
                title: 'Error occurred',
                icon: 'error',
                text: 'Email already has an existing account. Please use a different email.'
            });
        } else {
            Swal.fire({
                title: 'Error occurred',
                icon: 'error',
                text: 'Please try again later.'
            });
        }
        })
    }

    useEffect(() => {
        if((username !== "" && email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
            
            setIsActive(true)
        } else {

            setIsActive(false)
        }
    }, [username, email, password, confirmPassword])

    return (

        (user.id !== null) ?
            <Navigate to="/products" />
        :
        <Container fluid className='register-container d-flex align-items-center justify-content-center'>
        <Form className='p-3 border rounded' onSubmit={(e) => registerUser(e)}>
            <h1 className='page-title text-center'>Register</h1>
            <Form.Group>
                <Form.Label className='my-1'>Username:</Form.Label>
                <Form.Control className='mb-3' type="text" placeholder="Enter Username" value={username} onChange={e => {setUsername(e.target.value)}} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='my-1'>Email:</Form.Label>
                <Form.Control className='mb-3' type="email" placeholder="Enter Your Email Address" value={email} onChange={e => {setEmail(e.target.value)}} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='my-1'>Password:</Form.Label>
                <Form.Control className='mb-3' type="password" placeholder="Enter Your Password" value={password} onChange={e => {setPassword(e.target.value)}} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='my-1'>Confirm Password:</Form.Label>
                <Form.Control className='mb-3' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} required />
            </Form.Group>
            {
                isActive
                ? <Button className='register-button' variant="success" type="Submit">Register</Button>
                : <Button className='register-button' variant="secondary" disabled>Register</Button>
            }
        </Form>
        </Container>
    )
}