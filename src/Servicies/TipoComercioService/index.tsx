import axios from 'axios';

export async function GetTipoByComercioID(id : number){
    try {
        const path = 'http://localhost:5186/api/Tipo/id?id=' + id;
        const response = await axios.get(path);
        console.log(response);
        return response.data.$values;
        } catch (error) {
            console.error('Error al realizar la solicitud 6:', error);
        }
  }