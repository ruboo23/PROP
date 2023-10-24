import axios from 'axios';

export async function UploadImage (name: string, imagen64: string) {
  const path = `https://propapi-ap58.onrender.com/api/Imagenes/${name.trim()}`;
  console.log(imagen64)
  const data = imagen64;

  axios.post(path, data, {
  headers: {
    'Content-Type': 'application/json',
  },
  })
  .then(response => {
    // Manejar la respuesta exitosa aquí
    console.log('Solicitud POST exitosa:', response);
  })
  .catch(error => {
    // Manejar los errores aquí
    console.error('Error al realizar la solicitud POST:', error);
  });
}

/*export async function GetImageByName (name : String) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Imagen/' + name;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud 12:', error);
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
}*/