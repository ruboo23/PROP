import React, { useEffect, useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketAnuncioComercio from "../TicketAnuncioComercios";

export default function TicketAnuncioComerciosList(props: any){
  useEffect(()=>{
    
  },[])
    return(
        <View>
        {
        props.ListaAnunciosCercanos.map((comercio: any) => (
            <TicketAnuncioComercio
                distancia={comercio.distancia}
                seguidor={comercio.seguidor}
                key={comercio.id}
                id={comercio.id}
                nombre={comercio.nombre}
                tipo_id={comercio.tipo_id}
                direccion={comercio.direccion}
                descripcion={comercio.descripcion}
                imagen={comercio.ImagenNombre}
                provincia={comercio.provincia}
                horario={comercio.horario}
                anuncios={comercio.anuncios}
                valoracionpromedio={comercio.valoracionpromedio}
            />
          ))}
          {
        props.ListaAnunciosSeguidos.map((comercio: any) => (
            <TicketAnuncioComercio
               seguidor={comercio.seguidor}
               key={comercio.id}
               id={comercio.id}
               nombre={comercio.nombre}
               tipo_id={comercio.tipo_id}
               direccion={comercio.direccion}
               descripcion={comercio.descripcion}
               imagen={comercio.ImagenNombre}
               provincia={comercio.provincia}
               horario={comercio.horario}
               anuncios={comercio.anuncios}
               valoracionpromedio={comercio.valoracionpromedio}
            />
          ))}
        </View>
    )
}