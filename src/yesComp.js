import React,{Component} from 'react';
import { Link } from "react-router-dom";
import './css/signup.css';
class YesComp extends Component{
    render(){
        return(
            <div>
                <div >
                    <h3>{this.props.message}</h3>

                    <h4 className='yesComp-class'>Goto{this.props.btn==='Login' ? <Link to='/'><spam className="signup-login-btn"> {this.props.btn}</spam></Link> : 
                    this.props.designation === 'student' ? 
                    <Link to={{
                        pathname: '/home',
                        state: {
                            username: this.props.username,
                            contact: this.props.contact,
                            email: this.props.email,
                            level: this.props.level,
                            profile: this.props.profile,
                            profileType: this.props.profileType
                        }
                    }}>
                        <spam className="signup-login-btn"> {this.props.btn}</spam></Link> : 
                    
                    <Link to={{
                        pathname: '/tutorhome',
                        state: {
                            username: this.props.username
                        }
                    }}>
                        <spam className="signup-login-btn"> {this.props.btn}</spam></Link>}
                        </h4>
                </div>
            </div>
        );
    }
}
export default YesComp;