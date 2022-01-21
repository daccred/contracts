/* Define API routes as models, compatible on both server and client side */

import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import progress from 'nprogress';
import { APURL } from '@/config/constants';

class HttpAdapter extends Object {
  private baseURL = APURL;
  private defaults: AxiosRequestConfig = {
    paramsSerializer: function (params) {
      return qs.stringify(params, {
        arrayFormat: 'brackets',
        skipNulls: true,
        indices: false,
        encode: false,
      });
    },
    baseURL: this.baseURL,
    withCredentials: true,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
  };
  // Initialize Axios Defaults
  public axios: AxiosInstance = axios.create(this.defaults);
  public endpoint!: string;
  public config!: AxiosRequestConfig;
  private browser = typeof window === 'object' && typeof window != 'undefined';

  constructor(endpoint: string, config?: AxiosRequestConfig) {
    super();
    this.endpoint = endpoint;

    const route = this.endpoint.replace(/\/+$/, '');

    // eslint-disable-next-line no-console
    console.log(
      this.baseURL,
      'versus',
      [`${this.baseURL}${route}`].join('/').replace(/\/+$/, ''),
      this.endpoint,
      'and',
      route
    );
    const url = [`${this.baseURL}${route}`].join('/').replace(/\/+$/, '');

    this.config = { ...this.defaults, ...config, baseURL: url };
    // console.log(Resource.config)
    // Integrating interceptors for request and response
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (this.browser) {
          progress.start();
          return config;
        }
        return config;
      },
      (error: AxiosError) => {
        if (this.browser) {
          progress.done();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.browser) {
          progress.done();
          return response;
        }
        return response;
      },
      (error: AxiosError) => {
        if (this.browser) {
          progress.done();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    /* Finally patch up Axios with all new config requirements */
    this.axios = axios.create(this.config);
  }

  private buildURL(pattern = '', data = {}) {
    const stub = tmpl(pattern, data).replace(/\/+$/, '');
    const route = this.endpoint.replace(/\/+$/, '');

    // eslint-disable-next-line no-console
    console.log(this.baseURL, 'versus', this.endpoint, 'and', route);
    return [`${this.baseURL}${route}`, stub].join('/').replace(/\/+$/, '');
  }

  private executeRequest(
    data = {},
    pattern = '',
    method: Method = 'GET',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctx = {}
  ) {
    const url = this.buildURL(pattern, data);
    const config: AxiosRequestConfig = { method, url };
    const key = method.toLowerCase() === 'get' ? 'params' : 'data';
    config[key] = data;
    return this.axios.request(config);
  }

  // Now implement all default methods
  public list(data = {}, ctx = {}) {
    return this.executeRequest(data, '', 'GET', ctx);
  }

  public post(data: undefined, pattern = '{id}', ctx = {}) {
    return this.executeRequest(data, pattern, 'POST', ctx);
  }
  public emit(data: undefined, pattern = 'emit', ctx = {}) {
    return this.executeRequest(data, pattern, 'POST', ctx);
  }

  public send(data: undefined, pattern = 'send', ctx = {}) {
    return this.executeRequest(data, pattern, 'POST', ctx);
  }
}

export const PasswordlessModel = new HttpAdapter('/auth/passwordless');
export const DocModel = new HttpAdapter('/docs');
