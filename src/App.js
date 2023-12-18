// NAVBAR
import AppNavbar from './components/AppNavbar';

// PAGES

import Home from './pages/Home';
import Error from './pages/Error';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

import './App.css';

// MODULES
import { Container } from 'react-bootstrap';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';



function App() {

    const [user, setUser] = useState({
        id: null,
        isAdmin: null
    })

    const unsetUser = () => {
        localStorage.clear();
    }

    useEffect(() => {
        // console.log(user);
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if(typeof data._id !== "undefined") {

                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin
                });
            } else {

                setUser({
                    id: null,
                    isAdmin: null
                })
            }
        })
    }, [])

    return (
        <UserProvider value={{user, setUser, unsetUser}}>
            <Router>
                <Container fluid id='page-container' className='bg-dark'>
                    <AppNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:gameId" element={<ProductView />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    )
  
}

export default App;