import React, { createContext } from 'react';
//import STORE from './dummyData';

const RestuarantContext = React.createContext({
    list: [],
    restuarantPlaces: [],
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
    setRestuarantPlaces: () => { },
    citySort: () => {},
    userSort: () => {},
    categorySort: () => {},
});

export default RestuarantContext;

export class RestuarantContextProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            restuarantPlaces: [],
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
    setRestuarantPlaces = data => {
        this.setState({
            restuarantPlaces: data
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
        let reviews = this.state.restuarantPlaces.filter(pl => {
            console.log(city, this.state.restuarantPlaces);
            return pl.location_city.toLowerCase() === city.toLowerCase();
        });
       
        this.setState({
            citySelection: true,
            citySortPlaces: reviews,
        });
    }

    categorySort = category => {
        let reviews = this.state.restuarantPlaces.filter(pl => {
            console.log(category, pl.category);
            return pl.category === category;
        });
       
        this.setState({
            categorySortPlaces: reviews,
            categorySelection: true,
        });

    }
    render() {
       console.log(this.state.categorySortPlaces, 'CATEGORY SORT RESULTS')
        const contextValue = {
            list: this.state.list,
            restuarantPlaces: this.state.restuarantPlaces,
            userPlaces: this.state.userPlaces,
            citySortPlaces: this.state.citySortPlaces,
            categorySortPlaces: this.state.categorySortPlaces,
            userSelection: this.state.userSelection,
            citySelection: this.state.citySelection,
            categorySelection: this.state.categorySelection,
            currentUser: this.state.currentUser,
            userSort: this.userSort,
            setList: this.setList,
            setRestuarantPlaces: this.setRestuarantPlaces,
            setCurrentUser: this.setCurrentUser,
            setUserSelection: this.setUserSelection,
            citySort: this.citySort,
            categorySort: this.categorySort,
        };
        return (
            <RestuarantContext.Provider value={contextValue} >
                {this.props.children}
            </RestuarantContext.Provider >

        );
    }
}
