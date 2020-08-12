import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import * as Firestore from '../../services/firestore'

export default function CheckoutForm(props) {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [depositAmountDollars, setDepositAmountDollars] = useState(50);
  const stripe = useStripe();
  const elements = useElements();

  let userData;
  React.useEffect(  () => {
    async function getData() {
      userData = await Firestore.GetUserDataCustom(props.currentUser);
    }
    getData();
  }, [])


  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();

    const stripeClientSecret =
      await axios.post("https://api.gaganbhat.me/payment/create-payment-intent", {
        depositAmount: (depositAmountDollars * 100),
        customerID: userData.data().customerID
    });
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(stripeClientSecret.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.currentUser.name
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <label>
        Deposit Amount in USD
        <input
          type="number"
          min="1"
          step="1"
          defaultValue="50"
          name="depositAmount"
          required
          onChange={(
            event) => {setDepositAmountDollars(event.target.value)
          }}
        />
      </label>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}