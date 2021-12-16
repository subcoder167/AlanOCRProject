import React from "react";
import {Route, Switch} from "react-router-dom";
import MobileDashboard from "./MobileDashboard";

const MobileOverview = ({match}) => (
  <Switch>
    <Route path={`${match.url}`} component={MobileDashboard}/>
  </Switch>
);

export default MobileOverview;
