import React from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import UserContext from '../UserContext';

export default function Login() {
    
    const { user, setUser } = useContext(UserContext);

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                usernameOrEmail: usernameOrEmail,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                setUser({
                    access: localStorage.getItem('token')
                })

                Swal.fire({
                    title: "Logged in successfully!",
                    icon: 'success',
                    text: "Welcome to Patches' Shop!"
                })

            } else {

                Swal.fire({
                    title: "Authentication failed.",
                    icon: 'error',
                    text: "Please check your login credentials and try again."
                })
            }
        })

        setUsernameOrEmail("");
        setPassword("");
    }

    const retrieveUserDetails = (token) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    };

    useEffect(() => {
        if(usernameOrEmail !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [usernameOrEmail, password]);

    return (

        (user.id !== null)
        ?
        <Navigate to='/products' />
        :
        <Container fluid className='login-container'>
        <Row className='d-flex align-items-center'>
            <Col className='text-center p-0 d-flex justify-content-center align-items-center section-column' id='login-section'>
                <Form className='m-5 p-3 border rounded' onSubmit = {(e) => authenticate(e)}>
                    <h3 className='my-3 text-center page-title'>Login</h3>
                    <Form.Group className='mb-3' controlId="userUsernameOrEmail">
                        {/* <Form.Label className='py-2 my-2'>Username/Email Address:</Form.Label> */}
                        <Form.Control type="text" placeholder="Username or Email" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} required size='lg'/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="userPassword">
                        {/* <Form.Label className='py-2 my-2'>Password:</Form.Label> */}
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required size='lg'/>
                    </Form.Group>
                    {
                        isActive
                        ? <Button variant="primary" type="submit" id="submitBtn" size='lg'>Log In</Button>
                        : <Button variant="secondary" type="submit" disabled size='lg'>Log In</Button>
                    }
                </Form>
            </Col>

            <Col className='d-none d-md-flex p-0 d-flex justify-content-center section-column'>
                <Image src='https://wallpapers.com/images/hd/dark-souls-remastered-fan-art-cover-xamzi5cjp8dae4qy.webp' fluid id='login-photo'/>
            </Col>
        </Row>
        </Container>
    )
}