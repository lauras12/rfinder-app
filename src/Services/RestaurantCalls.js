import config from '../config';
import TokenService from '../Services/token-service';

/* adding a resturant using the API */
const RestaurantCalls = {
    getAllReviewedPlaces: () => {
        const URL = config.API_ENDPOINT + '/';
        return fetch(URL)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message);
                        })
                };
                return res;
            })
            .then(res => res.json());
    },
    
    checkReviewCount: (placeId) => {
        const URL = config.API_ENDPOINT + `/${placeId}/count`;
        return fetch(URL)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message);
                        })
                };
                return res;
            })
            .then(res => res.json());
    },
/* posting new review */
    postNewReview: (placeId, newPlace) => {
        const URL = config.API_ENDPOINT + `/${placeId}/review`;
        return fetch(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newPlace),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message)
                        })
                };
                return res;
            })
            .then(res => res.json())
    },

    /* getting all resturant reviwes by user */
    getAllRestaurantPlacesByUser: () => {
        const URL = config.API_ENDPOINT + '/user';
        return fetch(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message)
                        })
                };
                return res;
            })
            .then(res => res.json())
    },

    getRestaurantPlaceById: (placeId) => {
        const URL = config.API_ENDPOINT + `/place/${placeId}`;
        return fetch(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message)
                        })
                };
                return res;
            })
            .then(res => res.json())

    },

/* editing resturnat details */
    editRestaurantPlace: (placeId, updatedInfo) => {
        const URL = config.API_ENDPOINT + `/edit/${placeId}`;
       
        return fetch(URL, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(updatedInfo),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            throw new Error(err.error.message)
                        })
                };
                return res;
            })
            .then(res => res.json())
    },
/* deleting resturant details */
    deleteRestaurantPlace: (placeId) => {
        const URL = config.API_ENDPOINT + `/place/delete/${placeId}`;
        return fetch(URL, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('error on delete')
                };
            })
    },
}

export default RestaurantCalls;