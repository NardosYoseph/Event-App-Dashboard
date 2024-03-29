import axios from 'axios';

class ApiClient {

    static instance = null;

    static initialize(baseURL) {
        if (!ApiClient.instance) {
          ApiClient.instance = new ApiClient(baseURL);
        }
      }
      
      static getInstance() {
        if (!ApiClient.instance) {
          throw new Error('ApiClient has not been initialized. Call initialize() first.');
        }
        return ApiClient.instance;
      }
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 40000 
    });

    this.axiosInstance.interceptors.request.use(
      config => {
        console.log('Request:', config);
        return config;
      },
      error => Promise.reject(error)
    );


    
    this.axiosInstance.interceptors.response.use(
      response => {
        console.log('Response:', response);
        return response;
      },
      error => {
        console.error('Response Error:', error.response);
        if (error.response.status === 401) {
          // Perform token refresh here
          return this.handleTokenRefresh(error);
        }
        return Promise.reject(error);
      }
    );
  }
  async handleTokenRefresh(error) {
    try {
      const newAccessToken = await this.refreshToken(  localStorage.getItem('token'));

      // Retry the original request with the new access token
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return this.axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      throw refreshError;
    }
  }
  async refreshToken(refreshToken) {
    try {
      const response = await this.post("/user/refresh",{'refreshToken': refreshToken} );
      const data = jsonDecode(response.body);
      const newAccessToken = data['accessToken'];
      localStorage.setItem('token', newAccessToken);
      console.log("token refreshed",newAccessToken);
      return newAccessToken;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  setHeader(headers) {
    this.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...headers
    };
  }

  setAuthorization(token) {
    const authorizationHeader = {
      Authorization: `Bearer ${token}`,
    }
    this.axiosInstance.defaults.headers  = {...this.axiosInstance.defaults.headers , ...authorizationHeader }
  }

  removeAuthorization() {
   delete this.axiosInstance.headers.Authorization;
  }

  handleError(error)  {
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('Request error:', error.request);
      throw 'No response from the server';
    } else {
      console.error('Request setup error:', error.message);
      throw 'Error setting up the request';
    }
  }


  async get(path,params = {},data = {},) {
    try {
      const response = await this.axiosInstance.get(path,{ params, data});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

async post(path,body,params={} ) {
  try {
    console.log(path);
    console.log(body);

    const response = await this.axiosInstance.post(path,body,{params});
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}



async put(path, data = {}) {
  try {
    const response = await this.axiosInstance.put(path, data);
    return response.data;
  } catch (error) {
    throw this.handleError(error);
  }
}

  async getPaginated(endpoint, params = {}, page , size ) {
    try {
      const paginatedData = await this.get(endpoint, { ...params, page, size },
      );
      return paginatedData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async request(method, url, data = {}) {
    try {
      const response = await this.axiosInstance({ method, url, data });
      return response.data;
    } catch (error) {
      // Handle errors appropriately, including retries and user feedback
      throw error;
    }
  }
}

export default ApiClient;