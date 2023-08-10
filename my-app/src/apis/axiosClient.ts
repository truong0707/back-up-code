import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

//config header axios
const defaultHeaders = {
  ...axiosClient.defaults.headers.common,
  "Content-Type": "application/json; charset=UTF-8",
};

axiosClient.defaults.headers.common = defaultHeaders;

axiosClient.interceptors.request
  .use
  //   (config) => {
  //     const token = getUserToken();
  //     if (token) {
  //       config.headers.Authorization = token;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  ();

export default axiosClient;
