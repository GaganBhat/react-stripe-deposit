const express = require("express");
const app = express();
const port = process.env.APIPORT || 4000;
const { stripeService } = require('./services/stripe.js');

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Backend API is running on port ${port}.`);
});

app.post("/stripe/createcustomer", async (req, res) => {
  const customer = await stripeService.CreateCustomer(req.body);
  res.json(customer);
});

app.listen(port, () => {console.log(`Started express server on port ${port}.`)});

