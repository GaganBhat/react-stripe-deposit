import express from 'express';
import cors from "cors";

const configureServer = app => {
  app.use(cors());
  app.use(
    express.json({
      // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
      verify: (req, res, buf) => {
        if (req.originalUrl.startsWith('/payment/session-complete')) {
          req.rawBody = buf.toString();
        }
      },
    })
  );
};

export default configureServer;
