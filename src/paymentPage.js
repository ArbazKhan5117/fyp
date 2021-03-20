import React, { Component } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import StripeContainer from "./Stripe/StripeContainer.js";
import './css/paymentPage.css';
class PaymentPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const price = this.props.location.state.price;
        const video_id = this.props.location.state.video_id;
        const student_id = this.props.location.state.student_id;
        const username = this.props.location.state.username;
        const profile = this.props.location.state.profile;
        const description = this.props.location.state.description;
        const subject = this.props.location.state.subject;
        const topic = this.props.location.state.topic;
        const level = this.props.location.state.level;
        const videoName = this.props.location.state.videoName;
        const videoType = this.props.location.state.videoType;
        const lec_rating = this.props.location.state.lec_rating;
        const tutor = this.props.location.state.tutor;
        const tutor_profile = this.props.location.state.tutor_profile;
        return (
            <div>
                <Header username={username} desig="Student" profile={profile} />
                <div className="paymentPage-class">
                    <div className="contentVideo-class">
                        <div className="absoluteVideoDiv-class">
                            <h2>Pay to get access the lecture</h2>
                            <StripeContainer price={price} video_id={video_id} videoName={videoName}
                             videoType={videoType} student_id={student_id} tutor={tutor}/>
                        </div>
                        <h2>Video Lecture</h2>
                        <video width="540" height="350" controls>
                            <source src={'/VideoLectures/' + videoName} type={videoType} />
                        </video>
                    </div>
                    <div className="videoInfo-class">
                        <div className="profile">
                            <img src={'/uploads/' + tutor_profile}></img>

                        </div>
                        <h4>Tutor: {tutor}</h4>
                        <table className="customers">
                            <tr>
                                <td>Level</td>
                                <td>{level}</td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td>{subject}</td>
                            </tr>
                            <tr>
                                <td>Topic</td>
                                <td>{topic}</td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td>{lec_rating}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{price}</td>
                            </tr>
                        </table>

                    </div>
                </div>
                
                <Footer />
            </div>
        );

    }
}
export default PaymentPage;