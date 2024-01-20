import axios from 'axios';

// Create an instance of axios with custom configurations
const api = axios.create({
  baseURL: 'http://medcarefind.com:8080/api', 
});

// Set the access token in the headers
const setAccessToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export { api, setAccessToken };
