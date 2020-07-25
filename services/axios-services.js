import axios from 'axios';
import {apiUrl} from '../constants/constants';

export const getMethod = async (url) => {
  const res = await axios.get(apiUrl + url);
  return res;
};
