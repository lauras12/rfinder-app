import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../Services/token-service';
import config from '../config';
import './Header.css';


export default function Header(props) {

   /*main header with className='header' and description below*/
    return (
        <div>
            <h1 className='header'>
                <Link to='/'>
                    Restaurant<span className='finds'> Finder</span>
                    
                </Link>

                
            </h1>
            <br />
            {(!TokenService.hasAuthToken(config.TOKEN_KEY)) ? <h3 className='h-text'>Welcome to Restaurant Finder!
                <br />
                <br />
                <p class="des">
                This is a place where users can post reviews and add personal attribututes to resturants found in your area! Unlike the other big guys out there - when you choose to review a resturant you get to mark reward worthy habits such as, having a good vibe, gluten free menu, clean bathroom, organic produce, great for groups, and so on!  In additition to marking Resturant Finder worthy habits you can also add your own additional comments.
                </p>
                <br />
                <br />
                To post a review and browse through details of other user's reviews <a href={'/register'}>register </a> for the account or <a href={'/login'}>login to demo account </a>using <span>username : 'demo', password: 'Demo!12345'.</span>
            </h3> : null}
           
           
        </div>
    )
}