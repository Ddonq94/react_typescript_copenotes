import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Abt from "./Abt";
import Home from "./Home";
import Detail from "./Detail";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Company from "./pages/Company";
import Area from "./pages/Area";
import Location from "./pages/Location";
import Equipment from "./pages/Equipment";
import Transaction from "./pages/Transaction";
import User from "./pages/User";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
        <Switch>
          <UserProvider>
            <Route path="/" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/company" exact component={Company} />
            <Route path="/area" exact component={Area} />
            <Route path="/location" exact component={Location} />
            <Route path="/equipment" exact component={Equipment} />
            <Route path="/transaction" exact component={Transaction} />
            <Route path="/user" exact component={User} />
            <Route path="/home" exact component={Home} />
            <Route path="/abt" exact component={Abt} />
            <Route path="/home/:uuid" exact component={Detail} />
          </UserProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
