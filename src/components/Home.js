import React from 'react'
import app from '../base'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

import "./DepositStylesheet.css";
import Deposit from './Deposit'


const Home = () => {
  return(
    <div>
      <Deposit/>
    </div>
  )
}

export default Home