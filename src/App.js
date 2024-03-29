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
import StudentSearch from './studentSearch.js';
import StudentDashboard from './studentDashboard.js';
import TutorDashboard from './tutorDashboard.js';
import AdminLogin from './adminLogin.js';
import Balance from './balance.js';
import Slider from './slider.js';
import Post from './post.js';
import AdminHome from './adminHome';
import AdminForgetPass from './adminForgetPass.js';
import './App.css';
class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route path="/payment" component={PaymentPage} />
        <Route exact path="/tutorhome" component={TutorHome} />
        <Route exact path="/forgetpassword" component={ForgetPass} />
        <Route exact path="/studentmyprofile" component={StudentMyProfile} />
        <Route exact path="/tutormyprofile" component={TutorMyProfile} />
        <Route exact path="/studentsearch" component={StudentSearch} />
        <Route exact path="/studentdashboard" component={StudentDashboard} />
        <Route exact path="/uploads" component={TutorDashboard} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/adminhome" component={AdminHome} />
        <Route exact path="/adminforgetpass" component={AdminForgetPass} />
        <Route exact path="/" component={Slider} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
