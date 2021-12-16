import React from "react";
import {Route, Switch} from "react-router-dom";
import Camera from "./Camera";

const MobileCamera = ({match}) => (
  <Switch>
    <Route path={`${match.url}`} component={Camera}/>
  </Switch>
);

export default MobileCamera;
