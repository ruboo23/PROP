import axios from 'axios';
import { UploadImage } from '../ImagenesService';

interface Comercio {
  contraseña: string;
  descripcion: string;
  email: string;
  facebook: string;
  horario: string;
  nombre: string;
  provincia: string;
  telefono: number;
  instagram: string;
  direccion: string;
  web: string;
}

export async function GetReseñasByComercioId(id: number) {
  try {
    const path = 'http://propapi-ap58.onrender.com/api/Reseña/Comercio/' + id;
    const response = await axios.get(path);
    return response.data.$values;
  } catch (error) {
    console.error('Error al realizar la solicitud 6:', error);
  }
}

export async function GetReseñasByUsuarioId(id: number) {
  try {
    const path = 'http://propapi-ap58.onrender.com/api/Reseña/Usuario/' + id;
    const response = await axios.get(path);
    return response.data.$values;
  } catch (error) {
    console.error('Error al realizar la solicitud 6:', error);
  }
}

export default async function GetAllComercios() {
  try {
    return await axios.get('https://propapi-ap58.onrender.com/api/Comercio').then((res) => {
      return res.data.$values;

    });
  } catch (error) {
    console.error('Error al realizar la solicitud 7:', error);
  }
}
