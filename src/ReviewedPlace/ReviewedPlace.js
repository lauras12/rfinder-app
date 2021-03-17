import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcon } from '@fortawesome/free-solid-svg-icons';

export default function Place(props) {

    const restaurantFinds = () => {
        const finds = [];
        for(let i =0; i < props.finds; i++){
            finds.push(<span key={i}>
                <FontAwesomeIcon icon={["far", "coffee"]} />
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
            <h3>{props.name}</h3>
            <p>{props.city}</p>
            <p>{props.comments}</p>
            {restaurantFinds()}
        </div>
    )
}