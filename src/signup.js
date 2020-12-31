import React, { Component } from 'react';
import axios from 'axios';
import YesComp from './yesComp';
import { Link } from "react-router-dom";
import './css/signup.css';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm: '',
            country: '',
            city: '',
            contact: '',
            designation: 'Select your designation',
            profile: null,
            valid: '',
            message: '',
            profileName: '',
            profileType: '',
            upload: 'yes'
        };
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.confirmHandler = this.confirmHandler.bind(this);
        this.countryHandler = this.countryHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.contactHandler = this.contactHandler.bind(this);
        this.designationHandler = this.designationHandler.bind(this);
        this.profileHandler = this.profileHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
    }
    nameHandler = (event) => {
        event.preventDefault();
        this.setState({ name: event.target.value });
    }
    emailHandler = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    confirmHandler = (event) => {
        event.preventDefault();
        this.setState({ confirm: event.target.value });

    }
    countryHandler = (event) => {
        event.preventDefault();
        this.setState({ country: event.target.value });
    }
    cityHandler = (event) => {
        event.preventDefault();
        this.setState({ city: event.target.value });
    }
    contactHandler = (event) => {
        event.preventDefault();
        this.setState({ contact: event.target.value });
    }
    designationHandler = (event) => {
        event.preventDefault();
        this.setState({ designation: event.target.value });
    }
    profileHandler = (event) => {
        event.preventDefault();
        this.setState({
            profile: event.target.files[0], profileName: event.target.files[0].name, profileType:
                event.target.files[0].type
        });
        const fd = new FormData();
        fd.append('profilename', event.target.files[0].name);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/checkUploadedProfiles.php', fd, headers
        ).then(res => {
            if(res.data.upload==='yes'){
                 this.setState({upload: res.data.upload});
                 console.log(res.data.upload);
            }
            else{
                this.setState({upload: res.data.upload});
                console.log(res.data.upload);
            }
            
         }
        );
    }
    uploadProfile = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('myFile', this.state.profile, this.state.profileName);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/uploadProfiles.php', fd, headers
        ).then(function (response) {
            //handle success
            alert(response.data);
        })
            .catch(function (response) {
                //handle error
                console.log(response)
                console.log("sorry")
            });

    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.confirm !== this.state.password) {
            alert('Please confirm your Password carefully');
        }
        else {
            console.log(this.state);

            const fd = new FormData();
            fd.append('name', this.state.name);
            fd.append('email', this.state.email);
            fd.append('password', this.state.password);
            fd.append('country', this.state.country);
            fd.append('city', this.state.city);
            fd.append('contact', this.state.contact);
            fd.append('designation', this.state.designation);
            fd.append('profile', this.state.profileName);
            fd.append('profileType',this.state.profileType);
            var headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
            axios.post('http://localhost/fyp-backend/signup/registration.php', fd, headers
            ).then(res => {
                console.log(res.data.data);
                console.log(res.data.valid);
                if (res.data.valid == 'no') {
                    alert(res.data.data);
                } else {
                    this.setState({ valid: res.data.valid });
                    this.setState({ message: res.data.data });
                }

            }
            );
        }

    }
    render() {
        return (

            <div className='signup-class'>
                <h2>Signup</h2>
                <h4>Welcome to Virtual Tutor Mate</h4>
                <form>
                    <input type="text" value={this.state.name} onChange={this.nameHandler} placeholder="Full Name" className="left-input" required />
                    <input type="email" value={this.state.email} onChange={this.emailHandler} placeholder="Email Address" required /><br />
                    <input type="password" value={this.state.password} onChange={this.passwordHandler} placeholder="Password" className="left-input" required />
                    <input type="Password" value={this.state.confirm} onChange={this.confirmHandler} placeholder="Confirm password" required /><br />
                    <input type="text" value={this.state.country} onChange={this.countryHandler} placeholder="Country" className="left-input" required />
                    <input type="text" value={this.state.city} onChange={this.cityHandler} placeholder="City" required /><br />
                    <input type="number" value={this.state.contact} onChange={this.contactHandler} placeholder="Contact#" className="left-input" required />
                    <label className="desig-label">Designation:</label>
                    <select value={this.state.designation} onChange={this.designationHandler} required>
                        <option value='tutor'>Tutor</option>
                        <option value='student'>Student</option>
                    </select><br />
                    
                    
                    <input onChange={this.profileHandler} type="file" name="profile" className="profile-input" multiple accept='image/*' required />
                   {this.state.upload === 'yes' ? '' : <button className="profile-label" onClick={this.uploadProfile}>Upload Profile:</button>}<br />
                    <button type="submit" className="signup-btn" onClick={this.submitHandler}>Signup</button>

                </form>
                {this.state.valid === 'yes' ? <YesComp message={this.state.message} btn='Login' /> : ''}
            </div>
        );
    }
}
export default Signup;