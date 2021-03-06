import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../Services/token-service';
import config from '../config';
import './Nav.css';

export default class Nav extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  render() {
/* top nav bar */
    const token = TokenService.hasAuthToken(config.TOKEN_KEY)
    if (token) {
      return (
        <div className='logged-in'>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
        </Link>
        </div>
      )
    } else {
      return (
        <div className='nav'>
          <Link to={'/login'} className='link' >
            Login
           </Link>
          <Link to={'/register'} className='register'>
            Register
           </Link>
        </div>
      )
    }

  }

}