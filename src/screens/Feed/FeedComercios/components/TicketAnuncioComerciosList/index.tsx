import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketAnuncioComercio from "../TicketAnuncioComercios";

export default function TicketAnuncioComerciosList(props: any){
    return(
        <View>
        {
        props.ListaAnuncios.map((comercio: any) => (
            console.log(comercio.Id),
            <TicketAnuncioComercio
               Id={comercio.Id}
               Nombre={comercio.Nombre}
               Tipo={comercio.Tipo}
               Descripcion={comercio.Descripcion}
               ImagenNombre={comercio.ImagenNombre}
               Provincia={comercio.Provincia}
               Horario={comercio.Horario}
            />
          ))}
        </View>
    )
}