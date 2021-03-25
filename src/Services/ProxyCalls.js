import config from '../config';

const ProxyCalls = {
    getThroughRestaurantFindApi: (term, location) => {
        const URL = `https://rfinder-api.herokuapp.com/yelp/` + `?` + `term=${term}` +'&'+ `location=${location}`;
        
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
                    throw new Error(err.error.message);
                });
                
            }
            return res;
        })
        .then(res => res.json());
    },

}
export default ProxyCalls;