import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

//Finds function for users to use to rate
export default function Finds(props) {
    if (props.checkedFinds) {
        const restaurantFinds = props.checkedFinds.map((checked, i) => {
            return (<span key={i}>
                <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#008000', padding: '5px' , fontSize: '2em'}} />
            </span>);
        });
        return (
            <div className='finds'>
                {restaurantFinds}
            </div>
        );
    } else {
        return (<div className='finds'></div>);
    };
}