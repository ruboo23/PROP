import axios, { CancelTokenSource } from 'axios'
import { UploadImageBucket } from '../ImagenesService';
import userSingleton from '../GlobalStates/UserSingleton';


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

export async function PostPublicacion(idComercio: number, titulo: string, descripcion: string, imagenes: [string, string][]) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Publicacion';

    const fecha = new Date();

    var nombreImagenesString = '';
    if (imagenes.length > 0) {
      nombreImagenesString = titulo + fecha.getDate() + fecha.getTime() + (imagenes.length-1);
      for (let i = 0; i < imagenes.length; i++) {
        await UploadImageBucket('Publicaciones', imagenes[i][1], titulo + fecha.getDate() + fecha.getTime() + i);
      }
    }

    const idUser = userSingleton.getUser()?.id;
    axios.post(path, {
      usuario: idUser,
      comercio: idComercio,
      titulo: titulo.length>0 ? titulo : "",
      descripcion: descripcion.length>0 ? descripcion : "",
      fecha: fecha,
      nombreimagen: nombreImagenesString.trim()
    });

  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}


