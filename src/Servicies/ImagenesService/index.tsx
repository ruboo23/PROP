import axios from 'axios';

export async function GetImageByName (name : String) {
  try {
    const path = 'https://propapi20231008104458.azurewebsites.net/api/Imagen/' + name;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export async function PostImage (nombre : string, base64 : (string | null | undefined)) {
  try {
    if (!base64?.startsWith("data")) var data = "data:image/jpeg;base64," + base64;  
    else var data = base64;    
      const path = 'https://propapi20231008104458.azurewebsites.net/api/Imagen/' + nombre;
      axios.post(path, {base64})
        .then(response => {
          console.log('Respuesta:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      return;
  } catch (error) {
    console.log('Error en la solicitud de subir imagen: ', error);
  }
}