import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="logo" className="logo" />
            <nav className="nav">
                <a href="/shop" className="link">Shop</a>
                <a href="/review" className="link">Order Review</a>
                <a href="/inventory" className="link">Manage Inventory here</a>
            </nav>
        </div>
    );
};

export default Header;