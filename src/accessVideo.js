import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './css/accessVideo.css';
class AccessVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.studentDashboard();
    };
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
    componentDidMount() {
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
      }
    render() {
        return (
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
        );
    }
}
export default AccessVideo;