import React from 'react'
import app from '../services/firebase'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

import "./DepositStylesheet.css";
import * as Firestore from "../services/firestore";


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


const Deposit = () => {
  const stripePromise = loadStripe('pk_test_51HCa9xJnjJ8gDiA181Z9tppM714GWWIzf3Gv7j8YpvTo0vCJsXjBl6XR7TMSPTSqSFHZb3nTE0awpPppExzoZoGC000LRjADk0');

  return (
    <div>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css"
      />
      <div>
        <h1 style={{ textAlign: 'center' }}>Deposit Securely</h1>
        <h2>Payment Methods</h2>
        <details id="add-new-card">
          <summary>Add new card</summary>
          <form id="payment-method-form">
            <label>
              Cardholder name
              <input type="text" name="name" required/>
            </label>
            <fieldset style={{backgroundColor: "#f6f8fa"}}>
              <Elements stripe={stripePromise}>
                <CardElement
                  id="card-element"
                  options={CARD_ELEMENT_OPTIONS}
                />
              </Elements>
            </fieldset>
            <div id="error-message" role="alert"/>
            <button>Save Card</button>
          </form>
        </details>
        <hr/>
        <form id="payment-form">
          <div>
            <label>
              Card:
              <select name="payment-method" required/>
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                name="amount"
                type="number"
                min="1"
                max="99999999"
                value="100"
                required
              />
            </label>
            <label>
              Currency:
              <select name="currency">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="jpy">JPY</option>
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

export default Deposit;