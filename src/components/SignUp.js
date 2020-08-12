import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../services/firebase";
import { Link } from 'react-router-dom'
import * as Firestore from "../services/firestore"
import useStripe from "@stripe/react-stripe-js";
import axios from 'axios';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, name} = event.target.elements;
    try {
      await app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async () => {
        const userData = {email: email.value, name: name.value, currentDepositValue: 0}
        await axios.post(
          'https://api.gaganbhat.me/customers/createcustomer', userData)
        .then(function (response) {
          userData.customerID = response.data.id;
          console.log(response);
        })
        Firestore.CreateUser(userData);
      })

      history.push("/");
    } catch (error) {
      await app.auth().currentUser.delete();
      alert(error);
    }
  }, [history]);

  return (
    <div >
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Name
          <input name="name" type="text" placeholder="Full Name" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">Already have an account? Login here.</Link>
    </div>

  );
};

export default withRouter(SignUp);