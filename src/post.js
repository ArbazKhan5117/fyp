import React, { Component } from 'react';
import Header from './header.js';
import Menu from './menu.js';
import Footer from './footer.js';
import axios from 'axios';
import './css/post.css';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.location.state.user_id, 10),
            myPost: '',
            post_id: 1,
            poster_post: '',
            poster_profile: '',
            poster_name: '',
            n_turn: 'next',
            p_turn: 'pre',
            l_turn: 'last',
            is_last: 'yes',
            last_post_id: 0
        }
        this.myPostHandler=this.myPostHandler.bind(this);
        this.submitMyPost=this.submitMyPost.bind(this);
        this.otherPosts=this.otherPosts.bind(this);
        this.otherPosts(this.state.l_turn);
    }
    myPostHandler = (event) => {
        event.preventDefault();
        this.setState({ myPost: event.target.value });
    }
    submitMyPost= (event) =>{
        event.preventDefault();
        console.log(this.state.user_id);
        const fd = new FormData();
        fd.append('user_id', this.state.user_id)
        fd.append('mypost', this.state.myPost);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/postMyProblem.php', fd, headers
        ).then(res => {
            console.log(res);
            alert(res.data.msg);
        }
        );
    }
    otherPosts= (turn) =>{
        const fd = new FormData();
        fd.append('post_id', this.state.post_id);
        fd.append('turn', turn);
        fd.append('count', this.state.count);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/showOtherPosts.php', fd, headers
        ).then(res => {
            this.setState({post_id: res.data.post_id});
            this.setState({poster_post: res.data.post});
            this.setState({poster_profile: res.data.profile});
            this.setState({poster_name: res.data.name});
            this.setState({is_last: res.data.is_last});
            if(res.data.is_last==='yes'){
                this.setState({last_post_id: res.data.post_id});
            }
            console.log(res.data.post_id);
            console.log(res.data.name);
            console.log(res.data.profile);
            console.log(res.data.post);
        }
        );
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
        return (
            <div>
                <Header username={username} desig="Student" profile={profile} />
                <Menu page="Post" username={username} email={email} level={level} contact={contact}
                    profile={profile} user_id={user_id} city={city} country={country} />
                <div className="post-class">
                    <div className="my-post">
                        <h2>Post your Problem</h2>
                        <textarea value={this.state.myPost} onChange={this.myPostHandler}
                            placeholder="Write your query" className="myPost-input"></textarea><br />
                        <input type="submit" value="Post" onClick={this.submitMyPost} className="upload-btn" /><br /><br />
                        <input type="submit" value="My Posts" className="pre-posts-btn" />
                    </div>
                    <div className="other-posts">
                        <h2>Posts</h2>
                        <div className="posts-frame">
                            <div className="poster-profile">
                                <img src={'/uploads/' + this.state.poster_profile} />
                            </div>
                            <p>{this.state.poster_name}</p>
                            <textarea value={this.state.poster_post} onChange={this.myPostHandler}
                                placeholder="Others questions" className="othersPost-input"></textarea><br />
                            <div className="my-answer">
                                <div className="my-profile">
                                    <img src={'/uploads/' + profile} />
                                </div>

                                <textarea value={this.state.myPost} onChange={this.myPostHandler}
                                    placeholder="Write your answer..." className="yourAnswer-input"></textarea><br />
                            </div>
                            <input type="submit" value="Upload " className="ans-upload-btn"/>
                        </div>
                        {this.state.is_last === 'yes' || this.state.last_post_id ===this.state.post_id ? '' : <input type="submit" value="Previos" onClick={this.otherPosts.bind(this,this.state.p_turn)} className="pre-btn" />}
                       
                        <input type="submit" value=" Next " onClick={this.otherPosts.bind(this,this.state.n_turn)} className="next-btn" />
                    </div>
                    <div className="answers">
                        <h2>Answers</h2>
                        <div className="posts-frame">
                            <div className="poster-profile">
                                <img src={'/uploads/' + profile} />
                            </div>
                            <p>{username}</p>
                            <textarea onChange={this.myPostHandler}
                                placeholder="Others answers" className="othersPost-input"></textarea><br />
                        </div>

                        <div className="posts-frame">
                            <div className="poster-profile">
                                <img src={'/uploads/' + profile} />
                            </div>
                            <p>{username}</p>
                            <textarea onChange={this.myPostHandler}
                                placeholder="Others answers" className="othersPost-input"></textarea><br />
                        </div>

                        <div className="posts-frame">
                            <div className="poster-profile">
                                <img src={'/uploads/' + profile} />
                            </div>
                            <p>{username}</p>
                            <textarea onChange={this.myPostHandler}
                                placeholder="Others answers" className="othersPost-input"></textarea><br />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Post; 