import React, { Component } from 'react';
import axios from 'axios';
import './css/home.css';
import TutorMenu from './tutorMenu.js';
import Header from './header.js';
import UploadVideo from './uploadVideo.js';
import Footer from './footer.js';
class TutorHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            user_id: parseInt(this.props.location.state.user_id, 10),
            notifications: [],
            clickCheck: 'no'
        };
        this.handleNotify=this.handleNotify.bind(this);
        this.handleCloseNotify=this.handleCloseNotify.bind(this);
    }
    handleCloseNotify = (event) => {
        event.preventDefault();
        this.setState({clickCheck: 'not'});
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateNotifications.php', fdup, headers
        ).then(res => {
            
        }
        );

    }
    handleNotify = (event) => {
        event.preventDefault();
        this.setState({clickCheck: 'yes'});
    }
    componentDidMount = () => {
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/checkNotifications.php', fdup, headers
        ).then(res => {
            console.log(res.data);
            this.setState({ notifications: res.data });
        }
        );
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
                {this.state.notifications.length && this.state.clickCheck === 'no' ? 
                 <button className="notifyBtn" onClick={this.handleNotify}>Notifications: <spam className="notifyNum">{this.state.notifications.length}</spam></button> : ''
                }
                {this.state.clickCheck === 'yes' ?
                <div className="notifyList">
                    {this.state.notifications.map((i,key)=>{
                        return(
                            <div className="notifyExp">
                                <p>[{key+1}]: <spam className="notifyNum">{i.bad_rating}</spam> bad reviews are given on your video "<spam className="notifyNum">{i.topic}</spam>", that can reduce your ranking. So, find your lack and try to resolve it.</p>
                            </div>
                        )
                    })}

                </div> : ''
                }
                {this.state.clickCheck === 'yes' ?
                <button className="notifyBtn" onClick={this.handleCloseNotify}>Close Notifications</button> : ''
                }
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