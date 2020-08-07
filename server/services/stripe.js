const stripe = require("stripe")("sk_test_51HCa9xJnjJ8gDiA1FlknLxJLsfXe7MVH9Zu2JQXdrGSbsUpFDst72lpL6F4ic79qQCuGUW0V61XvGvoXNIOsuGwM00u1wVL3fr");

class StripeService {
  async CreateCustomer(userData) {
    return await stripe.customers.create({
      email: userData.email,
      name: userData.name
    });
  }
}

export let stripeService = new StripeService();
