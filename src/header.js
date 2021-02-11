import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './css/header.css';
import Logo from './logo.png';
class Header extends Component {
    render() {
        return (
            <div className="header-class">
                <div className="logo-class"><img src={Logo} /></div>
                <h1><spam className="V">V</spam>irtual <spam className="T">T</spam>utor <spam className="M">M</spam>ate</h1>
                {this.props.username === 'login-header' ?
                    ''
                    :
                    <div>
                        {this.props.username === 'slider-header' ?
                            <div className="slider-btns">
                                <Link to="/login"><button>Login</button></Link>
                                <Link to="/signup"><button>Register</button></Link>
                            </div>
                            :
                            <div className="user-img">
                                <img src={'/uploads/' + this.props.profile}></img>
                            </div>
                        }
                    </div>
                }
                {this.props.username === 'login-header' ?
                    <div className="right-logo-class"><img src={Logo} /></div>
                    :
                    <div>
                        {this.props.username === 'slider-header' ?
                            ''
                            :
                            <h5>{this.props.desig}: {this.props.username}</h5>
                        }
                    </div>
                }
            </div>
        );
    }
}
export default Header;