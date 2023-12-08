import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { UploadImageBucket } from '../ImagenesService';
import { API_URL } from '../constants';

interface Comercio {
  contraseña: string;
  descripcion: string;
  email: string;
  facebook: string;
  horario: string;
  nombre: string;
  provincia: string;
  telefono: number;
  instagram: string;
  direccion: string;
  web: string;
  tipo_id: any
}

export async function LoginComercio(nombreComercio: string, contrasena: string) {
  try {
    const response = await axios.get(`https://propapi-ap58.onrender.com/api/Comercio/Login?userCredentials=${nombreComercio}&contrasena=${contrasena}`);
    const userData = response.data;
    return userData;
  } catch (error) {
    console.log("Error al realizar la solicitud: ", error);
    throw error;
  }
}
export async function GetComerciosConNombre(nombre: string) {
  try {
    const path = API_URL + '/Comercio/string/' + nombre;
    const response = await axios.get(path);
    return response.data.$values;
  } catch (error) {
    console.error('Error al realizar la solicitud 6:', error);
  }
}

export default async function GetAllComercios() {
  try {
    return await axios.get('https://propapi-ap58.onrender.com/api/Comercio').then((res) => {
      return res.data.$values;

    });
  } catch (error) {
    console.error('Error al realizar la solicitud 7:', error);
  }
}

export async function GetComercioById(id: Number) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/' + id;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud 8:', error);
  }
}

export async function GetComercioByName(name: string) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/nombre/' + name;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud 9:', error);
  }
}

export async function GetComerciosFiltrados(filtros: any) {
  try {
    const path = `https://propapi-ap58.onrender.com/api/Comercio/filtros/${filtros.puntuacion}/${filtros.tipo}`;
    const response = await axios.get(path, filtros);
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud 10:', error);
  }

}

export async function editarNombreImagen(id:any, nombreimagen:string) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/editarNombreImagen/'+ id + "/" + nombreimagen;
    await axios.put(path).then(e => console.log('Imagen subida a tabla')).catch(e => console.log("Error cambiando nombreImagenSupabase: ", e));
  } catch (error) {
    console.error('Error al editar usuario:', error);
  }
}


export async function EmailExistente(email:string) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/mail/' + email;
    const response = await axios.get(path);
    return response.data;
   
  } catch (error) {
    console.error('Error al realizar la solicitud 9:', error);
  }
}

export async function verificarEmail(email: string) {
  try {
    const response = await EmailExistente(email);
    
    if (response === true) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error al verificar el correo electrónico:", error);
    return false; // Puedes manejar el error según tus necesidades.
  }
}

export async function PostComercio(values: Comercio) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        values.direccion + ", " + values.provincia
      )}`
    );

    if (!response.ok) {
      console.error('Error en la solicitud de geocodificación:', response.statusText);
      return false;
    }

    const data = await response.json();

    if (!data || !data.length || !data[0].lat || !data[0].lon) {
      console.error('No se pudo obtener la ubicación desde la dirección proporcionada.');
      return false;
    }

    const comercio = {
      Nombre: values.nombre,
      Direccion: values.direccion,
      Telefono: values.telefono ? values.telefono : 0,
      Horario: values.horario,
      Web: values.web,
      Descripcion: values.descripcion,
      nombreimagen: null,
      Provincia: values.provincia,
      Contraseña: values.contraseña,
      mail: values.email,
      instagram: values.instagram,
      facebook: values.facebook,
      latitud: data[0].lat,
      longitud: data[0].lon,
      valoracionpromedio: 0,
    };

      
    console.log("comercio: " + JSON.stringify(comercio,null,2))
    // Asegúrate de retornar la promesa resultante de axios.post
    const responseComercio = await axios.post('https://propapi-ap58.onrender.com/api/Comercio', comercio);

    return true;
    
  } catch (error) {
    console.error('Error al insertar comercio:', error);
    return false;
  }
}

export async function GetComercioByEmail(email: string) {
  try {
    return axios.get('https://propapi-ap58.onrender.com/api/Comercio/email?email=' + email)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('No se ha encontrado ningun comercio ascociado')
      });
  } catch (error) {
    console.log('No se ha encontrado ningun comercio ascociado')
  }
}

export async function GetAllImagesFromComercioId(id: number): Promise<{ tipo: string; imagen: string }[]> {
  const pathReseñas = API_URL + '/Reseña/Comercio/' + id;
  const pathAnuncios = API_URL + "/Anuncio/anuncio/" + id;
  const imagenesTotales: { tipo: string; imagen: string }[] = [];

  try {
    const reseñasRes = await axios.get(pathReseñas);
    const anunciosRes = await axios.get(pathAnuncios);

    anunciosRes.data.$values.forEach((anuncio: any) => {
      if (anuncio.imagenes) {
        const lastNumber = parseInt(anuncio.imagenes?.charAt(anuncio.imagenes?.length-1));
        for (let i = 0; i <= lastNumber; i++) {
          imagenesTotales.push({ tipo: 'Anuncios', imagen: anuncio.imagenes.trim().substring(0, anuncio.imagenes.length - 1)+i });
        }
      }
    });

    reseñasRes.data.$values.forEach((reseña: any) => {
      if (reseña.nombreimagen) {
        const lastNumber = parseInt(reseña.nombreimagen?.charAt(reseña.nombreimagen?.length-1));
        for (let i = 0; i <= lastNumber; i++) {
          imagenesTotales.push({ tipo: 'Resenas', imagen: reseña.nombreimagen.trim().substring(0, reseña.nombreimagen.length - 1)+i });
        }
      }
    });

    return imagenesTotales;
  } catch (error) {
    console.error('Error en la obtención de datos:', error);
    throw error;
  }
}
