
import React from 'react';
import ReviewedListItem from '../ReviewedListItem/ReviewedListItem';

/*  */
const ListHelpers = {
    sortDisplay: (list) => {
        const reviews = list.map(pl => {
            return (
                <li className='li' key={pl.id}>
                    <ReviewedListItem
                        placeId={pl.id}
                        yelpId={pl.yelp_id}
                        img={pl.img}
                        name={pl.name}
                        city={pl.location_city}
                        category={pl.category}
                        checkedFinds={pl.checkedFinds}
                    />
                </li>
            )
        })
        return reviews;
    },

}

export default ListHelpers;