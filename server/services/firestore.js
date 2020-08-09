import app from "./firebase";

const db = app.firestore();
const userCollection = db.collection("users");



export const GetUserData = (email) => {
  if (email != null)
    return userCollection.doc(email).get();
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

export const AddUserDeposit =  async (email, additionalDeposit) => {
  const userData = await GetUserData(email).data();
  const currentDepositValue = userData.currentDepositValue;
  const finalDepositTotal = currentDepositValue + additionalDeposit;
  if (email != null) {
    console.log("Previous deposit value was $" + currentDepositValue);
    console.log("Final Deposit Total is $" + (finalDepositTotal));
    return userCollection.doc(email).update({
      currentDepositValue: finalDepositTotal
    });
  } else
    return console.log("No User is Authenticated for add user deposit.");
}