import axios, { AxiosError, CancelTokenSource } from 'axios'
import { UploadImageBucket } from '../ImagenesService';
import userSingleton from '../GlobalStates/UserSingleton';

interface Lista {
    id: number
    nombre: string;
    imagen: string
}

interface Comercio {
    id: number,
    nombre: string,
    nombreimagen: string
}

interface TuplaLista {
    Lista: Lista,
    boolean: boolean
}


export async function ListasFromUsuario(usuarioid: Number) {
    let respuesta: Array<Lista> = []
    await axios.get('https://propapi-ap58.onrender.com/api/Lista/id/usuario/sololistas/' + usuarioid).then((response) => {
        const contenido = response.data.$values;
        for (var element in contenido) {
            respuesta.push({ id: contenido[element].id, nombre: contenido[element].nombre, imagen: contenido[element].imagen })
        }
    }
    )
    return respuesta;
}

export async function ListasFromUsuarioComercio(usuarioid: number, comercioId: number) {
    let respuesta: Array<TuplaLista> = [];

    await axios.get('https://propapi-ap58.onrender.com/api/Lista/id/usuario/' + usuarioid).then((response) => {
        const contenido = response.data.$values;
        let listaRecibida: Lista;
        if (contenido) {
            for (var element in contenido) {
                let booleanCalculado: boolean = false; // Initialize with a default value

                listaRecibida = { id: contenido[element].id, nombre: contenido[element].nombre, imagen: contenido[element].imagen };

                if (contenido[element].Comercio) {
                    for (var comercio in contenido[element].Comercio.$values) {
                        if (contenido[element].Comercio.$values[comercio].id === comercioId) {
                            booleanCalculado = true;
                            break;
                        } else {
                            booleanCalculado = false;
                        }
                    }
                }
                let TuplaListaCreada: TuplaLista = { Lista: listaRecibida, boolean: booleanCalculado };
                respuesta.push(TuplaListaCreada);
            }
        }
    });

    return respuesta;
}

export async function ComerciosFromLista(idlista: number) {
    let respuesta: Array<Comercio> = []
    await axios.get('https://propapi-ap58.onrender.com/api/Lista/id/' + idlista).then((response) => {
        const contenido = response.data.Comercio.$values;

        for (var element in contenido) {
            respuesta.push({ id: contenido[element].id, nombre: contenido[element].nombre, nombreimagen: contenido[element].nombreimagen })
        }
    }
    )
    return respuesta;
}

export async function ComprobarComercio(idlista: number, comercio: number) {
    await axios.get('https://propapi-ap58.onrender.com/api/Lista/id/' + idlista).then((response) => {
        const contenido = response.data.Comercio.$values;

        for (var element in contenido) {
            console.log(contenido[element].id + "____________" + comercio)
            if (contenido[element].id === comercio) { return true; }
        }
    }
    )
    return false;
}

export async function EliminarLista(nombre: string) {
    try {
        axios.delete('https://propapi-ap58.onrender.com/api/Lista/borrarNombre/' + nombre);
    }
    catch (e) { console.error(e) }
}

export async function AñadirComercio(lista: number, comercio: number) {
    try {
        axios.post("https://propapi-ap58.onrender.com/api/Lista/lista/comercio/" + lista + "/" + comercio)
    }
    catch (e) { console.error(e) }
}

export async function PostLista(nombre: string, imagen: string) {
    try {
        const path = "https://propapi-ap58.onrender.com/api/Lista";
        const response = await axios.post(path, {
            nombre: nombre,
            imagen: imagen,
            idusuario: userSingleton.getUser()?.id,
        });

        return response.data;
    } catch (error) {
        // Capturar y manejar errores
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error('Error de Axios:', axiosError.message);
            console.error('Código de estado:', axiosError.response?.status);
            console.error('Respuesta del servidor:', axiosError.response?.data);
        } else {
            console.error('Error no relacionado con Axios:', error);
        }

        // Puedes lanzar el error nuevamente si es necesario o retornar algún valor indicando el error
        throw error;
    }
}
