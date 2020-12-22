import React, { Component } from 'react';
class PaymentPage extends Component {
    constructor(props) {
        super(props);
       
    }

    render() {
        const vidId = this.props.location.state.id;
        console.log(vidId);
        return (
            <div>
                <h1>Payment Page of video with Id {vidId}</h1>
            </div>
        );

    }
}
export default PaymentPage;