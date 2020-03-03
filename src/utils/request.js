import axios from 'axios'
import { baseUrl } from '../config/index.js'

axios.defaults.baseURL = baseUrl(); // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

//配置发送请求前的拦截器 可以设置token信息 
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 配置响应拦截器 
axios.interceptors.response.use(res => {
  if (!res.data.code === '000') {
    return false;
  };
  return Promise.resolve(res);
}, error => {
  return Promise.reject(error);
})

export default axios