import React, { useState } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import NumberFormat from "react-number-format";
import { cloneDeep } from "lodash";
const FormItem = Form.Item;

const TaxDetail = (props) => {
  const { setFormTab, onCompleteDetail, formValues } = props;
  const { getFieldDecorator } = props.form;

  // const [SSN, setSSN] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // const vals = cloneDeep(values);
        // vals.ssn = SSN;
        onCompleteDetail(values, "step3");
        setFormTab("4");
      }
    });
  };

  // const handleSSN = (value) => {
  //   setSSN(value.value);
  // };

  return (
    <Form onSubmit={handleSubmit} className="gx-form-row0">
      <Row>
        {formValues && formValues.contractor_type === "business" ? (
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
                />
              )}
            </FormItem>
          </Col>
        ) : (
          <Col span={8} xs={24} md={8}>
            <FormItem label="SOCIAL SECURITY NUMBER" className="display-block">
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
        )}
      </Row>
      <div className="flex-x center gx-pt-2">
        <FormItem>
          <Button
            type="secondary"
            className="login-form-button"
            onClick={() => setFormTab("2")}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Continue
          </Button>
        </FormItem>
      </div>
    </Form>
  );
};

const WrappedModal = Form.create()(TaxDetail);
export default WrappedModal;
