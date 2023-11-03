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

export async function PostUsuario(values:valuesType, estado:boolean, imagen:string[]|null) {
  try {
    // Subir imagen
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
      UploadImage(values.nickname, imagen[1]).then(url => console.log(url));
    }

  } catch (error) {
    console.error('Error al insertar usuario:', error);
  }
}