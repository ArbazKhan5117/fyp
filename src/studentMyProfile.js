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
            edited: 'no'
        }
       this.passwordHandler=this.passwordHandler.bind(this);
       this.passSubmitHandler=this.passSubmitHandler.bind(this);
       this.nameEditHandler=this.nameEditHandler.bind(this);
       this.contactEditHandler=this.contactEditHandler.bind(this);
       this.levelEditHandler=this.levelEditHandler.bind(this);
       this.emailEditHandler=this.emailEditHandler.bind(this);
       this.cityEditHandler=this.cityEditHandler.bind(this);
       this.countryEditHandler=this.countryEditHandler.bind(this);
       this.uploadProfile=this.uploadProfile.bind(this);
       this.profileHandler=this.profileHandler.bind(this);
       this.submitEditHandler=this.submitEditHandler.bind(this);
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
        ).then(res=>{
            //handle success
            if(res.data==='The image has been uploaded'){
                alert(res.data);
            }else{
                alert('This image has large pixels, please upload normal image');
            }
            
            console.log(res.data);
            //console.log(response.data.valid);
            
            console.log("success")
        });
            


    }

    passSubmitHandler(event){
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
            if(res.data.valid==='yes'){
                 this.setState({user_id: res.data.user_id});
                 this.setState({ nameEdit: res.data.name});
                 this.setState({ emailEdit: res.data.email });
                 this.setState({ contactEdit: res.data.contact });
                 this.setState({ levelEdit: res.data.level });
                 this.setState({profileNameEdit: res.data.profile});
                 this.setState({ cityEdit: res.data.city });
                 this.setState({countryEdit: res.data.country});
                 this.setState({ valid: res.data.valid });
            }
            else{
                alert(res.data.data);
            }
            
         }
        );
    }

    submitEditHandler(event){
        event.preventDefault();
        console.log(this.state.levelEdit);
        const fd = new FormData();
        //this.state.profileName === '' ? this.setState({finalName: this.state.profileNameEdit}) : this.setState({finalName: this.state.profileName});
        //console.log(this.state.profileName);
        if((this.state.profileName === this.state.profileNameEdit) || (this.state.profileName === '')){
            fd.append('profile', this.state.profileNameEdit);
        }else{
            fd.append('profile', this.state.profileName);
        }
        this.setState({finalName: this.state.profileName});
        console.log(this.state.finalName);
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
            if(res.data.edited==='yes'){
                this.setState({valid: res.data.valid});
                this.setState({edited: res.data.edited});
                this.setState({upload: 'yes'});
                 alert(res.data.data);
            }else{
                    alert(res.data.data);     
            }
            
         }
        );
    }

    render() {
        let username,email,level,contact,profile,user_id,city,country;
        if(this.state.edited === 'no'){
             username = this.props.location.state.username
             email= this.props.location.state.email;
             level= this.props.location.state.level;
             contact= this.props.location.state.contact;
             profile= this.props.location.state.profile;
             user_id=this.props.location.state.user_id;
             city= this.props.location.state.city;
             country=this.props.location.state.country;
        }else{
            username=this.state.nameEdit;
            email=this.state.emailEdit;
            level=this.state.levelEdit;
            contact=this.state.contactEdit;
            city=this.state.cityEdit;
            country=this.state.countryEdit;
            user_id=this.props.location.state.user_id;
           // profile=this.state.finalName;
           if((this.state.profileName === this.state.profileNameEdit) || (this.state.profileName === '')){
            profile=this.state.profileNameEdit;
        }else{
            profile=this.state.finalName;
        }
        }
        
        //this.setState({nameEdit: username});
        return (
            <div>
                
                <Header username={username} desig="Student" profile={profile}/>
                <Menu page="MyProfile" username={username} email={email} level={level} contact={contact}
                 profile={profile} user_id={user_id} city={city} country={country}/>
                <div className="studentMyProfile-class">
                    <div className="present-info">
                        <div className="profile">
                            <img src={'/uploads/'+ profile}></img>
                        </div>
                        <h4>Name: <spam className="infos">{username}</spam></h4>
                        <h4>Email: <spam className="infos">{email}</spam></h4>
                        <h4>Contact: <spam className="infos">{contact}</spam></h4>
                        <h4>Country: <spam className="infos">{country}</spam></h4>
                        <h4>City: <spam className="infos">{city}</spam></h4>
                        <h4>Level: <spam className="infos">{level}</spam></h4>
                       
                    </div>
                    
                    
                

                
                    <div className="edit-info">
                        <h2>Edit your Personal Information</h2>
                        {this.state.valid === 'no' ?
                            <form onSubmit={this.passSubmitHandler}>
                                <input type="text" value={this.state.email} onChange={this.emailHandler} placeholder="Enter your Email" className="" /><br />
                                <input type="password" value={this.state.password} onChange={this.passwordHandler} placeholder="Enter your Password" className="" /><br />
                                <input type="submit" value="Submit" className="submit-btn" />
                            </form>
                            :
                            <form onSubmit={this.submitEditHandler}>
                                 
                             
                                 <input type="file" name="profile" className="profile-input" onChange={this.profileHandler}/>
                                  {this.state.upload==='yes' ? '' : <button className="profile-label" onClick={this.uploadProfile}>Upload Profile:</button> }<br />
                                
                        
                                <input type="text" value={this.state.nameEdit} onChange={this.nameEditHandler} placeholder="Full Name" className="left-input" />
                                <input type="email" value={this.state.emailEdit} onChange={this.emailEditHandler} placeholder="Email Address" className="" /><br />
                                
                                <input type="text" value={this.state.countryEdit} onChange={this.countryEditHandler} placeholder="Country Name" className="left-input" />
                                <input type="text" value={this.state.cityEdit} onChange={this.cityEditHandler} placeholder="City Name" className="" /><br />
                                <input type="number" value={this.state.contactEdit} onChange={this.contactEditHandler} placeholder="Contact" className="left-input" />
                                <label className="level-label" >Select Level:</label>
                                <select value={this.state.levelEdit} onChange={this.levelEditHandler}>
                                    <option value='9th'>9th</option>
                                    <option value='10th'>10th</option>
                                    <option value='11th'>11th</option>
                                    <option value='12th'>12th</option>
                                </select><br />
                               
                                <input type="submit" value="Submit" className="submit-btn" />
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