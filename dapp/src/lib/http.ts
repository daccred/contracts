/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import nProgress from 'nprogress';
import { LOCAL_API } from '@/config/constants';

class HttpAdapter extends Object {
  static defaults: any;

  static updateDefaults(config: { baseURL: string | undefined; headers: { 'X-Request-With': string } }) {
    const baseURL = process.env.REACT_APP_PROXY_URL;
    HttpAdapter.defaults = { ...this.defaults, ...config, baseURL };
  }

  static createResource(endpoint: string, config = {}) {
    const isClientSide = typeof window === 'object' && typeof window != 'undefined';
    class Resource {
      static endpoint: string;
      static axios: AxiosInstance;
      static config: any;
      static buildURL(pattern = '', data = {}) {
        const stub = tmpl(pattern, data).replace(/\/+$/, '');
        const route = this.endpoint.replace(/\/+$/, '');
        console.log(baseURL, 'versus', this.endpoint, 'and', route);
        return [`${baseURL}${route}`, stub].join('/').replace(/\/+$/, '');
      }

      static executeRequest(
        data = {},
        pattern = '',
        method = 'GET',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _ctx = {}
      ) {
        const url = this.buildURL(pattern, data);
        const config: any = { method, url };
        const key = method.toLowerCase() === 'get' ? 'params' : 'data';
        config[key] = data;
        return this.axios.request(config);
      }

      // Now implement all default methods
      static list(data = {}, ctx = {}) {
        return this.executeRequest(data, '', 'GET', ctx);
      }

      static post(data: undefined, pattern = '{id}', ctx = {}) {
        return this.executeRequest(data, pattern, 'POST', ctx);
      }
      static emit(data: undefined, pattern = 'emit', ctx = {}) {
        return this.executeRequest(data, pattern, 'POST', ctx);
      }

      static send(data: undefined, pattern = 'send', ctx = {}) {
        return this.executeRequest(data, pattern, 'POST', ctx);
      }
    }

    Resource.endpoint = endpoint;
    Resource.config = { ...HttpAdapter.defaults, ...config };
    Resource.axios = axios.create(Resource.config);

    // console.log(Resource.config)
    // Integrating interceptors for request and response
    Resource.axios.interceptors.request.use(
      function (config: any) {
        if (isClientSide) {
          nProgress.start();
          return config;
        }
        return config;
      },
      function (error: any) {
        if (isClientSide) {
          nProgress.done();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    Resource.axios.interceptors.response.use(
      function (response: any) {
        if (isClientSide) {
          nProgress.done();
          return response;
        }
        return response;
      },
      function (error: any) {
        if (isClientSide) {
          nProgress.done();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return Resource;
  }
}

HttpAdapter.defaults = {
  paramsSerializer: function (params: any) {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      skipNulls: true,
      indices: false,
      encode: false,
    });
  },
};
const baseURL = LOCAL_API;
const defaultConfig = {
  baseURL,
  headers: {
    'X-Request-With': 'XMLHttpRequest',
  },
};

HttpAdapter.updateDefaults(defaultConfig);
export class RequestProxy extends HttpAdapter.createResource('/') {}
