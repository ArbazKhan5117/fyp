import React, { Component } from 'react';
import Header from './header.js';
import Menu from './menu.js';
import TutorMenu from './tutorMenu';
import Footer from './footer.js';
import axios from 'axios';
import './css/post.css';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.location.state.user_id, 10),
            myPost: '',
            post_id: 22,
            poster_post: '',
            poster_profile: '',
            poster_name: '',
            n_turn: 'next',
            p_turn: 'pre',
            l_turn: 'last',
            is_last: 'yes',
            last_post_id: 0,
            myAns: '',
            otherAns: [],
            check_MyPosts: 'no',
            myAllPosts: [],
            myPrePost: '',
            myPrePost_Index: 0
        }
        this.myPostHandler = this.myPostHandler.bind(this);
        this.submitMyPost = this.submitMyPost.bind(this);
        this.otherPosts = this.otherPosts.bind(this);
        this.myAnsHandler = this.myAnsHandler.bind(this);
        this.submitMyAns = this.submitMyAns.bind(this);
        this.submitMyPostAns = this.submitMyPostAns.bind(this);
        this.otherAns = this.otherAns.bind(this);
        this.backToPosts = this.backToPosts.bind(this);
        this.showMyPosts = this.showMyPosts.bind(this);
        this.showMyPrePost = this.showMyPrePost.bind(this);
        this.otherPosts(this.state.l_turn, this.state.post_id);
    }
    myPostHandler = (event) => {
        event.preventDefault();
        this.setState({ myPost: event.target.value });
    }
    myAnsHandler = (event) => {
        event.preventDefault();
        this.setState({ myAns: event.target.value });
    }
    submitMyPost = (event) => {
        event.preventDefault();
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
            this.otherPosts(this.state.l_turn, 22);
            this.setState({myPost: ''});
        }
        );
    }
    submitMyAns = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('user_id', this.state.user_id)
        fd.append('answer', this.state.myAns);
        fd.append('post_id', this.state.post_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/uploadMyAns.php', fd, headers
        ).then(res => {
            console.log(res);
            this.otherAns(this.state.post_id);
            this.setState({myAns: ''});
        }
        );

    }
    submitMyPostAns = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('user_id', this.state.user_id)
        fd.append('answer', this.state.myAns);
        fd.append('post_id', this.state.myAllPosts[this.state.myPrePost_Index].post_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/uploadMyAns.php', fd, headers
        ).then(res => {
            this.otherAns(this.state.myAllPosts[this.state.myPrePost_Index].post_id);
            this.setState({myAns: ''});
        }
        );

    }
    otherAns = (post_id) => {
        const fd = new FormData();
        fd.append('post_id', post_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/showOtherAnswers.php', fd, headers
        ).then(res => {
            this.setState({ otherAns: res.data })
        }
        );
    }
    otherPosts = (turn, post_id) => {
        const fd = new FormData();
        fd.append('post_id', post_id);
        fd.append('turn', turn);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/showOtherPosts.php', fd, headers
        ).then(res => {
            this.setState({ post_id: res.data.post_id });
            this.setState({ poster_post: res.data.post });
            this.setState({ poster_profile: res.data.profile });
            this.setState({ poster_name: res.data.name });
            this.setState({ is_last: res.data.is_last });
            if (res.data.is_last === 'yes') {
                this.setState({ last_post_id: res.data.post_id });
            }
            this.otherAns(res.data.post_id);
        }
        );

    }

    showMyPosts = (event) => {
        event.preventDefault();
        this.setState({ check_MyPosts: 'yes' });
        const fd = new FormData();
         fd.append('user_id', this.state.user_id);
         var headers = {
             'Content-Type': 'application/json;charset=UTF-8',
             "Access-Control-Allow-Origin": "*"
         }
         axios.post('http://localhost/fyp-backend/signup/showMyPosts.php', fd, headers
         ).then(res => {
             this.setState({ myAllPosts: res.data });
            console.log(res.data);
            if(res.data[0]){
                this.showMyPrePost(this.state.l_turn);
            }else{
                this.setState({check_MyPosts: 'no'});
                alert('You have not posted any question');
            }
            
         }
         );
    }
    showMyPrePost = (turn) =>{
        if(turn === 'last'){
            this.setState({myPrePost: this.state.myAllPosts[0].post});
            this.setState({myPrePost_Index: 0});
            this.otherAns(this.state.myAllPosts[0].post_id);

        }else if(turn === 'next'){
            if(this.state.myAllPosts[this.state.myPrePost_Index+1]){
                this.setState({myPrePost: this.state.myAllPosts[this.state.myPrePost_Index+1].post});
                this.otherAns(this.state.myAllPosts[this.state.myPrePost_Index+1].post_id);
                this.setState({myPrePost_Index: this.state.myPrePost_Index+1});
            }else{
                this.setState({myPrePost: this.state.myAllPosts[0].post});
                this.setState({myPrePost_Index: 0});
                this.otherAns(this.state.myAllPosts[0].post_id);
            }
            
        }else if(turn === 'pre'){
            this.setState({myPrePost: this.state.myAllPosts[this.state.myPrePost_Index-1].post});
            this.otherAns(this.state.myAllPosts[this.state.myPrePost_Index-1].post_id);
            this.setState({myPrePost_Index: this.state.myPrePost_Index-1});
        }
    }
    backToPosts = (event) =>{
        event.preventDefault();
        this.setState({check_MyPosts: 'no'});
        this.otherAns(this.state.post_id);

    }
    render() {
        let level,subject,education;
        if(this.props.location.state.level){
           level= this.props.location.state.level;
        }else if(this.props.location.state.subject){
            subject = this.props.location.state.subject;
            education = this.props.location.state.education;
        }
        let username = this.props.location.state.username;
        let profile = this.props.location.state.profile;
        let email = this.props.location.state.email;
        let contact = this.props.location.state.contact;
        let user_id = this.props.location.state.user_id;
        let city = this.props.location.state.city;
        let country = this.props.location.state.country;
        return (
            <div>
                {console.log(user_id)}
                <Header username={username} desig={level ? "Student" : "Tutor"} profile={profile} />
                {level ? <Menu page="Post" username={username} email={email} level={level} 
                contact={contact} profile={profile} user_id={user_id} city={city}
                 country={country} />
                : 
                <TutorMenu page="Post" username={username} email={email} subject={subject} education={education}
                 contact={contact} profile={profile} user_id={user_id} city={city} country={country} />}
                <div className="post-class">
                    <div className="my-post">
                        <h2>Post your Problem</h2>
                        <textarea value={this.state.myPost} onChange={this.myPostHandler}
                            placeholder="Write your query" className="myPost-input"></textarea><br />
                        <input type="submit" value="Post" onClick={this.submitMyPost} className="upload-btn" /><br />
                        <p>Note: To check your previous posts click on "My Posts".</p>
                        <input type="submit" value="My Posts" onClick={this.showMyPosts} className="pre-posts-btn" />
                        {this.state.check_MyPosts === 'yes' ? <input type="submit" value="Back" onClick={this.backToPosts} className="pre-posts-btn" /> : ''}
                        
                    </div>
                    {this.state.check_MyPosts === 'no' ?
                        <div className="other-posts">
                            <h2>All Posts</h2>
                            <div className="posts-frame">
                                <div className="poster-profile">
                                    <img src={'/uploads/' + this.state.poster_profile} />
                                </div>
                                <p>{this.state.poster_name}</p>
                                <textarea value={this.state.poster_post} className="othersPost-input"></textarea><br />
                                <div className="my-answer">
                                    <div className="my-profile">
                                        <img src={'/uploads/' + profile} />
                                    </div>

                                    <textarea value={this.state.myAns} onChange={this.myAnsHandler}
                                        placeholder="Write your answer..." className="yourAnswer-input"></textarea><br />
                                </div>
                                <input type="submit" value="Upload " onClick={this.submitMyAns} className="ans-upload-btn" />
                            </div>
                            {this.state.is_last === 'yes' || this.state.last_post_id === this.state.post_id ? '' : <input type="submit" value="Previos" onClick={this.otherPosts.bind(this, this.state.p_turn, this.state.post_id)} className="pre-btn" />}

                            <input type="submit" value=" Next " onClick={this.otherPosts.bind(this, this.state.n_turn, this.state.post_id)} className="next-btn" />
                        </div>
                        :
                        <div className="other-posts">
                            <h2>My Posts</h2>
                            <div className="posts-frame">
                                <div className="poster-profile">
                                    <img src={'/uploads/' + profile} />
                                </div>
                                <p>{username}</p>
                                <textarea value={this.state.myPrePost} className="othersPost-input"></textarea><br />
                                <div className="my-answer">
                                    <div className="my-profile">
                                        <img src={'/uploads/' + profile} />
                                    </div>

                                    <textarea value={this.state.myAns} onChange={this.myAnsHandler}
                                        placeholder="Write your answer..." className="yourAnswer-input"></textarea><br />
                                </div>
                                <input type="submit" value="Upload " onClick={this.submitMyPostAns} className="ans-upload-btn" />
                            </div>
                            {this.state.myPrePost_Index === 0 ? '' : <input type="submit" value="Previos" onClick={this.showMyPrePost.bind(this, this.state.p_turn)} className="pre-btn" />}

                            <input type="submit" value=" Next " onClick={this.showMyPrePost.bind(this, this.state.n_turn)} className="next-btn" />
                        </div>


                    }
                    {this.state.otherAns[0] ?
                        <div className="answers">
                            <h2>Answers</h2>

                            {this.state.otherAns.map(i => {
                                return (
                                    <div className="posts-frame">
                                        <div className="poster-profile">
                                            <img src={'/uploads/' + i.profile} />
                                        </div>
                                        <p className="name-p">{i.name}</p><br />
                                        <div className="ans"><p className="othersPost-input">{i.answer}</p></div>
                                        <br />
                                    </div>
                                );
                            })}


                        </div>
                        :
                        <div className="answers">
                            <h3>No, one has answered it</h3>
                        </div>}
                </div>
                <Footer />
            </div>
        );
    }
}
export default Post; 