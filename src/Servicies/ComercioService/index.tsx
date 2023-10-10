import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';


export default async function GetAllComercios(){
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Comercio').then((res) => {
            return res.data.$values;
        });
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
}

export async function GetComercioById (id : Number) {
    try {
      const path = 'https://propapi20231008104458.azurewebsites.net/api/Comercio/' + id;
      const response = await axios.get(path);
      return JSON.parse(response.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
}

export async function GetComercioByName (name : string) {
  try {
    const path = 'https://propapi20231008104458.azurewebsites.net/api/Comercio/nombre/' + name;
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}