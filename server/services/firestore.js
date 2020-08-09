import app from "./firebase";

const db = app.firestore();
const userCollection = db.collection("users");



export const GetUserData = (email) => {
  if(email != null)
    return userCollection.doc(email)
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

export const AddUserDeposit = (email, additionalDeposit) => {
  if(email != null)
    return userCollection.doc(email).update({
      currentDepositValue: (GetUserData().currentDepositValue + additionalDeposit)
    });
  else
    return console.log("No User is Authenticated");
}