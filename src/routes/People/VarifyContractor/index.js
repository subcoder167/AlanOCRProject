import React, { useState, useEffect } from "react";
import WelcomePage from "./../../../components/VerifyProfile/WelcomePage";
import PersonalDetails from "./../../../components/VerifyProfile/Contractor/PersonalDetails";
import SignDocuments from "./../../../components/VerifyProfile/SignDocument/index";
import {
  getContractorDetailToVerify,
  updateContractorDetail,
  setCompanyPermissionApi,
} from "../../../services/people";
import AppLoader from "./../../../components/Common/AppLoader";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { isEqual } from "lodash";
import * as Actions from "../../../appRedux/actions/Common";

const VarifyContractor = (props) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState("welcome");
  const [formValues, setFormValues] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    match: { params },
  } = props;
  const { authUser } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.common);
  console.log("active company---------------------------", activeCompany);
  const [addedLocation, setAddedLocation] = useState("");
  const [userCompanyDetail, setUserCompanyDetail] = useState();

  useEffect(() => {
    const getDetails = async () => {
      const obj = {
        user: params.token,
        company: authUser.user.usercompanies.find(
          (company) => company.type === "contractor"
        ).company,
      };
      console.log("obj", obj);
      console.log("auth user", authUser);
      setUserCompanyDetail(obj.company);
      setLoading(true);
      const result = await getContractorDetailToVerify(
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

  const completedStep = (value, isSubmitFlag = false) => {
    setFormValues({
      ...formValues,
      ...value,
    });

    if (isSubmitFlag) {
      setIsSubmit(true);
    }
  };

  const updateContractor = async () => {
    const contractorObject = formValues.user.usercompanies.find((company) => {
      return company.company.cid === userCompanyDetail.cid;
    });
    console.log("update contractor", contractorObject);
    const obj = {
      user: contractorObject.company.cid,
      company: contractorObject.location[0].location.lid,
    };
    let setDetailedConfirmFlag = {
      isDetailsConfirmed: "true",
    };
    dispatch(Actions.updateContractorVerifyDetail(true));
    setDetailedConfirmFlag.type = contractorObject.type;
    setDetailedConfirmFlag.permissions = contractorObject.permissions;

    setDetailedConfirmFlag.lastTokenTime = new Date();
    let uid = contractorObject.uid;

    const resultUpdateStatus = await setCompanyPermissionApi(
      authUser.tokens.accessToken,
      setDetailedConfirmFlag,
      uid
    );

    const response = await updateContractorDetail(
      authUser.tokens.accessToken,
      obj,
      formValues
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      if (response.status === 200 || response.status === 201) {
        message.success("Contractor data successfully updated.");
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
      updateContractor();
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
                employeeData={formValues}
                setCurrentStep={setCurrentStep}
                completedStep={completedStep}
                setAddedLocation={setAddedLocation}
              />
            ) : (
              currentStep === 1 && (
                <PersonalDetails
                  formValues={formValues}
                  setCurrentStep={setCurrentStep}
                  completedStep={completedStep}
                />
              )
            )
            // ) : currentStep === 2 ? (
            //   <ContractorDetails
            //     formValues={formValues}
            //     setCurrentStep={setCurrentStep}
            //     completedStep={completedStep}
            //   />
            // ) : (
            //   (
            //   currentStep === 2 && (
            //     <SignDocuments
            //       formValues={formValues}
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

export default VarifyContractor;
