import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import TokenManagement from '@shopDunk/utils/TokenManagement';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { BACK_END_URL } from '@env';
import { storage, StorageKey } from '@shopDunk/storage';

export const base: AxiosInstance = axios.create({
  baseURL: 'http://34.143.191.39:4000',
});

type FunctionReturnString = (...args: any[]) => string;

export interface IAPI_PATHS {
  [key: string]: string | FunctionReturnString;
}
const ALL_STATION_AROUND_30KM: FunctionReturnString = (
  lat: number,
  lng: number,
) =>
  `/station?page=1&pageSize=100&sortBy=id&orderBy=ASC&lat=${lat}&long=${lng}`;
const NEAR_STATION: FunctionReturnString = (lat: number, lng: number) =>
  `station/near?page=1&pageSize=30&lat=${lat}&long=${lng}`;

const FIND_STATION_BY_NAME: FunctionReturnString = (
  lat: number,
  lng: number,
  name: string,
) =>
  `station?page=1&pageSize=10&sortBy=id&orderBy=ASC&lat=${lat}&long=${lng}&name=${name}`;

const FIND_STATION_BY_ID: FunctionReturnString = (
  id: number,
  lat: number,
  lng: number,
) => `/station/${id}?lat=${lat}&long=${lng}`;

const MY_TRIP: FunctionReturnString = (
  page: number,
  pageSize: number,
  lat: number,
  lng: number,
) => `/rent/myTrip?page=${page}&pageSize=${pageSize}&lat=${lat}&long=${lng}`;
const FIND_BICYCLE_BY_ID: FunctionReturnString = (
  id: number,
  lat: number,
  lng: number,
) => `/bicycle/${id}?lat=${lat}&long=${lng}`;

const DETAIL_NEW: FunctionReturnString = (id: number) => `/news/${id}`;
const FIND_RENT_BY_ID: FunctionReturnString = (id: number) => `/rent/${id}`;

const BICYCLE_SCAN: FunctionReturnString = (lid: string) =>
  `/bicycle/scan/${lid}`;
const GET_NAME_BY_PHONE: FunctionReturnString = (lid: string) =>
  `/user/phone/${lid}`;
const SEARCH_STATION: FunctionReturnString = (
  lat: number,
  long: number,
  latArea: number,
  longArea: number,
) =>
  `/station?page=1&pageSize=100&sortBy=id&orderBy=ASC&lat=${lat}&long=${long}&latArea=${latArea}&longArea=${longArea}`;

base.interceptors.response.use(undefined, error => {
  if (error.response && error.response.data && error.response.data.error) {
    return Promise.reject(error?.response?.data?.errors[0]);
  }
  return Promise.reject(error?.response?.data?.errors[0]);
});

type TApiService = () => {
  // createAccountApi: any;
  signInApi: any;
  accountDetailApi: any;
  loginApi: any;
  updateAccountDetailApi: any;
  changePasswordApi: any;
  forgotRequestApi: any;
  forgotUpdateApi: any;
  verifyPinApi: any;
  createPolicyApi: any;
  getEventApi: any;
  getListPayout: any;
};

const API_PATHSFunc =
  <T>() =>
  <U extends T>(argument: U) =>
    argument;

export const API_PATHS = API_PATHSFunc<IAPI_PATHS>()({
  SIGN_UP: '/auth/register',
  SIGN_IN: '/auth/login',
  LOGIN: '/auth/login',
  ACCOUNT_DETAIL: '/accounts/detail',
  ACCOUNT_UPDATE: '/user/profile',
  FORGOT_PASSWORD_REQUEST: '/accounts/forgot_password_request',
  FORGOT_PASSWORD_UPDATE: '/accounts/forgot_password_update',
  CREATE_QUOTE: '/quotes/create',
  GET_QUOTE: '/quotes',

  CREATE_POLICY: '/policy',
  CREATE_PAYMENT: '/policies/create_payment',
  GET_LIST_BY_OWNER: '/policies/list/by_owner',
  GET_LIST_BY_CLIENT: '/policies/list/by_client',
  CREATE_PAYOUT: '/payouts/create_payout',
  PAID_PAYOUT: '/payouts/paid_payout',
  PAYOUT_BY_OWNER: '/payouts/by_owner',
  PAYOUT_BY_CLIENT: '/payout',
  VERIFY_PIN: '/accounts/forgot_password_verify_pin',

  REFRESH_TOKEN: '/auth/refreshToken',
  UPLOAD_FILE: '/file',
  ALL_STATION_AROUND_30KM,
  NEAR_STATION,
  FIND_STATION_BY_NAME,
  FIND_STATION_BY_ID,
  FIND_BICYCLE_BY_ID,
  SEARCH_STATION,
  BICYCLE_SCAN,
  USER_PROFILE: '/user/profile',
  TICKET_BUY: '/ticket/buy',
  TICKET: '/ticket',
  TICKET_MY: '/ticket/my',
  RESET_PASSWORD: '/auth/resetPassword',
  CHANGE_PASSWORD: '/user/changePassword',
  LOG_OUT: '/auth/logout',
  MY_TRIP,
  NEWS: '/news?page=1&pageSize=30&sortBy=id&orderBy=ASC',
  DETAIL_NEW,
  NOTIFICATION: '/notification/my?page=1&pageSize=30&sortBy=id&orderBy=ASC',
  READ_NOTI: '/notification/read',
  READ_ALL: '/notification/readAll',
  UNLOCK_BICYCLE: '/bicycle/unlock',
  SUGGEST_LOCATION: '/station/suggest',
  CREATE_KYC: '/kyc',
  RENT_RENTING: '/rent/renting',
  RENT_END: '/rent/end',
  BICYCLE_TEMPORARYUNLOCK: '/bicycle/temporaryUnlock',
  BICYCLE_TEMPORARYLOCK: '/bicycle/temporaryLock',
  FIND_RENT_BY_ID,
  RATING: '/rating',
  AVATAR: '/user/avatar',
  PAYMENT_METHOD:
    '/payment/method?page=1&pageSize=30&sortBy=id&orderBy=ASC&status=ACTIVE',
  PAYMENT: '/payment',
  MY_BILL: '/bill/myBill?page=1&pageSize=30&sharePoint=false',
  SHARE_POINT_HISTORY: '/bill/myBill?page=1&pageSize=30&sharePoint=true',
  GET_NAME_BY_PHONE,
  CHECK_PHONE: '/auth/checkPhone',
  SEND_REPORT: '/report/incident',
  SHARE_POINT: '/user/sharePoint',
});

export const injectBearer = (token: string, configs?: AxiosRequestConfig) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'vi',
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const TokenManager = new TokenManagement({
  isTokenValid: async () => {
    const token = storage.getString(StorageKey.Authen);
    const decode: any = token && jwt_decode(token);

    const current_time = dayjs(new Date());
    return current_time < dayjs(decode?.exp * 1000);
  },

  getAccessToken: async () => {
    const token = storage.getString(StorageKey.Authen);
    return token;
  },
  onRefreshToken: async (onDone: any) => {
    const old_token = storage.getString(StorageKey.Authen);
    const token = old_token && (await _refreshToken(old_token));
    if (token) {
      storage.set(StorageKey.Authen, token);
      onDone(token);
    } else {
      try {
        storage.set(StorageKey.Authen, '');
      } catch (error) {}
    }
  },
});

const _refreshToken = async (old_token: string) => {
  const result = await base.post(API_PATHS.REFRESH_TOKEN, {
    refreshToken: old_token,
  });
  return result?.data?.access_token;
};

export const privateRequestGetDelete = async (
  request?: any,
  url?: string,
  configs?: AxiosRequestConfig,
) => {
  const token = await TokenManager.getToken();
  return request(url, injectBearer(token, configs));
};

export const privateRequestPostPut = async (
  request?: any,
  url?: string,
  data?: any,
  configs?: AxiosRequestConfig,
) => {
  const token = await TokenManager.getToken();
  return request(url, data, injectBearer(token, configs));
};

const apiService: TApiService = () => {
  // const createAccountApi = async (params: {
  //   name: string;
  //   username: string;
  //   password: string;
  //   email: string;
  //   type: string;
  //   province: string;
  //   district: string;
  // }) => {
  //   const result = await base.post(API_PATHS.CREATE, params);
  //   return result.data;
  // };
  const signInApi = async (params: { username: string; password: string }) => {
    const result = await base.post(API_PATHS.SIGN_IN, params);
    return result.data;
  };
  const loginApi = async (params: { username: string; password: string }) => {
    const result = await base.post(API_PATHS.LOGIN, params);
    return result.data;
  };

  const accountDetailApi = async (config?: AxiosRequestConfig) => {
    const result = await privateRequestGetDelete(
      base.get,
      API_PATHS.ACCOUNT_DETAIL,
      config,
    );
    return result.data;
  };

  const updateAccountDetailApi = async (data: any) => {
    const result = await privateRequestPostPut(
      base.put,
      API_PATHS.ACCOUNT_UPDATE,
      data,
    );
    return result.data;
  };

  const changePasswordApi = async (data: any) => {
    const result = await privateRequestPostPut(
      base.put,
      API_PATHS.CHANGE_PASSWORD,
      data,
    );
    return result.data;
  };

  const forgotRequestApi = async (params: { input: string }) => {
    const result = await base.post(API_PATHS.FORGOT_PASSWORD_REQUEST, params);
    return result.data;
  };

  const forgotUpdateApi = async (params: {
    key: string;
    new_password: string;
    pin: string;
  }) => {
    const result = await base.post(API_PATHS.FORGOT_PASSWORD_UPDATE, params);
    return result.data;
  };
  const verifyPinApi = async (params: { key: string; pin: string }) => {
    const result = await base.post(API_PATHS.VERIFY_PIN, params);
    return result.data;
  };

  const createPolicyApi = async (data: any) => {
    const result = await privateRequestPostPut(
      base.post,
      API_PATHS.CREATE_POLICY,
      data,
    );
    return result.data;
  };

  const getEventApi = async (data: any) => {
    const result = await privateRequestGetDelete(base.get, `/event/${data}`);
    return result.data;
  };

  const getListPayout = async () => {
    const result = await privateRequestGetDelete(
      base.get,
      API_PATHS.PAYOUT_BY_CLIENT,
    );
    return result.data;
  };

  return {
    signInApi,
    accountDetailApi,
    loginApi,
    updateAccountDetailApi,
    changePasswordApi,
    forgotRequestApi,
    forgotUpdateApi,
    verifyPinApi,
    createPolicyApi,
    getEventApi,
    getListPayout,
  };
};

export default apiService();
