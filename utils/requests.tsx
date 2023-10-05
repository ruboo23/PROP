import axios from 'axios';

// TODO: read from .env file the API url
export const get = async (path: string, body?: { name: string }) =>  axios.get(`http://localhost:5186/api${path}`, { params: body });
