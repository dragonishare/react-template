import api from '../../services/api';
import Util from '../../services/util.js';
import { processError } from '../Modules/Common.js';

export const LOGIN_REQUESTED = 'Login/LOGIN_REQUESTED';
export const LOGIN = 'Login/LOGIN';
export const LOGOUT_REQUESTED = 'Login/LOGOUT_REQUESTED';
export const LOGOUT = 'Login/LOGOUT';

// 初始化时，从本地获取userInfo,如果获取不到或者token过期或失效，默认isLogin:false
let userInfo = Util.getUserInfo();

if (userInfo) {
  //token是否过期
  let isExpired = userInfo.token_expires_at * 1000 < new Date().getTime();
  if (isExpired) {
    //如果token过期,清空本地localstorage
    Util.clearUserInfo();
    userInfo = {
      isLogin: false
    };
  } else {
    api.getDevsList({}).end((err, res) => {
      if (res.status === 401) {
        Util.clearUserInfo();
        userInfo = {
          isLogin: false
        };
      }
    });
  }
} else {
  userInfo = {
    isLogin: false
  };
}

// userInfo.isLogin = false;//造成登录后每次刷新都会退出的

const initialState = { userInfo };

export const login = (data, successCallback) => {
  return dispatch => {
    console.log('login action');
    api.login(data).end((err, res) => {
      const hasError = processError(dispatch, err, res); //res.body.code:0成功 code:26006失败

      if (!hasError) {
        res.body.data.isLogin = true;
        // res.body.data.role = 'admin';
        if (data.isRememberMe) {
          res.body.data.isRememberMe = true;
          Util.setUserInfo(res.body.data);
        }
        dispatch({
          type: LOGIN,
          userInfo: res.body.data
        });
      } else {
        if (successCallback) {
          successCallback('error');
        }
      }
    });
  };
};

export const logout = () => {
  return dispatch => {
    Util.clearUserInfo();
    dispatch({
      type: LOGOUT,
      userInfo: {
        isLogin: false
      }
    });
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state
      };

    case LOGIN:
      return {
        ...state,
        userInfo: state.userInfo
          ? { ...state.userInfo, ...action.userInfo }
          : action.userInfo
      };

    case LOGOUT_REQUESTED:
      return {
        ...state
      };

    case LOGOUT:
      return {
        ...state,
        userInfo: action.userInfo
      };

    default:
      return state;
  }
};
