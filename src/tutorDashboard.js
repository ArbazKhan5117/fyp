import React, { Component } from 'react';
import axios from 'axios';
import TutorMenu from './tutorMenu.js';
import Header from './header.js';
import Footer from './footer.js';
import PlayVideo from './playVideo.js';
import EditVideoInfo from './editVideoInfo';
import './css/studentDashboard.css';
class TutorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.location.state.user_id, 10),
            index: 0,
            isPressedVideo: 'no',
            isPressedContent: 'no',
            isPressedEdit: 'no',
            video_arr: []
        }
        this.fetchLectures();
    };
    fetchLectures() {
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/tutorDashboard.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ video_arr: res.data });
        }
        );
    }
    playVideo(key){
        this.setState({index: key,isPressedVideo: 'yes'});
    }
    playContent(key){
        this.setState({index: key,isPressedContent: 'yes'});
    }
    editVideo(key){
        this.setState({index: key,isPressedEdit: 'yes'});
    }
    deleteVideo(key){
        const fd = new FormData();
                fd.append('video_id', this.state.video_arr[key].video_id);
                var headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.post('http://localhost/fyp-backend/signup/deleteVideoLecture.php', fd, headers
                ).then(res => {
                        alert(res.data.data);
                        this.fetchLectures();
                        
                }
                );
    }
    closeVideo(){
        this.setState({index: 0,isPressedVideo: 'no',isPressedContent: 'no',isPressedEdit: 'no',isPressedDelete: 'no'});
        this.fetchLectures();
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
        let id = parseInt(user_id, 10);
        let count=0;
        return (
            <div>
                <Header username={username} desig="Tutor" profile={profile} />
                <TutorMenu page="Uploads" username={username} contact={contact} email={email} subject={subject} 
                education={education} profile={profile} city={city} country={country} user_id={user_id}/>
                <div className="Tutor-dashboard">
                   
                
                <div className="video-description-class">
                    <table className="customers">
                        <tr>
                            <th className="srTut-th">Sr.No</th>
                            <th className="lvlTut-th">Level</th>
                            <th className="subTut-th">Subject</th>
                            <th className="topicTut-th">Topic</th>
                            <th className="saleTut-th">No. Sale</th>
                            <th className="btnTut-th">Cont_Video</th>
                            <th className="btnTut-th">Lec_Video</th>
                            <th className="btnEdit-th">Edit</th>
                            <th className="btnDelete-th">Delete</th>
                        </tr>
                        </table>
                    <div className="studentDashboard-class">
                        {this.state.video_arr.length === 0 ? <h2>Your dashboard is empty</h2> : ''}
                        <table className="customers">
                        
                        {this.state.video_arr.map((i,key) => {
                            return (
                                <tr>
                                    <td className="srTut-td">{key+1}</td>
                                    <td className="lvlTut-td">{i.level}</td>
                                    <td className="subTut-td">{i.subject}</td>
                                    <td className="topicTut-td">{i.topic}</td>
                                    <td className="saleTut-td">{i.sale}</td>
                                    <td className="btnTut-td"><button className="playTut-btn" onClick={()=> this.playContent(key)}>Play</button></td>
                                    <td className="btnTut-td"><button className="playTut-btn" onClick={()=> this.playVideo(key)}>Play</button></td>
                                    <td className="btnEdit-td"><button className="playTut-btn" onClick={()=> this.editVideo(key)}>Edit</button></td>
                                    <td className="btnDelete-td"><button className="playTut-btn" onClick={()=> this.deleteVideo(key)}>Delete</button></td>
                                </tr>
                            );
                        })}
                         </table>
                    
                     </div>
                </div>
                </div>
                <Footer />
                {this.state.isPressedVideo === 'yes' ? <PlayVideo videoName={this.state.video_arr[this.state.index].videoName} videoType={this.state.video_arr[this.state.index].videoType} type='video'/> : ''}
                {this.state.isPressedContent === 'yes' ? <PlayVideo videoName={this.state.video_arr[this.state.index].contentVideoName} videoType={this.state.video_arr[this.state.index].contentVideoType} type='content'/> : ''}
                {this.state.isPressedEdit === 'yes' ? <EditVideoInfo level={this.state.video_arr[this.state.index].level} subject={this.state.video_arr[this.state.index].subject} topic={this.state.video_arr[this.state.index].topic}
                 description={this.state.video_arr[this.state.index].description} price={this.state.video_arr[this.state.index].price} video_id={this.state.video_arr[this.state.index].video_id}/> : ''}
                {this.state.isPressedVideo === 'yes' || this.state.isPressedContent === 'yes' || this.state.isPressedEdit === 'yes' ? <button className="tutorStop-btn" onClick={()=> this.closeVideo()}>Close</button> : ''}
            </div>
        );
    }
}
export default TutorDashboard;