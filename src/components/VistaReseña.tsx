import React from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'

interface Reseñea {
    nombreUsuario: string,
    numEstrellas: number,
    Descripcion: string,
    imagenUsuario: string,

}

const EjemploReseña: Reseñea = {
    nombreUsuario: "Jesus",
    numEstrellas: 5,
    Descripcion: "Me ha encanatado el trato hacia sus clientes y sus productos son de muy buena calidad",
    imagenUsuario: "ejemplo.jpg"
}

export default function VistaReseña()
{
    return (
        <View style={styles.containerReseña}>
            <View style={styles.cabeceraReseña}>
                <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.profileImg}></Image>
                <Text style = {{ marginBottom: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 20}}> {EjemploReseña.nombreUsuario} </Text>
                <Text style = {styles.textEstrellas}> {EjemploReseña.numEstrellas.toString() + " estrellas"} </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.descriptionField}>
                    <Text style={styles.desc}>{EjemploReseña.Descripcion}</Text>    
                </View>
            </View>
        </View>
    );
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
        marginTop: 10, 
        marginRight: 5,
    },
    textEstrellas:{
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