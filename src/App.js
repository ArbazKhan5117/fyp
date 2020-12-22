import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import PaymentPage from './paymentPage.js';
import './App.css';
class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route path="/payment" component={PaymentPage} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
