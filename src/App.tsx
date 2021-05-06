import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Textfield from "./Textfield";

import Nav from "./Nav";
import Abt from "./Abt";
import Home from "./Home";
import Detail from "./Detail";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav /> */}
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/home" exact component={Home} />
          <Route path="/abt" exact component={Abt} />
          <Route path="/home/:uuid" exact component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
