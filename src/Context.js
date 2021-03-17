import React, { createContext } from 'react';
//import STORE from './dummyData';

const RestaurantContext = React.createContext({
    list: [],
    restaurantPlaces: [],
    userPlaces: [],
    folders: [],
    citySortPlaces: [],
    setList: () => { },
    setRestaurantPlaces: () => { },
    citySort: () => {},
    userSort: () => {},

});

export default RestaurantContext;

export class RestaurantContextProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            restaurantPlaces: [],
            userPlaces: [],
            citySortPlaces: [],
            folders: [],
        }
    }

    setList = data => {
        this.setState({
            list: data,
        });
    }
    setRestaurantPlaces = data => {
        this.setState({
            restaurantPlaces: data
        });
    }

    userSort = filteredPlaces => {
        this.setState({
            userPlaces: filteredPlaces,
        });
    }

    citySort = city => {
        let reviews = this.state.restaurantPlaces.filter(pl => {
            console.log(city, this.state.restaurantPlaces);
            return pl.location_city.toLowerCase() === city.toLowerCase();
        });
        console.log(reviews)
        this.setState({
            citySortPlaces: reviews,
        });
    }
    render() {
       
        const contextValue = {
            list: this.state.list,
            restaurantPlaces: this.state.restaurantPlaces,
            userPlaces: this.state.userPlaces,
            citySortPlaces: this.state.citySortPlaces,
            userSort: this.userSort,
            setList: this.setList,
            setRestaurantPlaces: this.setRestaurantPlaces,
            citySort: this.citySort,
        };
        return (
            <RestaurantContext.Provider value={contextValue} >
                {this.props.children}
            </RestaurantContext.Provider >

        );
    }
}
