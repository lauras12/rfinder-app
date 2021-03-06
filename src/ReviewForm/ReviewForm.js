import React from 'react';
import RestaurantContext from '../Context';
import './ReviewForm.css';
import RestaurantCalls from '../Services/RestaurantCalls';
import YelpRating from '../YelpRating/YelpRating';

export default class ReviewForm extends React.Component {
    static contextType = RestaurantContext;
    constructor(e) {
        super(e)
        this.state = {
            selection: [],
            comments: '',
            catregory: '',
            error: null
        }
    }

    handleSelection = (e) => {
        this.setState({
            selection: [...this.state.selection, Number(e.target.value)],
        })

    }

    handleComments = (e) => {
        this.setState({
            comments: e.target.value
        })
    }

    handleCategory = (e) => {
        e.preventDefault();
        this.setState({
            category: e.target.value,
        })
    }

    handlePlaceReview = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const currentPlace = this.context.list.find(item => item.id === id);

        const newReviewedPlace = {
            yelp_id: this.props.match.params.id,
            name: currentPlace.name,
            img_url: currentPlace.image_url,
            url: currentPlace.url,
            yelp_rating: currentPlace.rating,
            location_str: currentPlace.location.address1,
            location_city: currentPlace.location.city,
            location_zip: currentPlace.location.zip_code,
            location_st: currentPlace.location.state,
            display_phone: currentPlace.display_phone,
            category: this.state.category,
            checkedFinds: this.state.selection,
            review: this.state.comments,
        }

        RestaurantCalls.postNewReview(this.props.match.params.id, newReviewedPlace)
            .then(data => {
                this.props.history.push(`/reviews/${newReviewedPlace.location_city}`)
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })

    }
    handleBack = () => {
        this.props.history.goBack();
    }

    /* rest info from user review */
    render() {
        const id = this.props.match.params.id;
        const currentPlace = this.context.list.find(item => item.id === id)
        
        return (
            <div className='item'>
                <div className='img-container'>
                    <img src={currentPlace.image_url} alt='food presentation from the place'/>
                </div>

                <div className='item-text'>

                    <div className='text-area'>
                        <h2>{currentPlace.name}</h2>
                        <br />
                        <p>{currentPlace.location.address1}, {currentPlace.location.city}</p>
                        <p>{currentPlace.location.state} {currentPlace.location.zip_code}</p>
                        <br />
                        <p>{currentPlace.display_phone}</p>
                        <p>Price-range: {currentPlace.price}</p>
                        <br />

                        <div className='rating-box'>
                            <p>Yelp rating: </p>
                            <YelpRating rating={currentPlace.rating} />
                        </div>
                        <br />
                        <br />
                        <form onSubmit={this.handlePlaceReview}>
                            <h2>Mark reward worthy habits :</h2>

                            <br />
                            <input className='input' type='checkbox' value='1' id='chx1' onClick={this.handleSelection} />
                            <label htmlFor='chx1'>Good vibes</label>
                            <br />

                            <input className='input' type='checkbox' value='2' onClick={this.handleSelection} />
                            <label>Great Wine selection</label>
                            <br />

                            <input className='input' type='checkbox' value='3' onClick={this.handleSelection} />
                            <label>Awesome service'</label>
                            <br />

                            <input className='input' type='checkbox' value='4' onClick={this.handleSelection} />
                            <label>Contactless</label>
                            <br />

                            <input className='input' type='checkbox' value='5' onClick={this.handleSelection} />
                            <label>Recycle and compost bins inside</label>
                            <br />

                            <input className='input' type='checkbox' value='6' onClick={this.handleSelection} />
                            <label>Clean bathrooms</label>
                            <br />

                            <input className='input' type='checkbox' value='7' onClick={this.handleSelection} />
                            <label>Good Beer selection</label>
                            <br />

                            <input className='input' type='checkbox' value='8' onClick={this.handleSelection} />
                            <label>Gluten Free menu'</label>
                            <br />

                            <input className='input' type='checkbox' value='9' onClick={this.handleSelection} />
                            <label>Locally sourced produce</label>
                            <br />

                            <input className='input' type='checkbox' value='10' onClick={this.handleSelection} />
                            <label>Organic produce</label>
                            <br />

                            <input className='input' type='checkbox' value='11' onClick={this.handleSelection} />
                            <label>Games to play</label>
                            <br />


                            <input className='input' type='checkbox' value='12' onClick={this.handleSelection} />
                            <label>Outdoor patio</label>
                            <br />

                            <input className='input' type='checkbox' value='13' onClick={this.handleAddAttribute} />
                            <label>Great for groups</label>
                            <br />

                            <input className='input' type='checkbox' value='14' onClick={this.handleAddAttribute} />
                            <label>Private event space'</label>
                            <br />
                            <br />
                            <br />
                            <h3>Additional comments</h3>
                            <textarea rows="10" cols='50' onChange={this.handleComments} ></textarea>
                            <br />

                            <div className='select-box'>
                                <h3 id='select-header' >Save in category: </h3>
                                <select className="form__field2" onChange={this.handleCategory} required>
                                    <option value=" ">Select category </option>
                                    <option value="Coffee-shop">Coffee-shops</option>
                                    <option value="Bakery">Bakeries</option>
                                    <option value="Juice-Bar">Juice-Bars</option>
                                    <option value="Restaurant">Restaurants</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>

                                </select>
                            </div>
                            <br />

                            <br />
                            <div className='error'>
                                {this.state.error ? this.state.error.message : null}
                            </div>
                            <div className='button-container2'>
                                <button>Post Review</button>
                                <button onClick={this.handleBack}>Back</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}