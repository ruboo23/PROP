import axios, { CancelTokenSource } from 'axios'

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