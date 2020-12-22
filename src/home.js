import React,{Component} from 'react';
import Header from './header.js';
import Menu from './menu.js';
import Footer from './footer.js';
import HomeVideo from './homeVideo.js';
import './css/home.css';
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            videos:[
                {id:1, tutor:"Ali Raza", level:"9th", subject:"Math", src:"/Videos/demo.mp4", topic:3.2},
                {id:2, tutor:"Arbaz Khan", level:"9th", subject:"Chemistry", src:"/Videos/demo.mp4", topic:5.2},
                {id:3, tutor:"Usama Aslam", level:"9th", subject:"Physics", src:"/Videos/demo.mp4", topic:1.2},
                {id:4, tutor:"Ameer Hamza", level:"9th", subject:"Urdu", src:"/Videos/demo.mp4", topic:3.1},
                {id:5, tutor:"Nafees Ahmad", level:"9th", subject:"English", src:"/Videos/demo.mp4", topic:3.9},
                {id:6, tutor:"Mohsin Nawaz", level:"9th", subject:"Biology", src:"/Videos/demo.mp4", topic:3.6},
            ]
        };
    }
    
    render(){
        return(
            <div>
                <Header username="Ali Khan" desig="Student"/>
                <Menu page="Home"/>
                
                <div className='home-class'>
                    {this.state.videos.map(i=>
                    <HomeVideo info={i}/>)}
                </div>
                <Footer />
            </div>
        );
    }
}
export default Home;