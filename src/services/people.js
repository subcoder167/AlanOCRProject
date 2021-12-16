import axios from "axios";
import { setHeadersWithAccessToken } from "./index";
const API_BASE = process.env.REACT_APP_APIBASE;

// Create Employee Service
export const createEmployee = (token, params) => {
  const obj = {
    company: params.company,
    location: params.location,
  };
  delete params.company;
  delete params.location;
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/employee/${obj.company}/${obj.location}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Dismiss Employee/Contractor Service
export const dissmissedPeople = (token, params) => {
  const { type, id, dismiss, locationId, companyId } = params;
  setHeadersWithAccessToken(token);
  let url = "/employee";
  if (type === "employee") {
    url = `/employee/dismiss/${companyId}/${locationId}/${id}?active=${Boolean(
      dismiss
    )}`;
  } else {
    url = `/contractor/dismiss/${companyId}/${locationId}/${id}?active=${Boolean(
      dismiss
    )}`;
  }

  return axios
    .put(`${API_BASE}${url}`)
    .then((e) => e)
    .catch((e) => e);
};

// Create Contractor Service
export const createContractor = (token, params) => {
  const obj = {
    company: params.company,
    location: params.location,
  };
  delete params.company;
  delete params.location;
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/contractor/${obj.company}/${obj.location}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Get Listing of Employee/Contractor
export const getPeople = (token, params) => {
  setHeadersWithAccessToken(token);
  // console.log("api called")
  if (params.company === params.location) {
    return axios
      .get(`${API_BASE}/people/${params.company}`)
      .then((e) => e)
      .catch((e) => e);
  } else {
    return axios
      .get(`${API_BASE}/people/${params.company}/${params.location}`)
      .then((e) => e)
      .catch((e) => e);
  }
};

// Get Details of perticualr Employee/Contractor
export const getPeopleDetails = (token, params, companyId, locationId) => {
  setHeadersWithAccessToken(token);
  let url = "/employee";
  if (params.type === "employee") {
    url = `/employee/${companyId}/${locationId}/${params.id}`;
  } else {
    url = `/contractor/${companyId}/${locationId}/${params.id}`;
  }
  return axios
    .get(`${API_BASE}${url}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get Compensation History for Employee/Contractor
export const getCompansationHistory = (token, params) => {
  const { empid, company, location } = params;
  delete params.id;
  let url = "";
  if (params.actionType === "employee") {
    url = `/employee/comp-logs/${company}/${location}/${empid}`;
  } else {
    url = `/contractor/comp-logs/${company}/${location}/${empid}`;
  }
  delete params.actionType;
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}${url}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get Fedral History for Employee
export const getFedralHistory = (token, params) => {
  const { id, company } = params;
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/employee/fedral-log/${id}/${company}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get State History for Employee
export const getStateHistory = (token, params) => {
  const { id, company } = params;
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/employee/state-log/${id}/${company}`)
    .then((e) => e)
    .catch((e) => e);
};

// Update Employee Details
export const updateEmploymentDetail = (token, params) => {
  const { id, company, location } = params;
  delete params.id;
  delete params.company;
  delete params.location;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/employee/employment/${company}/${location}/${id}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Update Fedral Details
export const updateFedralDetail = (token, params, companyId, locationId) => {
  const { id } = params;
  delete params.id;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/employee/fedral/${companyId}/${locationId}/${id}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Update State Details
export const updateStateDetail = (token, params, companyId, locationId) => {
  const { id } = params;
  delete params.id;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/employee/state/${companyId}/${locationId}/${id}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Update Compsansation details for Employee/Contractor
export const updateCompansationDetail = (token, params) => {
  const { id, location, company } = params;
  delete params.id;
  delete params.location;
  delete params.company;
  let url = "";
  if (params.actionType === "employee") {
    url = `/employee/compensation/${company}/${location}/${id}`;
  } else {
    url = `/contractor/compensation/${company}/${location}/${id}`;
  }
  delete params.actionType;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}${url}`, params)
    .then((e) => e)
    .catch((e) => e);
};

export const updateCompensationWiseInfo = (token, params) => {
  const { id, location, company, compensation_id } = params;
  delete params.id;
  delete params.location;
  delete params.company;
  let url = "";
  if (params.actionType === "employee") {
    url = `/compenastion/${compensation_id}`;
    delete params.actionType;
    delete params.compensation_id;

    setHeadersWithAccessToken(token);
    return axios
      .put(`${API_BASE}${url}`, params)
      .then((e) => e)
      .catch((e) => e);
  } else {
    url = `/compenastion/${compensation_id}`;
    delete params.actionType;
    delete params.compensation_id;
    setHeadersWithAccessToken(token);
    return axios
      .put(`${API_BASE}${url}`, params)
      .then((e) => e)
      .catch((e) => e);
  }
};

//put update location wise compensation based on pid
export const updateCompensationPidWise = (token, params, obj) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/people-locations/update/${params.plid}`, obj)
    .then((e) => e)
    .catch((e) => e);
};

//post compensation employee/contractor
export const postCompensationDetails = (token, params) => {
  const { id, location, company } = params;
  delete params.id;
  // delete params.location;
  // delete params.company;
  let url = "";
  if (params.actionType === "employee") {
    url = `/compenastion`;
  } else {
    url = `/compenastion`;
  }
  delete params.actionType;
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}${url}`, params)
    .then((e) => e)
    .catch((e) => e);
};

//post compensation employee/contractor
export const setCompanyPermissionApi = (token, params, uid) => {
  const { id, location, company } = params;
  delete params.id;
  // delete params.location;
  // delete params.company;
  let url = `/usercompanies/update/${uid}`;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}${url}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Update Personal Details

export const updatePersonalDetail = (token, params, companyId, locationId) => {
  const { id } = params;
  delete params.id;
  let url = "";
  if (params.actionType === "employee") {
    url = `/employee/personal/${companyId}/${locationId}/${id}`;
  } else {
    url = `/contractor/personal/${companyId}/${locationId}/${id}`;
  }
  delete params.actionType;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}${url}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Update Emergency Details

export const updateEmergencyDetail = (token, params, companyId, locationId) => {
  const { id } = params;
  delete params.id;
  let url = "";
  if (params.actionType === "employee") {
    url = `/employee/emergency-info/${companyId}/${locationId}/${id}`;
  } else {
    url = `/contractor/emergency-info/${companyId}/${locationId}/${id}`;
  }
  delete params.actionType;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}${url}`, params)
    .then((e) => e)
    .catch((e) => e);
};

// Check Empoyee Exist
export const employeeExist = (token, params, type = "employee") => {
  setHeadersWithAccessToken(token);
  let url = `${API_BASE}/employee/exists/${params.company}/${params.location}`;

  if (type === "contractor") {
    url = `${API_BASE}/contractor/exists/${params.company}/${params.location}`;
  }
  return axios
    .post(url, { email: params.email })
    .then((e) => e)
    .catch((e) => e);
};

// Create People Password
export const createPeoplePassword = (params) => {
  return axios
    .post(`${API_BASE}/auth/create-password/${params.token}`, {
      password: params.password,
    })
    .then((e) => e)
    .catch((e) => e);
};

//for delete compensation contractor
export const deleteCompensationApi = (token, params) => {
  setHeadersWithAccessToken(token);
  // if (params.type == 'employee') {
  //   return axios
  //     .post(`${API_BASE}/auth/create-password/${params.token}`, { password: params.password })
  //     .then(e => e)
  //     .catch(e => e);
  // } else {
  //   return axios
  //     .post(`${API_BASE}/auth/create-password/${params.token}`, { password: params.password })
  //     .then(e => e)
  //     .catch(e => e);
  // }
  return axios
    .delete(`${API_BASE}/compenastion/${params.id}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get employee detail to verify
export const getEmployeeDetailToVerify = (token, params) => {
  setHeadersWithAccessToken(token);
  console.log("params", params);
  return axios
    .get(
      `${API_BASE}/employee/view-employee/${params.user}/${params.company.cid}`
    )
    .then((e) => e)
    .catch((e) => e);
};

//toggle location for employee status
export const toggleLocationsEmployee = (token, params, obj) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/people-locations/update/${params.plid}`, obj)
    .then((e) => e)
    .catch((e) => e);
};

// Get contractor detail to verify
export const getContractorDetailToVerify = (token, params) => {
  setHeadersWithAccessToken(token);
  console.log("view contractor params", params);
  return axios
    .get(
      `${API_BASE}/contractor/view-contractor/${params.user}/${params.company.cid}`
    )
    .then((e) => e)
    .catch((e) => e);
};

// Get employee state list
export const getEmployeeStates = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/employee/state/${params.id}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get employee fedral list
export const getEmployeeFedrals = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/employee/fedral/${params.id}`)
    .then((e) => e)
    .catch((e) => e);
};

// Update employee detail
export const updateEmployeeDetail = (token, params, data) => {
  setHeadersWithAccessToken(token);
  // return axios
  //   .put(`${API_BASE}/employee/update-employee/${params.user}/${params.company}`, data)
  //   .then(e => e)
  //   .catch(e => e);
  return axios
    .put(`${API_BASE}/employee/update/${params.user}/${params.company}`, data)
    .then((e) => e)
    .catch((e) => e);
};

export const addEmployeeLocation = (token, params, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(
      `${API_BASE}/employee/compensation/${params.company}/${params.location}/${params.user_id}`,
      data
    )
    .then((e) => e)
    .catch((e) => e);
};

export const addContractorLocation = (token, params, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(
      `${API_BASE}/contractor/compensation/${params.company}/${params.location}/${params.user_id}`,
      data
    )
    .then((e) => e)
    .catch((e) => e);
};

// Update contractor detail
export const updateContractorDetail = (token, params, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/contractor/update/${params.user}/${params.company}`, data)
    .then((e) => e)
    .catch((e) => e);
};

// Get Employee Compesation
export const getEmployeeCompesastion = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(
      `${API_BASE}/employee/compensation/${params.company}/${params.location}/${params.empid}`
    )
    .then((e) => e)
    .catch((e) => e);
};

//get compensation block new company wise
export const getEmployeeCompesastionNewStructure = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/employee/compensations/${params.company}/${params.uid}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get Contractor Compesation
export const getContractorCompesastion = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/contractor/compensations/${params.company}/${params.uid}`)
    .then((e) => e)
    .catch((e) => e);
};

// Get valid pin
export const getValidPin = (token, params) => {
  console.log(params.company);
  console.log(params.location);
  console.log(params.pin);
  setHeadersWithAccessToken(token);
  return axios
    .get(
      `${API_BASE}/people-locations/pin/${params.company}/${params.location}/${params.pin}`
    )
    .then((e) => e)
    .catch((e) => e);
};

//for check existing user api
export const getValidPinForExitingUser = (token, params) => {
  console.log(params.company);
  console.log(params.location);
  console.log(params.pin);
  setHeadersWithAccessToken(token);
  return axios
    .get(
      `${API_BASE}/people-locations/pin/${params.company}/${params.location}/${params.user_id}/${params.pin}`
    )
    .then((e) => e)
    .catch((e) => e);
};

//update notes in people
export const updateNotesEmployee = (token, params, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(
      `${API_BASE}/employee/view-employee/${params.user}/${params.company}`,
      data
    )
    .then((e) => e)
    .catch((e) => e);
};

//update company status for employee
export const editCompanyStatusForEmployee = (token, params, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .put(
      `${API_BASE}/employee/compensation/${params.company}/${params.location}/${params.empid}`,
      data
    )
    .then((e) => e)
    .catch((e) => e);
};

//update notes in contractor
export const updateNotesContractor = (token, params, data) => {
  console.log("in");
  setHeadersWithAccessToken(token);
  return axios
    .post(
      API_BASE +
        "/contractor/view-contractor/" +
        params.user +
        "/" +
        params.company,
      data
    )
    .then((e) => e)
    .catch((e) => e);
};

//get user data by token
export const getUserDataByToken = (params) => {
  console.log("in api called");
  return axios
    .get(`${API_BASE}/users/userbytoken/${params.token}`)
    .then((e) => e)
    .catch((e) => e);
};
