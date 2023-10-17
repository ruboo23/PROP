import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import  {GetComercioByName}  from "../../Servicies/ComercioService";
import TicketComercioCercano from './TicketComercioCercano';
import * as Location from 'expo-location'

export default function ListaComerciosCercanos(props: any) {
    return (
      <ScrollView>
      {props.ListaComercios.map((comercio: any) => (
        <TicketComercioCercano
          key={comercio.Id}
          Nombre={comercio.Nombre}
          Tipo={comercio.Tipo}
          Descripcion={comercio.Descripcion}
          ImagenNombre={comercio.ImagenNombre}
          Provincia={comercio.Provincia}
          Horario={comercio.Horario}
          Direccion={comercio.Direccion}
          Latitud={comercio.Latitud}
          Longitud={comercio.Longitud}
        />
      ))}
    </ScrollView>
  );
}
