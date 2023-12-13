import axios, { CancelTokenSource } from 'axios'
import { UploadImageBucket } from '../ImagenesService';
import userSingleton from '../GlobalStates/UserSingleton';

interface Usuario {
    id: Number
    nickname: string;
    imagenname: string
}

interface Lista {
  id: number
  nombre: string,
  descripcion: string,
  zona: string,
  duracion: number,
  autor: string
}

export async function JSONtoUsuario(name: string, cancelToken: any) {
    return await axios.get('https://propapi-ap58.onrender.com/api/Usuario/string/' + name.toLowerCase(), { cancelToken: cancelToken }).then((response: any) => {
        const contenido = response.data.$values;
        let updatedUsuarios: Array<Usuario> = [];
        for (const obj in contenido) {
            let imagen = "";
            if (contenido[obj].nombreimagen != null) {
                imagen = contenido[obj].nombreimagen;
            }
            updatedUsuarios.push({ id: contenido[obj].id, nickname: contenido[obj].nickname, imagenname: imagen })
        }
        return updatedUsuarios;
    }).catch((error: any) => { console.error("Error al realizar la solicitud", error); });
}

export async function GetUsuarioById (id : Number) {
    try {
      const path = 'https://propapi-ap58.onrender.com/api/Usuario/' + id;
      return await axios.get(path).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.error('Error al realizar la solicitud 13:', error);
    }
}

export async function GetAllUsuarios() {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario';
    return await axios.get(path).then((res) => {
      let contenido = res.data.$values;
      let respuesta:Array<Usuario> = []
      for(var u in contenido) {
        respuesta.push({id: contenido[u].id, nickname: contenido[u].nickname, imagenname: contenido[u].nombreimagen})
      }
      console.log(respuesta)
      return respuesta;
    });
  } catch (error) {
    console.error('Error al realizar la solicitud 14:', error);
  }
}


interface valuesType {
  email: string,
  contraseña: string,
  telefono: Number,
  nombre: string,
  nickname: string,
}

export function ComprobarCredenciales(nickname: string, correo: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const path = 'https://propapi-ap58.onrender.com/Registro/' + nickname + '/' + correo;
      axios.get(path).then((res) => {
        const result = res.data;
        resolve(result); // Resuelve la promesa con el resultado
      }).catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function PostUsuario(values:valuesType, estado:boolean, imagen:string[]|null) {
  try {
    const usuario = {
      nombre: values.nombre,
      nickname: values.nickname,
      telefono: values.telefono ? values.telefono : 0,
      contraseña: values.contraseña,
      mail: values.email,
      estado: estado,
      nombreimagen: imagen?.[1] ? values.nickname : " "
    };
    const path = 'https://propapi-ap58.onrender.com/api/Usuario';

    

    if (imagen != null) {
      await UploadImageBucket('Usuarios', imagen[1], values.nickname.trim());
    }
    await axios.post(path, usuario);
    return true;
  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}

export async function UpdateUsuario(id:any, values:any) {
  try {
    const User = {
      
        nombre: values.nombre,
        nickname: values.nickname,
        contraseña: values.contraseña,
        mail: values.mail,
        nombreimagen: values.imagenname
        
    }
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/'+ id;

    axios.post(path, User);

  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}

export async function editarNombreImagen(id:any, nombreimagen:string) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/editarNombreImagen/'+ id + "/" + nombreimagen;
    await axios.put(path);
  } catch (error) {
    console.error('Error al editar usuario:', error);
  }
}



export async function LoginUser(nombreUsuario: string, contrasena: string) {
  try {
    const response = await axios.get(`https://propapi-ap58.onrender.com/api/Usuario/Login?userCredentials=${nombreUsuario}&contrasena=${contrasena}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.log("Error al realizar la solicitud 00: ", error);
    throw error;
  }
}


export async function seguirComercio(idUsuario: any, idComercio: any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/seguirComercio/' + idUsuario + '/' + idComercio;
    const response = await axios.post(path);
    return response;
  } catch (error) {
    console.error('Error al seguir un comercio:', error);
  }
}

export async function dejarSeguirComercio(idUsuario: any, idComercio: any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/dejarSeguirComercio/' + idUsuario + '/' + idComercio;
    const response = await axios.delete(path);
    return response;
  } catch (error) {
    console.error('Error al seguir un comercio:', error);
  }
}

export async function seguirUsuario(idseguidor: any, idseguido: any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/seguirUsuario/' + idseguidor + '/' + idseguido;
    const response = await axios.post(path);
    return response;
  } catch (error) {
    console.error('Error al seguir un usuario:', error);
  }
}

export async function dejarSeguirUsuario(idseguidor: any, idseguido: any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/dejarSeguirUsuario/' + idseguidor + '/' + idseguido;
    const response = await axios.delete(path);
    return response;
  } catch (error) {
    console.error('Error al seguir un comercio:', error);
  }
}

export async function GetSeguidoresByUserId (id : any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/Seguidores/' + id;
    return await axios.get(path).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.error('Error al realizar la solicitud GetSeguidoresByUserId:', error);
  }
}

export async function GetSeguidosByUserId (id : any) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Usuario/Seguidos/' + id;
    return await axios.get(path).then((r) => {
      
      return r.data;
    });
  } catch (error) {
    console.error('Error al realizar la solicitud GetSeguidoresByUserId:', error);
  }
}


export async function GetListasSeguidas(id: number) {
  let respuesta: Array<Lista> = []
  await axios.get('https://propapi-ap58.onrender.com/api/Usuario/ListasSeguidas/' + id).then((response) => {
      const contenido = response.data.$values[0].listasseguidas.$values;
      for (var element in contenido) {
          respuesta.push({ id: contenido[element].id, nombre: contenido[element].nombre, descripcion: contenido[element].descripcion, zona: contenido[element].zona, duracion: contenido[element].duracion, autor: contenido[element].nombreusuariocreador })
      }
  }
  )
  return respuesta;
}

export async function SeguirLista(id:number) {
  try {
    await axios.post('https://propapi-ap58.onrender.com/api/Usuario/seguirLista/' + userSingleton.getUser()?.id + '/' + id)
  }
  catch(error) {
    console.error('Error al realizar la solicitud SeguirLista:', error);
    
  }
}

export async function DejarSeguirLista(id:number) {
  try {
    await axios.delete('https://propapi-ap58.onrender.com/api/Usuario/dejarseguirLista/' + userSingleton.getUser()?.id + '/' + id)
  }
  catch(error) {
    console.error('Error al realizar la solicitud SeguirLista:', error);
    
  }
}
