import React from 'react';
import RestauranTContext from '../Context';
import cuid from 'cuid';
import './ReviewForm.css'; 

export default class ReviewForm extends React.Component {
    static contextType = RestauranTContext;
    constructor(e) {
        super(e)
        this.state = {
            selection: [],
            comments: '',
            error: null
        }
    }



    handleSelection = (e) => {
        this.setState({
            selection: [...this.state.selection, e.target.value],
        })
    }

    handleComments = (e) => {
        this.setState({
            comments: e.target.value
        })
    }

    handlePlaceReview = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const currentPlace = this.context.list.find(item => item.id === id);
        console.log(currentPlace, 'PLACE')
        const newReview = {
            id: cuid(),
            placeId: this.props.match.params.id,
            placeName: currentPlace.name,
            placeCity: currentPlace.location.city,
            attributes: this.state.selection,
            addtionalComments: this.state.comments,
        }
        this.context.addReview(newReview)
        this.props.history.push(`/reviews/${newReview.placeCity}`)
    }


    render() {

        const id = this.props.match.params.id;
        const currentPlace = this.context.list.find(item => item.id === id)

        return (
            <div className='res-card'>
                <h2>{currentPlace.name}</h2>
                <p>{currentPlace.location.address1}</p>
                <p>{currentPlace.location.city}</p>
                <p>{currentPlace.location.state}</p>
                <p>{currentPlace.location.zip_code}</p>
                <p>{currentPlace.phone}</p>
                <p>{currentPlace.price}</p>
                <img src={currentPlace.image_url} />
                <a href={`${currentPlace.url}`}><h2>Visit</h2></a>
                {currentPlace.rating}

                <br />
                <form onSubmit={this.handlePlaceReview}>
                    <h3>Put a checkmark next to your favorite things!:</h3>

                    <input className='input' type='checkbox' value='vibe' onClick={this.handleSelection} />
                    <label>Awesome atomphere & vibe</label>
                    <br />

                    <input className='input' type='checkbox' value='delicious' onClick={this.handleSelection} />
                    <label>Best food I've ever had</label>
                    <br />

                    <input className='input' type='checkbox' value='drinks' onClick={this.handleSelection} />
                    <label>Best drinks I've ever had</label>
                    <br />

                    <input className='input' type='checkbox' value='contactless' onClick={this.handleSelection} />
                    <label>Touch free = covid free!</label>
                    <br />

                    <input className='input' type='checkbox' value='local' onClick={this.handleSelection} />
                    <label>Locally sourced produce</label>
                    <br />

                    <input className='input' type='checkbox' value='organic' onClick={this.handleSelection} />
                    <label>Organic products</label>
                    <br />

                    <h3>Additional comments</h3>
                    <textarea rows="10" cols='50' onChange={this.handleComments} ></textarea>
                    <br />
                    <button>Post Review</button>
                </form>

            </div>
        )
    }
} 