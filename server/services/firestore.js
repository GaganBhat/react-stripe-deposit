import app from "./firebase";

const db = app.firestore();
const userCollection = db.collection("users");



export const GetUserData = async (email) => {
  try {
    if (email != null) {
      const documentReference = userCollection.doc(email);
      const docContent = await documentReference.get();
      if(docContent.exists)
        console.log("Document Exists")
      else
        console.log("Document does not exist")
      return docContent;
    } else
      return console.log("No User is Authenticated for get user. ")
  } catch (e) {
    console.log(e);
  }
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

export const AddUserDeposit = async (email, additionalDeposit) => {
  console.log("Email for deposit = " + email)
  if (email != null) {
    const documentReference = await GetUserData(email);
    const currentDepositValue = documentReference.get("currentDepositValue");
    console.log("Current Deposit Value = $" + currentDepositValue)
    const updatedDepositValue = currentDepositValue + additionalDeposit;
    console.log("Updated Deposit Value = $" + updatedDepositValue);
    await userCollection.doc(email).update({
      "currentDepositValue": updatedDepositValue
    }).then(() => {
      console.log("Successfully Updated value in firestore.")
    }).catch((e) => {
      console.log("Error = " + e)
    })
    return documentReference;
  } else
    return console.log("No User is Authenticated for add user deposit.");
}