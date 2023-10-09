import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';


export default async function getComercios(){
    try {
        return await axios.get('https://propapi20231008104458.azurewebsites.net/api/Comercio').then((res) => {
            return res.data.$values;
        });
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
}
