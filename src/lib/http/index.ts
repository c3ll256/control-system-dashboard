import axios from "axios";

const SERVER_URLS = {
  default: "http://192.168.50.172:4000",
};

const WEB_URL = "http://192.168.50.172";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? "" : SERVER_URLS.default,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? "http://localhost:3000" : WEB_URL,
    'Access-Control-Allow-Headers': '*',
  }
});

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  if (config.url && process.env.NODE_ENV === 'production') {
    const urlParts = config.url.split('/');
    const apiPrefix = urlParts[1];

    switch(apiPrefix) {
      case 'api':
        config.baseURL = SERVER_URLS.default;
        break;
      default:
        // 如果没有匹配的前缀，使用默认 URL
        config.baseURL = SERVER_URLS.default;
    }

    // 移除 API 前缀
    config.url = '/' + urlParts.slice(2).join('/');
  }

  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Show error with sonner
  import('sonner').then(({ toast }) => {
    toast.error(error.response?.data?.message || 'An error occurred');
  });
  return Promise.reject(error);
});

export default axiosInstance;