/*export default {
    API_ENDPOINT: (process.env.NODE_ENV === 'production' ? 'https://rfinder-api.herokuapp.com/api' : 'http://localhost:8000/api'),
    API_KEY: process.env.REACT_API_KEY,
}
*/
export default {
    API_ENDPOINT: 'http://localhost:8000/api',
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
}