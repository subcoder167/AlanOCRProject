import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Icon, Checkbox, Button, message } from "antd";
import { rememberLocationPunchClock } from "appRedux/actions/Auth";
const CompanyLocation = (props) => {
  const {
    setSelectedOption,
    selectedOption,
    setCurrentTab,
    selectedCompany,
  } = props;
  const { searchText, setLocation, companies, activeLocation } = props.props;
  console.log("companies", companies);
  const [rememberMe, setRememberMe] = useState(false);
  const getCompanies = useMemo(() => {
    if (companies && companies.length) {
      if (selectedCompany) {
        const filteredCompanies = companies.filter((company) => {
          return company.cid === selectedCompany.cid;
        });
        return filteredCompanies;
      }
      return companies;
    }
    return [];
  }, [searchText, companies, selectedCompany]);

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
      rememberLocationPunchClock(selectedOption);
    }
    setCurrentTab("pin");
  };

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div
            className="gx-p-4 m-auto gx-app-login-content"
            style={{ width: "100%" }}
          >
            <div className="gx-fs-xxxl text-center gx-pb-4">
              Which Location?
            </div>
            <div className="location-list">
              {getCompanies.length &&
                getCompanies.map((c, i) => {
                  return (
                    <div>
                      {c.locations &&
                        c.locations[0] &&
                        c.locations.map((l, i) => {
                          return (
                            <div
                              onClick={(e) => {
                                selectOption(e, l);
                              }}
                              className="location flex-x space-between"
                            >
                              {l.name}{" "}
                              {selectedOption &&
                                selectedOption.lid == l.lid && (
                                  <Icon type="check" />
                                )}
                            </div>
                          );
                        })}
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
                  Remember Selected Location for this Device
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
  rememberLocationPunchClock,
})(CompanyLocation);

// export default CompanyLocation
