import axios from 'axios';

// TODO: read from .env file the API url
export const get = async (path: string, body?: { name: string }) =>  axios.get(`https://propapi20231008104458.azurewebsites.net/api${path}`, { params: body });
