import StorageService from '../../StorageService';

const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  USER_IP: 'USER_IP',
  USER_DETAILS: 'USER_DETAILS',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  LOG_OUT: 'LOG_OUT',
};

const setIsAppLoading = (isAppLoading: boolean) => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};

const logOut = () => {
  return {
    type: types.LOG_OUT,
  };
};

const setToken = (token: any) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};

const setUserIp = (userIp: any) => {
  return {
    type: types.USER_IP,
    payload: userIp,
  };
};

const setUserDetails = (userDetails: any) => {
  return {
    type: types.USER_DETAILS,
    payload: userDetails,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: types.SET_FIRST_TIME_USE,
    payload: false,
  };
};

const appStart = () => {
  return (dispatch, getState) => {
    StorageService.getFirstTimeUse().then(isFirstTimeUse => {
      dispatch({
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then(token => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
      }
      dispatch({
        type: types.SET_IS_APP_LOADING,
        payload: false,
      });
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  setUserIp,
  setUserDetails,
  types,
  appStart,
  setIsFirstTimeUse,
  logOut,
};
