import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

export async function GetImageByName (name : String) {
  try {
    const path = 'https://propapi20231008104458.azurewebsites.net/api/Imagen/' + name;
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}