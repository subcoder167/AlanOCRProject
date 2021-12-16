import React from "react";
import { Route, Switch } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import CheckPeopleEmail from "./CheckPeopleEmail";
import AddContractor from "./AddContractor";
import ListPeople from "./ListPeople";
import ViewEmployee from "./ViewEmployee";
import ViewContrator from "./ViewContrator";
import VarifyContractor from "./VarifyContractor";
import VerifyEmployee from "./VerifyEmployee";

const People = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/contractor/verify-contractor/:token`}
      component={VarifyContractor}
    />
    <Route
      path={`${match.url}/employee/verify-employee/:token`}
      component={VerifyEmployee}
    />
    <Route path={`${match.url}/check-email/:id`} component={CheckPeopleEmail} />
    <Route path={`${match.url}/add-employee`} component={AddEmployee} />
    <Route path={`${match.url}/add-contractor`} component={AddContractor} />
    <Route path={`${match.url}/view-employee/:id`} component={ViewEmployee} />
    <Route
      path={`${match.url}/view-contractor/:id`}
      component={ViewContrator}
    />
    <Route path={`${match.url}`} component={ListPeople} />
  </Switch>
);

export default People;
