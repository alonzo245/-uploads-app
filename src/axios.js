import axios from 'axios';

const instance = axios.create({
  baseURL:  window.location.protocol+'//localhost:3000'
});

export default instance;