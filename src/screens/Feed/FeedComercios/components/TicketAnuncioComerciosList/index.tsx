import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketAnuncioComercio from "../TicketAnuncioComercios";

export default function TicketAnuncioComerciosList(props: any){
    return(
        <View>
        {props.ListaAnuncios.map((comercio: any) => (
            <TicketAnuncioComercio
               key={comercio.id}
               nombreComercio={comercio.nombreComercio}
               nombreUsuarioComercio={comercio.nombreUsuarioComercio}
               descripcion={comercio.descripcion}
               imagenNombre={comercio.imagenNombre}
               horaPublicacion={comercio.horaPublicacion}
            />
          ))}
        </View>
    )
}