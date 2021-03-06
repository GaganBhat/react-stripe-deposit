import Stripe from 'stripe';
import * as Firestore from "../services/firestore"
require("dotenv").config();

const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Ping from Checkout Server',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
    });
  });

  app.post('/payment/session-initiate', async (req, res) => {
    const {
      clientReferenceId,
      customerEmail,
      lineItem,
      successUrl,
      cancelUrl,
    } = req.body;

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    let session;


    try {
      session = await stripe.checkout.sessions.create({
        client_reference_id: clientReferenceId,
        customer_email: customerEmail,
        payment_method_types: ['card'],
        line_items: [lineItem],
        payment_intent_data: {
          description: `${lineItem.name} ${lineItem.description}`,
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      console.log("------------------");
      console.log("Initialized session payment for " + customerEmail);
    } catch (error) {
      console.log("Oof, payments failed due to " + error);
      res.status(500).send({ error });
    }

    return res.status(200).send(session);
  });

  app.post('/payment/session-complete', async (req, res) => {
    console.log("------------------");
    console.log("Received session complete webhook request")
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    let event = req.body;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_KEY
      );
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = event.data.object.customer_email;
      const totalAmount = event.data.object.amount_total;
      try {
        console.log("Processing Session Completed Event for " + email +
          " for " + "$" + (totalAmount/100.0));
        await Firestore.AddUserDeposit(email, (totalAmount / 100.0));
      } catch (error) {
        console.log("------------------");
        console.log("Error = " + error)
        return res.status(404).send({ error, session });
      }
    }
    console.log("------------------");
    return res.status(200).send({ received: true });
  })

  return app;
};

export default paymentApi;
