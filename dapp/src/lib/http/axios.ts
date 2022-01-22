/* Axios instance to use with Axios Hooks */

import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import CreateAxios from 'axios';
import qs from 'qs';
import progress from 'nprogress';
import { APURL, AUTH } from '@/config/constants';
import { parseCookies } from 'nookies';
import * as NextAuth from '@/lib/auth.helper';

export const defaults: AxiosRequestConfig = {
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      skipNulls: true,
      indices: false,
      encode: false,
    });
  },
  baseURL: APURL,
  // withCredentials: true,
  headers: {
    'X-Request-With': 'XMLHttpRequest',
  },
};
const axios: AxiosInstance = CreateAxios.create(defaults);
const __browser__ = typeof window === 'object' && typeof window != 'undefined';

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Fetch the auth token for a user
    const cookies = await parseCookies(null);
    const authToken = cookies[AUTH.token];

    /* Add authorization headers if we have any */
    if (authToken) {
      config.headers = {
        authorization: `Bearer ${authToken}`,
      };
    }

    /* Only use progress bar in client */
    if (__browser__) {
      await progress.start();
      return config;
    }
    return config;
  },
  async (error: AxiosError) => {
    if (__browser__) {
      await progress.done();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (__browser__) {
      progress.done();
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    /* If we get a 401 Error we clear the credentials */
    if (error.response?.status === 401) {
      NextAuth.logoutUser(null);
      return Promise.reject(error);
    }

    /* Ensure we in the browser for SSR compatibility */
    if (__browser__) {
      progress.done();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

/* Finally patch up Axios with all new config requirements */
const makeAxios: AxiosInstance = axios;

/* Create Axios Instance with defaults */
export default makeAxios;
