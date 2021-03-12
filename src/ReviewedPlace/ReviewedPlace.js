import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faFinder } from '@fortawesome/free-solid-svg-icons';

export default function Place(props) {

    const restaurantFinds = () => {
        const finds = [];
        for(let i =0; i < props.finds; i++){
            finds.push(<span key={i}>
                < FontAwesomeIcon icon={fafinder} style={{ color: 'green', padding: '3px' }} />
            </span>)
        } 
        return(
            <div>
                {finds}
            </div>
        )
    }

    return (
        <div>
            <Link to={`/bookmark/${props.reviewedPlaceId}`}>
                <button>Save for future</button>
            </Link>
            <h3>{props.placeName}</h3>
            <p>{props.city}</p>
            <p>{props.comments}</p>
            {restaurantFinds()}
        </div>
    )
}