import React, { useEffect, useState } from "react";
import { Form, Modal, Row, Col, Tooltip, Popconfirm, Input, Select, Button, DatePicker } from "antd";
import moment from "moment";
import { updateCompansationDetail, updateCompensationWiseInfo } from "services/people";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';

const FormItem = Form.Item;
const { Option } = Select;

const CompensationEditModal = ({
  visible,
  handleOk,
  handleCancel,
  activeCompany,
  ...props
}) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { loadingDeleteCompensation, compensation, token, deleteCompensation, params, updateSavedObj, jobs, departments } = props;
  const [employementType, setEmployementType] = useState("Hourly");
  const [perType, setPerType] = useState("Hours")
  console.log('compensation in edit model', compensation)
  useEffect(() => {
    if (compensation) {
      setEmployementType(compensation.emp_type)
      setFieldsValue({
        jobTitle: compensation.jobTitle,
        department: compensation.department,
        effectiveDate: compensation.effectiveDate ? moment(compensation.effectiveDate) : moment(new Date()),
        type: compensation.type,
        rate: compensation.rate,
        per: compensation.per,
        defaultHours: compensation.defaultHours,
        // defaultAmount: Number(compensation.defaultAmount),
        reasonofChange: "",
        type: compensation.type
      });

      setTimeout(() => {
        if (compensation.emp_type !== "Hourly") {
          console.log("in dem")
          setFieldsValue({
            rate: compensation.hasOwnProperty('rate') ? compensation.rate : "",
            defaultHours: compensation.hasOwnProperty('defaultHours') ? compensation.defaultHours : "",
            per: compensation.per ? compensation.per : ''
          });
        } else {
          console.log("demo compensation added")
          setFieldsValue({
            rate: compensation.hasOwnProperty('rate') ? compensation.rate : "",
            defaultHours: compensation.hasOwnProperty('defaultHours') ? compensation.defaultHours : "",
            per: compensation.per ? compensation.per : ''
          });
        }
      }, 300);

    }
  }, [compensation, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        console.log("values in edit model", values)
        const obj = {
          jobTitle: values.jobTitle,
          department: values.department,
          type: values.type,
          // rate: values.rate,
          // per: values.per,
          effectiveDate: moment(values.effectiveDate),
          // defaultHours: values.defaultHours,
          reasonofChange: values.reasonofChange,
          // status: false
          // defaultAmount: values.defaultAmount
        };

        if (values.type !== "Hourly") {
          obj['rate'] = Number(values.rate);
          obj['per'] = values.per
          obj['defaultHours'] = Number(values.defaultHours);
        } else {
          obj['rate'] = Number(values.rate);
          obj['per'] = values.per
          obj['defaultHours'] = Number(values.defaultHours);
        }
        const result = await updateCompensationWiseInfo(token, {
          ...obj,
          id: params.id,
          location: compensation.location,
          company: compensation.company,
          compensation_id: compensation.coid,
          actionType: "employee",
        });
        setLoader(false);
        if (result.status === 200) {
          updateSavedObj(result.data);
          handleCancel();
        }
      }
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault()
    deleteCompensation(id)
  }

  return (
    <Modal
      title="Edit Compensation Detail"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Job Title" className="display-block">
              {getFieldDecorator("jobTitle", {
                rules: [{ required: true, message: "Please input job title!" }],
              })(
                <SelectJob selected={compensation.jobTitle} />
              )}
            </FormItem>
          </Col>
          <Col span={8} xs={24} md={12}>
            <FormItem label="Department" className="display-block">
              {getFieldDecorator("department", {
                rules: [
                  { required: true, message: "Please select department!" },
                ],
              })(
                <SelectDepartment selected={compensation.department} />
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Employment Type" className="display-block">
              {getFieldDecorator("type", {
                rules: [
                  { required: true, message: "Please input employment type!" },
                ],
                // initialvalue: { employementType }
              })(
                <Select placeholder="Select Type" onChange={(e) => setEmployementType(e)}>
                  <Option value="Salary/No Overtime">Salary/No Overtime</Option>
                  <Option value=" Salary/Eligible for overtime">
                    {" "}
                    Salary/Eligible for Overtime
                  </Option>
                  <Option value="Hourly">Hourly</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          {/* <Col span={24} className="gx-p-0"> */}
          {/* {employementType === "Hourly" ? (
              <Row>
                <Col span={12} xs={24} md={12}>
                  <FormItem label="Wage" className="display-block">
                    {getFieldDecorator("rate", {
                      rules: [{ required: true, message: "Please input wage!" }],
                    })(<Input style={{ width: "100%" }} prefix="$" />)}
                  </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                  <FormItem label="Per" className="display-block">
                    {getFieldDecorator("per", {
                      rules: [{ required: true, message: "Please input per!" }],
                    })(
                      <Select placeholder="Select per" onChange={(e) => setPerType(e)}>
                        <Option value="Hour">Hour</Option>
                        <Option value="Week">Week</Option>
                        <Option value="Month">Month</Option>
                        <Option value="Year">Year</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                  <FormItem label={`Default ${perType}`} className="display-block">
                    {getFieldDecorator("defaultHours")(
                      <Input type="text" placeholder={`Default ${perType}`} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            ) : ( */}
          {/* <Row>/z */}
          {/* <Col span={12} xs={24} md={12}>
                    <FormItem
                      label="Default Fixed Dollar Amount"
                      className="display-block"
                    >
                      {getFieldDecorator("defaultAmount", {
                        rules: [
                          { required: true, message: "Please input amount!" },
                        ],
                      })(<Input style={{ width: "100%" }} prefix="$" />)}
                    </FormItem>
                  </Col> */}
          <Col span={12} xs={24} md={12}>
            <FormItem label="Wage" className="display-block">
              {getFieldDecorator("rate", {
                rules: [{ required: true, message: "Please input wage!" }],
              })(<Input style={{ width: "100%" }} prefix="$" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Per" className="display-block">
              {getFieldDecorator("per", {
                rules: [{ required: true, message: "Please input per!" }],
              })(
                <Select placeholder="Select per" onChange={(e) => setPerType(e)}>
                  <Option value="Hour">Hour</Option>
                  <Option value="Week">Week</Option>
                  <Option value="Month">Month</Option>
                  <Option value="Year">Year</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label={`Default ${perType}`} className="display-block">
              {getFieldDecorator("defaultHours")(
                <Input type="text" placeholder={`Default ${perType}`} />
              )}
            </FormItem>
          </Col>
          {/* </Row> */}

          {/* )} */}
          {/* </Col> */}

          <Col span={12} xs={24} md={12}>
            <FormItem label="Effective Date" className="display-block">
              {getFieldDecorator("effectiveDate", {
                rules: [
                  { required: true, message: "Please select effective date!" },
                ],
              })(<DatePicker format={'MM-DD-YYYY'} style={{ width: "100%" }} />)}
            </FormItem>
          </Col>

          {/* <Col span={12} xs={24} md={12}>
            <FormItem label="Wage" className="display-block">
              {getFieldDecorator("rate", {
                rules: [{ required: true, message: "Please input wage!" }],
              })(<Input style={{ width: "100%" }} prefix="$" />)}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Per" className="display-block">
              {getFieldDecorator("per", {
                rules: [{ required: true, message: "Please input per!" }],
              })(
                <Select placeholder="Select per">
                  <Option value="Hour">Hour</Option>
                  <Option value="Week">Week</Option>
                  <Option value="Month">Month</Option>
                  <Option value="Year">Year</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12} xs={24} md={12}>
            <FormItem label="Default Hours" className="display-block">
              {getFieldDecorator("defaultHours")(
                <Input type="text" placeholder="Default Hours" />
              )}
            </FormItem>
          </Col> */}
          <Col span={12} xs={24} md={12}>
            <FormItem label="Reason for Change" className="display-block">
              {getFieldDecorator("reasonofChange", {
                rules: [{ required: true, message: "Please input reason!" }],
              })(<Input type="text" placeholder="Reason" />)}
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
            {/* <Tooltip placement="top" title="Delete Compensation"> */}
            <Popconfirm placement="topLeft" title={'Are you sure to delete ?'} onConfirm={(e) => handleDelete(e, compensation.coid)} okText="Yes" cancelText="No">
              <Button
                loading={loadingDeleteCompensation}
                className="login-form-button" type="danger">
                {/* <Icon type="delete" className="cursor-pointer" /> */}
                Delete
              </Button>
            </Popconfirm>
            {/* </Tooltip> */}
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

const WrappedModal = Form.create()(CompensationEditModal);
export default WrappedModal;
