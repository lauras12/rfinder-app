import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {RestaurantContextProvider} from './Context';

ReactDOM.render(
    // <Errors>
    <BrowserRouter>
        <RestaurantContextProvider>
            <App />
        </RestaurantContextProvider>
    </BrowserRouter>,
    // </Errors>  

    document.getElementById('root')
);
