import React, { useContext, useEffect } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
require("dotenv").config();
import { AuthContext } from '../../Auth'


const promise = loadStripe("pk_test_51HCa9xJnjJ8gDiA1HGXLOTFT8phhxV0H3k9kxOp0BPqsQOI4egNZCIPTRFuqeIVV6Yh0XwQOrE6YscdWC0jjI3nA000iRCG6Q5");

const Deposit = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const {currentUser} = useContext(AuthContext);

  let depositAmount = 0;

  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm currentUser={currentUser}/>
      </Elements>
    </div>
  );
}

export default Deposit;