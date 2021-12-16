import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import ClockPin from "./../../components/PunchClock/ClockPin";
import ClockStatus from "./../../components/PunchClock/ClockStatus";
import CompanyLocation from "./../../components/PunchClock/CompanyLocation";
import CompanySelector from "./../../components/PunchClock/CompanySelector";
import AppLoader from "./../../components/Common/AppLoader";
import {
  commonGetCompanyRequest,
  setActiveCompany,
} from "appRedux/actions/Common";
import { getJobRequest } from "appRedux/actions/Common";

const PunchClock = (props) => {
  const {
    companies,
    rememberLocation,
    rememberCompany,
    activeCompany,
    token,
    activeLocation,
    loader,
    getJobRequest,
    commonGetCompanyRequest,
    jobs,
    setActiveCompany,
  } = props;
  const [currentTab, setCurrentTab] = useState("company");
  const [loginUserName, setLoginUserName] = useState();
  const [loginUserId, setLoginUserId] = useState();
  const [isTakeBreak, setIsTakeBreak] = useState(false);
  const [status, setStatus] = useState("clockin");
  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedOptionLocation, setSelectedOptionLocation] = useState();
  const [selectedOptionCompany, setSelectedOptionCompany] = useState();
  const [selectedOptionJob, setSelectedOptionJob] = useState();
  const [addedPin, setAddedPin] = useState();
  const [jobData, setJobData] = useState();
  const [jobNote, setJobNote] = useState();
  const [lastCheckInStatus, setLastCheckInStatus] = useState();
  const [lastACtivityStatusArr, setLastACtivityStatusArr] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obj = {
      page: 1,
      active: true,
    };
    commonGetCompanyRequest(obj);
  }, []);

  useEffect(() => {
    if (companies.length > 1) {
      if (rememberCompany) {
        setSelectedOptionCompany(rememberCompany);
        if (rememberLocation) {
          setSelectedOptionLocation(rememberLocation);
          setCurrentTab("pin");
          stopLoading();
          return;
        }
        setCurrentTab("location");
        stopLoading();
        return;
      }
      setCurrentTab("company");
      stopLoading();
    } else {
      if (rememberLocation) {
        setSelectedOptionLocation(rememberLocation);
        setCurrentTab("pin");
        stopLoading();
        return;
      }
      setCurrentTab("location");
      stopLoading();
    }
  }, [companies]);

  const stopLoading = () => {
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    if (jobs == "") {
      console.log("not getting data");
    }
  }, [jobs]);

  useEffect(() => {
    console.log('jobs',jobs,selectedOptionLocation);
    const params = {
      company: activeCompany,
    };
    getJobRequest(params);
    setJobData(jobs);
  }, [addedPin, activeCompany]);


  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          {currentTab === "company" && (
            <CompanySelector
              selectedOption={selectedOptionCompany}
              setSelectedOption={setSelectedOptionCompany}
              setCurrentTab={setCurrentTab}
              stopLoading={stopLoading}
              props={props}
            />
          )}
          {currentTab === "location" && (
            <CompanyLocation
              selectedOption={selectedOptionLocation}
              setSelectedOption={setSelectedOptionLocation}
              setCurrentTab={setCurrentTab}
              stopLoading={stopLoading}
              selectedCompany={rememberCompany}
              props={props}
            />
          )}
          {currentTab === "pin" && (
            <ClockPin
              activeCompany={activeCompany}
              activeLocation={activeLocation}
              setIsTakeBreak={setIsTakeBreak}
              isTakeBreak={isTakeBreak}
              setLastACtivityStatusArr={setLastACtivityStatusArr}
              setLastCheckInStatus={setLastCheckInStatus}
              token={token}
              setLoginUserId={setLoginUserId}
              setLoginUserName={setLoginUserName}
              currentLocation={selectedOptionLocation}
              setAddedPin={setAddedPin}
              setCurrentTab={setCurrentTab}
              stopLoading={stopLoading}
            />
          )}
          {currentTab === "status" && addedPin != "" && (
            <ClockStatus
              setCurrentTab={setCurrentTab}
              status={status}
              ss
              loader={false}
              lastACtivityStatusArr={lastACtivityStatusArr}
              loginUserId={loginUserId}
              loginUserName={loginUserName}
              isTakeBreak={isTakeBreak}
              currentLocation={selectedOptionLocation}
              activeCompany={activeCompany}
              activeLocation={activeLocation}
              setStatus={setStatus}
              addedPin={addedPin}
              jobData={jobData}
              lastCheckInStatus={lastCheckInStatus}
              setLastCheckInStatus={setLastCheckInStatus}
              selectedOptionJob={selectedOptionJob}
              setSelectedOptionJob={setSelectedOptionJob}
              setCurrentTab={setCurrentTab}
              setIsTakeBreak={setIsTakeBreak}
              setJobNote={setJobNote}
              jobNote={jobNote}
              token={token}
              stopLoading={stopLoading}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.common.companies,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    token: state.auth.authUser.tokens.accessToken,
    jobs: state.common.jobs,
    loader: state.people.loader,
    rememberLocation: state.auth.punchClockLocation,
    rememberCompany: state.auth.punchClockCompany,
  };
};

export default connect(mapStateToProps, {
  commonGetCompanyRequest,
  setActiveCompany,
  getJobRequest,
})(PunchClock);
