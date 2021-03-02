import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lmdung-burger-default-rtdb.firebaseio.com/'
})

export default instance;