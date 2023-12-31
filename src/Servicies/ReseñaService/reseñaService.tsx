import axios from 'axios';
import { UploadImageBucket } from '../ImagenesService';
import userSingleton from '../GlobalStates/UserSingleton';
import { API_URL } from '../constants';
import { normalize } from 'path';

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
    const path = API_URL + '/Reseña/Comercio/' + id;
    const response = await axios.get(path);
    return response.data.$values;
  } catch (error) {
    console.error('Error al realizar la solicitud 6:', error);
  }
}

export async function GetReseñasByUsuarioId(id: number) {
  try {
    const path = API_URL + '/Reseña/Usuario/' + id;
    const response = await axios.get(path);
    return response.data.$values;
  } catch (error) {
    console.error('Error al realizar la solicitud 7:', error);
  }
}

export async function PostReseña(idComercio: number, titulo: string, descripcion: string, puntuacion: number, imagenes: [string, string][]) {
  try {
    const idUser = userSingleton.getUser()?.id;

    const fecha = new Date();
    var nombreImagenesString = '';
    if (imagenes.length > 0) {
      nombreImagenesString = idComercio + "" + idUser + fecha.getDate() + fecha.getTime() + (imagenes.length-1);
      for (let i = 0; i < imagenes.length; i++) {
        await UploadImageBucket('Resenas', imagenes[i][1], idComercio + "" + idUser +  fecha.getDate() + fecha.getTime() + i);
      }
    }
    
    await axios.post(API_URL+'/Reseña', {
      usuario: idUser,
      comercio: idComercio,
      titulo: titulo.length>0 ? titulo : "",
      descripcion: descripcion.length>0 ? descripcion : "",
      fecha: fecha,
      puntuacion: puntuacion-1,
      nombreimagen: nombreImagenesString.trim(),
    });
  } catch (error) {
    console.error('Error al realizar la solicitud 8:', error);
  }
}

export async function ExisteReseña(idComercio: number) {
  try {
    const idUsuario = userSingleton.getUser()?.id;
    const path = API_URL + '/Reseña/' + idComercio + '/' + idUsuario;
    
    const response = await axios.get(path);
    return response.data === true; 
  } catch (e) {
    console.error('Error al realizar la solicitud 9:', e);
  }
}