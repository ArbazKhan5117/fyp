import React, { Component } from 'react';
import axios from 'axios';
import Menu from './menu.js';
import Header from './header.js';
import Footer from './footer.js';
import PlayVideo from './playVideo.js';
import Review from './review.js';
import './css/studentDashboard.css';
class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.location.state.user_id, 10),
            index: 0,
            isPressed: 'no',
            video_arr: [],
            isreviewed: 'no',
            goToReview: 'no',
            backFromReview: 'no',
            reviewVal: 0
        }
        this.fetchLectures();
        this.handleReviewBtn = this.handleReviewBtn.bind(this);
        this.backFromReview = this.backFromReview.bind(this);
        this.setReviewValue = this.setReviewValue.bind(this);
        this.setRating=this.setRating.bind(this);
    };
    handleReviewBtn = () => {
        this.setState({ isreviewed: 'yes' });
        this.setState({ goToReview: 'yes' });
        this.setState({ backFromReview: 'yes' });
    }
    setReviewValue = (event, val) => {
        event.preventDefault();
        this.setState({ reviewVal: val });
    }
    backFromReview = () => {
        this.setState({ goToReview: 'no' });
        this.setState({ backFromReview: 'no' });
        alert(`You give  ${this.state.reviewVal} rating to this lecture`);
        this.setRating();
    }
    setRating = () => {
        const fd = new FormData();
        fd.append('student_id', this.state.user_id);
        fd.append('video_id', this.state.video_arr[this.state.index].video_id);
        fd.append('rate', parseFloat(this.state.reviewVal));
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateRating.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            this.fetchLectures();
        });
    }
    fetchLectures() {
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/studentDashboard.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ video_arr: res.data });
            console.log(res.data);
        }
        );
    }
    playVideo(key) {
        this.setState({ index: key, isPressed: 'yes' });
    }
    closeVideo() {
        this.setState({ index: 0, isPressed: 'no', isreviewed: 'no' });
    }
    componentDidMount() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    render() {
        let username = this.props.location.state.username;
        let profile = this.props.location.state.profile;
        let email = this.props.location.state.email;
        let level = this.props.location.state.level;
        let contact = this.props.location.state.contact;
        let user_id = this.props.location.state.user_id;
        let city = this.props.location.state.city;
        let country = this.props.location.state.country;
        let id = parseInt(user_id, 10);
        let count = 0;
        return (
            <div>
                <Header username={username} desig="Student" profile={profile} />
                <Menu page="Library" username={username} email={email} level={level} contact={contact}
                    profile={profile} user_id={user_id} city={city} country={country} />
                <table className="customers">
                    <tr>
                        <th className="sr-th">Sr.No</th>
                        <th className="lvl-th">Level</th>
                        <th className="sub-th">Subject</th>
                        <th className="topic-th">Topic</th>
                        <th className="tut-th">Tutor Name</th>
                        <th className="btn-th">Lecture</th>
                    </tr>
                </table>
                <div className="studentDashboard-class">
                    {this.state.video_arr.length === 0 ? <h2>Your dashboard is empty</h2> : ''}
                    <table className="customers">

                        {this.state.video_arr.map((i, key) => {
                            return (
                                <tr>
                                    <td className="sr-td">{key + 1}</td>
                                    <td className="lvl-td">{i.level}</td>
                                    <td className="sub-td">{i.subject}</td>
                                    <td className="topic-td">{i.topic}</td>
                                    <td className="tut-td">{i.tutor}</td>
                                    <td className="btn-td"><button className="play-btn" onClick={() => this.playVideo(key)}>Play</button></td>
                                </tr>
                            );
                        })}
                    </table>

                </div>
                <Footer />

                {this.state.isPressed === 'yes' ? <PlayVideo videoName={this.state.video_arr[this.state.index].videoName} videoType={this.state.video_arr[this.state.index].videoType} type='video' /> : ''}
                {this.state.isPressed === 'yes' ? <button className="tutorStop-btn" onClick={() => this.closeVideo()}>Close</button> : ''}
                {this.state.isPressed === 'yes' && this.state.video_arr[this.state.index].rate_status === null && this.state.isreviewed === 'no' ? <button className="studentDashboard-class-button" onClick={this.handleReviewBtn}>Click to Rate it</button> : ''}
                {this.state.goToReview === 'yes' ? <Review reviewValue={this.setReviewValue} class='studentDashboardReview-class' /> : ''}
                {this.state.backFromReview === 'yes' ? <button className="studentDashboard-class-button-bk" onClick={this.backFromReview}>Submit</button> : ''}
            </div>
        );
    }
}
export default StudentDashboard;