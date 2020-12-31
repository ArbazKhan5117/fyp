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
        console.log(username);
        return (
            <div>
                <Header username={username} desig="Tutor" />
                <TutorMenu page="Home" />
                <div className="tutorHome-class">
                    <UploadVideo />
                </div>
                <Footer />
            </div>
        );
    }
}
export default TutorHome;