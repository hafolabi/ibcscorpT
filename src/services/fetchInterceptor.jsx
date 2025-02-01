import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "./serviceUtils";
import { logoutHandler } from "./serviceUtils/auth";

const API_URL = 'https://jsonplaceholder.typicode.com/';

const service = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

const TOKEN_PAYLOAD_KEY = "authorization";
const PUBLIC_REQUEST_KEY = "public-request";

// API Request Interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = Cookies.get("ABCD");

    if (jwtToken && getSession(jwtToken)) {
      config.headers[TOKEN_PAYLOAD_KEY] = `bearer ${jwtToken}`;
    }

    if (!getSession(jwtToken) && !config.headers[PUBLIC_REQUEST_KEY]) {
      logoutHandler();
    }

    if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
      logoutHandler();
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// API response interceptor
service.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
  
);

export default service;
