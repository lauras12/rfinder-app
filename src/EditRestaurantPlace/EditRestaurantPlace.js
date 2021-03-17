import React from 'react';
import RestaurantContext from '../Context';
import RestaurantCalls from '../Services/RestaurantCalls';
import './EditRestaurantPlace.css';
import EditHelper from './EditHelper';


export default class EditRestaurantPlace extends React.Component {
    static contextType = RestaurantContext;
    constructor(e) {
        super(e)
        this.state = {
            placeInfo: {},
            'No single use plastic': false,
            'Compostable take-out containers and cups':false,
            'No plastic bottled drinks': false,
            'Composting food scraps': false,
            'Recycle and compost bins inside':false,
            'Hemp based or fabric napkins and paper towels': false,
            'Papperless, fully computer based billing and record keeping': false,
            'Donating leftover food to local shelter or "free meal night"': false,
            'Locally sourced produce': false,
            'Organic produce': false,
            'Resposible frying oil disposal': false,
            'Saves energy by installing light timers and motion sensors': false,
            'Saves water by installing low flow faucets': false,
            'Saves energy and water by installing energy star equipmnet': false,
             error: null,
        }
    }


    componentDidMount = () => {
        let place_id = this.props.match.params.placeId
        console.log(place_id, this.props);
        RestaurantCalls.getRestaurantPlaceById(place_id)
            .then(place => {
                console.log(place)
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
                console.log(err)
                this.setState({
                    error: err,
                })
            })
    }

    handleFindChange = (e) => {
        // e.preventDefault()
        const name = e.target.value
        
        this.setState(prevState => ({
        [name]: !prevState[name]
        }))

        console.log(name, 'GOT IT??????')
    }

    handleComments = (e) => {
        this.setState({
            placeInfo: {
                ...this.state.placeInfo,
               review: e.target.value,
            }
        })
    }

    handleUpdateReview = (e) => {
        e.preventDefault();
        const updatedFinds = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                updatedFinds.push(key)
            }
        }
        let finalFindList = EditHelper.changeFindIntoNUM(updatedFinds)
        
        console.log(finalFindList)
        const updatedReview = {
            ...this.state.placeInfo,
            checkedFinds: finalFindList,
        }

        let place_id = this.props.match.params.placeId
        RestaurantCalls.editRestaurantPlace(place_id, updatedReview)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            this.setState({
                error: err
            })
        })
        this.props.history.push('/');
    }



    render() {
        
        const { id, yelpId, name, img_url, url, yelprating, location_str, location_city, location_zip, location_st, displayphone, folderid, review } = this.state.placeInfo;

        console.log(this.state.placeInfo)
        let checkingBoxes = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                console.log('found it', key)
                checkingBoxes.push((
                    <div>
                    <input className='input' type='checkbox' value={`${key}`} onClick={this.handleFindChange} checked={this.state[`${key}`]} />
                    <label htmlFor='chx1'>{`${key}`}</label>
                    <br />
                    </div>
                ))
            } else if (value === false){
                checkingBoxes.push((
                    <div>
                    <input className='input' type='checkbox' value={`${key}`} onClick={this.handleFindChange} checked={this.state[`${key}`]} />
                    <label htmlFor='chx1'>{`${key}`}//////not checked</label>
                    <br />
                    </div>
                ))
            }
        }

       
        return (
            <div >
                
                <img src={img_url} />
                <h2>{name}</h2>
                <p>{location_str}</p>
                <p>{location_city}</p>
                <p>{location_st}</p>
                <p>{location_zip}</p>
                <p>{displayphone}</p>

                <a href={`${url}`}><h2>Visit</h2></a>
                <p>Yelp rating:</p>{yelprating}

                <br />
                <form onSubmit={this.handleUpdateReview}>
                    <h3>Reward worthy habits!:</h3>
                    {checkingBoxes}
                   
                    <h3>Additional comments</h3>
                    <textarea rows="10" cols='50' onChange={this.handleComments} >
                    <div contentEditable='true' >{this.state.placeInfo.review}</div>
                    </textarea>
                    
                    <br />
                    <button type='submit' >Update Review</button>
                </form>


            </div>
        )
    }
}
