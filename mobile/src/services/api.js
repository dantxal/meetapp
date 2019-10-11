import axios from 'axios';
import {HOST} from '~/util/hostConstant'

const api = axios.create({
  // baseURL: 'http://10.0.2.2:3333',
  // baseURL: 'http://10.0.3.2:3333', //if using genymotion emulator change to this
  baseURL: `http://${HOST}:3333`, //if using device via usb change to your machine's ip
});

export default api;
