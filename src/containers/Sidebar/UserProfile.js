import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover, message } from "antd";
import { connect } from "react-redux";
import { userSignOut } from "appRedux/actions/Auth";
import { auth } from "firebase";
import { setCurrentProfile } from "appRedux/actions/Auth";
import { setCompanyPermissionApi } from "services/people";
import { useHistory } from "react-router-dom";
const UserProfile = ({
  authUser,
  activeCompany,
  activeLocation,
  isEmployeeVerified,
  isContractorVerified,
  setCurrentProfile,
}) => {
  const history = useHistory();

  const [isEmployee, setIsEmployee] = useState(false);
  const [isContractor, setIsContractor] = useState(false);
  const [currentEmployeeLogin, setCurrentEmployeeLogin] = useState("employee");

  useEffect(() => {
    updateProfileInfo();
  }, []);

  useEffect(() => {
    updateProfileInfo();
  }, [authUser,activeCompany]);

  const updateProfileInfo = () => {
    authUser.user.usercompanies.map((val, ind) => {
      console.log("active company",activeCompany,'val.company.cid',val.company.cid);
      if (activeCompany === val.company.cid) {
        setCurrentEmployeeLogin(val.type);
        setCurrentProfile(val.type);
        console.log("val in looop",val);
        if (val.type == "contractor") {
          setIsContractor(true);
          changeUserProfile("contractor");
        }
        if (val.type == "employee") {
          setIsEmployee(true);
        }
      }
    });
  };

  // useEffect(() => {
  //   console.log(
  //     "active company in user profile --------------->",
  //     activeCompany
  //   );
  // }, [activeCompany]);

  const changeUserProfile = async (currentType) => {
    let employeeVarified = false
    let contractorVarified = false
    let companyObj = {};
    let uid = authUser.user.uid;
    authUser.user.usercompanies.map((val, ind) => {
      console.log("activeCompany",activeCompany);
      if (activeCompany === val.company.cid && val.type == currentType) {
        if (currentType === "contractor") {
          contractorVarified = val.isDetailsConfirmed
        } else {
          employeeVarified  = val.isDetailsConfirmed
        }
        companyObj.type = val.type;
        companyObj.permissions = val.permissions;
        companyObj.isDetailsConfirmed = val.isDetailsConfirmed;
        companyObj.lastTokenTime = new Date();
      }
    });
    const resultUpdateStatus = await setCompanyPermissionApi(
      authUser.tokens.accessToken,
      companyObj,
      uid
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      setCurrentProfile(currentType);
      console.log("currentType",currentType,"isEmployeeVerified",employeeVarified)
      if (currentType === "contractor") {
        contractorVarified
          ? history.push("/overview")
          : history.push(`/people/contractor/verify-contractor/${uid}`);
      } else {
        employeeVarified
          ? history.push("/overview")
          : history.push(`/people/employee/verify-employee/${uid}`);
      }
    } else {
      message.error("Something went wrong..");
    }
  };

  const userProfileChange = (currentLoginType) => {
    if (currentLoginType === "contractor") {
      setCurrentEmployeeLogin("employee");
      changeUserProfile("employee");
    } else {
      setCurrentEmployeeLogin("contractor");
      changeUserProfile("contractor");
    }
  };
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      {isContractor && isEmployee && (
        <>
          {currentEmployeeLogin === "employee" && (
            <li onClick={() => userProfileChange(currentEmployeeLogin)}>
              Switch to Contractor Profile
            </li>
          )}
          {currentEmployeeLogin === "contractor" && (
            <li onClick={() => userProfileChange(currentEmployeeLogin)}>
              Switch to User Profile
            </li>
          )}
        </>
      )}
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row padding-8px-big-device">
      {/* <div>

        <Avatar src={require("assets/images/avatar/domnic-harris.png")}
          className="gx-size-40 gx-pointer gx-mr-3" alt="" />
        {
          authUser && authUser.user.type === "admin" &&
          <span className="gx-avatar-name">Admin<i
            className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
        }
      </div>
      <div>
        123
        </div>
      <div>
        demo
        <div>
        </div>
      </div> */}

      {authUser && authUser.user.usercompanies[0].type === "admin" && (
        <>
          <Popover
            placement="bottomRight"
            content={userMenuOptions}
            trigger="click"
          >
            <div className="display-flex align-item-center cursor-pointer">
              <div>
                <Avatar
                  src={require("assets/images/avatar/domnic-harris.png")}
                  className="gx-size-40 gx-pointer gx-mr-3"
                  alt=""
                />
              </div>
              <div className="text-align-center">
                <div>
                  <span className="gx-avatar-name admin-type-style">Admin</span>
                </div>
                <div className="email-sidebar">
                  <span className="email-sidebar">{authUser.user.email}</span>
                </div>
              </div>
              <div>
                <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
              </div>
            </div>
          </Popover>
        </>
      )}
      {authUser && authUser.user.usercompanies[0].type !== "admin" && (
        <>
          <Popover
            placement="bottomRight"
            content={userMenuOptions}
            trigger="click"
          >
            <div className="display-flex align-item-center cursor-pointer">
              <div>
                <Avatar
                  src={require("assets/images/avatar/domnic-harris.png")}
                  className="gx-size-40 gx-pointer gx-mr-3"
                  alt=""
                />
              </div>
              <div className="text-align-center">
                {/* <div>
                  <span className="gx-avatar-name admin-type-style">Admin</span>
                </div> */}
                <div className="email-sidebar">
                  <span className="email-sidebar">{authUser.user.email}</span>
                </div>
              </div>
              <div>
                <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
              </div>
            </div>
          </Popover>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.common.jobs,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany,
    authUser: state.auth.authUser,
    isEmployeeVerified: state.common.isEmployeeVerified,
    isContractorVerified: state.common.isContractorVerified,
  };
};

export default connect(mapStateToProps, { setCurrentProfile })(UserProfile);
