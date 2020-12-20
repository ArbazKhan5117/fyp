import React,{Component} from 'react';
import {Link} from "react-router-dom";
import './css/signup.css';
class Signup extends Component{
    render(){
        return(
            <div className='signup-class'>
                <h2>Signup</h2>
                <h4>Welcome to Virtual Tutor Mate</h4>
                <form>
                <input type="text" placeholder="First Name"/><br/>
                <input type="text" placeholder="Last Name"/><br/>
                <input type="email" placeholder="Email Address"/><br/>
                <input type="password" placeholder="Password"/><br/>
                <input type="Password" placeholder="Confirm password"/><br/>
                <input type="number" placeholder="Contact#"/><br/>
                <input type="text" placeholder="Country"/><br/>
                <input type="text" placeholder="City"/><br/>
                <select>
                    <option value='null'>Select your designation</option>
                    <option value='tutor'>Tutor</option>
                    <option value='student'>Student</option>
                </select><br />
                <Link to="/"><button type="submit" className="signup-btn">Signup</button></Link>
                </form>
            </div>
        );
    }
}
export default Signup;