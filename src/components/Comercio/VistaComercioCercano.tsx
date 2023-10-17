import React, { useEffect, useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, Alert } from 'react-native';
import Constants from 'expo-constants'
import  {GetComercioByName}  from "../../Servicies/ComercioService";
import { GetImageByName } from "../../Servicies/ImagenesService";
import * as Location from 'expo-location'


interface Comercio {
    Descripcion: String,
    Direccion: String,
    Facebook?: String, 
    Horario?: String, 
    Id: 3,
    ImagenNombre: String, 
    Instagram?: String, 
    Mail?: String, 
    Nombre: String, 
    Provincia: String, 
    Telefono?: number, 
    Tipo?: [Object], 
    Web?: String,
    Imagen64?: String
}

interface Location {
    Latitude: number,
    Longitude: number
}

  

export default function VistaComercioCercano(props: any) {
    const [comercio, setComercio] = useState<Comercio | null>(null);
    const [userLocation, setUserLocation] = React.useState({
      latitude: 0,
      longitude: 0
    })
    const [comercioLocation, setComercioLocation] = React.useState({
      latitude: 0,
      longitude: 0
    })
    const [distance, setDistance] = useState<any>(null)
    let distancia: any = 0.0
    const [initialization, setInitialization] = useState<boolean>()

    async function getLocationPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted')
      {
        alert('Permission denied')
        return;
      }
      let location = Location.getCurrentPositionAsync({});
      const current = {
        latitude: (await location).coords.latitude,
        longitude: (await location).coords.longitude
      }
      console.log('Ubicacion usuario: ' +current)
      setUserLocation(current)
    }

    function calcularDistancia(lat1: any, lon1: any, lat2: any, lon2: any) {
      const radioTierraKm = 6371; // Radio de la Tierra en kilómetros

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
      const distanciaMetros = distanciaKm * 1000;

      console.log('Distancia: '+distanciaMetros);
      return distanciaMetros;
    }

    useEffect(() => {
      setInterval(() => {
        getLocationPermission()
      }, 1000)
      

      GetComercioByName("HUGO & FLO")
        .then((res: any) => {
          const c: Comercio = {
            Direccion: res?.data.Direccion,
            Descripcion: res?.data.Descripcion,
            Facebook: res?.data.Facebook,
            Horario: res?.data.Horario,
            Id: res?.data.Id,
            ImagenNombre: res?.data.ImagenNombre,
            Instagram: res?.data.Instagram,
            Mail: res?.data.Mail,
            Nombre: res.data.Nombre,
            Provincia: res.data.Provincia,
            Telefono: res.data.Telefono,
            Tipo: res.data.Tipo,
            Web: res?.data.Web,
          };
          if (c.ImagenNombre == null) {
            c.ImagenNombre = "avatarPred.png";
          }
          const coordComercio =  {
            latitude: c.Direccion.split(",")[0],
            longitude: c.Direccion.split(",")[1]
          }
          console.log('Localizacion Comercio: ' + coordComercio)

          setInterval(() => {
            distancia = calcularDistancia(userLocation.latitude, userLocation.longitude, coordComercio.latitude, coordComercio.longitude)
            //setDistance(distancia)

            if(distancia <= 1000) {
              setComercio(c)
              setInitialization(true)
              console.log('Distancia menor a 1 km --> Comercio Inicializado')
            } else 
            {
              console.log('Distancia superior a 1 km')
              return;
            }
          }, 1000)        

        })
        .catch((error) => {
          console.log('Error en la obtencion datos del comercio', error);
        });
    }, []); 
  
    if(initialization === true){
      return (
        <View style={styles.containerReseña}>
            <View style={styles.cabeceraReseña}>
              <Image
                source={{
                  uri:
                    "https://propapi20231008104458.azurewebsites.net/api/Imagen/" +
                    props?.ImagenNombre,
                }}
                style={styles.profileImg}
              />
              <View style={styles.cabeceraReseña}>
                <Text style={styles.textNombre}>{props?.Nombre}</Text>
                <Text style={styles.textKms}>A 1 km de ti</Text>
              </View>
            </View>
          <View style={styles.container}>
            <View style={styles.descriptionField}>
              <Text style={styles.desc}>{props?.Descripcion}</Text>
            </View>
          </View>
        </View>
      );

    }
    
  }

const styles = StyleSheet.create({
    containerReseña: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 10,
        backgroundColor: 'grey',
        borderRadius: 20
    }, 
    cabeceraReseña:{
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
    },

    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1
    },
    textNombre:{
        marginTop: -6,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textKms:{
        marginBottom: 10,
        textAlign: 'right'
    },
    container: {
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10,
    },
    descriptionField: {
      width: '100%',
      marginLeft: 5,
      backgroundColor: '#EBEFF3',
      borderRadius: 20,
    }, 
    desc: {
      margin: 5,
      flexWrap: 'wrap',
      padding: 8,
      marginBottom: 20
    }
  });