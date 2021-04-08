import React from 'react';
import RestaurantContext from '../Context';
import RestaurantCalls from '../Services/RestaurantCalls';
import './EditRestaurantPlace.css';
import EditHelper from './EditHelper';
import YelpRating from '../YelpRating/YelpRating';
import './EditRestaurantPlace.css';
import { animateScroll as scroll } from 'react-scroll'

//edit resturant details here
export default class EditRestaurantPlace extends React.Component {
    static contextType = RestaurantContext;
    constructor(e) {
        super(e)
        this.state = {
            placeInfo: {},
            'Good vibes': false, 
            'Great Wine selection': false,
            'Awesome service': false,
            'Contactless': false,
            'Recycle and compost bins inside': false,
            'Clean bathrooms': false,
            'Good Beer selection': false,
            'Gluten Free menu': false,
            'Locally sourced produce': false,
            'Organic produce': false,
            'Games to play': false,
            'Outdoor patio': false,
            'Great for groups': false,
            'Private event space': false,
            categories: {
                "Coffee-shops": false,
                "Bakeries": false,
                "Juice-Bar": false,
                "Resturants": false,
                "Breakfast": false,
                "Lunch": false,
                "Dinner": false,
            },
            error: null,
        }
    }


    componentDidMount = () => {
        let place_id = this.props.match.params.placeId
        scroll.scrollToTop();
        RestaurantCalls.getRestaurantPlaceById(place_id)
            .then(place => {
                this.setState({
                    placeInfo: place,
                    comments: place.review,
                })

                place.checkedFinds.forEach(find => {
                    if (Object.keys(this.state).includes(find)) {
                        this.setState(prevState => ({
                            [find]: !prevState[find]
                        }))
                    }
                })
            })
            .catch(err => {
                this.setState({
                    error: err,
                })
            })
    }

    handleFindChange = (e) => {
        const name = e.target.value

        this.setState(prevState => ({
            [name]: !prevState[name]
        }))
    }

    handleComments = (e) => {
        this.setState({
            placeInfo: {
                ...this.state.placeInfo,
                review: e.target.value,
            }
        })
    }

    handleCategory = (e) => {
        e.preventDefault();
        this.setState({
            placeInfo: {
                ...this.state.placeInfo,
                category: e.target.value,
            }
        })
    }

    handleUpdateReview = async (e) => {
        e.preventDefault();

        const updatedFinds = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                updatedFinds.push(key)
            }
        }
        let finalFindList = EditHelper.changeFindIntoNUM(updatedFinds)


        const updatedReview = {
            ...this.state.placeInfo,
            checkedFinds: finalFindList,
        }

        let place_id = this.props.match.params.placeId

        try {
            const data = await RestaurantCalls.editRestaurantPlace(place_id, updatedReview);
            if (data) {
                console.log(data)
            }
        } catch (err) {
            this.setState({
                error: err
            })
        }

        this.props.history.push('/');
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { name, img_url, yelp_rating, location_str, location_city, location_zip, location_st, displayphone, category, review } = this.state.placeInfo;

        let checkingBoxes = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                checkingBoxes.push((
                    <div key={`${key}`}>
                        <input className='input' type='checkbox' value={`${key}`} onChange={this.handleFindChange} checked={this.state[`${key}`]} />
                        <label htmlFor='chx1'>{`${key}`}</label>
                        <br />
                    </div>
                ))
            } else if (value === false) {
                checkingBoxes.push((
                    <div key={`${key}`}>
                        <input className='input' type='checkbox' value={`${key}`} onClick={this.handleFindChange} checked={this.state[`${key}`]} />
                        <label htmlFor='chx1'>{`${key}`}</label>
                        <br />
                    </div>
                ))
            }
        }


        return (
            <div className='item'>
                <div className='items-box'>
                    <div className='medium-img-container'>
                        <img src={img_url} alt='food presentation from the place'/>
                    </div>
                    <div className='text-area1'>
                        <h2>{name}</h2>
                        <p>{location_str}, {location_city}</p>
                        <p>{location_st} {location_zip}</p>
                        <br />
                        <p>{displayphone}</p>
                        <br />
                        <p>Saved in category: {category}</p>
                        <br />
                        <br />

                        <div className='rating-box'>
                            <p>Yelp rating: </p>
                            <YelpRating rating={yelp_rating} />
                        </div>
                    </div>

                </div>
                <br />
                <form className='edit-form' onSubmit={(e) => this.handleUpdateReview(e)}>
                    <h2>Noted for following reward worthy habits:</h2>
                    <br />
                    {checkingBoxes}
                    <br />
                    <br />
                    <h3>Additional comments</h3>
                    <textarea rows="10" cols='50' value={review} onChange={this.handleComments} >

                    </textarea>


                    <h3 id='select-header' >Save in category: </h3>
                    <select className="form__field2" onChange={this.handleCategory} required>
                        <option value=" ">Choose one </option>
                        <option value="Coffee-shop">Coffee-shop</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Juice-Bar">Juice-Bar</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>

                    <br />
                    <div className='error'>
                        {this.state.error ? this.state.error.message : null}
                    </div>
                    <div className='button-container2'>
                        <button type='submit' >Update Review</button>
                        <button onClick={this.handleBack}>Back</button>
                    </div>
                </form>

            </div>

        )
    }
}
