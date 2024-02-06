import {GeneralAction} from '../actions';
const initialState = {
  isAppLoading: true,
  token: '',
  userIp: '',
  isFirstTimeUse: true,
  userDetails: {},
};

const GeneralReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GeneralAction.types.SET_IS_APP_LOADING:
      return {
        ...state,
        isAppLoading: action.payload,
      };
    case GeneralAction.types.SET_TOKEN:
      return {
        ...state,
        token: `${action.payload}`,
      };
    case GeneralAction.types.SET_FIRST_TIME_USE:
      return {
        ...state,
        isFirstTimeUse: action.payload,
      };
    case GeneralAction.types.LOG_OUT:
      return {
        ...state,
        token: '',
      };
    case GeneralAction.types.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case GeneralAction.types.USER_IP:
      return {
        ...state,
        userIp: action.payload,
      };
    default:
      return state;
  }
};

export default GeneralReducer;
