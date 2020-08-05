import React from "react";
import app from "./firebase";

const db = app.firestore();
const userCollection = db.collection("users");

export const getUserData = userEmail => {
  return userCollection.doc(userEmail)
    .get();
}

export const createUser = userData => {
  return userCollection.doc(userData.email).set(userData)
  .then(function() {
    console.log("User successfully created!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

export const setUserDeposit = (userEmail, additionalDeposit) => {
  return userCollection.doc(userEmail).update({
    currentDepositValue: (getUserData().currentDepositValue + additionalDeposit)
  });
}