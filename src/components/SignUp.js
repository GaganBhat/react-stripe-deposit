import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../services/firebase";
import { Link } from 'react-router-dom'
import * as Firestore from "../services/firestore"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, name} = event.target.elements;
    try {
      await app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        console.log("Created new user with firebase");
        const userData = {email: email.value, name: name.value, currentDepositValue: 0}
        Firestore.createUser(userData);
      })
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div style={{width: "25%", margin: "0 auto"}}>
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