import express from 'express';
import fs from "fs";
import https from "https";

import SERVER_CONFIGS from './constants/server';

import configureServer from './server';
import configureRoutes from './routes';

const app = express();

// Certificate
const privateKey = fs.readFileSync('/home/ubuntu/Programming/sports-betting/certificates/api.gaganbhat.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/home/ubuntu/Programming/sports-betting/certificates/api.gaganbhat.me/cert.pem', 'utf8');
const ca = fs.readFileSync('/home/ubuntu/Programming/sports-betting/certificates/api.gaganbhat.me/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};


configureServer(app);
configureRoutes(app);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
