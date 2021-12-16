import React, { useEffect } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Input,
  Button, Select, DatePicker
} from "antd";
import SelectPeopleManager from 'components/Common/SelectPeopleManager'
import moment from "moment";

// import { useEffect } from "react";
const FormItem = Form.Item;
const { Option } = Select;

const ContractorDetailsEditModal = ({
  visible,
  handleOk,
  handleCancel,
  updateSavedObjFun,
  people,
  startDate,
  ...props
}) => {
  console.log('props', props)
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { compensation } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
      }
      updateSavedObjFun(values)
    });
  };

  useEffect(() => {
    if (compensation) {
      console.log('compensation', compensation)
      console.log("date", moment(startDate).format('MM-DD-YYYY'))
      setFieldsValue({
        pin: compensation.pin,
        permission: compensation.role,
        manager: compensation.manager,
        startDate: startDate !== null ? moment(startDate) : ''
      });
    }
  }, [compensation, setFieldsValue]);

  return (
    <Modal
      title="Edit Contractor Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Pin" className="display-block">
              {getFieldDecorator("pin", {
                rules: [{ required: true, message: "Please input pin!" }],
              })(<Input placeholder="Pin" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Role" className="display-block">
              {getFieldDecorator("permission", {
                rules: [{ required: true, message: "Please select role!" }],
              })(
                <Select placeholder="Select Role">
                  <Option value="owner">Owner</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="lead">Lead</Option>
                  <Option value="basic">Basic</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Manager" className="display-block">
              {getFieldDecorator("manager", {
                rules: [
                  // { required: true, message: "Please input manager name!" },
                ],
              })(
                <SelectPeopleManager selected={compensation.manager} people={people} onChange={(e) => {
                  setFieldsValue({
                    manager: e
                  })
                }} />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Start Date" className="display-block">
              {getFieldDecorator("startDate", {
                rules: [
                  { required: true, message: "Please input start date!" },
                ],
              })(<DatePicker format="MM-DD-YYYY" style={{ width: "100%" }} />)}
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

const WrappedModal = Form.create()(ContractorDetailsEditModal);
export default WrappedModal;
