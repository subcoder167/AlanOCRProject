import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Tabs, Switch, message, Form, Modal, DatePicker, Row, Col, Input, Select } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EmployeeMentDetail from "./EmployeeMentDetail";
import Compensation from "./Compensation";
import moment from "moment";
import {
  useHistory
} from "react-router-dom";
import { getEmployeeCompesastion, getValidPinForExitingUser, toggleLocationsEmployee, getEmployeeCompesastionNewStructure, getCompansationHistory, postCompensationDetails, updateCompansationDetail, editCompanyStatusForEmployee, setCompanyPermissionApi, addEmployeeLocation, getValidPin } from "services/people";
import CircularProgress from "components/CircularProgress/index";
import SelectJob from 'components/Common/SelectJob';
import SelectDepartment from 'components/Common/SelectDepartment';
import AddAdditionalLocationEmployee from './AddAdditionalLocationEmployee'
import AddCompanyPermission from './AddCompanyPermission'
import AddAdditionalLocationComoansation from './AddAdditionalLocationCompansation'
import { getPeopleRequest } from "appRedux/actions/People";

const FormItem = Form.Item;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const JobsAndPay = ({
  activeCompany,
  employeeData,
  authUser,
  companies,
  match,
  updateSavedObj,
  jobs,
  people,
  departments,
  getPeopleRequest,
  form
}) => {
  console.log("employee data",employeeData)
  const { params } = match;
  const [compensation, setCompesastion] = useState(null);
  const dismissEmployeeHandler = () => { };
  const [formTab, setFormTab] = useState("1");

  const [statusCompany, setStatusCompany] = useState()
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)
  const [loaderAddLocation, setLoaderAddLocation] = useState(false)
  const [loaderAddCompanyPermission, setLoaderAddCompanyPermission] = useState(false)
  const [addedLocation, setAddedLocation] = useState('')
  const [addLocationStatus, setAddLocationStatus] = useState('')
  const [addedLocationCompensationId, setAddedLocationCompensationId] = useState('')
  const [displayModalAddLocation, setDisplayModalAddLocation] = useState(false)
  const [displayModalAddLocationCompensation, setDisplayModalAddLocationCompensation] = useState(false)
  const { getFieldDecorator, setFieldsValue } = form;
  const [formValues, setFormValues] = useState({});
  const [formFilledValues, setFormFilledValues] = useState(false)
  const [companyPermision, setCompanyPermision] = useState(false)
  const [formValidate, setFormValidate] = useState({
    step1: false,
    step2: false,
  });

  const history = useHistory();
  const activeCompanyName = activeCompany.company
  const activeLocation = activeCompany.location
  useEffect(() => {
    const getCompany = companies.find(a => a.cid === activeCompany.company);
    if (getCompany && getCompany.locations && getCompany.locations.length && getCompany.locations[0]) {
      const getLocationId = activeLocation ? activeLocation : getCompany.locations[0].lid
      const obj = {
        company: activeCompany.company,
        dissmissed: false,
        location: getLocationId
      };
      getPeopleRequest(obj);
    } else {
      message.error('No Location found!');
    }
  }, [activeCompany, getPeopleRequest, companies, activeLocation]);

  const comparer = (otherArray) => {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.lid == current.lid && other.name == current.name
      }).length == 0;
    }
  }

  const getCompesastionDetails = async () => {
    try {
      console.log('employeeData', employeeData)
      const data = {
        company: activeCompany.company,
        location: activeCompany.location,
        uid: employeeData.user.uid,
      };
      const result = await getEmployeeCompesastionNewStructure(
        authUser.tokens.accessToken,
        data
      );
      if (result && result.status === 200) {
        let newAddedData = []
        let CompanyLocationArr = []
        let ComepnsastionLocationArr = []

        let activeCompanyArr = []
        let otherLoopArr = [...companies]
        otherLoopArr.map((val, ind) => {
          if (val.cid === activeCompany.company) {
            val.locations.map((locVal, locInd) => {
              activeCompanyArr.push({
                lid: locVal.lid,
                name: locVal.name
              })
            })
          }
        })
        // console.log("current active company", activeCompanyArr)
        // companies.map((val, ind) => {
        //   val.locations.map((valLocation, valIndex) => {
        //     CompanyLocationArr.push({
        //       lid: valLocation.lid,
        //       name: valLocation.name
        //     })
        //   })
        // })
        activeCompanyArr.map((val, index) => {
          CompanyLocationArr.push({
            lid: val.lid,
            name: val.name
          })
        })
        result.data.map((compDataVal, index) => {
          ComepnsastionLocationArr.push({
            lid: compDataVal.lid,
            name: compDataVal.locationName
          })
        })
        var onlyInA = CompanyLocationArr.filter(comparer(ComepnsastionLocationArr));
        var onlyInB = ComepnsastionLocationArr.filter(comparer(CompanyLocationArr));
        let resultcgfcgfcfg = onlyInA.concat(onlyInB);
        console.log('result.data compensation', result.data)

        setAddedLocation(resultcgfcgfcfg)
        setCompesastion(result.data);
        setStatusCompany(result.data[0].status)
      }
    } catch (error) { }
  };


  const handleSubmitCompensation = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        // setLoader(true);
        const obj = {
          jobTitle: values.jobTitle,
          department: values.department,
          type: values.type,
          rate: values.rate,
          per: values.per,
          effectiveDate: moment(values.effectiveDate),
          defaultHours: values.defaultHours,
          reasonofChange: values.reasonofChange,
          // status: false
        };
        // console.log('obj compensation', formValues)

      }
    });
  };

  useEffect(() => {
    // console.log('addedLocation', addedLocation)
  }, [addedLocation])

  useEffect(() => {
    // console.log('companies', companies)
    getCompesastionDetails();
  }, []);

  const reloadData = () => {
    getCompesastionDetails()
  }

  const onChangeFormTab = (key) => {
    setFormTab(key);
  };

  useState(() => {
    if (formFilledValues) {
      // console.log(formValues)
    }
    // console.log('formFilled', formFilledValues)
  }, [formFilledValues])

  const onFinish = async (data) => {
    // console.log('data', data)
    setLoaderAddLocation(true)
    // console.log("on finisehd call ")
    // setFormValues((values) => {
    //   return {
    //     ...values,
    //     ...data
    //   }
    // })
    console.log('data.department', data.department)
    let obj = {
      jobTitle: data.jobTitle,
      effectiveDate: data.effectiveDate,
      type: data.type,
      department: data.department,
      manager: data.manager,
      rate: data.rate,
      per: data.per,
      // type: data.employmentClass,
      defaultHours: data.defaultHours,
      // reasonofChange: data.reasonofChange,
      hours: data.hours,
      ssn: "SN33GFD",
      defaultAmount: data.defaultAmount
    }
    let objParams = {
      id: params.id,
      company: activeCompany.company,
      actionType: "employee",
      location: addedLocationCompensationId,
      user_id: employeeData.user.uid,
    }
    let userCompanyUid
    employeeData.user.usercompanies.map((val)=>{
      if(val.company.cid === activeCompany.company){
        userCompanyUid = val.uid
      }
    })
    // console.log(obj)
    const resultUpdateStatus = await postCompensationDetails(authUser.tokens.accessToken, {
      ...obj,
      user: employeeData.user.uid,
      id: params.id,
      company: activeCompany.company,
      userCompany:userCompanyUid,
      actionType: "employee",
      location: addedLocationCompensationId,
      // user_id: employeeData.user.uid,
    });
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddLocation(false)
      message.success("Compensation added successfully..")
      history.push(`/people/view-employee/${employeeData.eid}`)
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false)

      message.error("Something went wrong..")
    }
  }

  const onCompleteDetailSetPermision = async (data) => {
    console.log("data in on complete details set", activeCompany.company)
    let companyObj = {}
    let uid
    console.log("employeeData.user.usercompanies", employeeData.user.usercompanies)
    employeeData.user.usercompanies.map((val, ind) => {
      console.log('val.cid', val.cid)
      if (activeCompany.company === val.company.cid) {
        uid = val.uid
        companyObj.type = val.type
        companyObj.permissions = data.type

        companyObj.isDetailsConfirmed = val.isDetailsConfirmed
        companyObj.lastTokenTime = new Date()

      }
    })
    console.log("companyObj companyObj", companyObj)



    // console.log(step)
    // let obj = {
    //   role: data.role,
    //   employmentDetails: {
    //     manager: data.manager,
    //     pin: data.pin,
    //     startDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString(),
    //     emp_type: data.employmentClass
    //   },
    //   compensation: {
    //     department: data.department,
    //     effectiveDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString()
    //   }
    // }
    // let objParams = {
    //   location: addLocationStatus.lid,
    //   company: activeCompany.company,
    //   user_id: employeeData.user.uid,
    // }
    // // console.log(obj)
    const resultUpdateStatus = await setCompanyPermissionApi(authUser.tokens.accessToken,
      companyObj, uid);
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddCompanyPermission(false)
      message.success("Company permission added successfully..")
      // setDisplayModalAddLocation(false)
      setCompanyPermision(false)
      // setStatusCompany(e)
    } else {
      setLoaderAddCompanyPermission(false)

      message.error("Something went wrong..")
    }


  }

  const onCompleteDetail = async (data, step) => {

    let dataObj = {
      company: activeCompany.company,
      location: addLocationStatus.lid,
      pin: data.pin,
      user_id: employeeData.user.uid
    }
    const result = await getValidPinForExitingUser(authUser.tokens.accessToken, dataObj);
    if (result.status !== 200) {
      message.error('This pin is not unique you have to add unique pin!')
      return
    }

    // console.log(step)
    let obj = {
      role: data.role,
      employmentDetails: {
        manager: data.manager,
        pin: data.pin,
        startDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString(),
        emp_type: data.employmentClass
      },
      compensation: {
        department: data.department,
        effectiveDate: new Date(moment(data.startDate._d).format("YYYY-MM-DD")).toISOString()
      }
    }
    let objParams = {
      location: addLocationStatus.lid,
      company: activeCompany.company,
      user_id: employeeData.user.uid,
    }
    // console.log(obj)
    const resultUpdateStatus = await addEmployeeLocation(authUser.tokens.accessToken,
      objParams, obj);
    if (resultUpdateStatus.status === 200 || resultUpdateStatus.status === 201) {
      setLoaderAddLocation(false)
      message.success("Location added successfully..")
      // setDisplayModalAddLocation(false)
      history.push(`/people/view-employee/${employeeData.eid}`)
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false)

      message.error("Something went wrong..")
    }

    setFormValues((values) => {
      return {
        ...values,
        ...data
      }
    })
    // if (step === 'step3') {
    //   console.log(formValues)
    //   setDisplayModalAddLocation(false)
    // }
  }

  const toggleLocationAddStatus = (location) => {
    // console.log("demo")
    setDisplayModalAddLocation(true)
    setAddLocationStatus(location)
  }

  const setCompanyPermisionFun = () => {
    setCompanyPermision(true)
  }

  const addCompensationHandle = (lId) => {
    // e.preventDefault()
    // console.log(lId)
    setAddedLocationCompensationId(lId)
    setDisplayModalAddLocationCompensation(true)
  }

  const toggleLocationStatus = async (e, c, pid) => {
    // console.log(e)
    // console.log(c)
    console.log('pid in view employee', pid)
    let resSelectedData = compensation.filter((data) => { return data.location === c.location })
    console.log('resSelectedData', resSelectedData)
    // return
    try {
      setLoaderChangeStatus(true)
      // console.log(resSelectedData)
      const obj = {
        // jobTitle: resSelectedData[0].jobTitle,
        // department: resSelectedData[0].department,
        // type: resSelectedData[0].type,
        // rate: resSelectedData[0].rate,
        // per: resSelectedData[0].per,
        // effectiveDate: moment(resSelectedData[0].effectiveDate),
        // defaultHours: resSelectedData[0].defaultHours,
        // reasonofChange: resSelectedData[0].reasonofChange,
        active: e
      };
      let params = {
        plid: pid
      }
      const resultUpdateStatus = await toggleLocationsEmployee(authUser.tokens.accessToken, params, obj);
      if (resultUpdateStatus.status === 200) {
        setLoaderChangeStatus(false)
        message.success("Status changed successfully..")
        history.push(`/people/view-employee/${employeeData.eid}`)
        setStatusCompany(e)
      } else {
        setLoaderChangeStatus(false)

        message.error("Something went wrong..")
      }
    } catch (error) {
      setLoaderChangeStatus(false)

      message.error(error)
    }

    // console.log(e)
  }

  const updateCompensation = () => {
    getCompesastionDetails()
  }

  return (
    <div className="pos-relative">
      {compensation &&
        compensation.map((c, i) => {
          console.log("+++++++++")
          return (
            <div key={i} className="company-level-container">
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> :
                  <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={c.locationStatus} onChange={(e) => toggleLocationStatus(e, c, c.pid)} />
                      </div>
                      <div className="gx-ml-2">{c.locationName}</div>
                    </div>

                    <div key={i}>
                      {/* Employee Details */}
                      <EmployeeMentDetail
                        params={params}
                        token={authUser.tokens.accessToken}
                        employeeData={employeeData}
                        updateSavedObj={updateCompensation}
                        employment={c}
                        reloadData={(e) => reloadData()}
                        department={c.department}
                        pid={c.pid}
                        activeCompany={activeCompany}
                        people={people.people}
                      />
                      {/* Compensation */}
                      {
                        c ?
                          <Compensation
                            params={params}
                            token={authUser.tokens.accessToken}
                            updateSavedObj={updateCompensation}
                            addedLocation={c.lid}
                            addCompenstationHandle={(e) => addCompensationHandle(e)}
                            jobs={jobs}
                            reloadData={(e) => reloadData()}
                            departments={departments}
                            activeCompany={activeCompany}
                            compensation={c.compensations}
                          /> : ''
                      }
                    </div>
                  </>
              }
            </div>
          );
        })}
      {
        addedLocation &&
        addedLocation.map((l, i) => {
          return (
            <div key={i} className="company-level-container">
              {
                loaderChangeStatus ? <div className="gx-loader-view">
                  <CircularProgress />
                </div> :
                  <>

                    <div className="flex-x align-center gx-pt-1 gx-pb-4">
                      <div>
                        <Switch checked={false} onChange={(e) => { toggleLocationAddStatus(l) }} />
                      </div>
                      <div className="gx-ml-2">{l.name}</div>
                    </div>

                    {/* <div key={i}>
                        <EmployeeMentDetail
                          params={params}
                          token={authUser.tokens.accessToken}
                          employeeData={employeeData}
                          updateSavedObj={updateCompensation}
                          employment={c.employment}
                          activeCompany={activeCompany}
                        />
                        {
                          c ?
                            <Compensation
                              params={params}
                              token={authUser.tokens.accessToken}
                              updateSavedObj={updateCompensation}
                              jobs={jobs}
                              departments={departments}
                              activeCompany={activeCompany}
                              compensation={c}
                            /> : ''
                        }
                      </div> */}
                  </>
              }
            </div>
          );
        })
      }
      <div className="action-block">
        <div className="gx-fs-lg gx-pb-2">Actions</div>
        <div className="gx-mt-2">
          <div>
            <Button type="primary">Run Off-Cycle Payroll</Button>
          </div>
          <div>
            <Popconfirm
              placement="topLeft"
              title="Are you sure to dismiss?"
              onConfirm={dismissEmployeeHandler}
              okText="Yes"
              cancelText="No"
            >
              <Button>Dismiss Employee</Button>
            </Popconfirm>
          </div>
          <div>
            <Button className="gx-mb-0" onClick={(e) => setCompanyPermisionFun(e)}>Set Company Permissions</Button>
          </div>
        </div>
      </div>
      <Modal
        title="Add Employee Detail"
        visible={displayModalAddLocation}
        onOk={() => { setDisplayModalAddLocation(false) }}
        onCancel={() => { setDisplayModalAddLocation(false) }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? <div className="gx-loader-view">
            <CircularProgress />
          </div> :

            <AddAdditionalLocationEmployee
              onCompleteDetail={onCompleteDetail}
              setFormTab={setFormTab}
              setDisplayModalAddLocation={setDisplayModalAddLocation}
              people={people.people}
            />
          // <Tabs className='tab-modal-timesheet' activeKey={formTab} onChange={onChangeFormTab}>
          //   <TabPane tab="Emplpoyeement details" key={1}>

          //   </TabPane>
          // {/* <TabPane tab="Compensation details" key={2} disabled={!formValidate.step1}>
          //   <AddAdditionalLocationComoansation
          //     onCompleteDetail={onCompleteDetail}
          //     setFormTab={setFormTab}
          //     setDisplayModalAddLocation={setDisplayModalAddLocation}
          //     onFinish={onFinish}
          //     jobs={jobs}
          //   ></AddAdditionalLocationComoansation>
          // </TabPane> */}
          // </Tabs>

        }
      </Modal>
      <Modal
        title="Set Company permision"
        visible={companyPermision}
        onOk={() => { setCompanyPermision(false) }}
        onCancel={() => { setCompanyPermision(false) }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? <div className="gx-loader-view">
            <CircularProgress />
          </div> :

            <AddCompanyPermission
              onCompleteDetailSetPermision={onCompleteDetailSetPermision}
              setFormTab={setFormTab}
              setCompanyPermision={setCompanyPermision}
              people={people.people}
            />
        }
      </Modal>
      <Modal
        title="Add Compensation Detail"
        visible={displayModalAddLocationCompensation}
        onOk={() => { setDisplayModalAddLocationCompensation(false) }}
        onCancel={() => { setDisplayModalAddLocationCompensation(false) }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? <div className="gx-loader-view">
            <CircularProgress />
          </div> :

            <AddAdditionalLocationComoansation
              onCompleteDetail={onCompleteDetail}
              setFormTab={setFormTab}
              setDisplayModalAddLocation={setDisplayModalAddLocationCompensation}
              people={people.people}
              onFinish={onFinish}
            // department={c.department}
            />
        }
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ auth, common, people }) => {
  const { authUser } = auth;
  const { activeCompany, companies, departments, jobs } = common;
  return { authUser, activeCompany, companies, departments, people, jobs };
};

export default connect(mapStateToProps, { getPeopleRequest })(withRouter(Form.create()(JobsAndPay)));
