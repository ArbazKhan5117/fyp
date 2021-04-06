import React, { Component } from 'react';
import './css/homeVideo.css';
import axios from 'axios';
import { Link } from "react-router-dom";
class HomeVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            topic: '',
            price: '',
            sortBy: 'rating',
            description: '',
            contentVideoName: '',
            contentVideoType: '',
            videoType: '',
            videoName: '',
            tutor: '',
            tutor_profile: '',
            lec_rating: '',
            data_arr: [],
            searchM: 'sub',
            searchSubject: '',
            searchTopic: null,
            searchTutor: '',
            topic_arr: [],
            topic_arr_index: 0,
            
            sorted_arr: []
        }
        this.getLectures('rating');
        this.subjectHandler = this.subjectHandler.bind(this);
        this.topicHandler = this.topicHandler.bind(this);
        this.tutorHandler = this.tutorHandler.bind(this);
        this.searchLecture = this.searchLecture.bind(this);
        this.sortingHandler = this.sortingHandler.bind(this);
    }
    getLectures = (order) => {
        const fd = new FormData();
        fd.append('level', this.props.level);
        fd.append('student_id', this.props.user_id);
        fd.append('order', order);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/fetchVideoLectures.php', fd, headers
        ).then(res => {
            this.setState({ data_arr: res.data });
            console.log(this.state.data_arr);
        }
        );

    }
    subjectHandler = (event) => {
        event.preventDefault();
        this.setState({ searchSubject: event.target.value });
    }
    topicHandler = (event) => {
        event.preventDefault();
        this.setState({ searchTopic: event.target.value });
        this.setState({ topic_arr: event.target.value.split(" ") });
        if(this.state.searchTopic && this.state.searchTutor){
            this.setState({ searchM: 'sub-topic-tutor' });
        }else{
            this.setState({ searchM: 'sub-topic' });
        }

    }
    tutorHandler = (event) => {
        event.preventDefault();
        this.setState({ searchTutor: event.target.value });
        if(this.state.searchTutor && this.state.searchTopic){
            this.setState({ searchM: 'sub-topic-tutor' });
        }else{
            this.setState({ searchM: 'sub-tutor' });
        }

    }
    sortingHandler = (event) => {
        event.preventDefault();
        this.setState({ sortBy: event.target.value });
        let order=event.target.value;
        this.getLectures(order);
    }
    searchLecture = (event) => {
        event.preventDefault();
        if (this.state.searchSubject) {
            this.state.topic_arr.forEach((i, key) => {
                {
                    if (i === 'of' || i === 'the' || i === 'is' || i === 'am' || i === 'has' || i === 'have' || i === 'was' || i === 'were' || i === 'been' || i === 'you' || i === 'will' || i === 'come' || i === 'had' || i === 'for' || i === 'to' || i === 'I' || i === 'i') {
                        this.state.topic_arr.splice(key, 1);
                    }
                }
            })
            console.log(this.state.sortBy);
            
            const fd = new FormData();
            fd.append('level', this.props.level);
            fd.append('subject', this.state.searchSubject);
            fd.append('topic', this.state.topic_arr);
            fd.append('tutor', this.state.searchTutor);
            fd.append('order', this.state.sortBy);
            fd.append('decision', this.state.searchM);
            fd.append('student_id', this.props.user_id);

            var headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }
            axios.post('http://localhost/fyp-backend/signup/searchVideoLecture.php', fd, headers
            ).then(res => {
                this.setState({ data_arr: res.data });
                this.setState({ searchSubject: '', searchTopic: '', searchTutor: '', searchM: 'sub' });
                console.log(res.data);
            }
            );




        } else {
            alert('Please select a subject of lecture');
        }


    }

    render() {



        return (
            <div className="homeInsideMain-class">
                <div className="homeInsideSearch-class">
                    <select className="form-selection login-select sort-by" onChange={this.sortingHandler} required>
                        <option value='rating'>Sort by</option>
                        <option value='rating'>Rating</option>
                        <option value='price'>Price</option>
                        <option value='sale_no'>Views</option>
    
                    </select><br />
                    <h2>Search Lecture</h2>
                    <form onSubmit={this.searchLecture}>
                        <select className="form-selection login-select" value={this.state.searchSubject} onChange={this.subjectHandler} required>
                            <option value=''>Select Subject</option>
                            <option value='Physics'>Physics</option>
                            <option value='Chemistry'>Chemistry</option>
                            <option value='Mathematics'>Mathematics</option>
                            <option value='Biology'>Biology</option>
                            <option value='English'>English</option>
                            <option value='Computer'>Computer</option>
                        </select><br />
                        <input type="text" value={this.state.searchTopic} onChange={this.topicHandler} placeholder="Topic Name. (Optional)" className="form-input login-input" /><br />
                        <input type="text" value={this.state.searchTutor} onChange={this.tutorHandler} placeholder="Tutor Name. (Optional)" className="form-input login-input" /><br />
                        <input type="submit" value="Search" className="upload-btn" />
                    </form>
                </div>
                <div className='homeInside-class'>
                    {this.state.data_arr.length === 0 ? <h2>No lecture matches with your search</h2> : ''}
                    {this.state.data_arr.map(i => {
                        return (
                            <div className='homeVideo-class'>
                                <Link to={{
                                    pathname: '/payment',
                                    state: {
                                        subject: i.subject,
                                        video_id: i.video_id,
                                        topic: i.topic,
                                        price: i.price,
                                        views: i.views,
                                        description: i.description,
                                        videoType: i.videoType,
                                        videoName: i.videoName,
                                        tutor: i.tutor,
                                        rank: i.rank,
                                        tutor_profile: i.tutor_profile,
                                        lec_rating: i.rating,
                                        username: this.props.username,
                                        profile: this.props.profile,
                                        level: this.props.level,
                                        student_id: this.props.user_id
                                    }
                                }}>
                                    <video width="240" height="100" controls >
                                        <source src={'/ContentVideo/' + i.contentVideoName} type={i.contentVideoType} />
                                    </video>
                                </Link>
                                <p>{i.subject}, topic:"<spam className="topic-class">{i.topic}</spam>" by {i.tutor}, {i.rating === null ? '' : `rating:${i.rating},`} views:'{i.views}' and Price: <spam className="price-p">${i.price}</spam></p>

                            </div>
                        );
                    })}
                </div>

            </div>
        );
    }
}
//export {vidId};
export default HomeVideo;