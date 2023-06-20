import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/backend_hrcwebapp';

const API = async (endPoint, req = { body: {} }, type = 'GET') => {
  try {
    const request = {
      url: BASE_URL + endPoint,
      body: req.body,
    };

    switch (type) {
      case 'POST':
        return axios.post(request.url, req.body, {});

      case 'GET':
        return axios.get(request.url, {});

      case 'PUT':
        return axios.put(request.url, req.body, {});

      case 'DELETE':
        return axios.delete(request.url, { data: request.body } || {});

      default:
        return {
          success: false,
          data: { message: 'Unknown API request' },
        };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios network errors
      if (!error.response) {
        return {
          success: false,
          data: { message: 'Network Error' },
        };
      }
      // Handle other Axios errors (e.g., server response with non-2xx status code)
      return {
        success: false,
        data: error.response.data,
      };
    } else {
      // Handle other errors
      console.log('ERROR:', error);
      return {
        success: false,
        data: { message: 'Unknown Error' },
      };
    }
  }
};

export default API;