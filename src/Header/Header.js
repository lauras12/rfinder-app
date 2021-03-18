import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../Services/token-service';
import config from '../config';
import './Header.css';


export default function Header(props) {
    return (
        <header>
            <h1 className='header'>
                <Link to='/'>
                Restaurant<span className='finds'> Finder</span> 
                </Link>
                
            </h1>
            {(!TokenService.hasAuthToken(config.TOKEN_KEY))? <h3 className='header-text'>Welcome to rfinder!
                <br />
                To post a review and browse through details of other user's reviews <a href={'/register'}>register </a> for the account or <a href={'/login'}>login to demo account </a>using  <span>username : 'demo', password: 'demo12345'.</span> 
            </h3> : null
                }
           
        </header>
    )
}
