import React, { useState, useEffect, useMemo } from "react";
import { Breadcrumb, Icon, Tabs, Card } from "antd";
import {
  Basics,
  Compensation,
  // ContractorDetail,
  Documents,
} from "components/People/AddContractor/index";
import { connect } from "react-redux";
import { addContractorRequest } from "appRedux/actions/People";
import moment from "moment";

var randomize = require("randomatic");

const TabPane = Tabs.TabPane;

const AddContractor = (props) => {
  const [formTab, setFormTab] = useState("1");
  const [formValues, setFormValues] = useState({});
  const [pin, setPin] = useState("");
  const [formValidate, setFormValidate] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });
  const { newAdedEmployeeEmail } = props;
  const {
    addContractorRequest,
    token,
    activeLocation,
    activeCompany,
    loader,
    jobs,
    departments,
    companies,
  } = props;

  useEffect(() => {
    console.log("formValues", formValues);
  }, [formValues]);

  useEffect(() => {
    console.log("newAdedEmployeeEmail", newAdedEmployeeEmail);
    if (newAdedEmployeeEmail === "") {
      props.history.push("/people");
    }
  }, []);

  const activeCompanyDetails = useMemo(() => {
    return companies.find((a) => a.cid === activeCompany);
  }, [companies, activeCompany]);

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  const onCompleteDetail = (data, step) => {
    setFormValidate({
      ...formValidate,
      [step]: true,
    });
    setFormValues((values) => {
      return {
        ...values,
        ...data,
      };
    });
  };

  const autoGeneratePin = () => {
    let generatedPin = randomize("0", 4);
    console.log(generatedPin);
    setPin(generatedPin);
  };

  const onFinish = (data) => {
    setFormValues((values) => {
      return {
        ...values,
        ...data,
      };
    });

    const contractorObj = {
      company: activeCompany,
      location: formValues.location,
      pin: formValues.userPin1,
      businessName: formValues.businessName ? formValues.businessName : "",
      contactName: formValues.contactName ? formValues.contactName : "",
      ein: formValues.ein ? formValues.ein : "",
      ssn: formValues.ssn ? formValues.ssn : "",
      firstName: formValues.firstName ? formValues.firstName : "",
      lastName: formValues.lastName ? formValues.lastName : "",
      middleName: formValues.middleName ? formValues.middleName : "",
      phone: formValues.phone ? formValues.phone : "",
      dob: formValues.dob
        ? new Date(moment(formValues.dob._d).format("YYYY-MM-DD")).toISOString()
        : null,
      address: {
        zip: Number(formValues.zip),
        city: formValues.city,
        state: formValues.state,
        street1: formValues.street1,
        street2: formValues.street2,
      },
      type: formValues.type,
      email: formValues.email,
      role: "basic",
      compensation: {
        jobTitle: formValues.jobTitle,
        // status: formValues.status,
        defaultAmount: formValues.defaultAmount
          ? Number(formValues.defaultAmount)
          : null,
        type: formValues.wageType,
        rate: formValues.hourlyAmount
          ? Number(formValues.hourlyAmount)
          : Number(formValues.defaultAmount),
        department: formValues.department,
        startDate: new Date(
          moment(formValues.startDate._d).format("YYYY-MM-DD")
        ).toISOString(),
        defaultHours: formValues.defaultHours ? formValues.defaultHours : null,
      },
      docs: data.docs,
    };
    if (formValues.emergencyFullName) {
      contractorObj["emergencyInfo"] = {
        fullName: formValues.emergencyFullName
          ? formValues.emergencyFullName
          : "",
        relation: formValues.emergencyRelationship
          ? formValues.emergencyRelationship
          : "",
        phone: formValues.emergencyPhone ? formValues.emergencyPhone : "",
        email: formValues.emergencyEmail ? formValues.emergencyEmail : "",
      };
    }
    addContractorRequest(contractorObj);
  };

  return (
    <div>
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => props.history.push("/people")}>
            <span className="gx-link">
              <span>People</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Add Contractor</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Add Contractor">
        <Tabs
          className="tab-modal-timesheet"
          activeKey={formTab}
          onChange={onChangeFormTab}
        >
          <TabPane tab="Basics" key={1}>
            <Basics
              prefillEmail={newAdedEmployeeEmail}
              setFormTab={setFormTab}
              onCompleteDetail={onCompleteDetail}
              autoGeneratedPin={pin}
              autoGeneratePinFun={autoGeneratePin}
              activeCompanyDetails={activeCompanyDetails}
              activeCompany={activeCompany}
              activeLocation={activeLocation}
              token={token}
            />
          </TabPane>
          <TabPane tab="Compensation" key={2} disabled={!formValidate.step1}>
            <Compensation
              setFormTab={setFormTab}
              onCompleteDetail={onCompleteDetail}
              jobs={jobs}
              departments={departments}
              activeCompanyDetails={activeCompanyDetails}
            />
          </TabPane>
          <TabPane tab="Documents" key={3} disabled={!formValidate.step2}>
            <Documents
              loader={false}
              setFormTab={setFormTab}
              onFinish={onFinish}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    loader: state.people.loader,
    jobs: state.common.jobs,
    departments: state.common.departments,
    companies: state.common.companies,
    token: state.auth.authUser.tokens.accessToken,
    newAdedEmployeeEmail: state.people.newAdedEmployeeEmail,
  };
};

export default connect(mapStateToProps, {
  addContractorRequest,
})(AddContractor);
