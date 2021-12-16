import React from "react";
import {Route, Switch} from "react-router-dom";
import MobileDashboard from "./MobileDashboard";

const MobileImageView = ({match}) => (
  <Switch>
    <Route path={`${match.url}`} component={MobileDashboard}/>
  </Switch>
);

export default MobileImageView;
