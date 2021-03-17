import React from 'react';
import RestaurantContext from '../Context';
import ReviewedPlace from '../ReviewedPlace/ReviewedPlace';
import './ReviewedList.css';
import RestaurantCalls from '../Services/RestaurantCalls';

export default class ReviewedList extends React.Component {
    static contextType = RestaurantContext;

    componentDidMount = () => {
        console.log('/TRIGGERED?')
        RestaurantCalls.getAllReviewedPlaces()
            .then(data => {
                this.context.setRestaurantPlaces(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    citySort = (e) => {
        e.preventDefault();
        const { city } = e.target
        console.log(city.value)
        this.context.reviewCitySort(city.value)
        city.value = '';
    }
    render() {
        let reviews = [];
        if (this.context.sortReviews.length > 0) {
            reviews = this.context.sortReviews.map(pl => {
                return (
                    <li className='li' key={pl.id}>
                        <ReviewedPlace
                            userId={pl.userid}
                            name={pl.name}
                            city={pl.location_city}
                            folder={pl.folderid}
                            finds= {pl.checkedFinds.length}
                        />
                    </li>
                )
            })
        }
        else {
            reviews = this.context.restaurantPlaces.map(pl => {
                return (
                    <li className='li' key={pl.id}>
                        <ReviewedPlace
                            userId={pl.userid}
                            name={pl.name}
                            city={pl.location_city}
                            folder={pl.folderid}
                            finds= {pl.checkedFinds.length}
                        />
                    </li>

                )
            })
        }




        return (
            <div>
                <h2>Restaurant Finder reviewed places: </h2>
                <form onSubmit={this.citySort} >
                    <input id='city' type='input' placeholder='enter city' />
                    <button type='submit' >Sort by city</button>
                </form>

                <button onClick={this.findSort} >Sort by finds</button>
                <ul className='rev-list'>
                    {reviews}
                </ul>

            </div>
        )
    }
}
