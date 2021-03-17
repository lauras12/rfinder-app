import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Header2 from './Header/Header2';
import SmallForm from './SmallForm/SmallForm';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import List from './List/List';
import ReviewForm from './ReviewForm/ReviewForm';
import ReviewedList from './ReviewedList/ReviewedList';
import RestuarantPlace from './RestuarantPLaceFullCard/RestuarantPlace';
import EditReview from './EditRestuarantPlace/EditRestuarantPlace';
import UserSort from './ReviewedList/UserSort';


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path='/' component={Nav} />
        <header className="App-header">
          <Route exact path='/' component={Header} />
        </header>
        <main>
          <Route exact path='/' component={SmallForm} />
          <Route exact path='/' component={ReviewedList} />

          <Route exact path='/login' component={Header} />
          <Route path='/login' component={LoginPage} />
          <Route exact path='/register' component={Header} />
          <Route path='/register' component={RegisterPage} />

          {/* <Route exact path='/user_sort' component={Header2} />
          <Route exact path='/user_sort' component={ReviewedList} />
          <Route exact path='/user_sort' component={UserSort} /> */}
          
          <Route exact path='/user/places' component={ReviewedList} />
          <Route exact path='/city/:city' component={ReviewedList} />
          <Route exact path='/category/:category' component={ReviewedList} />

          <Route exact path='/list/:location' component={Header2} />
          <Route exact path='/list/:location' component={List} />

          <Route exact path='/restuarant_place/:yelpId/:placeId' component={Header2} />
          <Route exact path='/restuarant_place/:yelpId/:placeId' component={RestuarantPlace} />

          <Route exact path='/edit/:placeId/' component={Header2} />
          <Route exact path='/edit/:placeId/' component={EditReview} />

          <Route exact path='/review/:id' component={Header2} />
          <Route exact path='/review/:id' component={ReviewForm} />  

          <Route exact path='/reviews/:location' component={Header2} />
          <Route exact path='/reviews/:location' component={ReviewedList} />
          <Route exact path='/reviews/:location' component={List} />

        </main>
      </div>
    );
  };

};