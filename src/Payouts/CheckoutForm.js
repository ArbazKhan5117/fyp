import React,{useState} from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import UpdateBalance from '../updateBalance.js';
import './cardInfoPayout.css';
import { ThreeSixtySharp } from "@material-ui/icons";

export const CheckoutForm = (props) => {
  const [count,setCount] = useState(0);
  const [price,setPrice] = useState(0);
  const [processing,setProcessing] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const handleAmount=(event)=>{
    setPrice(event.target.value);
    
  }
  console.log(props.balance);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(price < props.balance){
      
    setProcessing(1);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/stripe/charge",
          {
            amount: price*100,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          alert("CheckoutForm.js 25 | payout successful!");
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
  }else{
    alert('Your balance is insufficient');
    setProcessing(0);
  }
  };
  return (
    <div>
      
    <form onSubmit={handleSubmit} className="cardInfo-class">
      <input type="number" placeholder="Enter Amount" onChange={handleAmount}/>
      <CardElement />
      <button className="cardInfo-btn">Payout</button>
    </form>
    {processing === 1 ? <h4 className="processing-class">Payout in Processing...</h4> : ''}
    {count === 1 ? 
    <UpdateBalance price={price} user_id={props.user_id} balance={props.balance}/> : ''
  }
  </div>
  );
};