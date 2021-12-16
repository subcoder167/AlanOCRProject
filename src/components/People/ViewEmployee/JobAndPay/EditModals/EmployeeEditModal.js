import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker, Row, Col, Input, Select, Button, message } from "antd";
import moment from 'moment';
import { updateEmploymentDetail, getValidPinForExitingUser, getValidPin, updateCompensationPidWise } from 'services/people';
import SelectDepartment from 'components/Common/SelectDepartment';
import SelectPeopleManager from 'components/Common/SelectPeopleManager'

const FormItem = Form.Item;
const { Option } = Select;

const EmployeeEditModal = ({ pid, employeeData, reloadData, visible, handleOk, people, department, handleCancel, activeCompany, ...props }) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { employmentDetails, token, params, updateSavedObj } = props;
  console.log('employmentDetails', employeeData.user.uid)

  const reload = () => {
    reloadData()
  }

  useEffect(() => {
    if (employmentDetails) {
      console.log('employmentDetails', employmentDetails)
      setFieldsValue({
        pin: employmentDetails.pin,
        manager: employmentDetails.manager,
        startDate: moment(employmentDetails.startData),
        employmentClass: employmentDetails.emp_type,
        role: employmentDetails.role
      });
    }
  }, [employmentDetails, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);

        let dataObj = {
          company: employmentDetails.compensations[0].company,
          location: employmentDetails.lid,
          pin: values.pin,
          user_id: employeeData.user.uid
        }
        const resultGetValidPin = await getValidPinForExitingUser(token, dataObj);
        if (resultGetValidPin.status !== 200) {
          message.error('This pin is not unique you have to add unique pin!')
          return
        } else {
          const obj = {
            pin: values.pin,
            manager: values.manager,
            startDate: moment(values.startDate),
            emp_type: values.employmentClass,
            // company: activeCompany.company,
            // location: activeCompany.location,
            permission: values.role
          }
          let paramsObj = {
            plid: pid
          }
          const result = await updateCompensationPidWise(token, paramsObj, obj);
          setLoader(false);
          if (result.status === 200) {
            updateSavedObj(result.data);
            handleCancel();
          }

        }

      }
    });
  };

  return (
    <Modal
      title="Edit Employee Detail"
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
          {/* <Col span={8} xs={24} md={12}>
            <FormItem label="Department" className="display-block">
              {getFieldDecorator("department", {
                rules: [
                  // { required: true, message: "Please select department!" },
                ],
              })(
                <SelectDepartment selected={department} />
              )}
            </FormItem>
          </Col> */}
          <Col span={12} xs={24} md={12}>
            <FormItem label="Manager" className="display-block">
              {getFieldDecorator("manager", {
                rules: [
                  // { required: true, message: "Please input manager name!" },
                ],
              })(
                <SelectPeopleManager selected={employmentDetails.manager} people={people} onChange={(e) => {
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
          <Col span={12} xs={24} md={12}>
            <FormItem label="Employee Class" className="display-block">
              {getFieldDecorator("employmentClass", {
                rules: [
                  { required: true, message: "Please input employee class!" },
                ],
              })(
                <Select placeholder="Select Status">
                  <Option value="Full Time(30+ Hours Per Week)">
                    Full Time(30+ Hours Per Week)
                </Option>
                  <Option value="Part Time(20-29 Hours Per Week)">
                    Part Time(20-29 Hours Per Week)
                </Option>
                  <Option value="Part Time(0-19 Hours Per Week)">
                    Part Time(0-19 Hours Per Week)
                </Option>
                  <Option value="Seasonal (0-6 Months per year)">
                    Seasonal (0-6 Months per year)
                </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Role" className="display-block">
              {getFieldDecorator("role", {
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
              loading={loader}
            >
              Save
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(EmployeeEditModal);
export default WrappedModal;
