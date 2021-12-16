import React, { useState, useEffect, useCallback } from "react";
import { Icon, Button, Modal, message, Card } from "antd";
import { getCompansationHistory, deleteCompensationApi } from 'services/people';
import CompensationEditModal from "./EditModals/CompensationEditModal";
import { dateTimeFormat, dateFormat } from "util/constant";
import moment from "moment"
const Compensation = ({ addedLocation, compensation, reloadData, addCompenstationHandle, activeCompany, updateSavedObj, token, params, jobs, departments }) => {
  console.log("compensasion called", compensation)
  const [isEdit, setIsEdit] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingDeleteCompensation, setLoadingDeleteCompensation] = useState(false)
  const [editedCompensation, seEditedComepnsation] = useState({})
  const getHistory = useCallback(async () => {
    const obj = {
      empid: params.id,
      company: activeCompany.company,
      location: activeCompany.location
    }
    const result = await getCompansationHistory(token, { ...obj, actionType: 'employee' });
    if (result.status === 200) {
      // if (result.data.length === 0) {

        result.data.push(compensation[0])
      // }
      console.log('compensation', compensation)
      console.log('result.data', result.data)
      setHistory(result.data)
    }
  }, [params, token]);

  const addCompensationModel = (coid) => {
    addCompenstationHandle(coid)
  }

  const compensationEditHandler = (values) => {
    updateSavedObj(values);
    getHistory();
  }

  const deleteCompensation = async (compId) => {
    setLoadingDeleteCompensation(true)

    try {
      const obj = {
        id: compId
      }
      const result = await deleteCompensationApi(token, { ...obj });
      if (result) {
        message.success("Compensation deleted successfully..")
        reloadData()
        setLoadingDeleteCompensation(false)
        setIsEdit(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editCompenSation = (val) => {
    seEditedComepnsation(val, setIsEdit(true))
  }

  // useEffect(() => {
  //   if (editedCompensation.length > 0) {
  //     setIsEdit(true)
  //   }
  // }, [editedCompensation])

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <div className="gx-pt-4">
      <div className="gx-fs-lg gx-pb-2">Compensation</div>
      {
        compensation.map((val, ind) => {
          console.log("val in compensation", val)
          return val.jobTitle !== null ?
            // return (


            <div
              className="employee-detail-block"
            >
              <div className="edit-icon" onClick={() => editCompenSation(val)}>
                <Icon type="edit" /> Edit
          </div>
              {
                val &&
                <>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Job Title
            </div>
                    <div className="flex-1 gx-text-grey">{val.jobTitle}</div>
                  </div>
                  {/* department is moved to employee details */}
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Department
            </div>
                    <div className="flex-1 gx-text-grey">{val.department}</div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Employment Type
            </div>
                    <div className="flex-1 gx-text-grey">{val.type}</div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Wage
            </div>
                    <div className="flex-1 gx-text-grey">${val.rate} per {val.per}</div>
                  </div>
                  <div className="flex-x">
                    <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                      Default Hours
            </div>
                    <div className="flex-1 gx-text-grey">
                      {val.defaultHours ? val.defaultHours : "None"}
                    </div>
                  </div>
                </>
              }
            </div> : ''
          // )
        })
      }
      <div className="flex-x compensation-action gx-pt-3">
        <div className="flex-1 gx-mr-2">
          <Button type="primary" className="fill-width" onClick={() => addCompensationModel(addedLocation)}>
            Add Earning Type
          </Button>
        </div>
        <div className="flex-1 gx-ml-2">
          <Button
            type="primary"
            className="fill-width"
            onClick={() => setShowHistory(true)}
          >
            View Compensation History
          </Button>
        </div>
      </div>
      <Modal
        title="Compensation History"
        visible={showHistory}
        onOk={() => setShowHistory(false)}
        onCancel={() => setShowHistory(false)}
      >
        <ul class="compensation-history">
          {
            (history && history.length) ?
              history.map((h, i) => {
                return (
                  // <div className="gx-pb-4" key={i}>
                  //   <div className="flex-x space-between gx-mb-1 gx-font-weight-medium">
                  //     <div>{h.actionType}</div>
                  //     <div>{dateTimeFormat(h.changedDate)}</div>
                  //   </div>
                  //   <div className="employee-detail-block">
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Job Title
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">{h.jobTitle}</div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Effective Date
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">
                  //         {moment(h.effectiveDate).format("MM-DD-YYYY")}
                  //       </div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Employment Type
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">
                  //         {h.type}
                  //       </div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Wage
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">${h.rate} per ${h.per}</div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Default Hours
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">{h.defaultHours && h.defaultHours}</div>
                  //     </div>
                  //     <div className="flex-x">
                  //       <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                  //         Reason for Change
                  //       </div>
                  //       <div className="flex-1 gx-text-grey">{h.reasonofChange}</div>
                  //     </div>
                  //   </div>
                  // </div>
                  <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                      <div className="flex-x center justify-content-space-between">
                        {/* <FormItem className="gx-m-0"> */}
                        <div className="flex-x title-history">
                          {h.actionType}
                        </div>
                        <div className="flex-x date-history">
                          {moment(h.changedDate).format("MM-DD-YYYY")}
                        </div>
                        {/* </FormItem> */}
                      </div>
                      <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Job Title
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.jobTitle}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Department
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.department}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x date-history ml-35px font-weight-normal">
                            Effective Date
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.effectiveDate !== null ? dateFormat(h.effectiveDate) : ''}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Employment Type
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.type}
                          </div>

                        </div>
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Wage
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {
                              h.type === "hour" ?
                                <div className="flex-1 gx-text-grey">${h.hasOwnProperty('rate') ? h.rate : ""} per Hour</div> :
                                <div className="flex-1 gx-text-grey">${h.rate}</div>
                            }
                          </div>

                        </div>
                        {
                          h.type === "hour" &&
                          <div className="flex-x center justify-content-right mb-10px">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x ml-35px date-history font-weight-normal">
                              Default Hours
                                                </div>
                            <div className="flex-x ml-20px title-history font-weight-normal">
                              {h.defaultHours}
                            </div>

                          </div>
                        }
                        <div className="flex-x center justify-content-right mb-10px">
                          {/* <FormItem className="gx-m-0"> */}
                          <div className="flex-x ml-35px date-history font-weight-normal">
                            Reason for Change
                                                </div>
                          <div className="flex-x ml-20px title-history font-weight-normal">
                            {h.reasonofChange}
                          </div>

                        </div>
                      </Card>
                    </div>
                  </li>
                )
              }) : "No history available"
          }
        </ul>
      </Modal>
      {
        isEdit && compensation &&
        <CompensationEditModal
          loadingDeleteCompensation={loadingDeleteCompensation}
          deleteCompensation={deleteCompensation}
          compensation={editedCompensation}
          visible={isEdit}
          handleOk={() => setIsEdit(false)}
          handleCancel={() => setIsEdit(false)}
          token={token}
          params={params}
          updateSavedObj={compensationEditHandler}
          jobs={jobs}
          departments={departments}
          activeCompany={activeCompany}
        />
      }
    </div>
  );
};

export default Compensation;
