import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

export async function GetComerciosConNombre(nombre : string){
  try {
      const path = 'http://propapi-ap58.onrender.com/api/Comercio/string/'+nombre;
      const response = await axios.get(path);
      console.log(response);
      return response.data.$values;
    } catch (error) {
        console.error('Error al realizar la solicitud 6:', error);
    }
}

export default async function GetAllComercios(){
    try {
        return await axios.get('https://propapi-ap58.onrender.com/api/Comercio').then((res) => {   
        return res.data.$values;
            
        });
        } catch (error) {
            console.error('Error al realizar la solicitud 7:', error);
        }
}

export async function GetComercioById (id : Number) {
    try {
      const path = 'https://propapi-ap58.onrender.com/api/Comercio/' + id;
      const response = await axios.get(path);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud 8:', error);
    }
}

export async function GetComercioByName (name : string) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/nombre/' + name;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud 9:', error);
  }
}

export async function GetComerciosCercanos()
{
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Comercio/nombre/' + name;
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud 10:', error);
  }

}