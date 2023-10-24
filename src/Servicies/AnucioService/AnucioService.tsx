import axios from 'axios';
import {UploadImage} from '../ImagenesService';

export function SubirAnuncio(comercio : number, fecha: Date, titulo: string, descripcion: string, imagenes: [string, string][], tipo: string) {
    try {
        const nombreImagenesArray = imagenes.map((dupla) => dupla[0]);
        var nombreImagenesString = "";
        for(const img in imagenes){
            let i = 1;
            UploadImage(titulo+fecha+i, img[1]);
            i++;
        }
        
/*
        for (var i = 0; i < imagenes.length; i++) {
            nombreImagenesString += nombreImagenesArray[i] + ", ";
            // subir a supabase cada imagen
            UploadImage(imagenes[i][0], imagenes[i][1]);
        }*/
        axios.post('https://propapi-ap58.onrender.com/api/Anuncio', {
            IdComercio: comercio,
            Fecha: fecha.toISOString(),
            Titulo: titulo,
            Descripcion: descripcion, 
            imagenes: nombreImagenesString,
            Tipo: tipo
        });
    } catch (error) {
        console.error("Error al subir el anuncio", error);
    }
}

export async function GetAnuncioById (id : Number) {
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Anuncio'+id).then((res) => {
            return res.data.$values;
        })
    } catch (error) {
        console.error('Error al realizar la solicitud 1:', error);
    }
}

export async function GetNovedadFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Anuncio/novedad/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud 5:', error);
    }
}

export async function GetOfertasFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Anuncio/oferta/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud 1:', error);
    }
}

export async function GetLastOfertaFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Anuncio/oferta/ultima/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud 3:', error);
    }
}

export async function GetLastNovedadFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Anuncio/novedad/ultima/'+id).then((res) => {
            return res.data;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud 4:', error);
    }
}