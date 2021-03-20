import React, { Component } from 'react';
import axios, { post } from 'axios';
import './css/accessVideo.css';
class EditVideoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_id: this.props.video_id,
            level: this.props.level,
            subject: this.props.subject,
            topic: this.props.topic,
            price: this.props.price,
            description: this.props.description

        };
        this.levelHandler = this.levelHandler.bind(this);
        this.subjectHandler = this.subjectHandler.bind(this);
        this.topicHandler = this.topicHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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
    descriptionHandler = (event) => {
        event.preventDefault();
        this.setState({ description: event.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.level) {
            if (this.state.subject) {

                const fd = new FormData();
                fd.append('video_id', this.props.video_id);
                fd.append('level', this.state.level);
                fd.append('subject', this.state.subject);
                fd.append('topic', this.state.topic);
                fd.append('price', this.state.price);
                fd.append('description', this.state.description);
                var headers = {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                }
                axios.post('http://localhost/fyp-backend/signup/updateVideoLectureInformation.php', fd, headers
                ).then(res => {
                        alert(res.data.data);
                        
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
            <div className="editVideo-class">
                <h3>Edit your lecture's Information</h3>
                <form onSubmit={this.submitHandler}>
                    <table className="customers">

                        <tr>
                            <td>Level:</td>
                            <td><select value={this.state.level} onChange={this.levelHandler} className="signup-select">
                                <option value='9th'>9th</option>
                                <option value='10th'>10th</option>
                                <option value='11th'>11th</option>
                                <option value='12th'>12th</option>
                            </select><br /></td>
                        </tr>
                        <tr>
                            <td>Subject</td>
                            <td><select value={this.state.subject} onChange={this.subjectHandler} className="signup-select">
                                <option value='Physics'>Physics</option>
                                <option value='Chemistry'>Chemistry</option>
                                <option value='Biology'>Biology</option>
                                <option value='Mathematics'>Mathematics</option>
                                <option value='Computer'>Computer</option>
                                <option value='English'>English</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td>Topic</td>
                            <td><input type="number" value={this.state.topic} onChange={this.topicHandler} placeholder="Contact" className="login-input" required/></td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td><input type="text" value={this.state.price} onChange={this.priceHandler} placeholder="Country Name" className="login-input" required/></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea value={this.state.description} onChange={this.descriptionHandler} placeholder="Write some Description" className="form-input login-input-dr" required></textarea></td>
                        </tr>


                    </table>


                    <input type="submit" value="Submit" className="submit-btn" />

                </form>

            </div>
        );
    }
}
export default EditVideoInfo;