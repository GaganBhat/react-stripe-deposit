import React, { useContext, useEffect } from 'react'
import app from '../services/firebase'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import * as Firestore from "../services/firestore"

import "./DepositStylesheet.css";
import axios from 'axios';
import { AuthContext } from '../Auth'
import scriptLoader from 'react-async-script-loader';
require("dotenv").config();


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const toCent = amount => amount * 100;

const Deposit = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  let currentDepositVal = NaN;

  const [depositVal, setDepositVal] = React.useState(NaN);
  const [stripe, setStripe] = React.useState();

  React.useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      setStripe(window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  const {currentUser} = useContext(AuthContext);


  React.useEffect(  () => {
    let userData;
    async function getData() {
      userData = await Firestore.GetUserDataCustom(currentUser);
      setDepositVal(userData.get("currentDepositValue"));
    }
    getData();
  }, [])

  console.log("Deposit Val = " + depositVal);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const [amount, setAmount] = React.useState(100);

  const handleDeposit = async event => {
    event.preventDefault();
    console.log(amount)
    const session = await axios.post(
      'http://ec2-54-234-100-58.compute-1.amazonaws.com:8888/payment/session-initiate',
      {
        customerEmail: currentUser.email,
        clientReferenceId: currentUser.customerID,
        lineItem: {
          name: 'Deposit to Bet America',
          amount: toCent(amount),
          currency: "usd",
          quantity: 1,
        },
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    console.log(result.error.message);
  };

  if (!stripe) {
    return null;
  }


  return (
    <div>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css"
      />
      <div>
        <h1 style={{ textAlign: 'center' }}>Deposit Securely</h1>
        {/*<h2>Payment Methods</h2>*/}
        {/*<details id="add-new-card">*/}
        {/*  <summary>Add new card</summary>*/}
        {/*  <form id="payment-method-form">*/}
        {/*    <label>*/}
        {/*      Cardholder name*/}
        {/*      <input type="text" name="name" required/>*/}
        {/*    </label>*/}
        {/*    <fieldset style={{backgroundColor: "#f6f8fa"}}>*/}
        {/*      <Elements stripe={stripePromise}>*/}
        {/*        <CardElement*/}
        {/*          id="card-element"*/}
        {/*          options={CARD_ELEMENT_OPTIONS}*/}
        {/*        />*/}
        {/*      </Elements>*/}
        {/*    </fieldset>*/}
        {/*    <div id="error-message" role="alert"/>*/}
        {/*    <button>Save Card</button>*/}
        {/*  </form>*/}
        {/*</details>*/}
        <hr/>
        <label id="currentDepositLabel">
          Current Account Value in USD
          <input
            name="currentDepositVal"
            min="1"
            max="99999999"
            value={depositVal}
          />
        </label>
        <form id="payment-form" onSubmit={handleDeposit}>
          {/*<div>*/}
          {/*  <label>*/}
          {/*    Card:*/}
          {/*    <select name="payment-method"/>*/}
          {/*  </label>*/}
          {/*</div>*/}
          <div>

            <label>
              Amount to deposit: <br/>
              <input
                name="amount"
                min="1"
                max="99999999"
                defaultValue="100"
                required
                onChange={event => setAmount(event.target.value)}
              />
              <br/>
            </label>
            <label>
              Currency:
              <select name="currency">
                <option value="usd">USD</option>
                {/*<option value="eur">EUR</option>*/}
                {/*<option value="gbp">GBP</option>*/}
                {/*<option value="jpy">JPY</option>*/}
              </select>
            </label>
          </div>
          <button>Deposit Amount</button>
        </form>
      </div>
      <div>
        <h2>Payments</h2>
        <ul id="payments-list"/>
      </div>
      <button id="center" onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  )
}

export default scriptLoader('https://js.stripe.com/v3/')(Deposit);