import React from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'

interface Comercio {
    nombre: string,
    nombreUsuario: String,
    descripcion: string,
    imagenNombre: string,
    horaPublicacion: String
  }
  
  const ejemploTicket: Comercio = {
    nombre: "Pablo",
    nombreUsuario: "@Pablooob",
    descripcion: "Muy buena, He ido a comer al restaurante saona y me ha parecido una delicatesen de verda 100% recomendado una locura tt",
    imagenNombre: "ejemplo.jpg",
    horaPublicacion: "2:00"
  };

export default function TicketPublicaciones(props: any){
    return(
        <View style={styles.ticket}>
            <View style={styles.cabeceraTicket}>
                <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.profileImg}></Image>
                <Text style = {{ marginBottom: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 20}}> {props.nombre} </Text>
                <Text style = {{ marginBottom: 10, marginLeft: 1, fontSize: 15}}> {props.nombreUsuario} </Text>
                <Text style = {styles.textHoraPublicacion}> {props.horaPublicacion} </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.descriptionField}>
                    <Text style={styles.desc}>{props.descripcion}</Text>    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ticket: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 10,
        backgroundColor: '#D6EFF3',
        borderRadius: 20
    }, 
    cabeceraTicket:{
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
        marginTop: 10, 
        marginRight: 5,
    },
    textHoraPublicacion:{
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