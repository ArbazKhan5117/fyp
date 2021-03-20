import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import './css/paymentPage.css';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
            amount: 999,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          alert("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        alert("CheckoutForm.js 28 | ", error);
      }
    } else {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400,background: 'blue',font: 30}} className="cardInfo-class">
      <CardElement />
      <button style={{background: blue}}>Pay</button>
    </form>
  );
};