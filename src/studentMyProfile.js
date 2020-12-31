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
            edited: 'no'
        }
       this.passwordHandler=this.passwordHandler.bind(this);
       this.passSubmitHandler=this.passSubmitHandler.bind(this);
       this.nameEditHandler=this.nameEditHandler.bind(this);
       this.contactEditHandler=this.contactEditHandler.bind(this);
       this.levelEditHandler=this.levelEditHandler.bind(this);
       this.emailEditHandler=this.emailEditHandler.bind(this);
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
        let username,email,level,contact,profile,profileType;
        if(this.state.edited === 'no'){
             username = this.props.location.state.username
             email= this.props.location.state.email;
             level= this.props.location.state.level;
             contact= this.props.location.state.contact;
             profile= this.props.location.state.profile;
             profileType= this.props.location.state.profileType;
        }else{
            username=this.state.nameEdit;
            email=this.state.emailEdit;
            level=this.state.levelEdit;
            contact=this.state.contactEdit;
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
                <Menu page="MyProfile" username={username} email={email} level={level} contact={contact} profile={profile}/>
                <div className="studentMyProfile-class">
                    <div className="present-info">
                        <div className="profile">
                            <img src={'/uploads/'+ profile}></img>
                        </div>
                        <h4>Name:</h4>
                        <h5 className="infos">{username}</h5>
                        <h4>Level:</h4>
                        <h5 className="infos">{level}</h5>
                        <h4>Contact:</h4>
                        <h5 className="infos">{contact}</h5>
                        <h4>Email:</h4>
                        <h5 className="infos">{email}</h5>
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
                                
                        
                                <input type="text" value={this.state.nameEdit} onChange={this.nameEditHandler} placeholder="Full Name" className="" /><br />
                                <input type="number" value={this.state.contactEdit} onChange={this.contactEditHandler} placeholder="Contact" className="" /><br />
                                <input type="email" value={this.state.emailEdit} onChange={this.emailEditHandler} placeholder="Email Address" className="" /><br />
                                <label className="level-label" >Select Level:</label>
                                <select value={this.state.levelEdit} onChange={this.levelEditHandler}>
                                    <option value='9th'>9th</option>
                                    <option value='10th'>10th</option>
                                    <option value='11th'>11th</option>
                                    <option value='12th'>12th</option>
                                </select><br /><br />
                               
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