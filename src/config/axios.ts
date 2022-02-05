import axios from 'axios';
export const {source} = axios.CancelToken;
export const {all} = axios;

export default axios.create({
  baseURL: 'https://rnserver.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
