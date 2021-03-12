import React from 'react';
import RestauranTContext from '../Context';
import cuid from 'cuid';

export default class ReviewForm extends React.Component {
    static contextType = RestauranTContext;
    constructor() {
        super()
        this.state = {
            selection: null,
            newFolder: false,
            newFolderName: null,
            pickedFolder: null,
            error: null
        }
    }



    handleSelection = (e) => {
        console.log(e.target.value)
        this.setState({
            selection: e.target.value,
        })
    }

    handleFolder = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'new-folder') {
            this.setState({
                newFolder: true,
            })
        }
        this.setState({
            pickedFolder: e.target.value,
        })
    }

    handleInputField = (e) => {
        console.log(e.target.value)
        if (this.state.newFolder === true) {
            this.setState({
                newFolderName: e.target.value,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const placeId = this.props.match.params.id;
        if (this.state.newFolder === true) {
            const createdFolder = {
                folderId: cuid(),
                title: this.state.newFolderName,
                savedPlacesIds: [placeId]
            }
            this.context.addFolder(createdFolder)
        } else {
            console.log(this.state.pickedFolder, 'REVIEWFORM')
            this.context.addPlaceToFolder(placeId, this.state.pickedFolder)
        }
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
                <form onSubmit={this.handleSubmit}>
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
                    <textarea rows="10" cols='50'></textarea>
                    <br />
                    <button>Post Review</button>

                    <p>Bookmark this place ?</p>
                    <select name='bookmarks' onChange={this.handleFolder}>
                        <option value=''>Choose folder</option>
                        <option value='favorites'>Favorites</option>
                        <option value='new-folder'>Create new folder</option>

                    </select>
                    {this.state.newFolder === false ? <input disabled type='text' placeholder='new folder name' id='newFolder' /> : <input type='text' placeholder='new folder name' id='newFolder' onChange={this.handleInputField} required />}

                    <button type='submit' >SAVE</button>
                </form>

            </div>
        )
    }
} 