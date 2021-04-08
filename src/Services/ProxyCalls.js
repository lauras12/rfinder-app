import config from '../config';

/* proxy call to the YELP API */
const ProxyCalls = {
    getThroughRestaurantFindApi: (term, location) => {
        //const URL = `http://localhost:8000/api/yelp/` + `?` + `term=${term}` +'&'+ `location=${location}`;
        const URL = `https://rfinder-api.herokuapp.com/api/yelp/?term=${term}&location=${location}`;
        return fetch(URL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
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