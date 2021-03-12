import React from 'react';
import RestaurantContext from '../Context';
import ReviewedPlace from '../ReviewedPlace/ReviewedPlace';
import './ReviewedList.css';


export default class ReviewedList extends React.Component {
    static contextType = RestaurantContext;

    citySort = (e)=> {
        e.preventDefault();
        const {city} = e.target
        console.log(city.value)
        this.context.reviewCitySort(city.value)
        city.value = '';
    }
    render() {
        let reviews = [];
        if(this.context.sortReviews.length > 0) {
            console.log(this.context.sortReviews.length)
            reviews = this.context.sortReviews.map(rev => {
                return (
                    <li className='li' key={rev.id}>
                        <ReviewedPlace
                            reviewedPlaceId={rev.placeId}
                            placeName={rev.placeName}
                            city={rev.placeCity}
                            finds={rev.attributes.length}
                            comments={rev.comments}
                        />
                    </li>
                )
            }) 
        }
        else {
            reviews = this.context.reviews.map(rev => {
                return (
                    <li className='li' key={rev.id}>
                        <ReviewedPlace
                            reviewedPlaceId={rev.placeId}
                            placeName={rev.placeName}
                            city={rev.placeCity}
                            finds={rev.attributes.length}
                            comments={rev.comments}
                        />
                    </li>

                )
            })
        }




        return (
            <div>
                <h2>Resturant Finder reviewed places: </h2>
                <form onSubmit={this.citySort} >
                    <input id='city' type='input' placeholder='enter city'/>
                <button type='submit' >Search city</button>
                </form>

                <button onClick={this.findSort} >Sort by rating</button>
                <ul className='rev-list'>
                    {reviews}
                </ul>

            </div>
        )
    }
} 