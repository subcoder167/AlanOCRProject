import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Icon, Checkbox, Button, message } from "antd";
import { rememberCompanyPunchClock } from "appRedux/actions/Auth";
const CompanySelector = (props) => {
  const {
    setSelectedOption,
    rememberCompanyPunchClock,
    selectedOption,
    setCurrentTab,
  } = props;
  const { searchText, setLocation, companies, activeLocation } = props.props;
  console.log("companies", companies);
  const [rememberMe, setRememberMe] = useState(false);
  const getCompanies = useMemo(() => {
    if (companies && companies.length) {
      console.log(companies);
      return companies;
    }
    return [];
  }, [searchText, companies]);

  const selectOption = (e, l) => {
    // e.stopPropogation()
    setSelectedOption(l);
    // setLocation(l)
    console.log(l);
  };

  const rememberLocationHandler = (e) => {
    if (e.target.checked) {
      console.log("in this called");
      setRememberMe(true);
    }
  };

  const setNextButton = () => {
    if (rememberMe) {
      console.log("remember company", selectedOption);
      rememberCompanyPunchClock(selectedOption);
    }
    setCurrentTab("location");
  };

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div
            className="gx-p-4 m-auto gx-app-login-content"
            style={{ width: "100%" }}
          >
            <div className="gx-fs-xxxl text-center gx-pb-4">Which Company?</div>
            <div className="location-list">
              {getCompanies.length &&
                getCompanies.map((c, i) => {
                  return (
                    <div>
                      <div
                        onClick={(e) => {
                          selectOption(e, c);
                        }}
                        className="location flex-x space-between"
                      >
                        {c.name}{" "}
                        {selectedOption && selectedOption.cid == c.cid && (
                          <Icon type="check" />
                        )}
                      </div>
                    </div>
                  );
                })}
              {/* <div className="location flex-x space-between">
                Cafe Pesto <Icon type="check" />
              </div>
              <div className="location">
                Cafe Pesto
              </div>
              <div className="location">
                Cafe Pesto
              </div> */}
              <div className="gx-pt-3">
                <Checkbox
                  onChange={(e) => {
                    rememberLocationHandler(e);
                  }}
                >
                  Remember Selected Company for this Device
                </Checkbox>
              </div>
              <div className="text-center gx-pt-5">
                <Button type="primary" onClick={() => setNextButton()}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { alertMessage } = auth;
  return { alertMessage };
};

export default connect(mapStateToProps, {
  rememberCompanyPunchClock,
})(CompanySelector);

// export default CompanyLocation
