import paymentRoute from './payment';
import customerRoute from "./customer"

const configureRoutes = app => {
  paymentRoute(app);
  customerRoute(app);
};

export default configureRoutes;
