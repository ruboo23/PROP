import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketPublicaciones from "../TicketPublicaciones";
interface Comercio {
    nombre: string,
    nombreUsuario: String,
    descripcion: string,
    imagenNombre: string,
    horaPublicacion: String
  } 
export default function TicketPublicacionesList(props: any){
    return(
        <View>
        {props.ListaPublicaciones.map((comercio: any) => (
            <TicketPublicaciones
              key={comercio.id}
              nombre={comercio.nombre}
              nombreUsuario={comercio.nombreUsuario}
              descripcion={comercio.descripcion}
              imagenNombre={comercio.imagenNombre}
              horaPublicacion={comercio.horaPublicacion}
            />
          ))}
        </View>
    )
}