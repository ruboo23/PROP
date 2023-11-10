import axios from 'axios';

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
    const path = 'http://propapi-ap58.onrender.com/api/Bucket/'+bucketname+"/"+name.trim();
    console.log(bucketname + "/" + name);
    console.log(imagen64)
    console.log(path)
    await axios.post(path, imagen64, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => {console.log(e)});
}