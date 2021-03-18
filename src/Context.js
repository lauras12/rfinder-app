import React, { createContext } from 'react';
//import STORE from './dummyData';


const RestaurantContext = React.createContext({
    list: [],
    restaurantPlaces: [],
    userPlaces: [],
    folders: [],
    currentUser: null,
    userSelection: Boolean,
    citySelection: Boolean,
    categorySelection: Boolean,
    citySortPlaces: [],
    categorySortPlaces: [],
    setList: () => { },
    setCurrentUser: ()=> {},
    setUserSelection: () => {},
    setRestaurantPlaces: () => { },
    citySort: () => {},
    userSort: () => {},
    categorySort: () => {},
});

export default RestaurantContext;

export class RestaurantContextProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            restaurantPlaces: [],
            userPlaces: [],
            userSelection: false,
            citySelection: false,
            categorySelection: false,
            currentUser:null,
            citySortPlaces: [],
            categorySortPlaces: [],
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
    setCurrentUser =(id) => {
        console.log(id, 'USERID')
        this.setState({
            currentUser: id,
        })
    }
    setUserSelection = () => {
        this.setState({
            userSelection: true,
        })
       
    }
    userSort = filteredPlaces => {
        this.setState({
            userPlaces: filteredPlaces,
        });
    }

    citySort = city => {
        let reviews = this.state.restaurantPlaces.filter(pl => {
            return pl.location_city.toLowerCase() === city.toLowerCase();
        });
       
        this.setState({
            citySelection: true,
            citySortPlaces: reviews,
        });
    }

    categorySort = category => {
        let reviews = this.state.restaurantPlaces.filter(pl => {
            console.log(category, pl.category);
            return pl.category === category;
        });
       
        this.setState({
            categorySortPlaces: reviews,
            categorySelection: true,
        });

    }
    render() {
        const contextValue = {
            list: this.state.list,
            restaurantPlaces: this.state.restaurantPlaces,
            userPlaces: this.state.userPlaces,
            citySortPlaces: this.state.citySortPlaces,
            categorySortPlaces: this.state.categorySortPlaces,
            userSelection: this.state.userSelection,
            citySelection: this.state.citySelection,
            categorySelection: this.state.categorySelection,
            currentUser: this.state.currentUser,
            userSort: this.userSort,
            setList: this.setList,
            setRestaurantPlaces: this.setRestaurantPlaces,
            setCurrentUser: this.setCurrentUser,
            setUserSelection: this.setUserSelection,
            citySort: this.citySort,
            categorySort: this.categorySort,
        };
        return (
            <RestaurantContext.Provider value={contextValue} >
                {this.props.children}
            </RestaurantContext.Provider >

        );
    }
}