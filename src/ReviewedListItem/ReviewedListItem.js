import React from 'react';
import { withRouter } from 'react-router-dom';
import TokenService from '../Services/token-service';
import config from '../config';
import Finds from '../FindsRating/Finds';
import './ReviewedListItem.css';

export default withRouter(function ReviewedListItem(props) {
/* open resturant full card */
    const openFullCard = (e) => {
        const token = TokenService.hasAuthToken(config.TOKEN_KEY)
        if (!token) {
            props.history.push('/login');
        } else {
            props.history.push(`/restaurant_place/${props.yelpId}/${props.placeId}`);
        };
    }
    
    return (
        <div className='home-list' onClick={openFullCard}>
            <div className='small-img-container'>
                <img src={props.img} alt='food presentation from the place'/>
            </div>
            <div className='text'>
                <h3>{props.name}</h3>
                <br />
                <div className='text2'>
                    <p>{props.city}</p>
                    <p>Saved to category: {props.category}</p>
                </div>
                <div>
                    { props.checkedFinds ? <Finds checkedFinds={props.checkedFinds} /> : null }
                </div>
            </div>
         </div>
    );
});
