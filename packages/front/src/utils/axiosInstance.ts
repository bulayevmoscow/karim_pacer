import axios from "axios";

export const axiosInstance = axios.create({
  // timeout: 1000,
});

axiosInstance.interceptors.response.use(
  (configs) => {
    console.log(1, JSON.stringify(configs));
    return configs;
  },
  (error) => {
    console.log("error1!");
    JSON.stringify(2, error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (configs) => {
    console.log(3, configs);
    return configs;
  },
  (error) => {
    console.log("error1!");
    JSON.stringify(4, error);
    return Promise.reject(error);
  }
);
