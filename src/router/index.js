  
import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Home from "../pages/Home.js";
import Count from "../pages/Count.js";
import Login from "../pages/login";

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      <Link to="/home">toHome</Link>&emsp;|&emsp;
      <Link to="/count">toCount</Link>&emsp;|&emsp;
      <Link to="/login">toLogin</Link>
    </header>
    <main>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/count" exact component={Count} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </main>
  </div>
);

export default PrimaryLayout;