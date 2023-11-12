import axios from 'axios';
import { API_URL } from '../constants';

export async function GetTipoByComercioID(id : number){
    try {
        const path = API_URL + '/Tipo/id?id=' + id;
        const response = await axios.get(path);
        return response.data.$values;
        } catch (error) {
            console.error('Error al realizar la solicitud 6:', error);
        }
  }

export async function GetAllTipos(){
    try {
        const path = API_URL + '/Tipo';
        const response = await axios.get(path);
        return response.data.$values;
        } catch (error) {
            console.error('Error al realizar la solicitud 6:', error);
        }
  }