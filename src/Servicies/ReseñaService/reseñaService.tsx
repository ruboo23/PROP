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

export default async function PostReseña(idUsuario: number, idComercio: number, titulo: string, descripcion: string, puntuacion: number, imagenes: [string, string][]) {
  try {
    const uploadPromises = [];
    const fecha = new Date();

    for (let i = 0; i < imagenes.length; i++) {
      const promise = UploadImage(titulo + fecha.getDate() + fecha.getTime() + i, imagenes[i][1]);
      uploadPromises.push(promise);
    }

    const urls = await Promise.all(uploadPromises);
    const nombreImagenesString = urls.join(', ');

    await axios.post('https://propapi-ap58.onrender.com/api/Anuncio', {
      comercio: idComercio,
      fecha: fecha,
      titulo: titulo,
      descripcion: descripcion,
      puntuacion: puntuacion,
      imagenes: nombreImagenesString ? nombreImagenesString : null,
    });
  } catch (error) {
    console.error('Error al realizar la solicitud 7:', error);
  }
}
