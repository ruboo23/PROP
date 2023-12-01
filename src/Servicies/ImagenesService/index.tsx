import axios from 'axios';
import { API_URL } from '../constants';

export async function UploadImage(name: string, imagen64: string): Promise<string | undefined> {
  const path = `https://propapi-ap58.onrender.com/api/Imagenes/${name.trim()}`;
  const data = imagen64;

  try {
    const response = await axios.post(path, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.config.url;
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error);
  }
}

export async function UploadImageBucket(bucketname: string, imagen64: string, name: string) {
    const path = API_URL + '/Bucket/'+bucketname+"/"+name.trim();
    await axios.post(path, imagen64, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
    }).catch((e) => {console.log('ERROR EN IMAGEN:', e)});
}