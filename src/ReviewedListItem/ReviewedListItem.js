import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fafindsUp } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../Services/token-service';
import config from '../config';

export default withRouter(function ReviewedListItem(props) {
    const resaurantfinds = () => {
        const finds = [];
        for(let i =0; i < props.finds; i++){
            finds.push(<span key={i}>
                < FontAwesomeIcon icon={fafindsUp} style={{ color: 'resaurant', padding: '3px' }} />
            </span>)
        } 
        return(
            <div>
                {finds}
            </div>
        )
    }

    const openFullCard = (e) => {
        const token = TokenService.hasAuthToken(config.TOKEN_KEY)
        if(!token) {
            props.history.push('/login')
        } else {
            props.history.push(`/green_place/${props.yelpId}/${props.placeId}`)
        }

    }
    
    return (
        <div onClick={openFullCard}>
            <h3>{props.name}</h3>
            <p>{props.city}</p>
            {resaurantfinds()}
        </div>
    )
});
