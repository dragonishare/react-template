import { logout } from './Login';
export const actionCodes = {
  FAIL: 1,
  OK: 0,
  NOT_LOGIN: 401
};

export function processError(dispatch, err, res) {
  if (err) {
    if (err.status === 401) {
      dispatch(error(actionCodes.NOT_LOGIN, 'ERR_Unauthorized'));
      dispatch(logout());
    } else {
      dispatch(error(actionCodes.FAIL, 'ERR_Network_Exception'));
    }
    return true;
  } else if (
    typeof res.body.code === 'number' &&
    res.body.code !== actionCodes.OK
  ) {
    dispatch(error(res.body.code, res.body.msg));
    return true;
  }
  dispatch(error(actionCodes.OK, null));
  return false;
}

export const LOADING = 'Common/LOADING';
export function loading(enabled) {
  return {
    type: LOADING,
    isLoading: enabled
  };
}

export const MESSAGE = 'Common/MESSAGE';
export function message(type, message) {
  return {
    type: MESSAGE,
    msg_type: type,
    msg: message
  };
}

export const CANCEL = 'Common/CANCEL';
export function cancelOperation() {
  return {
    type: CANCEL
  };
}

export const ERROR = 'Common/ERROR';
export function error(errorCode = 1, message = '') {
  return {
    type: ERROR,
    errorCode: errorCode,
    hasError: errorCode !== actionCodes.OK,
    message: message
  };
}
