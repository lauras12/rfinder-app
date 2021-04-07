import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as BR } from 'react-router-dom';
import RestaurantPlace from './RestaurantPlace';
import RestaurantContext from '../Context';


describe('RestaurantPlace component', () => {
    
    const props = {
        history: { push: '/' },
        match: {
            params: {
                placeId: 1,
                yelpId: 'a'
            }
        }
    }

    const contextValue = {
        restaurantPlaces: [{
            name: 'name1',
            img: 'url',
            url: 'url',
            yelpId: 'a',
            yelp_rating: 3,
            location_str: 'street',
            location_city: 'city',
            location_zip: 'zip',
            location_st: 'state',
            display_phone: '(123) 345 5678',
            category: 'category',
            review: 'review',
            checkedFind: [1,2,3],
        },
        {
            name: 'name2',
            img: 'url',
            url: 'url',
            yelpId: 'b',
            yelp_rating: 3,
            location_str: 'street',
            location_city: 'city',
            location_zip: 'zip',
            location_st: 'state',
            display_phone: '(123) 345 5678',
            category: 'category',
            review: 'review',
            checkedFind: [1,2,5],
        }],
        
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<BR><RestaurantContext.Provider value={contextValue} ><RestaurantPlace {...props} /></RestaurantContext.Provider ></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const item = renderer.create(<BR><RestaurantContext.Provider value={contextValue} ><RestaurantPlace {...props} /></RestaurantContext.Provider ></BR>);
        expect(item.toJSON()).toMatchSnapshot();
    })
})
