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
        console.log(this.props.page);
        return(
            <div className="menu-class">
                <h1>{this.props.page}</h1>
                <ul className='menu-list'>
                <Link to="/tutorhome"><li className={this.props.page === this.props.home ? 'selected-page' : ' '}>{this.props.home}</li> </Link>
                <li className={this.props.page === this.props.myProf ? 'selected-page' : ' '}>{this.props.myProf}</li>
                    <li className={this.props.page === this.props.post ? 'selected-page' : ' '}>{this.props.post}</li>
                    <li className={this.props.page === this.props.search ? 'selected-page' : ' '}>{this.props.search}</li>
                    
                </ul>
            </div>
        );
    }
}
export default TutorMenu;