import React, { createContext } from 'react';
//import STORE from './dummyData';

const RestaurantContext = React.createContext({
    list: [],
    restaurantPlaces: [],
    users: [],
    folders: [],
    reviews: [],
    setList: () => { },
    setRestaurantPlaces: () => { },
    addFolder: () => { },
    addPlaceToFolder: () => { },
    addReview: () => { },
    sortReviews: [],

})
export default RestaurantContext;

export class RestaurantContextProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            restaurantPlaces: [],
            users: [],
            folders: [],
            reviews: [],
            sortReviews: [],
        }
    }

    setList = (data) => {
        this.setState({
            list: data,
        })
    }
    setRestaurantPlaces = (data) => {
        this.setState({
            restaurantPlaces: data
        })
    }

    addFolder = (folder) => {
        this.setState({
            //folders: [...STORE.folders, folder]
        })
    }

    addPlaceToFolder = (id, folderName) => {
        console.log(this.state.folders, folderName, id)
        const pickedFolder = this.state.folders.find(folder => folder.title === folderName)
        console.log(pickedFolder, 'PICKED')
        pickedFolder.savedPlacesIds = [...pickedFolder.savedPlacesIds, id]
    }

    addReview = (review) => {
        console.log(review, 'REVIEW IN CONTEXT')
        this.setState({
            reviews: [...this.state.reviews, review]
        })
    }

    reviewCitySort = (city) => {
        let reviews = this.state.restaurantPlaces.filter(pl => {
            return pl.location_city.toLowerCase() === city.toLowerCase()
        })
        console.log(reviews)
        this.setState({
            sortReviews: reviews,
        })
    }
    render() {
        console.log(this.state)
        const contextValue = {
            list: this.state.list,
            restaurantPlaces: this.state.restaurantPlaces,
            users: this.state.users,
            folders: this.state.folders,
            reviews: this.state.reviews,
            sortReviews: this.state.sortReviews,
            setList: this.setList,
            setRestaurantPlaces: this.setRestaurantPlaces,
            addFolder: this.addFolder,
            addPlaceToFolder: this.addPlaceToFolder,
            addReview: this.addReview,
            reviewCitySort: this.reviewCitySort,
        }
        return (
            <RestaurantContext.Provider value={contextValue} >
                {this.props.children}
            </RestaurantContext.Provider >

        )
    }
}
