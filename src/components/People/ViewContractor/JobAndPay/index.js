import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Switch, message } from "antd";
import ContractorDetail from "./ContractorDetail";
import Compensation from "./Compensation";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getContractorCompesastion,
  toggleLocationsEmployee,
  updateCompansationDetail,
  postCompensationDetails,
  getValidPin,
  addContractorLocation,
  setCompanyPermissionApi,
} from "services/people";
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import AddAdditionalLocationEmployee from "./AddAdditionalLocationEmployee";
import AddAdditionalLocationComoansation from "./AddAdditionalLocationCompansation";
import AddCompanyPermission from "./AddCompanyPermission";

import { getPeopleRequest } from "appRedux/actions/People";
import { useHistory } from "react-router-dom";
const JobsAndPay = ({
  people,
  getPeopleRequest,
  contractorData,
  companies,
  updateSavedObj,
  activeCompany,
  authUser,
  match,
  jobs,
  departments,
}) => {
  console.log("contractor data", contractorData);
  console.log("auth user", authUser);
  const { params } = match;
  const [addedLocation, setAddedLocation] = useState("");
  const [displayModalAddLocation, setDisplayModalAddLocation] = useState(false);
  const [compensation, setCompesastion] = useState(null);
  const [statusContractor, setStatusContractor] = useState();
  const [loaderChangeStatus, setLoaderChangeStatus] = useState(false);
  // const [addedLocation, setAddedLocation] = useState('')
  const [addLocationStatus, setAddLocationStatus] = useState("");
  const [loaderAddLocation, setLoaderAddLocation] = useState(false);
  const history = useHistory();
  const [formValues, setFormValues] = useState({});
  const [formTab, setFormTab] = useState("1");
  const [
    addedLocationCompensationId,
    setAddedLocationCompensationId,
  ] = useState("");
  const [
    displayModalAddLocationCompensation,
    setDisplayModalAddLocationCompensation,
  ] = useState(false);
  const [companyPermision, setCompanyPermision] = useState(false);
  const [loaderAddCompanyPermission, setLoaderAddCompanyPermission] = useState(
    false
  );

  const comparer = (otherArray) => {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other.lid == current.lid && other.name == current.name;
        }).length == 0
      );
    };
  };

  const onCompleteDetailSetPermision = async (data) => {
    console.log("data in on complete details set", activeCompany.company);
    let companyObj = {};
    let uid;
    console.log("employeeData.user.usercompanies", contractorData);
    contractorData.user.usercompanies.map((val, ind) => {
      console.log("val.cid", val.cid);
      if (activeCompany.company === val.company.cid) {
        uid = val.uid;
        companyObj.type = val.type;
        companyObj.permissions = data.type;

        companyObj.isDetailsConfirmed = val.isDetailsConfirmed;
        companyObj.lastTokenTime = new Date();
      }
    });
    console.log("companyObj companyObj", companyObj);

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
    const resultUpdateStatus = await setCompanyPermissionApi(
      authUser.tokens.accessToken,
      companyObj,
      uid
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      setLoaderAddCompanyPermission(false);
      message.success("Company permission added successfully..");
      // setDisplayModalAddLocation(false)
      setCompanyPermision(false);
      // setStatusCompany(e)
    } else {
      setLoaderAddCompanyPermission(false);

      message.error("Something went wrong..");
    }
  };

  const activeCompanyName = activeCompany.company;
  const activeLocation = activeCompany.location;
  useEffect(() => {
    const getCompany = companies.find((a) => a.cid === activeCompany.company);
    if (
      getCompany &&
      getCompany.locations &&
      getCompany.locations.length &&
      getCompany.locations[0]
    ) {
      const getLocationId = activeLocation
        ? activeLocation
        : getCompany.locations[0].lid;
      const obj = {
        company: activeCompany.company,
        dissmissed: false,
        location: getLocationId,
      };
      getPeopleRequest(obj);
    } else {
      message.error("No Location found!");
    }
  }, [activeCompany, getPeopleRequest, companies, activeLocation]);

  const onFinish = async (data) => {
    console.log("data", data);
    setLoaderAddLocation(true);
    // console.log("on finisehd call ")
    // setFormValues((values) => {
    //   return {
    //     ...values,
    //     ...data
    //   }
    // })
    // console.log('data.department', data.department)
    let obj = {
      jobTitle: data.jobTitle,
      effectiveDate: data.effectiveDate,
      emp_type: data.type,
      department: data.department,
      manager: data.manager,
      rate: data.rate,
      per: data.per,
      type: data.employmentClass,
      defaultHours: data.defaultHours,
      // reasonofChange: data.reasonofChange,
      hours: data.hours,
      ssn: "SN33GFD",
      defaultAmount: data.defaultAmount,
    };
    let userCompanyUid;

    contractorData.user.usercompanies.map((val) => {
      if (val.company.cid === activeCompany.company) {
        userCompanyUid = val.uid;
      }
    });
    console.log("userCompanyUid", userCompanyUid);
    let objParams = {
      id: params.id,
      company: activeCompany.company,
      actionType: "employee",
      userCompany: userCompanyUid,

      location: addedLocationCompensationId,
      user_id: contractorData.user.uid,
    };
    // console.log(obj)
    const resultUpdateStatus = await postCompensationDetails(
      authUser.tokens.accessToken,
      {
        ...obj,
        user: contractorData.user.uid,
        id: params.id,
        company: activeCompany.company,
        userCompany: userCompanyUid,
        actionType: "employee",
        location: addedLocationCompensationId,
        // user_id: contractorData.user.uid,
      }
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      setLoaderAddLocation(false);
      message.success("Compensation added successfully..");
      history.push(`/people/view-contractor/${contractorData.cnid}`);
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false);

      message.error("Something went wrong..");
    }
  };

  const getCompesastionDetails = async () => {
    try {
      const data = {
        company: activeCompany.company,
        location: activeCompany.location,
        uid: contractorData.user.uid,
      };
      const result = await getContractorCompesastion(
        authUser.tokens.accessToken,
        data
      );
      console.log(data);
      if (result && result.status === 200) {
        let newAddedData = [];
        let CompanyLocationArr = [];
        let ComepnsastionLocationArr = [];

        let activeCompanyArr = [];
        let otherLoopArr = [...companies];
        otherLoopArr.map((val, ind) => {
          if (val.cid === activeCompany.company) {
            val.locations.map((locVal, locInd) => {
              activeCompanyArr.push({
                lid: locVal.lid,
                name: locVal.name,
              });
            });
          }
        });
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
            name: val.name,
          });
        });
        result.data.map((compDataVal, index) => {
          ComepnsastionLocationArr.push({
            lid: compDataVal.lid,
            name: compDataVal.locationName,
          });
        });
        var onlyInA = CompanyLocationArr.filter(
          comparer(ComepnsastionLocationArr)
        );
        var onlyInB = ComepnsastionLocationArr.filter(
          comparer(CompanyLocationArr)
        );
        let resultcgfcgfcfg = onlyInA.concat(onlyInB);
        console.log("resultcgfcgfcfg", resultcgfcgfcfg);

        setAddedLocation(resultcgfcgfcfg);

        setCompesastion(result.data);
        setStatusContractor(result.data[0].status);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCompesastionDetails();
  }, []);

  const reloadData = () => {
    getCompesastionDetails();
  };

  const dismissEmployeeHandler = () => {};

  const toggleLocationStatus = async (e, c, pid) => {
    try {
      setLoaderChangeStatus(true);
      let resSelectedData = compensation.filter((data) => {
        return data.location === c.location;
      });
      console.log("resSelectedData", resSelectedData);
      const obj = {
        // department: compensation[0].department,
        // jobTitle: compensation[0].jobTitle,
        // rate: compensation[0].rate ? Number(compensation[0].rate) : null,
        // type: compensation[0].type,
        // effectiveDate: moment(compensation[0].effectiveDate),
        // reasonofChange: compensation[0].reasonofChange,
        active: e,
      };
      // if (obj.type === "fixed") {
      //   obj['rate'] = Number(compensation[0].rate);
      // } else {
      //   obj['rate'] = Number(compensation[0].hourlyAmount);
      //   obj['defaultHours'] = Number(compensation[0].defaultHours);
      // }
      // console.log("obj", obj);
      let params = {
        plid: pid,
      };
      const result = await toggleLocationsEmployee(
        authUser.tokens.accessToken,
        params,
        obj
      );
      if (result.status === 200) {
        setLoaderChangeStatus(false);
        message.success("Status changed successfully..");
        setStatusContractor(e);
        reloadData();
      } else {
        setLoaderChangeStatus(false);
        message.error("Something went wrong..");
      }
    } catch (error) {
      setLoaderChangeStatus(false);
      message.error(error);
    }
  };

  const updateCompensation = (data) => {
    // console.log('data in compensation', data)
    getCompesastionDetails();
  };

  const updateContractorDetails = async (data) => {
    let dataObj = {
      company: activeCompany.company,
      location: addLocationStatus.lid,
      pin: data.pin,
    };
  };

  const setCompanyPermisionFun = () => {
    setCompanyPermision(true);
  };

  const onCompleteDetail = async (data, step) => {
    let dataObj = {
      company: activeCompany.company,
      location: addLocationStatus.lid,
      pin: data.pin,
    };
    const result = await getValidPin(authUser.tokens.accessToken, dataObj);
    if (result.status !== 200) {
      message.error("This pin is not unique you have to add unique pin!");
      return;
    }

    // console.log(step)
    let obj = {
      role: data.role,
      employmentDetails: {
        manager: data.manager,
        pin: data.pin,
        startDate: new Date(
          moment(data.startDate._d).format("YYYY-MM-DD")
        ).toISOString(),
        type: data.employmentClass,
      },
      compensation: {
        // department: "Thai cuisine",
        effectiveDate: new Date(
          moment(data.startDate._d).format("YYYY-MM-DD")
        ).toISOString(),
      },
    };
    let objParams = {
      location: addLocationStatus.lid,
      company: activeCompany.company,
      user_id: contractorData.user.uid,
    };
    // console.log(obj)
    const resultUpdateStatus = await addContractorLocation(
      authUser.tokens.accessToken,
      objParams,
      obj
    );
    if (
      resultUpdateStatus.status === 200 ||
      resultUpdateStatus.status === 201
    ) {
      setLoaderAddLocation(false);
      message.success("Location added successfully..");
      // setDisplayModalAddLocation(false)
      history.push(`/people/view-contractor/${contractorData.cnid}`);
      // setStatusCompany(e)
    } else {
      setLoaderAddLocation(false);

      message.error("Something went wrong..");
    }

    setFormValues((values) => {
      return {
        ...values,
        ...data,
      };
    });
    // if (step === 'step3') {
    //   console.log(formValues)
    //   setDisplayModalAddLocation(false)
    // }
  };

  const addCompensationHandle = (lId) => {
    // e.preventDefault()
    // console.log(lId)
    setAddedLocationCompensationId(lId);
    setDisplayModalAddLocationCompensation(true);
  };

  const toggleLocationAddStatus = (location) => {
    // console.log("demo")
    setDisplayModalAddLocation(true);
    setAddLocationStatus(location);
  };

  console.log("compensation ------------", compensation);

  return (
    <div className="pos-relative">
      {compensation &&
        compensation.map((c, i) => {
          return (
            <div className="company-level-container">
              {loaderChangeStatus ? (
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="flex-x align-center gx-pt-1 gx-pb-4">
                    <div>
                      <Switch
                        checked={c.locationStatus}
                        onChange={(e) => toggleLocationStatus(e, c, c.pid)}
                      />
                    </div>
                    <div className="gx-ml-2">{c.locationName}</div>
                  </div>
                  <ContractorDetail
                    contractorData={contractorData}
                    reloadData={(e) => {
                      reloadData(e);
                    }}
                    pid={c.pid}
                    people={people.people}
                    token={authUser.tokens.accessToken}
                    contractorData={contractorData}
                    activeCompany={activeCompany}
                    compensation={c}
                    updateSavedObj={updateContractorDetails}
                  />
                  {compensation && (
                    <Compensation
                      reloadData={(e) => {
                        reloadData(e);
                      }}
                      compensation={c.compensations}
                      pid={c.pid}
                      addedLocation={c.lid}
                      addCompenstationHandle={(e) => addCompensationHandle(e)}
                      updateSavedObj={updateCompensation}
                      params={params}
                      token={authUser.tokens.accessToken}
                      jobs={jobs}
                      departments={departments}
                      activeCompany={activeCompany}
                      CompensationsList={contractorData.compensation}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}
      {addedLocation &&
        addedLocation.map((l, i) => {
          return (
            <div key={i} className="company-level-container">
              {loaderChangeStatus ? (
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <div className="flex-x align-center gx-pt-1 gx-pb-4">
                    <div>
                      <Switch
                        checked={false}
                        onChange={(e) => {
                          toggleLocationAddStatus(l);
                        }}
                      />
                    </div>
                    <div className="gx-ml-2">{l.name}</div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      {authUser.user.usercompanies[0].permissions === "admin" && (
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
                <Button>Dismiss Contractor</Button>
              </Popconfirm>
            </div>
            <div>
              <Button
                className="gx-mb-0"
                onClick={(e) => setCompanyPermisionFun(e)}
              >
                Set Company Permissions
              </Button>
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Add Employee Detail"
        visible={displayModalAddLocation}
        onOk={() => {
          setDisplayModalAddLocation(false);
        }}
        onCancel={() => {
          setDisplayModalAddLocation(false);
        }}
        className="hide-modal-footer"
      >
        {
          loaderAddLocation ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : (
            <AddAdditionalLocationEmployee
              onCompleteDetail={onCompleteDetail}
              setFormTab={setFormTab}
              setDisplayModalAddLocation={setDisplayModalAddLocation}
              people={people.people}
            />
          )
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
        title="Add Compensation Detail"
        visible={displayModalAddLocationCompensation}
        onOk={() => {
          setDisplayModalAddLocationCompensation(false);
        }}
        onCancel={() => {
          setDisplayModalAddLocationCompensation(false);
        }}
        className="hide-modal-footer"
      >
        {loaderAddLocation ? (
          <div className="gx-loader-view">
            <CircularProgress />
          </div>
        ) : (
          <AddAdditionalLocationComoansation
            onCompleteDetail={onCompleteDetail}
            setFormTab={setFormTab}
            setDisplayModalAddLocation={setDisplayModalAddLocationCompensation}
            people={people.people}
            onFinish={onFinish}
            // department={c.department}
          />
        )}
      </Modal>
      <Modal
        title="Set Company permision"
        visible={companyPermision}
        onOk={() => {
          setCompanyPermision(false);
        }}
        onCancel={() => {
          setCompanyPermision(false);
        }}
        className="hide-modal-footer"
      >
        {loaderAddLocation ? (
          <div className="gx-loader-view">
            <CircularProgress />
          </div>
        ) : (
          <AddCompanyPermission
            onCompleteDetailSetPermision={onCompleteDetailSetPermision}
            setFormTab={setFormTab}
            setCompanyPermision={setCompanyPermision}
            people={people.people}
          />
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ auth, common, people }) => {
  const { authUser } = auth;
  const { activeCompany, companies } = common;
  return { authUser, activeCompany, companies, people };
};
export default connect(mapStateToProps, { getPeopleRequest })(
  withRouter(JobsAndPay)
);
