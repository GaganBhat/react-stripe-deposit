const express = require("express");
const app = express();
const port = process.env.APIPORT || 3000;

app.get("/", (req, res) => {
  res.send(`Backend API is running on port ${port}.`);
});

app.post("/stripe/createcustomer/", (req, res) => {

});

app.listen(port, () => {console.log(`Started express server on port ${port}.`)});


