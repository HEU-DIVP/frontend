import axios from 'axios';

const service = axios.create({
    baseURL: "http://192.168.158.157:8000",//请求地址前缀
    timeout: 0
});


//添加请求拦截器，在请求头中加token
service.interceptors.request.use(config => {
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
});

export default service;

