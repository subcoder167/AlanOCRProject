import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Modal,
  Select,
  Radio,
} from "antd";
import stateList from "util/State";
import moment from "moment";
import { updateEmergencyDetail } from "services/people";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
const FormItem = Form.Item;
const { Option } = Select;

const ContractorEmergencyEditModal = ({
  visible,
  handleOk,
  handleCancel,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { employeeData, token, params, updateSavedObj } = props;
  const { company, location } = useSelector((x) => x.common.activeCompany);

  const [emergencyPhone, setEmergencyPhone] = useState();

  useEffect(() => {
    if (employeeData && employeeData.emergencyInfo) {
      setEmergencyPhone(employeeData.emergencyInfo.phone);
      setFieldsValue({
        emergencyFullName: employeeData.emergencyInfo.fullName,
        emergencyRelationship: employeeData.emergencyInfo.relation,
        emergencyPhone: employeeData.emergencyInfo.phone,
        emergencyEmail: employeeData.emergencyInfo.email,
      });
    }
  }, [employeeData, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        const obj = {
          fullName: values.emergencyFullName,
          email: values.emergencyEmail,
          phone: Number(emergencyPhone),
          relation: values.emergencyRelationship,
        };
        const result = await updateEmergencyDetail(
          token,
          { ...obj, ...params, actionType: "employee" },
          company,
          location
        );
        setLoader(false);
        if (result.status === 200) {
          updateSavedObj(result.data);
          handleCancel();
        }
      }
    });
  };

  const handleEmergencyPhone = (value) => setEmergencyPhone(value.value);

  return (
    <Modal
      title="Edit Emergency Contact Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Full Name" className="display-block">
              {getFieldDecorator("emergencyFullName", {
                rules: [{ required: true, message: "Please input full name!" }],
              })(<Input placeholder="Full Name" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Relationship" className="display-block">
              {getFieldDecorator("emergencyRelationship", {
                rules: [
                  { required: true, message: "Please input relationship!" },
                ],
              })(<Input placeholder="Relationship" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
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
                  onValueChange={handleEmergencyPhone}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Email" className="display-block">
              {getFieldDecorator("emergencyEmail", {
                rules: [{ required: true, message: "Please input email!" }],
              })(<Input placeholder="Email" />)}
            </FormItem>
          </Col>
        </Row>
        <div className="flex-x center gx-mt-4">
          <FormItem className="gx-m-0">
            <Button
              type="secondary"
              className="login-form-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              loading={loader}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(ContractorEmergencyEditModal);
export default WrappedModal;
