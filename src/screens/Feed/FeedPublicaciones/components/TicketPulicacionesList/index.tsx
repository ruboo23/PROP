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
        {props.ListaPublicaciones.map((publicacion: any) => (
            <TicketPublicaciones
              navigator={props.navigator}
              key={publicacion.Id}
              Id={publicacion.Id}
              nombre={publicacion.nombre}
              nombreUsuario={publicacion.nombreUsuario}
              descripcion={publicacion.descripcion}
              imagenNombre={publicacion.imagenNombre}
              horaPublicacion={publicacion.horaPublicacion}
            />
          ))}
        </View>
    )
}