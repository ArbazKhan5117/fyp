import React,{Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import YesComp from './yesComp';
import './css/login.css';
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            valid: '',
            message: '',
            username: '',
            designation: '',
            contact: '',
            level: '',
            profile: '',
            subject: '',
            education: '',
            user_id: '',
            city: '',
            country: ''

        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
    }
    emailHandler = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    submitHandler(event){
        event.preventDefault();
        const fd = new FormData();
        fd.append('email', this.state.email);
        fd.append('password', this.state.password);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/validation.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            console.log(res.data.valid);
            if(res.data.valid=='no'){
                alert(res.data.data);
            }else{
                if(res.data.designation=== 'student'){
                    this.setState({level: res.data.level})
                }else if(res.data.designation === 'tutor'){
                    this.setState({subject: res.data.subject}) 
                    this.setState({education: res.data.education})
                }
                this.setState({ message: res.data.data });
                this.setState({username: res.data.username});
                this.setState({designation: res.data.designation});
                this.setState({contact: res.data.contact});
                this.setState({profile: res.data.profile});
                this.setState({user_id: res.data.user_id});
                this.setState({city: res.data.city});
                this.setState({country: res.data.country});
                this.setState({ valid: res.data.valid });
                console.log(res.data.city);
                console.log(res.data.country);
            }
            
        }
        );
    }
    render(){
        
        return(
            <div className="login-class">
                <h2>Login to your account</h2>
                <h5>Don't have an account?<Link to="/signup"><spam className="login-signup-btn">Signup</spam></Link></h5>
                <form onSubmit={this.submitHandler}>
                    <input type="email" required value={this.state.email} onChange={this.emailHandler} placeholder="Email"/><br/>
                    <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Password" /><br/>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <h6>If you forget your password<Link to="/forgetpassword"><spam className="login-signup-btn"> Click Here</spam></Link> </h6>
                {this.state.valid==='yes' ? <YesComp message={this.state.message} 
                username={this.state.username} designation={this.state.designation} level={this.state.level} 
                contact={this.state.contact} email={this.state.email} profile={this.state.profile} 
                subject={this.state.subject} education={this.state.education} user_id={this.state.user_id} 
                city={this.state.city} country={this.state.country} 
                btn='Home'/> : ''}
            </div>
        );
    }
}
export default Login;