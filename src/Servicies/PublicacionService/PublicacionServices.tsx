import axios, { CancelTokenSource } from 'axios'
import { UploadImageBucket } from '../ImagenesService';


export async function GetPublicacionById (id : Number) {
    try {
      const path = 'https://propapi-ap58.onrender.com/api/Publicacion/id/' + id;
      return await axios.get(path).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.error('Error al realizar la solicitud GetPublicacionById:', error);
    }
}

export async function GetUserPublicacionById (id : Number) {
    try {
      const path = 'https://propapi-ap58.onrender.com/api/Publicacion/usuario/' + id;
      return await axios.get(path).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.error('Error al realizar la solicitud GetPublicacionById:', error);
    }
}

export async function GetPublicacionesByUserIds (ids : any) {
    try {
        let path = 'https://propapi-ap58.onrender.com/api/Publicacion/usuarios?';

        ids.forEach((id: number, index: number) => {
            if (index === 0) {
              // Primer elemento
              path += `ids=${id}`;
            } else {
              // Resto de los elementos
              path += `&ids=${id}`;
            }
          });
        
        const response = await axios.get(path);
    
        return response.data;
      } catch (error) {
        console.error('Error al realizar la solicitud GetPublicacionesByUserIds:', error);
        throw error; // Puedes manejar el error según tus necesidades
      }
}

export async function GetAllPublicaciones() {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Publicacion';
    return await axios.get(path).then((res) => {
      return res.data.$values;
    });
  } catch (error) {
    console.error('Error al realizar la solicitud GetAllPublicaciones:', error);
  }
}

export async function PostPublicacion(publicacion: any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Publicacion';

    axios.post(path, publicacion);
    // if (imagen != null) {
    //   await UploadImageBucket('Usuarios', imagen[1], values.nickname.trim());
    // }

  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}


