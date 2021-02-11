import React,{Component} from 'react';
import { Link } from "react-router-dom";
import './css/signup.css';
class YesComp extends Component{
    render(){
        return(
            <div>
                <div >
                    <h3>{this.props.message}</h3>

                    <h4 className='yesComp-class'>Goto{this.props.btn==='Login' ? <Link to='/login'><spam className="signup-login-btn"> {this.props.btn}</spam></Link> : 
                    this.props.designation === 'student' ? 
                    <Link to={{
                        pathname: '/home',
                        state: {
                            username: this.props.username,
                            contact: this.props.contact,
                            email: this.props.email,
                            level: this.props.level,
                            profile: this.props.profile,
                            user_id: this.props.user_id,
                            city: this.props.city,
                            country: this.props.country
                        }
                    }}>
                        <spam className="signup-login-btn"> {this.props.btn}</spam></Link> : 
                    
                    <Link to={{
                        pathname: '/tutorhome',
                        state: {
                            username: this.props.username,
                            contact: this.props.contact,
                            email: this.props.email,
                            subject: this.props.subject,
                            profile: this.props.profile,
                            education: this.props.education,
                            user_id: this.props.user_id,
                            city: this.props.city,
                            country: this.props.country
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