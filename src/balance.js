import React, { Component } from 'react';
import axios from 'axios';
import TutorMenu from './tutorMenu.js';
import Header from './header.js';
import Footer from './footer.js';
import StripeContainer from "./Payouts/StripeContainer.js";
import './css/studentDashboard.css';
class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.location.state.user_id, 10),
            balance: 0
        };
        this.fetchBalance=this.fetchBalance.bind(this);
        this.fetchBalance();
    }
    fetchBalance() {
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/fetchBalance.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ balance: res.data.data });
        }
        );
    }
    
    render() {
        const username = this.props.location.state.username;
        const contact = this.props.location.state.contact;
        const email = this.props.location.state.email;
        const subject = this.props.location.state.subject;
        const education = this.props.location.state.education;
        const profile = this.props.location.state.profile;
        const city = this.props.location.state.city;
        const country = this.props.location.state.country;
        const user_id = this.props.location.state.user_id;
        let id = parseInt(user_id, 10);
        let count = 0;
        return (
            <div>
                <Header username={username} desig="Tutor" profile={profile} />
                <TutorMenu page="Balance" username={username} contact={contact} email={email} subject={subject}
                    education={education} profile={profile} city={city} country={country} user_id={user_id} />
                <div className="Tutor-balance">
                    <div className="balance-class">
                        <h3>Your Balance: ${this.state.balance}</h3>
                        <StripeContainer balance={this.state.balance} user_id={this.state.user_id} updation={this.fetchBalance}/>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Balance;