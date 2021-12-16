import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";
const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}overview`} component={asyncComponent(() => import('./Overview'))}/>
      <Route path={`/bulkUpload`} component={asyncComponent(() => import('./Overview/bulkUpload'))}/>
      <Route path={`${match.url}superadmin`} component={asyncComponent(() => import('./SuperAdmin'))}/>
      <Route path={`${match.url}people`} component={asyncComponent(() => import('./People'))}/>
      <Route path={`${match.url}settings`} component={asyncComponent(() => import('./Settings'))}/>
      <Route path={`${match.url}expense`} component={asyncComponent(() => import('./Expense'))}/>
      <Route path={`${match.url}mobileview`} component={asyncComponent(() => import('./MobileView'))}/>
      <Route path={`${match.url}mobileimageview`} component={asyncComponent(() => import('./MobileImageView'))}/>
      <Route path={`${match.url}mobileoverview`} component={asyncComponent(() => import('./MobileViewAdd'))}/>
      <Route path={`${match.url}camera`} component={asyncComponent(() => import('./Camera'))}/>
    </Switch>
  </div>
);

export default App;
