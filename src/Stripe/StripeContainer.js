import React,{Component} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {CheckoutForm} from "./CheckoutForm.js";

const PUBLIC_KEY = "pk_test_51IPMO8GHV84BEQowkZ3KX3JDmIrAePwAMGIaECjeJyWVycLiHjeTeQUCsQVCURKo6cJ4OyBRaMN5tiYNZxcBcsKs00ZTL1WCZq";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

class StripeContainer extends Component {
  constructor(props) {
      super(props);

  }
  render() {

  return (
    <Elements stripe={stripeTestPromise}>
     
      <CheckoutForm price={this.props.price} video_id={this.props.video_id} 
      videoName={this.props.videoName} videoType={this.props.videoType} student_id={this.props.student_id} 
      tutor={this.props.tutor} />
    </Elements>
  );
}
}

export default StripeContainer;