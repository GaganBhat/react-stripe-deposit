import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import { Link } from 'react-router-dom'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div style={{width: "30%", margin: "0 auto"}}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
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