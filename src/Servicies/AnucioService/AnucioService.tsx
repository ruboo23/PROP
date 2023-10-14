import axios from 'axios';

export async function SubirAnuncio(anuncio : string) {
    try {
        await axios.post('https://propapi20231008104458.azurewebsites.net/api/Anuncio'+anuncio);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

export async function GetAnuncioById (id : Number) {
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Anuncio'+id).then((res) => {
            return res.data.$values;
        })
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

export async function GetNovedadFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Anuncio/novedad/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud:', error);
    }
}

export async function GetOfertasFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Anuncio/oferta/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud:', error);
    }
}

export async function GetLastOfertaFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Anuncio/oferta/ultima/'+id).then((res) => {
            return res.data.$values;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud:', error);
    }
}

export async function GetLastNovedadFromComercio (id : Number) {
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Anuncio/novedad/ultima/'+id).then((res) => {
            return res.data;
        });
    } catch (error) {
        console.log('Error al realizar la solicitud:', error);
    }
}