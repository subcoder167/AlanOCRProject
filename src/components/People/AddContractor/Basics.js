import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
  Select,
  Icon,
  message,
} from "antd";
import { withRouter } from "react-router-dom";
import stateList from "./../../../util/State";
import { getValidPin } from "./../../../services/people";
import NumberFormat from "react-number-format";
import { cloneDeep } from "lodash";
var randomize = require("randomatic");

const FormItem = Form.Item;
const { Option } = Select;

const Basics = (props) => {
  const [isEmergency, setIsEmergency] = useState(true);
  const [type, setType] = useState("individual");
  const {
    onCompleteDetail,
    prefillEmail,
    setFormTab,
    token,
    activeLocation,
    activeCompany,
    checkedValidPin,
    autoGeneratedPin,
    autoGeneratePinFun,
  } = props;
  const { getFieldDecorator, setFieldsValue } = props.form;

  // const [phoneNumber, setPhoneNumber] = useState();
  // const [SSN, setSSN] = useState();
  // const [EIN, setEIN] = useState();
  // const [emergencyPhone, setEmergencyPhone] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        let dataObj = {
          company: activeCompany,
          location: activeLocation,
          pin: values.userPin1,
        };
        const result = await getValidPin(token, dataObj);
        if (result.status !== 200) {
          message.error("This pin is not unique you have to add unique pin!");
          return;
        }
        // const vals = cloneDeep(values);
        // vals.phone = phoneNumber;
        // if (type === "individual") {
        //   vals.ssn = SSN;
        // } else {
        //   vals.ein = EIN;
        // }
        // if (vals.emergencyPhone) {
        //   vals.emergencyPhone = emergencyPhone;
        // }
        onCompleteDetail({ ...values, type: type }, "step1");
        setFormTab("2");
      }
    });
  };

  // const autoGeneratePin = (e) => {
  //   e.preventDefault()
  //   autoGeneratePinFun()
  // }

  useEffect(() => {
    setFieldsValue({
      email: prefillEmail,
    });
  }, []);

  const autoGeneratePin = (e) => {
    e.preventDefault();
    let generatedPin = randomize("0", 4);
    console.log(generatedPin);
    setFieldsValue({
      userPin1: generatedPin,
    });
    // autoGeneratePinFun()
  };

  // const handlePhoneNumber = (value) => {
  //   setPhoneNumber(value.value);
  // };

  // const handleSSN = (value) => {
  //   setSSN(value.value);
  // };

  // const handleEIN = (value) => setEIN(value.value);

  // const handleEmergencyPhone = (value) => setEmergencyPhone(value.value);

  return (
    <Form onSubmit={handleSubmit} className="gx-form-row0">
      <FormItem label="Contractor Type" className="gx-px-3">
        <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
          <Radio value="individual">Individual</Radio>
          <Radio value="business">Business</Radio>
        </Radio.Group>
      </FormItem>
      {type === "individual" ? (
        <Row>
          <Col span={8} xs={24} md={8}>
            <FormItem label="First Name" className="display-block">
              {getFieldDecorator("firstName", {
                rules: [
                  { required: true, message: "Please input first name!" },
                ],
              })(<Input placeholder="First Name" />)}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Middle Name" className="display-block">
              {getFieldDecorator("middleName")(
                <Input type="text" placeholder="Middle Name" />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Last Name" className="display-block">
              {getFieldDecorator("lastName", {
                rules: [{ required: true, message: "Please input last name!" }],
              })(<Input type="text" placeholder="Last Name" />)}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    pattern: new RegExp(
                      /([+]{1}\d{1}[\s]{1})?(\({1}\d{3}\){1}[\s]{1})(\d{3}[.-]{1})\d{4}/g
                    ),
                    message: "Please enter valid phone number",
                  },
                  { required: true, message: "Please input phone number!" },
                ],
              })(
                <NumberFormat
                  customInput={Input}
                  type="text"
                  placeholder="Phone Number"
                  format="+1 (###) ###-####"
                  mask="_"
                  // onValueChange={handlePhoneNumber}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Date of birth" className="display-block">
              {getFieldDecorator("dob", {
                rules: [{ required: true, message: "Please input birthdate!" }],
              })(
                <DatePicker format={"MM-DD-YYYY"} style={{ width: "100%" }} />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Email" className="display-block">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }],
              })(<Input type="text" placeholder="Email" disabled />)}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Social Security Number" className="display-block">
              {getFieldDecorator("ssn", {
                rules: [
                  {
                    pattern: new RegExp(/\d{3}[-]{1}\d{2}[-]{1}\d{4}/g),
                    message: "Please enter valid SSN",
                  },
                  { required: true, message: "Please input SSN!" },
                ],
              })(
                <NumberFormat
                  customInput={Input}
                  placeholder="SSN"
                  format="###-##-####"
                  // onValueChange={handleSSN}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Business Name" className="display-block">
              {getFieldDecorator("businessName", {
                rules: [
                  { required: true, message: "Please input business name!" },
                ],
              })(<Input placeholder="Business Name" />)}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Contact Name" className="display-block">
              {getFieldDecorator("contactName")(
                <Input placeholder="Contact Name" />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="E-mail" className="display-block">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }],
              })(<Input type="text" placeholder="Email" disabled/>)}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    pattern: new RegExp(
                      /([+]{1}\d{1}[\s]{1})?(\({1}\d{3}\){1}[\s]{1})(\d{3}[.-]{1})\d{4}/g
                    ),
                    message: "Please enter valid phone number",
                  },
                  { required: true, message: "Please input phone number!" },
                ],
              })(
                <NumberFormat
                  customInput={Input}
                  type="text"
                  placeholder="Phone Number"
                  format="+1 (###) ###-####"
                  mask="_"
                  // onValueChange={handlePhoneNumber}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={8}>
            <FormItem label="EIN" className="display-block">
              {getFieldDecorator("ein", {
                rules: [
                  {
                    pattern: new RegExp(/\d{3}[-]{1}\d{2}[-]{1}\d{4}/g),
                    message: "Please enter valid EIN",
                  },
                  { required: true, message: "Please input EIN!" },
                ],
              })(
                <NumberFormat
                  customInput={Input}
                  placeholder="EIN"
                  format="###-##-####"
                  // onValueChange={handleEIN}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={24} xs={24} md={24} className="gx-pt-3 gx-pb-1">
          Address:
        </Col>
        <Col span={24} className="gx-p-0">
          <Row>
            <Col span={12} xs={24} md={12}>
              <FormItem label="Street 1" className="display-block">
                {getFieldDecorator("street1", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your address street1!",
                    },
                  ],
                })(<Input type="text" placeholder="Street 1" />)}
              </FormItem>
            </Col>
            <Col span={12} xs={24} md={12}>
              <FormItem label="Street 2" className="display-block">
                {getFieldDecorator("street2")(
                  <Input type="text" placeholder="Street 2" />
                )}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="City" className="display-block">
                {getFieldDecorator("city", {
                  rules: [
                    { required: true, message: "Please input your city!" },
                  ],
                })(<Input type="text" placeholder="City" />)}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="State" className="display-block">
                {getFieldDecorator("state", {
                  rules: [
                    { required: true, message: "Please select your state!" },
                  ],
                })(
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="State"
                  >
                    {stateList.map((s, i) => {
                      return (
                        <Option key={i} value={s.abbreviation}>
                          {s.abbreviation}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="Zip" className="display-block">
                {getFieldDecorator("zip", {
                  rules: [
                    { min: 5, message: "Min length 5 is required!" },
                    { max: 5, message: "Max length 5 is required!" },
                    { required: true, message: "Please input your zip!" },
                  ],
                })(<Input type="text" placeholder="Zip" />)}
              </FormItem>
            </Col>
            {/* <Col span={8} xs={24} md={8}>
              <FormItem label="Pin" className="display-block">
                {getFieldDecorator("pin", {
                  rules: [{ min: 4, message: "Min length 4 is required!" },
                  { max: 4, message: "Max length 4 is required!" }, { required: true, message: "Please input pin" }],
                })(<div className='auto-generate-pin-main'><div><Input type="text" placeholder="pin" /></div><div className='ml-15px font-size-22px'> <Icon onClick={(e) => { (autoGeneratePin(e)) }} type="clock-circle" /></div></div>)}

              </FormItem>
            </Col> */}
            <Col span={8} xs={24} md={8}>
              <FormItem
                label="Pin"
                className="auto-generate-pin-main display-block"
              >
                {getFieldDecorator("userPin1", {
                  rules: [
                    { min: 4, message: "Min length 4 is required!" },
                    { max: 4, message: "Max length 4 is required!" },
                    { required: true, message: "Please input pin" },
                  ],
                })(<Input type="text" placeholder="Pin" />)}
                {/* <Icon className='ml-15px font-size-22px' onClick={(e) => { (autoGeneratePin(e)) }} type="clock-circle" /> */}
                <Icon
                  className="ml-15px font-size-22px"
                  onClick={(e) => {
                    autoGeneratePin(e);
                  }}
                  type="redo"
                />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>
        <div>
          <Form.Item>
            <Checkbox
              checked={isEmergency}
              onChange={(e) => setIsEmergency(e.target.checked)}
            >
              Have Employee enter Emergency Contact Information
            </Checkbox>
            ,
          </Form.Item>
        </div>
        {!isEmergency && (
          <Row>
            <Col span={8} xs={24} md={8}>
              <FormItem label="Full Name" className="display-block">
                {getFieldDecorator("emergencyFullName", {
                  rules: [
                    { required: true, message: "Please input full name!" },
                  ],
                })(<Input placeholder="Full Name" />)}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="Relationship" className="display-block">
                {getFieldDecorator("emergencyRelationship", {
                  rules: [
                    { required: true, message: "Please input relationship!" },
                  ],
                })(<Input placeholder="Relationship" />)}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="Phone Number" className="display-block">
                {getFieldDecorator("emergencyPhone", {
                  rules: [
                    {
                      pattern: new RegExp(
                        /([+]{1}\d{1}[\s]{1})?(\({1}\d{3}\){1}[\s]{1})(\d{3}[.-]{1})\d{4}/g
                      ),
                      message: "Please enter valid phone number",
                    },
                  ],
                })(
                  <NumberFormat
                    customInput={Input}
                    type="text"
                    placeholder="Phone Number"
                    format="+1 (###) ###-####"
                    mask="_"
                    // onValueChange={handleEmergencyPhone}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8} xs={24} md={8}>
              <FormItem label="Email" className="display-block">
                {getFieldDecorator("emergencyEmail", {
                  rules: [{ required: true, message: "Please input email!" }],
                })(<Input placeholder="Email" />)}
              </FormItem>
            </Col>
          </Row>
        )}
      </div>
      <div className="flex-x center gx-pt-2">
        <FormItem>
          <Button
            type="primary"
            className="login-form-button btn-theme-color-grey"
            onClick={() => props.history.push("/people")}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button btn-theme-color-grey"
          >
            Continue
          </Button>
        </FormItem>
      </div>
    </Form>
  );
};

const WrappedModal = Form.create()(Basics);
export default withRouter(WrappedModal);
