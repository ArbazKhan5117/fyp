import React,{Component} from 'react';
import {Link} from "react-router-dom";
import './css/menu.css';
class Menu extends Component{
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
                    pathname: '/home',
                    state: {
                        username: this.props.username,
                        email: this.props.email,
                        level: this.props.level,
                        contact: this.props.contact,
                        profile: this.props.profile,
                        user_id: this.props.user_id,
                        city: this.props.city,
                        country: this.props.country
                    }
                }}>
                    <li className={this.props.page === this.props.home ? 'selected-page' : ' '}><div className="menu-li">{this.props.home}</div></li> </Link>
                <Link to={{
                        pathname: '/studentmyprofile',
                        state: {
                            username: this.props.username,
                            email: this.props.email,
                            level: this.props.level,
                            contact: this.props.contact,
                            profile: this.props.profile,
                            user_id: this.props.user_id,
                            city: this.props.city,
                            country: this.props.country
                        }
                    }}>
                    <li className={this.props.page === this.props.myProf ? 'selected-page' : ' '}><div className="menu-li">{this.props.myProf}</div></li></Link>
                    <Link to={{
                        pathname: '/post',
                        state: {
                            username: this.props.username,
                            email: this.props.email,
                            level: this.props.level,
                            contact: this.props.contact,
                            profile: this.props.profile,
                            user_id: this.props.user_id,
                            city: this.props.city,
                            country: this.props.country,
                            subject: '',
                            education: ''
                        }
                    }}><li className={this.props.page === this.props.post ? 'selected-page' : ' '}><div className="menu-li">{this.props.post}</div></li></Link>
                   <Link to={{
                        pathname: '/studentsearch',
                        state: {
                            username: this.props.username,
                            email: this.props.email,
                            level: this.props.level,
                            contact: this.props.contact,
                            profile: this.props.profile,
                            user_id: this.props.user_id,
                            city: this.props.city,
                            country: this.props.country
                        }
                    }}
                   > <li className={this.props.page === this.props.search ? 'selected-page' : ' '}><div className="menu-li">{this.props.search}</div></li></Link>
                    
                </ul>
            </div>
        );
    }
}
export default Menu;