import config from '../config';
import TokenService from '../Services/token-service';

const RestuarantCalls = {
    getAllReviewedPlaces: () => {
        const URL = config.API_ENDPOINT + '/';
        console.log(URL);
        return fetch(URL)
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            console.log(err);
                            throw new Error(err.error.message);
                        })
                }
                console.log(res);
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
                            console.log(err);
                            throw new Error(err.error.message);
                        })
                }
                console.log(res);
                return res;
            })
            .then(res => res.json());
    },

    postNewReview: (placeId, newPlace) => {
        const URL = config.API_ENDPOINT + `/${placeId}/review`;
        console.log(URL, newPlace);
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
                            console.log(err)
                            throw new Error(err.error.message)
                        })
                }
                console.log(res)
                return res;
            })
            .then(res => res.json())
    },

    getAllRestuarantPlacesByUser: () => {
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
                            console.log(err)
                            throw new Error(err.error.message)
                        })
                }
                return res;
            })
            .then(res => res.json())
    },

    getRestuarantPlaceById: (placeId) => {
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
                            console.log(err)
                            throw new Error(err.error.message)
                        })
                }
                console.log(res)
                return res;
            })
            .then(res => res.json())

    },


    editRestuarantPlace: (placeId, updatedInfo) => {
        const URL = config.API_ENDPOINT + `/edit/${placeId}`;
        console.log(URL)
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
                            console.log(err)
                            throw new Error(err.error.message)
                        })
                }
                console.log(res)
                return res;
            })
            .then(res => res.json())
    },

    deleteRestuarantPlace: (placeId) => {
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
                    console.log('error on delete')
                    throw new Error('error on delete')

                }

            })

    },

}

export default RestuarantCalls;