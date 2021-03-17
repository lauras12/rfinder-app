import React from 'react';
import RestaurantContext from '../Context';
import ListItem from '../LIstItem/ListItem';

export default class List extends React.Component {
    static contextType = RestaurantContext;
    render() {
        console.log(this.context.list)
        let { list } = this.context;
        list = list.map(item => {
            return (
                <ListItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    location={item.location}
                    phone={item.display_phone}
                    price={item.price}
                    img={item.image_url}
                    website={item.url}
                    rating={item.rating}
                />
            )
        })

        return (
            <ul>
                <h2>PLACES IN : {this.props.match.params.location}</h2>
                {list}
            </ul>
        )

    }
}