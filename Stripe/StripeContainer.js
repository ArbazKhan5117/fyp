import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51IPMO8GHV84BEQowkZ3KX3JDmIrAePwAMGIaECjeJyWVycLiHjeTeQUCsQVCURKo6cJ4OyBRaMN5tiYNZxcBcsKs00ZTL1WCZq";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;