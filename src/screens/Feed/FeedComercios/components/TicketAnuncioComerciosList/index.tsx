import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketAnuncioComercio from "../TicketAnuncioComercios";

export default function TicketAnuncioComerciosList(props: any){
    return(
        <View>
        {
        props.ListaAnuncios.map((comercio: any) => (
            <TicketAnuncioComercio
               seguidor={comercio.seguidor}
               key={comercio.id}
               id={comercio.id}
               nombre={comercio.nombre}
               tipo={comercio.tipo}
               descripcion={comercio.descripcion}
               imagen={comercio.ImagenNombre}
               provincia={comercio.provincia}
               horario={comercio.horario}
               novedades={comercio.novedades}
               ofertas={comercio.ofertas}
            />
          ))}
        </View>
    )
}