import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="logo" className="logo" />
            <nav className="nav">
                <Link to={"/shop"} className="link">Shop</Link>
                <Link to={"/review"} state={{ state: 'mystate' }} className="link">Order Review</Link>
                <Link to={"/inventory"} className="link">Manage Inventory here</Link>
                <Link to={"/login"} className="link">Login</Link>
            </nav>
        </div>
    );
};

export default Header;