import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from "url-search-params";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SetNewPassword from "../People/SetNewPassword";
import VerifyEmployeeProfileSteps from "../People/VerifyEmployeeProfileSteps";
import VerifyDocumentSteps from "../People/VerifyDocumentSteps";
import PunchClock from "../PunchClock";
import VerifyContractorProfileSteps from "../People/VerifyContractorProfileSteps";
import { setInitUrl } from "appRedux/actions/Auth";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({
  component: Component,
  location,
  authUser,
  ...rest
}) => (
  
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        
        <Redirect
          to={{
            pathname:'/signup',
            state: { from: location },
          }}
        />
      )
    }
  />
);

const App = (props) => {
  const dispatch = useDispatch();
  const { locale, navStyle, layoutType } = useSelector(
    ({ settings }) => settings
  );
  const { authUser, initURL } = useSelector(({ auth }) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "/css/style.css";
    link.className = "gx-style";
    document.body.appendChild(link);
  });

  useEffect(() => {
    if (initURL === "") {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    console.log("params", params);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get("theme")));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get("nav-style")));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get("layout-type")));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  });

  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  const setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };

  const [path,setPath]=useState('')
  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
      // true for mobile device
        console.log('not mobile in new');
        setPath('/punch-clock')
        console.log(path)
        
    }
    else
    {
      setPath('/superadmin/companies')
    }
    if (location.pathname === "/") {
      if (authUser === null) {
        history.push("/signin");
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        history.push(path);
      } else {
        history.push(initURL);
      }
    }
    
  }, [authUser, initURL, location, history]);

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/people/set-profile/:token"
            component={SetNewPassword}
          />
          <RestrictedRoute
            path={`/people/verify-employee/:token`}
            authUser={authUser}
            location={location}
            component={VerifyEmployeeProfileSteps}
          />
          <RestrictedRoute
            path={`/people/verify-document/:token`}
            authUser={authUser}
            location={location}
            component={VerifyDocumentSteps}
          />
          <RestrictedRoute
            path={`/people/verify-contractor/:token`}
            authUser={authUser}
            location={location}
            component={VerifyContractorProfileSteps}
          />
          <RestrictedRoute
            path={`/punch-clock`}
            authUser={authUser}
            location={location}
            component={PunchClock}
          />
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);
