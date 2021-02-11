import React, { Component } from 'react';
import Header from './header';
import { Link } from "react-router-dom";
import axios from 'axios';
import NewPassword from './newPassword';
import './css/login.css';
class ForgetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            contact: '',
            valid: ''
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.contactHandler = this.contactHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    emailHandler = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    nameHandler = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }
    contactHandler = (event) => {
        event.preventDefault();
        this.setState({ contact: event.target.value });
    }
    submitHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('email', this.state.email);
        fd.append('name', this.state.name);
        fd.append('contact', this.state.contact);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/forgetpassword.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            console.log(res.data.valid);
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                this.setState({ valid: res.data.valid });
                console.log(res.data.data);
            }

        }
        );
    }

    render() {
        return (
            <div>
                <Header username="login-header" />
                <div className="forget-class">
                    <h3>Please Enter Personal Information</h3>
                    <form onSubmit={this.submitHandler}>
                        <input type="email" required value={this.state.email} onChange={this.emailHandler} placeholder="Enter your email address" className="login-input" /><br />
                        <input type="text" required value={this.state.name} onChange={this.nameHandler} placeholder="Enter your username" className="login-input" /><br />
                        <input type="text" required value={this.state.contact} onChange={this.contactHandler} placeholder="Enter your contact No" className="login-input" /><br />
                        <button type="submit" className="forget-btn">Submit</button>
                    </form>
                    {this.state.valid === 'yes' ? <NewPassword name={this.state.name} email={this.state.email} contact={this.state.contact} /> : ''}
                    <h5>Go back to Login Page ?<Link to="/login"><spam className="login-signup-btn">Click here</spam></Link></h5>

                </div>
            </div>
        );
    }
}
export default ForgetPass;