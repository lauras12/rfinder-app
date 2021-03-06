import React from 'react';
import './SearchBar.css';

export default function SearchBar(props) {

    const handleSearch = (e) => {
        e.preventDefault();
        props.history.push('/search')
    }
/* adding rest from search button on the right */
    return (
        <div>
            <div className='bar'>
                <button className='yelp' type='button' onClick={handleSearch}>To add new places to our records, CLICK HERE</button>
            </div>
        </div>
    );
}