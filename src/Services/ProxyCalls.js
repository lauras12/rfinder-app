import React from 'react';
import config from '../config';


const ProxyCalls = {
    getFromRestaurantFindApi: (term, location) => {
        const URL = 'https://rfinder-api.herokuapp.com//' + `?` + `term=${term}` +'&'+ `location=${location}`;
        return fetch(URL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${config.API_KEY}`
            },
        }) 
        .then(res => {
            if(!res.ok) {
                return res.json()
                .then(err => {
                    console.log(err)
                    throw new Error(err.error.message)
                })
                
            }
            console.log(res, 'maybe working?')
            return res
        })
        .then(res => res.json());
    },

}
export default ProxyCalls;