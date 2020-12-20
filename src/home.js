import React,{Component} from 'react';
import Header from './header.js';
import Menu from './menu.js';
class Home extends Component{
    render(){
        return(
            <div>
                <Header username="Ali Khan" desig="Student"/>
                <Menu page="Home"/>
            </div>
        );
    }
}
export default Home;