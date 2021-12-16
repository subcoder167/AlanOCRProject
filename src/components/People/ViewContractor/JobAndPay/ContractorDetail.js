import React, { useState } from "react";
import { Icon, message } from "antd";
import ContractorDetailsEditModal from "./../EditModals/ContractorDetailsEditModal";
import { updateContractorDetail, getValidPinForExitingUser, updateCompensationPidWise, getValidPin } from 'services/people';
import { dateFormat } from 'util/constant';
import moment from "moment";

const ContractorDetail = ({ pid, reloadData, compensation, people, contractorData, activeCompany, updateSavedObj, token }) => {


  const reload = () => {
    reloadData()
  }

  const updateSavedObjFunion = async (data) => {
    let dataObj = {
      company: compensation.compensations[0].company,
      location: compensation.lid,
      pin: data.pin,
      user_id: contractorData.user.uid
    }
    const resultGetValidPin = await getValidPinForExitingUser(token, dataObj);
    if (resultGetValidPin.status !== 200) {
      message.error('This pin is not unique you have to add unique pin!')
      return
    } else {

      let paramsObj = {
        plid: pid
      }
      const result = await updateCompensationPidWise(token, paramsObj, data);
      try {
        if (result.status) {
          reload()
          message.success("Details updated successfully..")
          setIsEdit(false)
        } else {
          message.error("Some thing went wrong")
        }

      } catch (error) {
        message.error("Some thing went wrong")
      }
    }
  }

  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <div className="gx-fs-lg gx-pb-2">Contractor Details</div>
      <div className="employee-detail-block">
        <div className="edit-icon" onClick={() => setIsEdit(true)}>
          <Icon type="edit" /> Edit
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            PIN
          </div>
          <div className="flex-1 gx-text-grey">{compensation.pin}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Manager
          </div>
          <div className="flex-1 gx-text-grey">{compensation.manager}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Start date
          </div>
          <div className="flex-1 gx-text-grey">{(compensation.startData !== '' && compensation.startData !== undefined) ? moment(compensation.startData).format('MM-DD-YYYY') : ''}</div>
        </div>
        <div className="flex-x">
          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
            Permission Level
          </div>
          <div className="flex-1 gx-text-grey">{compensation.role}</div>
        </div>
      </div>
      <ContractorDetailsEditModal
        people={people}
        visible={isEdit}
        startDate={compensation.startData}
        updateSavedObjFun={updateSavedObjFunion}
        compensation={compensation}
        handleOk={() => setIsEdit(false)}
        handleCancel={() => setIsEdit(false)}
      />
    </div>
  );
};

export default ContractorDetail;
