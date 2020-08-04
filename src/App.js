import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthProvider } from './Auth'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
