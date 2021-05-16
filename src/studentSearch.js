import React, { Component } from 'react';
import axios from 'axios';
import Menu from './menu.js';
import Header from './header.js';
import Footer from './footer.js';
import './css/studentSearch.css';
class StudentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user_id: parseInt(this.props.location.state.user_id, 10),
            city: '',
            country: '',
            subject: 'Physics',
            tutors: [],
            subject_arr: [],
            valid: ''
        }

        this.subjectHandler = this.subjectHandler.bind(this);
        this.findAddress = this.findAddress.bind(this);
        this.fetchLevelSubject();
    }
    fetchLevelSubject = () => {

        const fd = new FormData();
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/fetchLevelSubjectSearchTutor.php', fd, headers
        ).then(response => {
            this.setState({ subject_arr: response.data[0].subject });
        });
    }
    subjectHandler = (event) => {
        event.preventDefault();
        this.setState({ subject: event.target.value });
        this.setState({ valid: '' });
    }
    findAddress(event) {
        event.preventDefault();
        this.setState({ valid: 'yes' });
        const fdup = new FormData();
        fdup.append('user_id', this.state.user_id)
        fdup.append('subject', this.state.subject);
        var headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://localhost/fyp-backend/signup/searchHomeTutor.php', fdup, headers
        ).then(res => {
            //console.log(res.data);
            this.setState({ tutors: res.data });
        }
        );
    }



    render() {
        let username = this.props.location.state.username;
        let profile = this.props.location.state.profile;
        let email = this.props.location.state.email;
        let level = this.props.location.state.level;
        let contact = this.props.location.state.contact;
        let user_id = this.props.location.state.user_id;
        let city = this.props.location.state.city;
        let country = this.props.location.state.country;
        let id = parseInt(user_id, 10);
        // this.findId(id);
        return (
            <div >
                <Header username={username} desig="Student" profile={profile} />
                <Menu page="Search" username={username} email={email} level={level} contact={contact}
                    profile={profile} user_id={user_id} city={city} country={country} />
                <div className="studentSearch-class">
                    <div className="search-class">
                        <h2>Find your Home Tutor</h2>
                        <form>
                            <label className="subject-label" >Select Subject:</label>
                            <select className="subject-opt" value={this.state.subject} onChange={this.subjectHandler}>
                                {this.state.subject_arr.map(i => {
                                    return (
                                        <option value={i.subject}>{i.subject}</option>
                                    );
                                })}
                            </select><br /><br />

                            <input type="submit" value="Search" onClick={this.findAddress} className="submit-bttn" />
                        </form>
                    </div>
                    {this.state.valid === '' ? "" :
                        this.state.tutors[0] ?

                            <div className="showTutor">
                                <h3>Tutor's of {this.state.subject} in your city</h3>
                                <table className="customers">
                                    <tr>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Rank</th>
                                        <th>Subject</th>

                                        <th>City</th>
                                        <th>Last Degree</th>
                                        <th>Contact</th>
                                    </tr>
                                    {this.state.tutors.map(i => {
                                        return (
                                            <tr>
                                                <td className="prof-img"><img src={'/uploads/' + i.profile}/></td>
                                                <td>{i.name}</td>
                                                {i.rank ? <td>{Math.floor(i.rank)}</td> : <td>--</td>}
                                                <td>{this.state.subject}</td>

                                                <td>{i.city}</td>
                                                <td>{i.education}</td>
                                                <td>{i.contact}</td>
                                            </tr>
                                        );
                                    })}

                                </table>

                            </div>
                            :
                            <div className="showTutor">
                                <h3>Sorry, No home tutor of {this.state.subject} is available in your city</h3>

                            </div>


                    }
                </div>

                <Footer />
            </div>
        );
    }
}
export default StudentSearch;