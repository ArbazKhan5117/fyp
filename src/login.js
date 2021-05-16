import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import YesComp from './yesComp';
import Header from './header';
import './css/login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valid: '',
            message: '',
            username: '',
            designation: '',
            contact: '',
            level: '',
            profile: '',
            subject: '',
            education: '',
            user_id: '',
            city: '',
            country: '',
            blockedStatus: 'no'

        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    emailHandler = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    submitHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('email', this.state.email);
        fd.append('password', this.state.password);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/validation.php', fd, headers
        ).then(res => {
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                if (res.data.designation === 'student') {
                    this.setState({ level: res.data.level })
                } else if (res.data.designation === 'tutor') {
                    this.setState({ subject: res.data.subject });
                    this.setState({ education: res.data.education });
                }
                this.setState({ blockedStatus: res.data.blockedStatus });
                this.setState({ message: res.data.data });
                this.setState({ username: res.data.username });
                this.setState({ designation: res.data.designation });
                this.setState({ contact: res.data.contact });
                this.setState({ profile: res.data.profile });
                this.setState({ user_id: res.data.user_id });
                this.setState({ city: res.data.city });
                this.setState({ country: res.data.country });
                console.log(res.data.blockedStatus);
                if (res.data.blockedStatus === 'yes') {
                    alert('Your account is Temporarily Blocked by Admin because of some attempt for violation of VTM rules. Contact to Admin using Email vtm123@gmail.com');
                    this.setState({ valid: 'no' });
                }else{
                    this.setState({ valid: res.data.valid });
                }
            }

        }
        );
    }
    render() {

        return (
            <div className="login">
                <Header username="login-header" />
                <div className="login-class">

                    <h2>Login to your account</h2>
                    <h5>Don't have an account?<Link to="/signup"><spam className="login-signup-btn">Register</spam></Link></h5>

                    <form onSubmit={this.submitHandler}>
                        <input type="email" required value={this.state.email} onChange={this.emailHandler} placeholder="Email" className="login-input" /><br />
                        <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Password" className="login-input" /><br />


                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    <h6>If you forget your password<Link to="/forgetpassword"><spam className="login-signup-btn"> Click Here</spam></Link> </h6>
                    {

                        this.state.valid === 'yes' && this.state.blockedStatus === 'no' && this.state.designation === 'student' ?
                            this.props.history.push({
                                pathname: '/home',
                                state: {
                                    username: this.state.username,
                                    contact: this.state.contact,
                                    email: this.state.email,
                                    level: this.state.level,
                                    profile: this.state.profile,
                                    user_id: this.state.user_id,
                                    city: this.state.city,
                                    country: this.state.country
                                }
                            })
                            :
                            ''

                    }
                    {

                        this.state.valid === 'yes' && this.state.blockedStatus === 'no' && this.state.designation === 'tutor' ?
                            this.props.history.push({
                                pathname: '/tutorhome',
                                state: {
                                    username: this.state.username,
                                    contact: this.state.contact,
                                    email: this.state.email,
                                    subject: this.state.subject,
                                    profile: this.state.profile,
                                    education: this.state.education,
                                    user_id: this.state.user_id,
                                    city: this.state.city,
                                    country: this.state.country,
                                    blockedStatus: this.state.blockedStatus
                                }
                            })
                            :
                            ''

                    }
                </div>
            </div>
        );
    }
}
export default Login;