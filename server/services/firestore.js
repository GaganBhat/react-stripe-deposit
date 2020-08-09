import app from "./firebase";

const db = app.firestore();
const userCollection = db.collection("users");



export const GetUserData = (email) => {
  if(email != null)
    return userCollection.doc(email)
      .get();
  else
    return console.log("No User is Authenticated for get user. ")
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
  if(email != null){
    console.log("Previous deposit value was $" + (GetUserData(email).currentDepositValue));
    console.log("Adding $" + (additionalDeposit/100.0))
    return userCollection.doc(email).update({
      currentDepositValue: (GetUserData(email).data().currentDepositValue + additionalDeposit)
    });
  } else
    return console.log("No User is Authenticated for add user deposit.");
}