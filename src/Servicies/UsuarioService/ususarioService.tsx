import axios, { CancelTokenSource } from 'axios'

interface Usuario {
    id: Number
    nickname: string;
    imagenname: string
}

export async function JSONtoUsuario(name: string, cancelToken: any) {
    return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Usuario/string/' + name, { cancelToken: cancelToken }).then((response: any) => {
        const contenido = response.data.$values;
        let updatedUsuarios: Array<Usuario> = [];
        for (const obj in contenido) {
            let imagen = "";
            if (contenido[obj].ImagenName != null) {
                imagen = contenido[obj].ImagenName;
            }
            updatedUsuarios.push({ id: contenido[obj].Id, nickname: contenido[obj].NickName, imagenname: imagen })
        }

        return updatedUsuarios;
    }).catch((error: any) => { console.error("Error al realizar la solicitud", error); });
}

export async function GetUsuarioById (id : Number) {
    try {
      const path = 'https://propapi20231008104458.azurewebsites.net/api/Usuario/' + id;
      return await axios.get(path).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
}