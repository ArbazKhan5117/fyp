import React,{Component} from 'react';
import {Link} from "react-router-dom";
import './css/login.css';
class Login extends Component{
    render(){
        return(
            <div className="login-class">
                <h2>Login to your account</h2>
                <h5>Don't have an account?<Link to="/home"><spam className="login-signup-btn">Signup</spam></Link></h5>
                <form>
                    <input type="text" placeholder="Username"/><br/>
                    <input type="password" placeholder="Password" /><br/>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <h6>If you forget your password<spam className="login-signup-btn"> Click Here</spam> </h6>
            </div>
        );
    }
}
export default Login;