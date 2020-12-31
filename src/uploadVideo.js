import React, { Component } from 'react';
import './css/uploadVideo.css';
import axios,{post} from 'axios';
class UploadVideo extends Component {
    constructor(props) {
        super(props);
        this.state={
            level: 'select',
            subject: 'null',
            topic: '',
            price: '',
            description: '',
            video: ''
        }
        this.levelHandler=this.levelHandler.bind(this);
        this.subjectHandler=this.subjectHandler.bind(this);
        this.topicHandler=this.topicHandler.bind(this);
        this.priceHandler=this.priceHandler.bind(this);
        this.videoHandler=this.videoHandler.bind(this);
        this.descripHandler=this.descripHandler.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
    }
    levelHandler=(event)=>{
        event.preventDefault();
        this.setState({level: event.target.value});
    }
    subjectHandler=(event)=>{
        event.preventDefault();
        this.setState({subject: event.target.value});
    }
    topicHandler=(event)=>{
        event.preventDefault();
        this.setState({topic: event.target.value});
    }
    priceHandler=(event)=>{
        event.preventDefault();
        this.setState({price: event.target.value});
    }
    videoHandler=(event)=>{
        /*let files=event.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=(event)=>{
            const url="http://localhost/Admissions/";
            const formData={file: event.target.result}
            return post(url, formData)
            .then(response=>console.warn("result", response))
        }*/
        event.preventDefault();
        this.setState({video: event.target.value});

    }
    descripHandler=(event)=>{
        event.preventDefault();
        this.setState({description: event.target.value});
    }
    submitHandler=(event)=>{
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div className="uploadVideo-class">
                <h2>Upload Video</h2>
                <form onSubmit={this.submitHandler}>
                <select className="form-selection" value={this.state.level} onChange={this.levelHandler}>
                    <option value='select'>Select Level of Lecture</option>
                    <option value='9th'>9th</option>
                    <option value='10th'>10th</option>
                    <option value='11th'>11th</option>
                    <option value='12th'>12th</option>
                </select><br />
                <select className="form-selection" value={this.state.subject} onChange={this.subjectHandler}>
                    <option value='null'>Select Subject</option>
                    <option value='Physics'>Physics</option>
                    <option value='Chemistry'>Chemistry</option>
                    <option value='Mathematics'>Mathematics</option>
                    <option value='Biology'>Biology</option>
                    <option value='Computer Science'>Computer Science</option>
                </select><br />
                <input type="text" value={this.state.topic} onChange={this.topicHandler} placeholder="Enter the topic No." className="form-input" /><br/>
                <input type="number" value={this.state.price} onChange={this.priceHandler} placeholder="Enter the price" className="form-input"/><br />
                <input type="file" value={this.state.video} onChange={this.videoHandler} placeholder="Choose file" className="form-input" id="myVideo"/><br />
                <textarea value={this.state.description} onChange={this.descripHandler} placeholder="Write some Description" className="form-input"></textarea><br />
                <input type="submit" value="Upload" className="upload-btn" />
                </form>
            </div>
        );
    }
}
export default UploadVideo;