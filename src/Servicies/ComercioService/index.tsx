import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { UploadImage } from '../ImagenesService';

interface Comercio {
  contraseña: string;
  descripcion: string;
  email: string;
  facebook: string;
  horario: string;
  nombre: string;
  telefono: string;
  instagram: string;
  direccion: string;
  web: string;
}

export async function GetComerciosConNombre(nombre: string) {
  try {
    const path = 'http://propapi-ap58.onrender.com/api/Comercio/string/' + nombre;
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

export async function GetComerciosCercanos() {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/nombre/' + name;
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud 10:', error);
  }

}
export async function PostComercio(values: Comercio, imagen: string[] | null) {
  try {
    const comercio = {
      Nombre: values.nombre,
      Direccion: values.direccion,
      Telefono: values.telefono,
      Horario: values.horario,
      Web: values.web,
      Descripcion: values.descripcion,
      ImagenNombre: imagen?.[1] ? values.nombre : " " ,
      Provincia: "Nombre de la provincia",
      Contraseña: values.contraseña,
      Mail: values.email,
      Instagram: values.instagram,
      Facebook: values.facebook,
      Latitud: "123.456789",
      Longitud: "456.789123"
    };
    console.log(comercio);
    const path = 'https://propapi-ap58.onrender.com/api/Comercio';

    axios.post(path, comercio);
    if (imagen != null) {
      console.log('subiendo imagen')
      UploadImage(values.nombre.trim(), imagen[1]).then(url => console.log(url));
    }

  } catch (error) {
    console.error('Error al insertar comercio:', error);
  }
}