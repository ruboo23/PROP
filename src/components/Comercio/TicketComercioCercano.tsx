
import React, { useEffect, useState, useLayoutEffect } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Perfil: { id: number } | undefined;
};


export default function TicketComercioCercano(props: any){
    var distancia: any = 0.0
    const [initialization, setInitialization] = useState<boolean>(false)
    const [distanciaDeTi, setDistanciaDeTi ] = useState<number>()

    function calcularDistancia(lat1: any, lon1: any, lat2: any, lon2: any) {
      const radioTierraKm = 6371; // Radio de la Tierra en kilómetros

      //console.log('Ubicacion destino: ' + lat2 + ' ' + lon2)
      // Convertir las coordenadas de grados decimales a radianes
      const lat1Rad = (parseFloat(lat1) * Math.PI) / 180;
      const lon1Rad = (parseFloat(lon1) * Math.PI) / 180;
      const lat2Rad = (parseFloat(lat2) * Math.PI) / 180;
      const lon2Rad = (parseFloat(lon2) * Math.PI) / 180;

      // Diferencias entre las latitudes y longitudes
      const dLat = lat2Rad - lat1Rad;
      const dLon = lon2Rad - lon1Rad;

      // Fórmula de la distancia haversine
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.asin(Math.sqrt(a));

      // Calcular la distancia en kilómetros
      const distanciaKm = radioTierraKm * c;

      // Convertir la distancia a metros
      const distanciaMetros = Math.round(distanciaKm * 1000 * 100) / 100; // Redondear a dos decimales


      //console.log('Distancia: '+ distanciaMetros);
      return distanciaMetros;
    }

    useEffect(() => {
      console.log("Coordenadas del usuario: "  + props.CoordenadasUsuario.latitude + ""+ props.CoordenadasUsuario.longitude)
      distancia = calcularDistancia(props.CoordenadasUsuario.latitude, props.CoordenadasUsuario.longitude, props.Latitud, props.Longitud);
      setDistanciaDeTi(distancia/1000)

      if(distancia < 5000 && props.CoordenadasUsuario.latitude != undefined && props.CoordenadasUsuario.longitude != undefined )
      {
        setInitialization(true)
      }
    });


    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const redirectToPerfilScreen = () => {
        navigation.navigate('Perfil', { id: props.Id })
    };

    if(initialization === true) {
      return(
        <TouchableOpacity onPress={redirectToPerfilScreen}>
           <View style={styles.containerComercio}>
              <View style={styles.cabeceraComercio}>
                <Image source={{ uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg" }} style={styles.profileImg} />
                <View style={styles.cabeceraTexto}>
                  <Text style={styles.nombre}>{props.Nombre}</Text>
                  <Text style={styles.textDistancia}>{'A ' + distanciaDeTi?.toFixed(1) + ' km de ti'}</Text>
                </View>
              </View>
              <View style={styles.containerIntermedio}></View>
              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionField}>
                  <Text style={styles.tipo}>{props.Tipo}</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>    
      )
    }
}

const styles = StyleSheet.create({
  containerComercio: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 2, 
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  cabeceraComercio: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10, // Espacio a la derecha para acomodar el nombre
  },
  cabeceraTexto: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textDistancia: {
    color: 'gray',
  },
  containerIntermedio: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.5,
    marginLeft: 0
  },
  descriptionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionField: {
    backgroundColor: '#EBEFF3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tipo: {
    fontWeight: 'bold',
  },
  
});