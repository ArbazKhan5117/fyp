import React,{Component} from 'react';
import './css/homeVideo.css';
import {Link} from "react-router-dom";
class HomeVideo extends Component{
    static defaultProps={
        id: 1
    };
    constructor(props){
        super(props);
    }
    render(){
        //export const vidId=this.props.id;
       // this.props.info.id==='null' ?  '': vidId=this.props.info.id;
       
        return(
            <div className='homeVideo-class' onClick={this.paymentHandler}>
                <Link to={{
                    pathname: '/payment',
                    state: {
                        id: this.props.info.id
                    }
                }}>
                <video width="240" height="100" controls >
                    <source src={this.props.info.src} type="video/mp4"/>
                </video>
                </Link>
                <p>{this.props.info.level}, {this.props.info.subject}, topic#({this.props.info.topic})
                 by {this.props.info.tutor}</p>

            </div>
        );
    }
}
//export {vidId};
export default HomeVideo;