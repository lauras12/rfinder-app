import React, { createContext } from 'react';

const RestaurantContext = React.createContext({
    list: [],
    setList: () => {},
})
export default RestaurantContext;

export class RestaurantContextProvider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
        }
    }

    setList = (data) => {
        console.log(data, 'CONTEXT')
        this.setState({
            list: data,
        })
    }

    render(){
        const contextValue = {
            list: this.state.list,
            setList: this.setList,
        }
        return (
            <RestaurantContext.Provider value={contextValue} >
                {this.props.children}
            </RestaurantContext.Provider >

        )
    }
} 