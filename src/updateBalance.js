import React,{Component} from 'react';
import axios from 'axios';
class UpdateBalance extends Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.updatebalance();
    }
    updatebalance=()=>{
        const fdup = new FormData();
        const newBalance=(parseInt(this.props.balance) - parseInt(this.props.price));
        console.log(newBalance);
        console.log(this.props.user_id);
        fdup.append('user_id', this.props.user_id);
        fdup.append('balance', parseInt(newBalance));
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/updateBalance.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            console.log(res.data.data);
        }
        );
    }
    render(){
        return(
            <div>
            
            </div>
        );
    }
}
export default UpdateBalance;