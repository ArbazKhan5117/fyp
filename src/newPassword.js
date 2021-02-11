import React,{Component} from 'react';
import axios from 'axios';
import './css/login.css';
class NewPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            contact: '',
            password: '',
            confirm: '',
            valid: '',
            message: ''
        }
        this.passwordHandler = this.passwordHandler.bind(this);
        this.confirmHandler = this.confirmHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    
    confirmHandler = (event) => {
        event.preventDefault();
        this.setState({ confirm: event.target.value });

    }
    submitHandler=(event) => {
        event.preventDefault();
        let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(this.state.confirm !== this.state.password){
            alert('Please confirm your Password carefully');
        }
        else if(this.state.password.match(paswd)){
        const fd = new FormData();
        fd.append('name', this.props.name);
        fd.append('email', this.props.email);
        fd.append('contact', this.props.contact);
        fd.append('password', this.state.password);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/newpassword.php', fd, headers
        ).then(res => {
            console.log(res.data.data);
            console.log(res.data.valid);
            if(res.data.valid=='no'){
                alert(res.data.data);
            }else{
                this.setState({ valid: res.data.valid });
                this.setState({ message: res.data.data });
                console.log(res.data.data);
            }
            
        }
        );
    }else{
        alert('Please set a password between 7 to 15 characters which contain at least one numeric digit and a special character');
    }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                <input type="password" required value={this.state.password} onChange={this.passwordHandler} placeholder="Enter New Password" className="login-input"/><br/>
                <input type="password" required value={this.state.confirm} onChange={this.confirmHandler} placeholder="Confirm your Password" className="login-input"/><br/>
                <button type="submit" className="forget-btn">Update</button>
                {this.state.valid==='yes' ? <h4 className="newpass-msg">{this.state.message}</h4> : ''}
                </form>
            </div>
        );
    }
}
export default NewPassword;