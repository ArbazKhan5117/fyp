import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Review from './review.js';
import './css/accessVideo.css';
class AccessVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreviewed: this.props.reviewStatus,
            goToReview: 'no',
            backFromReview: 'no',
            reviewVal: 0
        }
        this.studentDashboard();
        this.handleReviewBtn=this.handleReviewBtn.bind(this);
        this.backFromReview=this.backFromReview.bind(this);
        this.setReviewValue=this.setReviewValue.bind(this);
        this.setRating=this.setRating.bind(this);
    };
    handleReviewBtn = () => {
        this.setState({isreviewed: 'yes'});
        this.setState({goToReview: 'yes'});
        this.setState({backFromReview: 'yes'});
    }
    backFromReview = () => {
        this.setState({goToReview: 'no'});
        this.setState({backFromReview: 'no'});
        alert(`You give  ${this.state.reviewVal} rating to this lecture`);
        this.setRating();
    }
    setReviewValue=(event, val) => {
        event.preventDefault();
        this.setState({reviewVal: val});
      }
    studentDashboard = () => {
        const fd = new FormData();

        fd.append('student_id', this.props.student_id);
        fd.append('video_id', this.props.video_id);
        fd.append('price', parseFloat(this.props.price));
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateStudentDashboard.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            //handle success
            if (res.data.data === 'This video lecture is added in your library') {
                alert(res.data.data);
            } else {
                console.log('Error in inserting data in student library');
            }

            console.log(res.data);
            //console.log(response.data.valid);

            console.log("success")
        });
    }
    setRating = () => {
        const fd = new FormData();
        fd.append('student_id', this.props.student_id);
        fd.append('video_id', this.props.video_id);
        fd.append('rate', parseFloat(this.state.reviewVal));
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateRating.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            
        });
    }

    /*componentDidMount() {
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
      }*/
    render() {
        return (
            <div>
            <div className='accessVideo-class'>
                <ReactPlayer
                    url={[{ src: '/VideoLectures/' + this.props.videoName, type: this.props.videoType }]} // video location
                    controls  // gives the front end video controls 
                    width='540px'
                    height='350px'
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload'  //<- this is the important bit
                            }
                        }
                    }}
                    onMouseDown={this.handleMouseDown}
                    
                    onEnded={() => this.onEnded()}
                />
                
            </div>
            {this.state.isreviewed === 'no' ? <button className="accessVideo-class-button" onClick={this.handleReviewBtn}>Click to Rate it</button> : ''}
            {this.state.goToReview === 'yes' ? <Review reviewValue={this.setReviewValue} class='accessVideoReview-class'/> : ''}
            {this.state.backFromReview === 'yes' ? <button className="accessVideo-class-button-bk" onClick={this.backFromReview}>Submit</button> : ''}
            </div>
        );
    }
}
export default AccessVideo;