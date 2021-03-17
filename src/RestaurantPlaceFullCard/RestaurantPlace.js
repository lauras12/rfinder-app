import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import RestuarantContext from '../Context';
import RestuarantCalls from '../Services/RestuarantCalls';
import jwt from 'jsonwebtoken';
import TokenService from '../Services/token-service';

export default withRouter(class RestuarantPlace extends React.Component {
    static contextType = RestuarantContext;
    constructor() {
        super()
        this.state = {
            error: null,
        }
    }


    deleteReview = (e) => {
        e.preventDefault();
        let placeId = Number(this.props.match.params.placeId);
        console.log(placeId, 'DELETING????')
        RestuarantCalls.deleteRestuarantPlace(placeId)
            .then(() => {
                console.log('review deleted')
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })

    }

    // handleUserIdentityBeforeDeleteAndPost = () => {
    //     let token = TokenService.getAuthToken()
    //     let user = TokenService.verifyJWT(token)
    //     console.log(user, token)
    // }

    render() {
        console.log(this.context.currentUser)
        // this.handleUserIdentityBeforeDeleteAndPost()
        const restuarantPractices = ['No single use plastic', 'Compostable take-out containers and cups', 'No plastic bottled drinks', 'Composting food scraps', 'Recycle and compost bins inside', 'Hemp based or fabric napkins and paper towels', 'Papperless, fully computer based billing and record keeping', 'Donating leftover food to local shelter or "free meal night"', 'Locally sourced produce', 'Organic produce', 'Resposible frying oil disposal', 'Saves energy by installing light timers and motion sensors', 'Saves water by installing low flow faucets', 'Saves energy and water by installing energy star equipmnet']

        let placeId = Number(this.props.match.params.placeId);
        let yelpId = this.props.match.params.yelpId;
        console.log(this.props.match.params)
        const selectedPlace = this.context.restuarantPlaces.find(pl => pl.yelp_id === yelpId)
        console.log(this.context.restuarantPlaces, selectedPlace, 'SELECTED', yelpId, 'YELP?????')
        const { name, img, url, yelp_rating, location_str, location_city, location_zip, location_st, display_phone, userid, restuarant_reviews_count, category, review, reviewDate, checkedFinds } = selectedPlace;

        const restuarantFinds = selectedPlace.checkedFinds.map((el, key) => {
            return (
                <li key={key}>{el}</li>
            )
        })


        const remainingPractices = [];
        restuarantPractices.filter(el => {
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

        const currentUsersPlace = this.context.userPlaces.find(place => place.id === placeId)
        console.log(currentUsersPlace, this.context.userPlaces, 'PLACE??????')
        return (

            <div>
                <img src={img} />
                {/* <Link to={`/bookmark/${placeId}`}>
                    <button>Save place to my folder</button>
                </Link> */}
                {currentUsersPlace ?
                    <section>
                        <Link to={`/edit/${placeId}/`}>
                            <button>Edit review</button>
                        </Link>
                        <button type='button' onClick={this.deleteReview}>delete</button>
                    </section>
                    :
                    <section>
                        <Link to={`/edit/${placeId}/`} >
                            <button disabled={!currentUsersPlace}>Edit review</button>
                        </Link>
                        <button type='button' disabled={!currentUsersPlace} >delete</button>
                        <h4>Please login to place a review or delete </h4>
                    </section>
                }



                <h2>{name}</h2>
                <h3>Address:</h3><p>{location_str}, {location_city}, {location_st}, {location_zip}</p>
                <h3>{display_phone}</h3>
                <p>{category}</p>
                <h3>Yelp rating: {yelp_rating}</h3>
                <h3>rfinds UP reviews count: {restuarant_reviews_count}</h3>
                <h2>This location has been noted for following Earth friendly practices:</h2>
                <ul>
                    {restuarantFinds}
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