import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

export async function GetImageByName (name : String) {
  try {
    const path = 'https://propapi-ap58.onrender.com/api/Imagen/' + name;
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud 12:', error);
  }
}