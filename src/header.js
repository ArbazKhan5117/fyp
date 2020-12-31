import React,{Component} from 'react';
import './css/header.css';
import Logo from './logo.png';
class Header extends Component{
    render(){
        return(
            <div className="header-class">
                <div className="logo-class"><img src={Logo}/></div>
                <h1><spam className="V">V</spam>irtual <spam className="T">T</spam>utor <spam className="M">M</spam>ate</h1>
                <div className="user-img">
                            <img src={'/uploads/'+ this.props.profile}></img>
                        </div>
                <h5>{this.props.desig}: {this.props.username}</h5>
            </div>
        );
    }
}
export default Header;