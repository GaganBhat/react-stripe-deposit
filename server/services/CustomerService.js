import Stripe from "stripe";
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class StripeService {
  async CreateCustomer(userData) {
    return await stripe.customers.create({
      email: userData.email,
      name: userData.name,
    });
  }

  async GetCustomer(customerID) {
    return await stripe.customers.retrieve(customerID);
  }

  async UpdateBalance(customerID, balanceDollarsDelta) {
    return await stripe.customers.update(
      customerID,
      {balance: balanceDollarsDelta * 100}
    )
  }

  async CreatePaymentMethod(customerID, paymentMethodID){
    return await stripe.paymentMethods.attach(
      paymentMethodID,
      {customer: customerID}
    )
  }

  async ListAllCustomers(){
    return await stripe.customers.list();
  }

}

export let customerStripeService = new StripeService();
