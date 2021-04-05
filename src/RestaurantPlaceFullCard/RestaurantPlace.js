import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import RestaurantContext from '../Context';
import RestaurantCalls from '../Services/RestaurantCalls';
import './RestaurantPlace.css';
import YelpRating from '../YelpRating/YelpRating';
import Finds from '../FindsRating/Finds';


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
        let placeId = Number(this.props.match.params.placeId);
        RestaurantCalls.deleteRestaurantPlace(placeId)
            .then(() => {
                this.props.history.push('/')
            })
            .catch(err => {
                if (err) {
                    this.setState({
                        error: 'Server problems.'
                    });
                }
            });

    }


    render() {
        // this.handleUserIdentityBeforeDeleteAndPost()
        const restaurantPractices = ['Good vibes', 'Great Wine selection', 'Awesome service', 'Contactless', 'Recycle and compost bins inside', 'Clean bathrooms', 'Good Beer selection', 'Gluten Free menu', 'Locally sourced produce', 'Organic produce', 'Organic produce', 'Games to play', 'Outdoor patio', 'Greate for groups', 'Private event space']

        let placeId = Number(this.props.match.params.placeId);
        let yelpId = this.props.match.params.yelpId;

        const selectedPlace = this.context.restaurantPlaces.find(pl => pl.yelp_id === yelpId)
        const { name, img, url, yelp_rating, location_str, location_city, location_zip, location_st, display_phone, checkedFinds, category, review } = selectedPlace;

        const restaurantFinds = selectedPlace.checkedFinds.map((el, key) => {
            return (
                <li key={key} className='find-list' >{el}</li>
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
                <li key={key} className='find-list'>
                    {el}
                </li>
            )
        })

        const currentUsersPlace = this.context.userPlaces.find(place => place.id === placeId)

        return (

            <div className='item'>
                <div className='items-box'>
                    <div className='medium-img-container'>
                        <img src={img} alt="item"/>
                    </div>

                    <div className='text-area1'>

                        <div className='error'>
                            {this.state.error ? this.state.error : null}
                        </div>


                        <h2>{name}</h2>
                        <h3>Address :</h3><p>{location_str}, {location_city}, {location_st}, {location_zip}</p>
                        <br />
                        <p>{display_phone}</p>
                        <br />
                        <h3>Category :</h3><p>{category}</p>
                        <a href={`${url}`}><h3>Visit</h3></a>
                        <div className='rating-box'>
                            <p>Yelp rating: </p>
                            <YelpRating rating={yelp_rating} />
                        </div>
                        <div className='rating-box'>
                            <p>ESSTAURAATURANTfindsUP rating: </p>
                            <Finds checkedFinds={checkedFinds} />
                        </div>
                        <br />
                        <br />
                        <div className='error'>
                            {this.state.error ? this.state.error.message : null}
                        </div>
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
                                    <button disabled={!currentUsersPlace} className='disabled'>Edit review</button>
                                </Link>
                                <button type='button' disabled={!currentUsersPlace} className='disabled'>delete</button>
                                <h4>Please login to place a review or delete </h4>
                            </section>
                        }

                    </div>
                </div>
                <div className='text-area2'>
                    <h2>This location has been noted for following Earth friendly practices:</h2>
                    <ul>
                        {restaurantFinds}
                    </ul>
                    <br />
                    <h2>Additional comments:</h2>
                    <br />
                    <div id='comments'><p>{review}</p></div>

                    <br />
                    <h2 id='S' >Support our mission during your next visit, by pointing out the following improvements that could be made:</h2>
                    <br />
                    <ul>
                        {practicesList}
                    </ul>
                </div>

            </div>
        )
    }
})

