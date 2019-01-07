import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://psssquadproductions.firebaseio.com'
  baseURL: ''
});

export default instance;