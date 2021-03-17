import React from 'react';
import ResaurantContext from '../Context';
import ReviewedListItem from '../ReviewedListItem/ReviewedListItem';
import './ReviewedList.css';
import ResaurantCalls from '../Services/ResaurantCalls';
import ListHelpers from './ListHelpers';

export default class ReviewedList extends React.Component {
    static contextType = ResaurantContext;
    constructor() {
        super()
        this.state = {
            userSort: false,
            error: null,
        }
    }

    componentDidMount = () => {
        console.log('/TRIGGERED?')
        ResaurantCalls.getAllReviewedPlaces()
            .then(data => {
                this.context.setResaurantPlaces(data)
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })
    }

    userSort = () => {
        ResaurantCalls.getAllResaurantPlacesByUser()
        .then(res => {
            console.log(res)
            this.context.userSort(res)
            this.setState({userSort: true,})
            
        })
        .catch(err => {
            this.setState({
                error: err
            })
        })
    }

    citySort = (e) => {
        e.preventDefault();
        const { city } = e.target
        this.context.citySort(city.value)
        this.setState({citySort: true,})
        city.value = '';
    }
    
    render() {
        console.log(this.context)
        let reviews = [];
        if(this.state.userSort === true) {
            reviews = ListHelpers.sortDisplay(this.context.userPlaces)
        }
        else if (this.context.citySortPlaces.length > 0) {
            reviews = ListHelpers.sortDisplay(this.context.citySortPlaces)
        }
        else {
            reviews = ListHelpers.sortDisplay(this.context.resaurantPlaces)

        }
        return (
            <div>
                <h2>reviewed places: </h2>
                <form onSubmit={this.citySort} >
                    <input id='city' type='input' placeholder='enter city' />
                    <button type='submit' >Sort reviews by city</button>
                </form>
                <h2>or</h2>
                <button onClick={this.userSort} >Show only my reviews</button>

                <ul className='rev-list'>
                    {reviews}
                </ul>

            </div>
        )
    }
}