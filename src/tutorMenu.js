import React,{Component} from 'react';
import {Link} from "react-router-dom";
import './css/menu.css';
class TutorMenu extends Component{
    static defaultProps={
        post: 'Post',
        search: 'Search',
        myProf: 'MyProfile',
        home: 'Home'
    };
    render(){
        return(
            <div className="menu-class">
                <h1>{this.props.page}</h1>
                <ul className='menu-list'>
                <Link to={{
                    pathname: '/tutorhome',
                    state: {
                        username: this.props.username,
                        email: this.props.email,
                        subject: this.props.subject,
                        contact: this.props.contact,
                        profile: this.props.profile,
                        education: this.props.education,
                        city: this.props.city,
                        user_id: this.props.user_id,
                        country: this.props.country
                    }
                }}>
                <li className={this.props.page === this.props.home ? 'selected-page' : ' '}><div className="menu-li">{this.props.home}</div></li> </Link>
                <Link to={{
                    pathname: '/tutormyprofile',
                    state: {
                        username: this.props.username,
                        email: this.props.email,
                        subject: this.props.subject,
                        contact: this.props.contact,
                        profile: this.props.profile,
                        education: this.props.education,
                        city: this.props.city,
                        user_id: this.props.user_id,
                        country: this.props.country
                    }
                }}> <li className={this.props.page === this.props.myProf ? 'selected-page' : ' '}><div className="menu-li">{this.props.myProf}</div></li></Link>
                    <Link to={{
                    pathname: '/post',
                    state: {
                        username: this.props.username,
                        email: this.props.email,
                        subject: this.props.subject,
                        contact: this.props.contact,
                        profile: this.props.profile,
                        education: this.props.education,
                        city: this.props.city,
                        user_id: this.props.user_id,
                        country: this.props.country,
                        level: ''
                    }
                }}
                    ><li className={this.props.page === this.props.post ? 'selected-page' : ' '}><div className="menu-li">{this.props.post}</div></li></Link>
                    <li className={this.props.page === this.props.search ? 'selected-page' : ' '}><div className="menu-li">{this.props.search}</div></li>
                    
                </ul>
            </div>
        );
    }
}
export default TutorMenu;