import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../UserContext';

export default function AppNavbar() {
    
    const { user } = useContext(UserContext)
    
    return (
        <Navbar bg='dark' variant='dark' expand='lg' id='navbar-section'>
            <Container fluid>
                <Navbar.Brand className='ms-lg-5' id='icon-logo' as={Link} to="/">Patches' Inventory</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav variant='underline' className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products" exact>Games</Nav.Link>
                        {
                            (user.id !== null)
                            ?
                                user.isAdmin
                                ?
                                <>
                                    <Nav.Link as={Link} to="/add-product">Add Game</Nav.Link>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                                :
                            <>
                                <Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}