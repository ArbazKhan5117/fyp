import React, { Component } from 'react';
import './css/uploadVideo.css';
import axios, { post } from 'axios';
class UploadVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: '',
            subject: '',
            topic: '',
            price: '',
            description: '',
            contentVideo: '',
            contentVideoName: '',
            contentVideoType: '',
            uploading: 'no',
            videoUploading: 'no',
            video: '',
            videoType: '',
            videoName: ''

        }
        this.levelHandler = this.levelHandler.bind(this);
        this.subjectHandler = this.subjectHandler.bind(this);
        this.topicHandler = this.topicHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.videoHandler = this.videoHandler.bind(this);
        this.contentVideoHandler = this.contentVideoHandler.bind(this);
        this.descripHandler = this.descripHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.uploadVideoContent = this.uploadVideoContent.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
    }
    levelHandler = (event) => {
        event.preventDefault();
        this.setState({ level: event.target.value });

    }
    subjectHandler = (event) => {
        event.preventDefault();
        this.setState({ subject: event.target.value });
    }
    topicHandler = (event) => {
        event.preventDefault();
        this.setState({ topic: event.target.value });
    }
    priceHandler = (event) => {
        event.preventDefault();
        this.setState({ price: event.target.value });

    }
    contentVideoHandler = (event) => {
        event.preventDefault();
        this.setState({
            contentVideo: event.target.files[0], contentVideoName: event.target.files[0].name, contentVideoType:
                event.target.files[0].type
        });
    }
    uploadVideoContent = (event) => {
        event.preventDefault();
        if (this.state.contentVideo) {
            this.setState({ uploading: 'yes' });
            const fd = new FormData();
            fd.append('fileToUpload', this.state.contentVideo, this.state.contentVideoName);
            var headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
            var self = this;
            axios.post('http://localhost/fyp-backend/signup/uploadContentVideo.php', fd, headers
            ).then(function (response) {
                //handle success
                alert(response.data);
                self.setState({ uploading: 'no' });
                console.log(response.data);

            })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    console.log("sorry");
                });
        } else {
            alert('Please select a contentvideo from your device');
        }


    }
    videoHandler = (event) => {
        event.preventDefault();
        this.setState({
            video: event.target.files[0], videoName: event.target.files[0].name, videoType:
                event.target.files[0].type
        });

    }
    uploadVideo = (event) => {
        event.preventDefault();
        if (this.state.video) {
            this.setState({ videoUploading: 'yes' });
            const fd = new FormData();
            fd.append('fileToUpload', this.state.video, this.state.videoName);
            var headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
            var self = this;
            axios.post('http://localhost/fyp-backend/signup/uploadVideoLecture.php', fd, headers
            ).then(function (response) {
                //handle success
                alert(response.data);
                self.setState({ videoUploading: 'no' });
                console.log(response.data);

            })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    console.log("sorry");
                });
        } else {
            alert('Please select a video lecture from your device');
        }

    }
    descripHandler = (event) => {
        event.preventDefault();
        this.setState({ description: event.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.level) {
            if (this.state.subject) {

                const fd = new FormData();
                fd.append('user_id', this.props.user_id);
                fd.append('level', this.state.level);
                fd.append('subject', this.state.subject);
                fd.append('topic', this.state.topic);
                fd.append('price', this.state.price);
                fd.append('description', this.state.description);
                fd.append('contentVideoName', this.state.contentVideoName);
                fd.append('contentVideoType', this.state.contentVideoType);
                fd.append('videoName', this.state.videoName);
                fd.append('videoType', this.state.videoType);
                var headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.post('http://localhost/fyp-backend/signup/saveVideoLecInDatabase.php', fd, headers
                ).then(res => {
                        alert(res.data.data);
                        this.setState({level: '', subject: '', topic: '', price: '', description: '', contentVideoName: '', contentVideoType: '', videoName: '', videoType: ''})
                }
                );




            } else {
                alert('Please select a subject of lecture');
            }
        } else {
            alert('Please select a level of lecture');
        }

    }
    render() {
        return (
            <div className="uploadVideo-class">
                <h2>Upload Video Lecture</h2>
                
                <form onSubmit={this.submitHandler}>
                    <table className="customers">

                        <tr>
                            <td><select className="form-selection login-select" value={this.state.level} onChange={this.levelHandler} required>
                                <option value=''>Select Level of Lecture</option>
                                <option value='9th'>9th</option>
                                <option value='10th'>10th</option>
                                <option value='11th'>11th</option>
                                <option value='12th'>12th</option>
                            </select></td>
                            <td><select className="form-selection login-select" value={this.state.subject} onChange={this.subjectHandler} required>
                                <option value=''>Select Subject</option>
                                <option value='Physics'>Physics</option>
                                <option value='Chemistry'>Chemistry</option>
                                <option value='Mathematics'>Mathematics</option>
                                <option value='Biology'>Biology</option>
                                <option value='English'>English</option>
                                <option value='Computer'>Computer</option>
                            </select></td>
                        </tr>
                        <tr>
                        <td> <input type="text" value={this.state.topic} onChange={this.topicHandler} placeholder="Enter the Topic Name." className="form-input login-input" required /></td>
                        <td><input type="number" value={this.state.price} onChange={this.priceHandler} placeholder="Enter the price in $(USD)" className="form-input login-input" required /></td>
                        </tr>
                        <tr>
                            <td>Description of Lecture</td>
                            <td><textarea value={this.state.description} onChange={this.descripHandler} placeholder="Write some Description" className="form-input login-input-dr" required></textarea></td>
                        </tr>
                        <tr>
                            <td>Select Content Video (max 30 sec)</td>
                            <td> <input type="file" onChange={this.contentVideoHandler} placeholder="Choose video" className="form-input" required />

                            <input type="submit" value="Upload" onClick={this.uploadVideoContent} className="uploadContent-btn" /></td>
                        </tr>
                        <tr>
                            <td>Select Complete Video Lecture</td>
                            <td> <input type="file" onChange={this.videoHandler} placeholder="Choose video" className="form-input" required />
                            <input type="submit" value="Upload" onClick={this.uploadVideo} className="uploadContent-btn" /></td>
                        </tr>
                        
                    </table>


                    <input type="submit" value="Upload" className="upload-btn" />
                </form>

                <img className={this.state.uploading === 'yes' ? "onupload" : "uploadIcon"} src={'assets/uploadingIcon.png'} />
                <img className={this.state.videoUploading === 'yes' ? "onuploadVideo" : "uploadIconVideo"} src={'assets/uploadingIcon.png'} />
            </div>
        );
    }
}
export default UploadVideo;