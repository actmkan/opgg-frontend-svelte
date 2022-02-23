import axios from "axios";
import { push } from "svelte-spa-router";
import { authToken } from "../store/auth";
import { get } from "svelte/store";

const production = false;
const BASE_URL = production ? "https://api.opgg.ahn.mk" : "http://localhost";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = get(authToken);
    console.log(token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response.status === 401) {
      originalConfig._retry = true;
      push("/login");
    }

    return Promise.reject(err);
  }
);

export default request;
