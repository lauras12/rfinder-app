import React from 'react';
import TokenService from '../Services/token-service';
import config from '../config';

export default function Header(props) {
    return (
        <div>
            <h1>
                Restaurant Finder
            </h1>
            {(!TokenService.hasAuthToken(config.TOKEN_KEY))? <h3>Welcome to Restaurant Finder!!
                <br />
                To post a review and browse through details of other users reviews <a href={'/register'}>register </a> for the account or <a href={'/login'}>login </a>using username : 'demo', password: 'demo12345'. 
            </h3> : null
                }

        </div>
    )
}
