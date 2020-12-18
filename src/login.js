import React,{Component} from 'react';
import './css/login.css';
class Login extends Component{
    render(){
        return(
            <div className="login-class">
                <h2>Login to your account</h2>
                <h5>Don't have an account?<spam className="signup-btn">Signup</spam></h5>
                <form>
                    <input type="text" placeholder="Username"/><br/>
                    <input type="password" placeholder="Password" /><br/>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <h6>If you forget your password<spam className="signup-btn"> Click here</spam> </h6>
            </div>
        );
    }
}
export default Login;