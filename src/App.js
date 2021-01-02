import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from './signup.js';
import Login from './login.js';
import Home from './home.js';
import PaymentPage from './paymentPage.js';
import TutorHome from './tutorHome.js';
import ForgetPass from './forgetPass.js';
import StudentMyProfile from './studentMyProfile.js';
import TutorMyProfile from './tutorMyProfile.js';
import StudentSearch from './studentSearch';
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
        <Route exact path="/tutorhome" component={TutorHome} />
        <Route exact path="/forgetpassword" component={ForgetPass} />
        <Route exact path="/studentmyprofile" component={StudentMyProfile} />
        <Route exact path="/tutormyprofile" component={TutorMyProfile} />
        <Route exact path="/studentsearch" component={StudentSearch} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
