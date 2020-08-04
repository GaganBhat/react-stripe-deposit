import React from "react";
import app from "../base";

const Home = () => {
  return (
    <div style={{width: "30%", margin: "0 auto"}}>
      <h1>You are Logged In</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Home;