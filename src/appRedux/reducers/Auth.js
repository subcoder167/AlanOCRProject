import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  AUTH_ERROR,
  REMBER_LOCATION_PUNCH_CLOCK,
  REMEMBER_COMPANY_PUNCH_CLOCK,
  CURRENT_PROFILE,
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: null,
  currentProfile: "",
  punchClockLocation: null,
  punchClockCompany: null,
};

export default (state = INIT_STATE, action) => {
  const authSuccess = {
    ...state,
    loader: false,
    authUser: action.payload,
  };
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_USER: {
      console.log("user sign in called reducer");
      return {
        ...state,
        loader: true,
      };
    }
    case REMBER_LOCATION_PUNCH_CLOCK: {
      console.log("in punch clock reducer", action.payload);
      return {
        ...state,
        punchClockLocation: action.payload,
      };
    }
    case REMEMBER_COMPANY_PUNCH_CLOCK: {
      return {
        ...state,
        punchClockCompany: action.payload,
      };
    }
    case CURRENT_PROFILE: {
      return {
        ...state,
        currentProfile: action.payload,
      };
    }
    // case REMBER_LOCATION_PUNCH_CLOCK: {
    //   console.log("in punch clock reducer", action.payload)
    //   return {
    //     ...state,
    //     punchClockLocation: action.payload
    //   }
    // }
    case SIGNIN_USER_SUCCESS: {
      return authSuccess;
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: "/",
        loader: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false,
      };
    }

    case SIGNIN_GOOGLE_USER_SUCCESS: {
      return authSuccess;
    }
    case SIGNIN_FACEBOOK_USER_SUCCESS: {
      return authSuccess;
    }
    case SIGNIN_TWITTER_USER_SUCCESS: {
      return authSuccess;
    }
    case SIGNIN_GITHUB_USER_SUCCESS: {
      return authSuccess;
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loader: false,
        alertMessage: "",
        showMessage: false,
        initURL: "",
        authUser: null,
      };
    }
    default:
      return state;
  }
};
