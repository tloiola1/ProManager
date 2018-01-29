import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Manager from "./pages/Manager";
import Tenant from "./pages/Tenant";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/manager" component={Manager} />
        <Route exact path="/tenant" component={Tenant} />
      </Switch>
    </div>
  </Router>;

export default App;