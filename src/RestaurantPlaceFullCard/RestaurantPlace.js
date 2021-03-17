import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import RestaurantContext from '../Context';
import RestaurantCalls from '../Services/RestaurantCalls';
import jwt from 'jsonwebtoken';
import TokenService from '../Services/token-service';

export default withRouter(class RestaurantPlace extends React.Component {
    static contextType = RestaurantContext;
    constructor() {
        super()
        this.state = {
            error: null,
        }
    }


    deleteReview = (e) => {
        e.preventDefault();
        let placeId = Number(this.props.match.params.placeId.slice(1))
        console.log(placeId, 'DELETING????')
        RestaurantCalls.deleteRestaurantPlace(placeId)
        .then(() => {
            console.log('review deleted')
        })
        .catch(err => {
            this.setState({
                error: err
            })
        })
        this.props.history.push('/')
    }

    // handleUserIdentity Before Delete = () => {
    //     let token = TokenService.getAuthToken()
    //     let user = TokenService.verifyJWT(token)
    //     console.log(user, token)
    // }

    render() {
        //this.handleDeleteButtton()
        const restaurantPractices = ['No single use plastic', 'Compostable take-out containers and cups', 'No plastic bottled drinks', 'Composting food scraps', 'Recycle and compost bins inside', 'Hemp based or fabric napkins and paper towels', 'Papperless, fully computer based billing and record keeping', 'Donating leftover food to local shelter or "free meal night"', 'Locally sourced produce', 'Organic produce', 'Resposible frying oil disposal', 'Saves energy by installing light timers and motion sensors', 'Saves water by installing low flow faucets', 'Saves energy and water by installing energy star equipmnet']
        
        let placeId = this.props.match.params.placeId.slice(1)
        let yelp_id = this.props.match.params.yelpId.slice(1)
        const selectedPlace = this.context.restaurantPlaces.find(pl => pl.yelpId === yelp_id)
        const { id, yelpId, name, img, url, yelprating, location_str, location_city, location_zip, location_st, phone, displayphone, userid, folderid, restaurant_reviews_count, review, reviewDate, checkedFinds } = selectedPlace;

        const restaurantFinds = selectedPlace.checkedFinds.map((el, key) => {
            return (
                <li key={key}>{el}</li>
            )
        })
        
        
        const remainingPractices = [];
        restaurantPractices.filter(el => {
            if (!selectedPlace.checkedFinds.includes(el)) {
                remainingPractices.push(el);
            }
        })
        const practicesList = remainingPractices.map((el, key) => {
            return (
                <li key={key}>
                    {el}
                </li>
            )
        })
        
        
        
        return (
            <div>
                <img src={img} />
                <Link to={`/bookmark/${placeId}`}>
                    <button>Save place to my folder</button>
                </Link>
                <Link to={`/edit/${placeId}/`}>
                    <button>Edit review</button>
                </Link>

                <button type='button' onClick={this.deleteReview}>delete</button>

                <h2>{name}</h2>
                <h3>Address:</h3><p>{location_str}, {location_city}, {location_st}, {location_zip}</p>
                <h3>{displayphone}</h3>
                <h3>Yelp rating: {yelprating}</h3>
                <h3>find reviews count: {restaurant_reviews_count}</h3>
                <h2>This location has been noted for following Earth friendly practices:</h2>
                <ul>
                    {restaurantFinds}
                </ul>
                <h2>Additional comments:</h2>
                <p>{review[0]}</p>
                <h2>Support our mission during your next visit, by pointing out the following improvements that could be made:</h2>
                <ul>
                    {practicesList}
                </ul>

            </div>
        )
    }
})
