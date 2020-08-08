import { customerStripeService } from '../services/CustomerService'

const customerApi = app => {

  app.get("/", (req, res) => {
    res.send(`Backend API is running on port ${port}.`);
  });

  app.get("/customers/listallcustomers", async (req, res) => {
    res.json(await customerStripeService.ListAllCustomers());
  });

  app.get("/customers/getcustomer/:customerID", async (req, res) => {
    res.json(await customerStripeService.GetCustomer(req.params.customerID));
  });

  app.post("/customers/createcustomer", async (req, res) => {
    console.log("Got Create User Request with data " + req.body)
    const customer = await customerStripeService.CreateCustomer(req.body);
    res.json(customer);
  });

  return app;
};

export default customerApi;
