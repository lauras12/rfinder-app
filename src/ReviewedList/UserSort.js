// import React from 'react';
// import restaurantContext from '../Context';
// import ReviewedListItem from '../ReviewedListItem/ReviewedListItem';

// export default class UserSort extends React.Component {
//     static contextType = restaurantContext;



//     render () {

//         const reviews = this.context.userPlaces.map(pl => {
//             return (
//                 <li className='li' key={pl.id}>
//                     <ReviewedListItem
//                         placeId={pl.id}
//                         yelpId={pl.yelp_id}
//                         name={pl.name}
//                         city={pl.location_city}
//                         category={pl.category}
//                         finds={pl.checkedFinds.length}
//                     />
//                 </li>
//             )
//         })
//         return (
//             <div>
//                 {reviews}
//             </div>
//         )

//     }
// } 