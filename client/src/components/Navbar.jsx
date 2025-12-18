import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/react.svg';
import Button from './Button';
function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('auth/signin');
    };
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo" />
                <span>Taglay</span>
            </div>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/articles'>Articles</Link>
                </li>
            </ul>
            <Button onClick={handleLoginClick}>Login</Button>
        </nav>
    )
}

export default Navbar
