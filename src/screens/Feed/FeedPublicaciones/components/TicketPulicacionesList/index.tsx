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
              nombreimagenusuario={publicacion.nombreimagenusuario}
              nombreimagenpublicacion={publicacion.nombreimagenpublicacion}
              key={publicacion.id}
              usuarioId={publicacion.usuarioId}
              id={publicacion.id}
              comercioId={publicacion.comercioId}
              nombre={publicacion.nombre}
              nombreUsuario={publicacion.nombreUsuario}
              nombreComercio={publicacion.nombreComercio}
              descripcion={publicacion.descripcion}
              nombreimagen={publicacion.nombreimagen}
              horaPublicacion={publicacion.horaPublicacion}
              titulo={publicacion.titulo}
            />
          ))}
        </View>
    )
}