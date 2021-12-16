import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import {
  COMMON_GET_COMPANY_REQUEST,
  GET_JOBS_REQUEST,
  GET_DEPARTMENTS_REQUEST,
} from "constants/ActionTypes";
import {
  commonGetCompanySuccess,
  setActiveCompany,
  getJobSucess,
  getDepartmentSucess,
} from "../../appRedux/actions/Common";
import {
  getCompanies,
  getJobs,
  getDepartments,
  getAdminCompanies,
  getPeopleCompanies,
} from "./../../services/company";
import { isEqual } from "lodash";

// function* getCompany({ payload }) {
//   try {
//     const token = yield select((state) => state.auth.authUser.tokens.accessToken);
//     const activeCompany = yield select((state) => state.common.activeCompany.company);
//     const result = yield call(getCompanies, token, payload);
//     if (result.status ===200) {
//       yield put(commonGetCompanySuccess(result.data));
//       if(result.data && result.data.length && !result.data.map(a => a.cid).includes(activeCompany)) {
//         yield put(setActiveCompany({
//           company: result.data[0].cid,
//           location: result.data[0].locations[0] ? result.data[0].locations.lid : null
//         }));
//       }
//     }
//   } catch (error) {
//     console.log('error', error);
//   }
// }

function* getCompany({ payload }) {
  try {
    const authUser = yield select((state) => state.auth.authUser);
    const token = authUser.tokens.accessToken;
    const permission = authUser.user.usercompanies[0].permissions;
    const activeCompany = yield select(
      (state) => state.common.activeCompany.company
    );
    let result = [];
    if (permission === "admin") {
      result = yield call(getAdminCompanies, token);
    } else {
      result = yield call(getPeopleCompanies, token);
    }
    // console.log("set active company data");
    if (result.status === 200) {
      const data = result.data.reduce((acc, obj) => {
        const key = obj["cid"];
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
      }, {});
      const finalData = Object.values(data).map((x) => {
        const locObject = data[x[0].cid].map((single) => ({
          name: single.locationName,
          lid: single.lid,
        }));
        // const types = data[x[0].cid].map((single) => ({
        //   type: single.usercompany.type,
        // }));
        return {
          name: x[0].companyName,
          cid: x[0].cid,
          locations: [...locObject],
          // types: [...types],
        };
      });
      const modifyLocations = finalData[0].locations;
      if (modifyLocations.length > 1) {
        const jsonObject = modifyLocations.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        var singleLocation = [...uniqueArray];
      }
      finalData[0].locations = singleLocation
        ? singleLocation
        : finalData[0].locations;
      // console.log("final data---------------------", finalData);
      yield put(commonGetCompanySuccess(finalData));

      if (finalData && finalData.length) {
        yield put(
          setActiveCompany({
            company: finalData[0].cid,
            location:
              finalData[0].locations && finalData[0].locations[0]
                ? finalData[0].locations[0].lid
                : null,
            // types: finalData[0].types,
          })
        );
      }
    }
  } catch (error) {
    console.log("error", error);
  }
}

function* getJobsSaga({ payload }) {
  try {
    const token = yield select(
      (state) => state.auth.authUser.tokens.accessToken
    );
    const result = yield call(getJobs, token, payload);
    if (result.status === 200) {
      yield put(getJobSucess(result.data));
    }
  } catch (error) {
    console.log("error", error);
  }
}

function* getDepartmentSaga({ payload }) {
  try {
    const token = yield select(
      (state) => state.auth.authUser.tokens.accessToken
    );
    const result = yield call(getDepartments, token, payload);
    if (result.status === 200) {
      yield put(getDepartmentSucess(result.data));
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function* getCompanieshandler() {
  yield takeEvery(COMMON_GET_COMPANY_REQUEST, getCompany);
}

export function* getJobshandler() {
  yield takeEvery(GET_JOBS_REQUEST, getJobsSaga);
}

export function* getDepartmenthandler() {
  yield takeEvery(GET_DEPARTMENTS_REQUEST, getDepartmentSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getCompanieshandler),
    fork(getJobshandler),
    fork(getDepartmenthandler),
  ]);
}
