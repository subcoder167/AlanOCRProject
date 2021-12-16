import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker, Row, Col, Input, Select, Button } from "antd";
import moment from 'moment';
import { updateEmploymentDetail } from 'services/people';
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';
import SelectPeopleManager from 'components/Common/SelectPeopleManager'

const FormItem = Form.Item;
const { Option } = Select;

const AddAdditionalLocationEmployee = ({ onFinish, people, onCompleteDetailSetPermision, department, jobs, setFormTab, onCompleteDetail, setCompanyPermision, activeCompany, ...props }) => {
    const [loader, setLoader] = useState(false);
    const { getFieldDecorator, setFieldsValue } = props.form;
    const { token, params, updateSavedObj } = props;
    const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)
    const [employementType, setEmployementType] = useState("Hourly");
    const [perType, setPerType] = useState("Hours")

    // useEffect(() => {
    //     if (employmentDetails) {
    //         setFieldsValue({
    //             pin: employmentDetails.pin,
    //             manager: employmentDetails.manager,
    //             startDate: moment(employmentDetails.startDate),
    //             employmentClass: employmentDetails.type,
    //             role: employmentDetails.role
    //         });s
    //     }
    // }, [employmentDetails, setFieldsValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                // loaderAddLocation(true);
                // const obj = {
                //     pin: values.pin,
                //     manager: values.manager,
                //     startDate: moment(values.startDate),
                //     type: values.employmentClass,
                //     company: activeCompany.company,
                //     location: activeCompany.location,
                //     role: values.role
                // }
                // const result = await updateEmploymentDetail(token, { ...obj, id: params.id });
                // loaderAddLocation(false);
                // if (result.status === 200) {
                //   updateSavedObj(result.data);
                //   handleCancel();
                // }
                onCompleteDetailSetPermision(values)
                console.log("values in modal", values)
                // onFinish({ ...values });
                // setFormTab("3");
            } else {
                console.log(err)
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="gx-form-row0">
            <Row>

                <Col span={12} xs={24} md={12}>
                    <FormItem label="Employment Type" className="display-block">
                        {getFieldDecorator("type", {
                            rules: [
                                { required: true, message: "Please input employment type!" },
                            ],
                            initialValue: "Basic",
                        })(
                            <Select placeholder="Select Type" onChange={(e) => setEmployementType(e)}>
                                <Option value="basic">Basic</Option>
                                <Option value="owner">
                                    {" "}
                    Owner
                  </Option>
                                <Option value="lead">Lead</Option>
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
                        onClick={() => { setCompanyPermision(false) }}
                    >
                        Cancel
            </Button>
                    <Button
                        loading={loaderChangeStatus}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Save
            </Button>
                </FormItem>
            </div>
        </Form>
    );
};

const WrappedModal = Form.create()(AddAdditionalLocationEmployee);
export default WrappedModal;
