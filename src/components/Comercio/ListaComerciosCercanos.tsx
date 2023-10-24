import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import  {GetComercioByName}  from "../../Servicies/ComercioService";
import TicketComercioCercano from './TicketComercioCercano';
import * as Location from 'expo-location'
import { LocationObjectType, useGlobalState } from '../context';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ListaComerciosCercanos(props: any) {
  const [location, setLocation] = useState<LocationObjectType | null>(null);
  const { state } = useGlobalState();
  const [chargeState, setChargeState] = useState<boolean>(true);

    useEffect(() => {
      if(state?.coordinates == undefined){return}
      setLocation({ latitude: state?.coordinates?.latitude, longitude: state?.coordinates?.longitude });
    }, [state.coordinates]);

    useEffect(() => {
      if(location == null){return}
      console.log("Localizacion:  " + location)
      setChargeState(location === null ? true : false);
    }, [location]);

    if(chargeState)
    {
      return (
        <View style={styles.container}>
          <Spinner
            visible={true}
            textContent={'Cargando...'}
            textStyle={styles.loadingText}
          />
        </View>
      );
    }
    else{
      return (
        <ScrollView>
          {props.ListaComercios.map((comercio: any) => (
            <TicketComercioCercano
              key={comercio.Id}
              Nombre={comercio.Nombre}
              Tipo={comercio.Tipo}
              Descripcion={comercio.Descripcion}
              NombreImagen={comercio.NombreImagen}
              Provincia={comercio.Provincia}
              Horario={comercio.Horario}
              Direccion={comercio.Direccion}
              Latitud={comercio.Latitud}
              Longitud={comercio.Longitud}
              CoordenadasUsuario={location ? location : {lonlatitude: 0, longitude: 0}}
              Id={comercio.Id}
            />
          ))}
      </ScrollView>
    );
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#000',
  },
});

