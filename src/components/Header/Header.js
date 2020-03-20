import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';


const Header = () => {
    const auth = useAuth();
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                <span style={{color:'yellow'}}>
                    {
                        auth.user && auth.user.name
                    }
                </span>
                <a href='/login'>
                    {
                        auth.user? 'Sign Out':'Sign In'
                    } 
                </a>
                
            </nav>
        </div>
    );
};

export default Header;