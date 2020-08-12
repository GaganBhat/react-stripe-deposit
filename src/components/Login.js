import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../services/firebase.js";
import { AuthContext } from "../Auth.js";
import { Link } from 'react-router-dom'

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


  if (currentUser) {
    console.log("Current User = " + currentUser.email)
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <Link to="/signup">No Account? Sign up here.</Link>
    </div>
  );
};

export default withRouter(Login);