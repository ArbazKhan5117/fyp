import React, { Component } from 'react';
import './css/studentMyProfile.css';
import Menu from './menu.js';
import Header from './header.js';
import Footer from './footer.js';
import axios from 'axios';
class StudentMyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: 'no',
            password: '',
            email: '',
            user_id: '',
            emailEdit: '',
            contactEdit: '',
            nameEdit: '',
            levelEdit: '',
            profileNameEdit: '',
            profile: null,
            profileName: '',
            finalName: '',
            upload: 'yes',
            cityEdit: '',
            countryEdit: '',
            edited: 'no',
            level_arr: [],
            newProfile: '',
            newname: ''
        }
        this.passwordHandler = this.passwordHandler.bind(this);
        this.passSubmitHandler = this.passSubmitHandler.bind(this);
        this.nameEditHandler = this.nameEditHandler.bind(this);
        this.contactEditHandler = this.contactEditHandler.bind(this);
        this.levelEditHandler = this.levelEditHandler.bind(this);
        this.emailEditHandler = this.emailEditHandler.bind(this);
        this.cityEditHandler = this.cityEditHandler.bind(this);
        this.countryEditHandler = this.countryEditHandler.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
        this.profileHandler = this.profileHandler.bind(this);
        this.submitEditHandler = this.submitEditHandler.bind(this);
        this.generateProfileName = this.generateProfileName.bind(this);
        this.renameHandler = this.renameHandler.bind(this);
        this.updateUploadedProfiles = this.updateUploadedProfiles.bind(this);
        this.fetchLevelSubject();
    }
    fetchLevelSubject = () => {

        const fd = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/fetchLevelSubject.php', fd, headers
        ).then(response => {
            this.setState({ level_arr: response.data[0].level });
        });
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    emailHandler = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    cityEditHandler = (event) => {
        event.preventDefault();
        this.setState({ cityEdit: event.target.value });
    }
    countryEditHandler = (event) => {
        event.preventDefault();
        this.setState({ countryEdit: event.target.value });
    }
    emailEditHandler = (event) => {
        event.preventDefault();
        this.setState({ emailEdit: event.target.value });
    }
    nameEditHandler = (event) => {
        event.preventDefault();
        this.setState({ nameEdit: event.target.value });
    }
    contactEditHandler = (event) => {
        event.preventDefault();
        this.setState({ contactEdit: event.target.value });
    }
    levelEditHandler = (event) => {
        event.preventDefault();
        this.setState({ levelEdit: event.target.value });
    }
    profileHandler = (event) => {
        event.preventDefault();
        this.setState({profile: null, profileName: ''});
        this.setState({
            profile: event.target.files[0], profileName: event.target.files[0].name
        });
        const fd = new FormData();
        fd.append('profilename', event.target.files[0].name);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/checkUploadedProfiles.php', fd, headers
        ).then(res => {
            if (res.data.upload === 'yes') {
                this.setState({ upload: res.data.upload });
                console.log(res.data.upload);
            }
            else {
                this.setState({ upload: res.data.upload });
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
        ).then(res => {
            //handle success
            if (res.data === 'The image has been uploaded') {
                alert(res.data);
                this.generateProfileName();
            } else {
                alert('This image has large pixels, please upload normal image');
            }

            console.log(res.data);
            //console.log(response.data.valid);

            console.log("success")
        });



    }
    generateProfileName = () => {
        const fd = new FormData();
        fd.append('name', this.state.profileName);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/giveNewNameToUser.php', fd, headers
        ).then(res => {

            this.setState({ newname: res.data.num });
            this.renameHandler();

        }
        );
    }
    renameHandler() {
        const fd = new FormData();
        this.setState({newname: (parseInt(this.state.newname)+1)});
        fd.append('name', this.state.profileName);
        fd.append('newname', this.state.newname);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/renameUserProfile.php', fd, headers
        ).then(res => {
            let extension = this.state.profileName.split('.').pop();
            let upgradedName = `${this.state.newname}.${extension}`;
            this.setState({ newProfile: upgradedName, upload: 'yes' });
            this.updateUploadedProfiles();
            console.log(this.state.newProfile);
        }
        );
    }
    updateUploadedProfiles(){
        const fd = new FormData();
        fd.append('profile', this.state.newProfile);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateUploadedUserProfiles.php', fd, headers
        ).then(res => {
            console.log(res.data);
        }
        );
    }
    passSubmitHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        fd.append('password', this.state.password);
        fd.append('email', this.state.email);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/studentMyProfile.php', fd, headers
        ).then(res => {
            if (res.data.valid === 'yes') {
                this.setState({ user_id: res.data.user_id });
                this.setState({ nameEdit: res.data.name });
                this.setState({ emailEdit: res.data.email });
                this.setState({ contactEdit: res.data.contact });
                this.setState({ levelEdit: res.data.level });
                this.setState({ profileNameEdit: res.data.profile });
                this.setState({ cityEdit: res.data.city });
                this.setState({ countryEdit: res.data.country });
                this.setState({ valid: res.data.valid });
            }
            else {
                alert(res.data.data);
            }

        }
        );
    }
    componentDidMount = () => {
        this.setState({newProfile: this.props.location.state.profile});
    }
    submitEditHandler(event) {
        event.preventDefault();
        const fd = new FormData();
        //this.state.profileName === '' ? this.setState({finalName: this.state.profileNameEdit}) : this.setState({finalName: this.state.profileName});
        //console.log(this.state.profileName);
        fd.append('profile', this.state.newProfile);
        fd.append('email', this.state.emailEdit);
        fd.append('name', this.state.nameEdit);
        fd.append('level', this.state.levelEdit);
        fd.append('contact', this.state.contactEdit);
        fd.append('user_id', this.state.user_id);
        fd.append('city', this.state.cityEdit);
        fd.append('country', this.state.countryEdit);

        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/editStudentProfile.php', fd, headers
        ).then(res => {
            if (res.data.edited === 'yes') {
                this.setState({ valid: res.data.valid });
                this.setState({ edited: res.data.edited });
                this.setState({ upload: 'yes' });
                alert(res.data.data);
            } else {
                alert(res.data.data);
            }

        }
        );

    }

    render() {
        let username, email, level, contact, profile, user_id, city, country;
        if (this.state.edited === 'no') {
            username = this.props.location.state.username
            email = this.props.location.state.email;
            level = this.props.location.state.level;
            contact = this.props.location.state.contact;
            profile = this.props.location.state.profile;
            user_id = this.props.location.state.user_id;
            city = this.props.location.state.city;
            country = this.props.location.state.country;
        } else {
            username = this.state.nameEdit;
            email = this.state.emailEdit;
            level = this.state.levelEdit;
            contact = this.state.contactEdit;
            city = this.state.cityEdit;
            country = this.state.countryEdit;
            user_id = this.props.location.state.user_id;
            profile = this.state.newProfile;
        }

        //this.setState({nameEdit: username});
        return (
            <div>

                <Header username={username} desig="Student" profile={this.state.newProfile} />
                <Menu page="MyProfile" username={username} email={email} level={level} contact={contact}
                    profile={this.state.newProfile} user_id={user_id} city={city} country={country} />
                <div className="studentMyProfile-class">
                    <div className="present-info">
                        <div className="profile">
                            <img src={'/uploads/' + this.state.newProfile}></img>
                        </div>

                        <table className="customers">
                            <tr>
                                <td>Name</td>
                                <td>{username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Contact</td>
                                <td>{contact}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td>Level</td>
                                <td>{level}</td>
                            </tr>
                        </table>

                    </div>





                    <div className="edit-info">
                        <h2>Edit your Personal Information</h2>
                        {this.state.valid === 'no' ?
                            <form onSubmit={this.passSubmitHandler}>
                                <input type="text" value={this.state.email} onChange={this.emailHandler} placeholder="Enter your Email" className="login-input-pf" /><br />
                                <input type="password" value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your Password" className="login-input-pf" /><br />
                                <input type="submit" value="Submit" className="submit-btn" />
                            </form>
                            :
                            <form onSubmit={this.submitEditHandler} className="edit_form">

                                <label className="level-label" >Profile Image:</label>
                                <input type="file" name="profile" className="profile-input" onChange={this.profileHandler} />
                                {this.state.upload === 'yes' ? '' : <button className="profile-label" onClick={this.uploadProfile}>Upload</button>}<br />
                                
                                <table className="customers-edit">

                                    <tr>
                                        <td>Username:</td>
                                        <td><input type="text" value={this.state.nameEdit} onChange={this.nameEditHandler} placeholder="Username" className="login-input chng" /></td>
                                    
                                        <td>Email</td>
                                        <td><input type="email" value={this.state.emailEdit} onChange={this.emailEditHandler} placeholder="Email Address" className="login-input chng" /></td>
                                    </tr>
        
                                    <tr>
                                        <td>Country</td>
                                        <td><input type="text" value={this.state.countryEdit} onChange={this.countryEditHandler} placeholder="Country Name" className="login-input chng" /></td>
                        
                                        <td>City</td>
                                        <td><input type="text" value={this.state.cityEdit} onChange={this.cityEditHandler} placeholder="City Name" className="login-input chng" /></td>
                                    </tr>
                                    <tr>
                                        <td>Contact</td>
                                        <td><input type="number" value={this.state.contactEdit} onChange={this.contactEditHandler} placeholder="Contact" className="login-input chng" /></td>
                                    
                                        <td>Level</td>
                                        <td><select value={this.state.levelEdit} onChange={this.levelEditHandler} className="signup-select chng">
                                            {this.state.level_arr.map(i => {
                                                return (
                                                    <option value={i.level}>{i.level}</option>
                                                );
                                            })}
                                        </select><br /></td>
                                    </tr>

                                </table>

                    


                                <input type="submit" value="Submit" className="submit-btn submit-edit" />
                            </form>


                        }
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}
export default StudentMyProfile;