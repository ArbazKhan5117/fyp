import React, { Component } from 'react';
import './css/home.css';
import TutorMenu from './tutorMenu.js';
import Header from './header.js';
import UploadVideo from './uploadVideo.js';
import Footer from './footer.js';
class TutorHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const username = this.props.location.state.username;
        const contact = this.props.location.state.contact;
        const email = this.props.location.state.email;
        const subject = this.props.location.state.subject;
        const education = this.props.location.state.education;
        const profile = this.props.location.state.profile;
        const city = this.props.location.state.city;
        const country = this.props.location.state.country;
        const user_id = this.props.location.state.user_id;
        
        return (
            <div>
                <Header username={username} desig="Tutor" profile={profile}/>
                <TutorMenu page="Home" username={username} contact={contact} email={email} subject={subject} 
                education={education} profile={profile} city={city} country={country} user_id={user_id}/>
                <div className="tutorHome-class">
                    <UploadVideo user_id={user_id}/>
                </div>
                <Footer />
            </div>
        );
    }
}
export default TutorHome;