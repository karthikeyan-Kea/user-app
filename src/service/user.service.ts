import axios from 'axios';

export const getUsers = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return axios.get(`${baseUrl}users.json`);
};
