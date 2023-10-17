import { all } from "axios";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants'
import  {GetComercioByName}  from "../../Servicies/ComercioService";
import { GetImageByName } from "../../Servicies/ImagenesService";
import * as Location from 'expo-location'

var contador: number = 0
export default function TicketComercioCercano(props: any){
    contador++

    const [userLocation, setUserLocation] = useState<any>({
      latitude: 0.0,
      longitude: 0.0
    })

    var distancia: any = 0.0
    const [initialization, setInitialization] = useState<boolean>()

    const [loading, setLoading] = useState(true);

    async function getLocationPermission():Promise<boolean> {
      Location.requestForegroundPermissionsAsync().then(permissionResponse => {
        if (permissionResponse.status !== 'granted')
        {
          alert('Permission denied')
          return false;
        }

          Location.getCurrentPositionAsync({}).then(current => {
            setUserLocation({
              latitude: current.coords.latitude,
              longitude: current.coords.longitude
            })
            console.log(current.coords.latitude + "" + current.coords.longitude )
            return true
          });
          
      }

      )
      return false;
      
      
    }

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
      getLocationPermission().then(e => {
        if(true) {
          console.log('Ubicacion usuario: ' + userLocation.latitude + ' ' + userLocation.longitude)
          distancia = calcularDistancia(userLocation.latitude, userLocation.longitude, props.Latitud, props.Longitud);
          if(userLocation.longitude !== 0 && userLocation.latitude !== 0)
          {
            setLoading(false)
          }
          
          setLoading(false)

          if (distancia <= 1000) {
            setInitialization(true);
            //console.log('Distancia menor a 1 km ---> Comercio Inicializado');
          } else {
            //console.log('Distancia superior a 1 km');
          }
              
            }
          })

        if (props.ImagenNombre == null) {
          props.ImagenNombre = "avatarPred.png";
        }


    });

    if(loading && contador === 1)
    {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else if(initialization === true) {
      return(
        <View style={styles.containerComercio}>
        <View style={styles.cabeceraComercio}>
            <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.profileImg}></Image>
            <Text style = {{ marginTop: 10, marginBottom: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 20}}> {props.Nombre} </Text>
            <Text style = {styles.textDistancia}> {'A menos de 1 km de ti'} </Text>
        </View>
        <View style= {styles.containerIntermedio}></View>
        <View style={styles.descriptionContainer}>
            <View style={styles.descriptionField}>
                <Text style={styles.desc}>{props.Descripcion}</Text>    
            </View>
        </View>
    </View>
    )
    }

}

const styles = StyleSheet.create({
  containerComercio: {
      maxWidth: 700,
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 15,
      marginRight: 10,
      backgroundColor: 'grey',
      borderRadius: 20,
      flexDirection: 'row'
  }, 
  cabeceraComercio:{
      flexDirection: 'column',
      alignItems: "center",
      marginTop: 5,
      marginLeft: 5,
      marginRight: 10,
  },
  profileImg: {
      width: 70,
      height: 70,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 1
  },
  textNombre:{
      marginTop: 10, 
      marginRight: 5,
  },
  textDistancia:{
      marginBottom: 10,
      textAlign: 'right'
  },
  descriptionContainer: {
    maxWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  descriptionField: {
    width: '100%',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight:5,
    backgroundColor: '#EBEFF3',
    borderRadius: 20,
  }, 
  containerIntermedio: {
    width: 25
  }, 
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    margin: 5,
    flexWrap: 'wrap',
    padding: 8,
    marginBottom: 20
  }
});