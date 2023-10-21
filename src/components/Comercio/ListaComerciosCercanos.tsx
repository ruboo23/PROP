import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import  {GetComercioByName}  from "../../Servicies/ComercioService";
import TicketComercioCercano from './TicketComercioCercano';
import * as Location from 'expo-location'
import { LocationObjectType, useGlobalState } from '../context';

export default function ListaComerciosCercanos(props: any) {
  const [location, setLocation] = useState<LocationObjectType | null>(null);
  const { state } = useGlobalState();

    useEffect(() => {
      setLocation({ latitude: state?.coordinates?.latitude, longitude: state?.coordinates?.longitude });
    }, [state.coordinates]);
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
            CoordenadasUsuario={location}
          />
        ))}
    </ScrollView>
  );
}
