import React, { Component } from 'react';
import axios from 'axios';
import Header from './header.js';
import Footer from './footer.js';
import AdminYourAccount from './adminYourAccount.js';
import EditSubject from './editSubject.js';
import EditLevel from './editLevel.js';
import './css/adminHome.css';
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_id: parseInt(this.props.location.state.admin_id, 10),
            yourAccount:'yes',
            editSubject: 'no',
            editLevel: 'no',
            profile: '',
            username: ''
        }
        this.handleYourAccount=this.handleYourAccount.bind(this);
        this.handleEditSubject=this.handleEditSubject.bind(this);
        this.handleEditLevel=this.handleEditLevel.bind(this);
        this.fetchInfor=this.fetchInfor.bind(this);
        this.fetchInfor();
    }
    handleYourAccount = (event) => {
        event.preventDefault();
        this.setState({ yourAccount: 'yes', editSubject: 'no', editLevel: 'no' });
    }
    handleEditSubject = (event) => {
        event.preventDefault();
        this.setState({ editSubject: 'yes', yourAccount: 'no', editLevel: 'no'});
    }
    handleEditLevel = (event) => {
        event.preventDefault();
        this.setState({ editLevel: 'yes', yourAccount: 'no',editSubject: 'no'});
    }
    fetchInfor() {
        const fd = new FormData();
        fd.append('admin_id', this.state.admin_id);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/adminEditProfile.php', fd, headers
        ).then(res => {
            console.log(res.data);
            console.log(res.data.valid);
            if (res.data.valid == 'no') {
                alert(res.data.data);
            } else {
                this.setState({ profile: res.data.profile });
                this.setState({ username: res.data.username });

            }

        }
        );
    }
    render() {
        const username = this.props.location.state.username;
        const admin_id = this.props.location.state.admin_id;
        const profile = this.props.location.state.profile;
        return (
            <div>
                <Header username={this.state.username} desig="Admin" profile={this.state.profile} />
                <div className="adminHome-class">
                    <div className="side-bar">
                        <table className="customers">

                            <tr>
                                <th className="customers-heading-left">Sr.No</th>
                                <th className="customers-heading-right">Options</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td onClick={this.handleYourAccount}>Your Account</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td onClick={this.handleEditSubject}>Edit Subjects</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td onClick={this.handleEditLevel}>Edit Levels</td>
                            </tr>

                            <tr>
                                <td>4</td>
                                <td>Add New Admin</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>All Admins</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Accounts under review</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>VTM Family</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Others</td>
                            </tr>

                        </table>
                    </div>
                    <div className="explaination">
                    {this.state.yourAccount === 'yes' ? <AdminYourAccount admin_id={admin_id} fetchInfor={this.fetchInfor}/> : ''}
                    {this.state.editSubject === 'yes' ? <EditSubject admin_id={admin_id}/> : ''}
                    {this.state.editLevel === 'yes' ? <EditLevel admin_id={admin_id}/> : ''}
                    </div>
                </div>
                
                <Footer />
            </div>
        );
    }
}
export default AdminHome;