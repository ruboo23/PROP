import axios, { CancelTokenSource } from 'axios'
import { UploadImage } from '../ImagenesService';

interface Usuario {
    id: Number
    nickname: string;
    imagenname: string
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
        console.log(updatedUsuarios)
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
      return res.data.$values;
    });
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
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
    console.log(usuario);
    const path = 'https://propapi-ap58.onrender.com/api/Usuario';

    axios.post(path, usuario);
    if (imagen != null) {
      console.log('subiendo imagen')
      UploadImage(values.nickname.trim(), imagen[1]).then(url => console.log(url));
    }

  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}

export async function Login(nombreUsuario: string, contrasena: string) {
  try {
    console.log('Antes de la peticion ' + nombreUsuario)
    const response = await axios.get(`https://propapi-ap58.onrender.com/api/Usuario/Login?userCredentials=${nombreUsuario}&contrasena=${contrasena}`);
    const userData = response.data;
    console.log('Metodo Servicios: ' +  userData)
    return userData;
  } catch (error) {
    console.log("Error al realizar la solicitud: ", error);
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

