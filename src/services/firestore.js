import React, { useContext } from 'react'
import app from "./firebase";
import { AuthProvider } from '../Auth'

const db = app.firestore();
const userCollection = db.collection("users");



export const GetUserData = () => {
  const currentUser = useContext(AuthProvider)
  if(currentUser != null)
    return userCollection.doc(currentUser.email)
      .get();
  else
    return console.log("No User is Authenticated")
}

export const CreateUser = userData => {
  return userCollection.doc(userData.email).set(userData)
  .then(function() {
    console.log("User successfully created!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

export const SetUserDeposit = additionalDeposit => {
  const currentUser = useContext(AuthProvider)
  if(currentUser != null)
    return userCollection.doc(currentUser.email).update({
      currentDepositValue: (GetUserData().currentDepositValue + additionalDeposit)
    });
  else
    return console.log("No User is Authenticated");
}