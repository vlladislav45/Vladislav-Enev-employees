import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
// import { useNavigate } from "react-router-dom";

export const JWT_TOKEN = 'token';

class BaseApi {
  api: AxiosInstance | undefined;

  constructor() {
    this.initialize();
  }

  initialize = () => {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BASE_BACKEND_URL + 'v1/',
      // baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  };

  public get = (url: string, options?: object) => this.api?.get(url, options);

  public post = (url: string, data: any, options?: AxiosRequestConfig) => this.api?.post(url, data, options);

  public delete = (url: string, options?: object) => this.api?.delete(url, options);

  public put = (url: string, data?: any, options?: object) => this.api?.put(url, data, options);
}

export default BaseApi;
