import axios from 'axios';

class DbService {
  // Create an Axios instance with default configuration
  axiosInstance = axios.create({
    baseURL: 'https://localhost:7146/api/', // Replace with your API base URL
    // Set a default timeout for requests
  });

  // Function to make GET requests with optional token
  async get(url, headers = {}, token = '') {
    try {
      // Add token to headers if provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await this.axiosInstance.get(url, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to make POST requests with optional token
  async post(url, data, headers = {}, token = '') {
    try {
      // Add token to headers if provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await this.axiosInstance.post(url, data, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to make PUT requests with optional token
  async put(url, data, headers = {}, token = '') {
    try {
      // Add token to headers if provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await this.axiosInstance.put(url, data, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to make DELETE requests with optional token
  async remove(url, headers = {}, token = '') {
    try {
      // Add token to headers if provided
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await this.axiosInstance.delete(url, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling function
  handleError(error) {
    // You can customize the error handling as needed
    console.error('API call error:', error);
    throw error; // Rethrow the error if needed
  }
}

export default new DbService();
