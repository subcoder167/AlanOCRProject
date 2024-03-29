import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Steps,
  Checkbox,
  InputNumber,
} from "antd";
const FormItem = Form.Item;
const { Option } = Select;
const { Step } = Steps;

const TaxDetails = (props) => {
  const [isHouseHold, setIsHouseHold] = useState(false);
  const [isFieldDisable, setIsFieldDisable] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { setCurrentStep, completedStep, formValues, uid } = props;

  useEffect(() => {
    setFieldsValue({
      federalFilingStatus: formValues.fedral
        ? formValues.fedral.filingStatus
        : "",
      deduction: formValues.fedral ? formValues.fedral.deduction : "",
      dependent: formValues.fedral ? formValues.fedral.dependent : "",
      extraWithHolding: formValues.fedral
        ? formValues.fedral.extraWithHolding
        : "",
      // multiple_jobs: formValues.fedral ? formValues.fedral.multipleJobs : "",
      otherIncome: formValues.fedral ? formValues.fedral.otherIncome : "",
      stateFilingStatus: formValues.state ? formValues.state.filingStatus : "",
      additionalWitholding: formValues.state
        ? formValues.state.extraWithHolding
        : "",
      withHoldingAllowances: formValues.state
        ? formValues.state.withHoldingAllowances
        : "",
    });
    if (
      formValues.fedral &&
      formValues.fedral.filingStatus === "Exempt from Witholding"
    ) {
      setIsFieldDisable(true);
    } else {
      setIsFieldDisable(false);
    }
    setIsHouseHold(formValues.fedral ? formValues.fedral.multipleJobs : false);
  }, [setFieldsValue, formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const newObj = {
          fedral: {
            filingStatus: values.federalFilingStatus,
            multipleJobs: isHouseHold,
            otherIncome: values.otherIncome,
            deduction: values.deduction,
            extraWithHolding: values.extraWithHolding,
            dependent: values.dependent ? +values.dependent : 0,
          },
          state: {
            filingStatus: values.stateFilingStatus,
            extraWithHolding: values.additionalWitholding,
            withHoldingAllowances:
              values.withHoldingAllowances >= 0 &&
              `${values.withHoldingAllowances}`,
          },
        };
        completedStep(
          {
            ...newObj,
          },
          true
        );
      }
    });
  };

  const onChangeStatus = (value) => {
    if (value === "Exempt from Witholding") {
      setIsFieldDisable(true);
    } else {
      setIsFieldDisable(false);
    }
  };

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-p-4" style={{ width: "100%" }}>
            <div className="gx-pb-5">
              <Steps size="small" current={1}>
                <Step title="Personal Details" />
                <Step title="Tax Details" />
                {/* <Step title="Sign Documents" /> */}
              </Steps>
            </div>
            {/* <div className="gx-fs-xxxl text-center gx-pb-4">
              Federal Tax Witholdings
            </div> */}
            <Form onSubmit={handleSubmit} className="gx-form-row0">
              <Row>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Personal Tax Info
                  </div>
                </Col>
                {/* <Col span={8} xs={24} md={8}>
                  <FormItem
                    label="Social Security Number"
                    className="display-block"
                  >
                    {getFieldDecorator("ssn", {
                      rules: [
                        { min: 9, message: "Min length 9 is required!" },
                        { max: 9, message: "Max length 9 is required!" },
                        { required: true, message: "Please input SSN!" },
                      ],
                    })(<Input placeholder="Social Security Number" />)}
                  </FormItem>
                </Col> */}
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Federal Tax Witholdings
                  </div>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Go to IRS Calculator
                  </div>
                  <div>
                    A portion of each paycheck is withheld to pay employee
                    income taxes. To determine how much, first go to the IRS
                    Calculator to figure out the answers for each field below(If
                    you do not know).
                  </div>
                  <div className="gx-pt-3">
                    <Button
                      type="primary"
                      className="min-width-150"
                      onClick={() =>
                        window.open(
                          "https://www.irs.gov/individuals/tax-withholding-estimator",
                          "_blank"
                        )
                      }
                    >
                      Go to IRS Calculator
                    </Button>
                  </div>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-2">
                    Set witholdings
                  </div>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3 ant-form-item-required">
                    Federal Filing Status (1c)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    If you select Exempt from withholding, we won't withhold
                    federal income taxes, but we'll still report taxable wages
                    on a W-2. Keep in mind that anyone who claims exemption from
                    withholding needs to submit a new W-4 each year.`
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("federalFilingStatus", {
                      rules: [
                        { required: true, message: "Please select status!" },
                      ],
                    })(
                      <Select
                        placeholder="Select Status"
                        onChange={onChangeStatus}
                      >
                        <Option value={"Single or Married Filing Seperatly"}>
                          Single or Married Filing Seperatly
                        </Option>
                        <Option value={"Married filing Jointly"}>
                          Married filing Jointly
                        </Option>
                        <Option value={"Head of Household"}>
                          Head of Household
                        </Option>
                        <Option value={"Exempt from Witholding"}>
                          Exempt from Witholding
                        </Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Multiple jobs (2c) (optional)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    Includes spouse (if applicable). Answering 2c results in
                    higher withholding, but to preserve privacy, this can be
                    left unchecked. To learn more, read the IRS’s instructions.
                  </div>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Checkbox
                      checked={isHouseHold}
                      onChange={(e) => setIsHouseHold(e.target.checked)}
                    >
                      Household only has 2 Jobs Total
                    </Checkbox>
                  </Form.Item>
                </Col>
                {/* <Col span={8} xs={24} md={8}>
              <FormItem label="Multiple Jobs" className="display-block">
                {getFieldDecorator("multiple_jobs", {
                  rules: [
                    { required: true, message: "Please input multiple jobs!" },
                  ],
                })(<Input placeholder="Multiple Jobs" />)}
              </FormItem>
            </Col> */}
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Dependent total (3) (if applicable)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    Enter the results for line 3 from the IRS calculator or form
                    W-4.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("dependent")(
                      <Input
                        disabled={isFieldDisable}
                        style={{ width: "100%" }}
                        prefix="$"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Other income (4a) (optional)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    Enter the results for line 4a from the IRS calculator or
                    form W-4.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("otherIncome")(
                      <Input
                        disabled={isFieldDisable}
                        style={{ width: "100%" }}
                        prefix="$"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Deductions (4b) (optional)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    Enter the results for line 4b from the IRS calculator or
                    form W-4.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("deduction")(
                      <Input
                        disabled={isFieldDisable}
                        style={{ width: "100%" }}
                        prefix="$"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Extra withholding (4c) (optional)
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    Enter the results for line 4c from the IRS calculator or
                    form W-4.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("extraWithHolding")(
                      <Input
                        disabled={isFieldDisable}
                        style={{ width: "100%" }}
                        prefix="$"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3 ant-form-item-required">
                    State Filing Status
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    The Head of Household status applies to unmarried
                    individuals who have a relative living with them in their
                    home. If unsure, read the CA Filing Status explanation.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("stateFilingStatus", {
                      rules: [
                        { required: true, message: "Please select status!" },
                      ],
                    })(
                      <Select placeholder="Select Status">
                        <Option value={"Single or Married (with Two Incomes)"}>
                          Single or Married (with Two Incomes)
                        </Option>
                        <Option value={"Married (One Income)"}>
                          Married (One Income)
                        </Option>
                        <Option value={"Head of Household"}>
                          Head of Household
                        </Option>
                        <Option value={"Exempt from Witholding"}>
                          Exempt from Witholding
                        </Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3 ant-form-item-required">
                    Witholding Allowance
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    This value is needed to calculate the employee's CA income
                    tax withholding. It is often the same number as the federal
                    withholding allowance. If unsure, use the CA DE-4 form to
                    calculate the value manually.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("withHoldingAllowances", {
                      rules: [
                        {
                          required: true,
                          message: "Please input witholding allowance!",
                        },
                      ],
                    })(<InputNumber min={0} style={{ width: "100%" }} />)}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <div className="gx-fs-xl gx-pt-3 gx-pb-3">
                    Additional Witholding
                  </div>
                  <div className="gx-text-muted gx-pb-2">
                    You can withhold an additional amount of California income
                    taxes here.
                  </div>
                </Col>
                <Col span={8} xs={24} md={12}>
                  <FormItem className="display-block">
                    {getFieldDecorator("additionalWitholding")(
                      <Input style={{ width: "100%" }} prefix="$" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className="flex-x center gx-pt-5">
                <FormItem>
                  <Button
                    type="secondary"
                    className="min-width-150"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="min-width-150"
                  >
                    Save
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedSignUpForm = Form.create()(TaxDetails);

export default WrappedSignUpForm;
