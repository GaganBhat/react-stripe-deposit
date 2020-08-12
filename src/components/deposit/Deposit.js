import React, { useContext, useEffect } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
require("dotenv").config();
import { AuthContext } from '../../Auth'
import * as Firestore from '../../services/firestore'
import axios from "axios";
import app from '../../services/firebase'


const promise = loadStripe("pk_test_51HCa9xJnjJ8gDiA1HGXLOTFT8phhxV0H3k9kxOp0BPqsQOI4egNZCIPTRFuqeIVV6Yh0XwQOrE6YscdWC0jjI3nA000iRCG6Q5");

const Deposit = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const {currentUser} = useContext(AuthContext);
  const [currentAccountVal, setCurrentAccountVal] = React.useState(NaN);

  let depositAmount = 0;


  const getFirestoreData = async () => {
    return await Firestore.GetUserDataCustom(currentUser);
  }


  React.useEffect(  () => {
    let userData;
    async function getData() {
      const firestoreUser = await getFirestoreData();
      userData = await axios.get("https://api.gaganbhat.me/customers/getcustomer/" + firestoreUser.data().customerID);
      setCurrentAccountVal(-(userData.data.balance / 100.0));
    }
    getData();
  }, [])

  return (
    <div>
      <h1>Deposit safely into your account.</h1>
      <Elements stripe={promise}>
        <label id="currentDepositLabel">
          Current Account Value (USD)
          <input
            name="currentDepositVal"
            min="1"
            max="99999999"
            value={currentAccountVal}
          />
        </label>
        <CheckoutForm currentUser={currentUser}/>
      </Elements>
      <button id="center" onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}

export default Deposit;