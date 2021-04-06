import React,{useState} from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import AccessVideo from '../accessVideo.js';
import './cardInfo.css';

export const CheckoutForm = (props) => {
  const [count,setCount] = useState(0);
  const [processing,setProcessing] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(1);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: props.price*100,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          alert("CheckoutForm.js 25 | payment successful!");
          setProcessing(0);
          setCount(count+1);
        }
      } catch (error) {
        alert("CheckoutForm.js 28 | ", error);
        setProcessing(0);
      }
    } else {
      alert(error.message);
      setProcessing(0);
    }
  };

  return (
    <div>
      
    <form onSubmit={handleSubmit} className="cardInfoStudent-class">
      <CardElement />
      <button className="cardInfo-btn">Pay</button>
    </form>
    {processing === 1 ? <h3>Payment in Processing...</h3> : ''}
    {count === 1 ? 
    <AccessVideo price={props.price} videoType={props.videoType} videoName={props.videoName} 
    video_id={props.video_id} student_id={props.student_id} tutor={props.tutor} reviewStatus='no' /> : ''
  }
  </div>
  );
};