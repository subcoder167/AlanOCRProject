import React, { useState, useEffect } from "react";
import WelcomePage from "../../../components/VerifyProfile/WelcomePage";
import PersonalDetails from "../../../components/VerifyProfile/Employee/PersonalDetails";
import TaxDetails from "../../../components/VerifyProfile/Employee/TaxDetails";
import SignDocuments from "../../../components/VerifyProfile/SignDocument";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployeeDetailToVerify,
  updateEmployeeDetail,
  setCompanyPermissionApi,
} from "../../../services/people";
import AppLoader from "../../../components/Common/AppLoader";
import { message } from "antd";
import * as Actions from "../../../appRedux/actions/Common";

// const initialState = {
//   dob: '',
//   firstName: '',
//   lastName: '',
//   middleName: '',
//   phone: '',
//   ssn: '',
//   address: {
//     city: "",
//     state: "",
//     street1: "",
//     street2: "",
//     zip: ""
//   },
//   additionalWitholding: '',
//   deductions: '',
//   dependents: '',
//   extraWithholding: '',
//   federalFilingStatus: null,
//   multiple_jobs: '',
//   otherIncome: '',
//   stateFilingStatus: null,
//   withHoldingAllowances: '',
// };

const VerifyEmployee = (props) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState("welcome");
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [addedLocation, setAddedLocation] = useState("");
  const [userCompanyDetail, setUserCompanyDetail] = useState();
  const {
    match: { params },
  } = props;
  let { location } = props;
  const { authUser } = useSelector((state) => state.auth);
  useEffect(() => {
    const getDetails = async () => {
      const obj = {
        user: params.token,
        company: authUser.user.usercompanies.find(
          (company) => company.type === "employee"
        ).company,
      };
      setUserCompanyDetail(obj.company);
      setLoading(true);
      const result = await getEmployeeDetailToVerify(
        authUser.tokens.accessToken,
        obj
      );
      if (result.status === 200) {
        setFormValues(result.data);
        setLoading(false);
      }
    };
    getDetails();
  }, [params, authUser]);

  const [isSubmit, setIsSubmit] = useState(false);
  const completedStep = (value, isSubmitFlag = false) => {
    setFormValues({
      ...formValues,
      ...value,
    });

    if (isSubmitFlag) {
      setIsSubmit(true);
    }
  };

  const updateEmployee = async () => {
    const employeeObject = formValues.user.usercompanies.find((company) => {
      return company.company.cid === userCompanyDetail.cid;
    });
    console.log("update employee", employeeObject);
    const obj = {
      user: employeeObject.company.cid,
      company: employeeObject.location[0].location.lid,
    };

    let setDetailedConfirmFlag = {
      isDetailsConfirmed: "true",
    };
    dispatch(Actions.updateEmployeeVerifyDetail(true));
    setDetailedConfirmFlag.type = employeeObject.type;
    setDetailedConfirmFlag.permissions = employeeObject.permissions;

    setDetailedConfirmFlag.lastTokenTime = new Date();
    let uid = employeeObject.uid;

    const resultUpdateStatus = await setCompanyPermissionApi(
      authUser.tokens.accessToken,
      setDetailedConfirmFlag,
      uid
    );

    const response = await updateEmployeeDetail(
      authUser.tokens.accessToken,
      obj,
      formValues
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      if (response.status === 200 || response.status === 201) {
        message.success("Employee data successfully updated.");
        props.history.push("/overview");
      } else {
        message.error("Please try again !");
      }
    } else {
      message.error("Please try again !");
    }
  };

  useEffect(() => {
    if (isSubmit) {
      updateEmployee();
    }
    setIsSubmit(false);
  }, [isSubmit, formValues]);

  return (
    <div className="gx-app-login-wrap">
      {loading ? (
        <AppLoader />
      ) : (
        <>
          {
            currentStep === "welcome" ? (
              <WelcomePage
                setCurrentStep={setCurrentStep}
                completedStep={completedStep}
                isEmployee={true}
                employeeData={formValues}
                setAddedLocation={setAddedLocation}
              />
            ) : currentStep === 1 ? (
              <PersonalDetails
                setCurrentStep={setCurrentStep}
                completedStep={completedStep}
                formValues={formValues}
              />
            ) : (
              currentStep === 2 && (
                <TaxDetails
                  formValues={formValues}
                  setCurrentStep={setCurrentStep}
                  completedStep={completedStep}
                  uid={params.token}
                  addedLocation={addedLocation}
                />
              )
            )
            //  : (
            //   currentStep === 3 && (
            //     <SignDocuments
            //       setCurrentStep={setCurrentStep}
            //       completedStep={completedStep}
            //     />
            //   )
            // )
          }
        </>
      )}
    </div>
  );
};

export default VerifyEmployee;
