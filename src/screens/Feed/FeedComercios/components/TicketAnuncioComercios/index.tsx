import React from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'

export default function TicketAnuncioComercio(props: any){
    return(
        <View style={styles.anuncio}>
            <View style={styles.contenedorAnuncio}>
                <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.ComercioImg}></Image>
                <View style={styles.contenedorAnuncioText}>
                    <Text style = {{ fontWeight: 'bold', fontSize: 20}}> {props.nombreComercio} </Text>
                    <Text style = {{ fontSize: 15 }}> {props.tipoComercio} </Text>
                    <Text style = {{ fontSize: 15 }}> {props.ranking} </Text>
                    <Text style={styles.desc}>{props.descripcion}</Text>
                </View>
                
            </View>
            <View style={styles.container}>
                <View style={styles.descriptionField}>
                        
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    anuncio: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 10,
        backgroundColor: '#FDD09A',
        borderRadius: 20
    }, 
    contenedorAnuncio:{
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
    },
    ComercioImg: {
        width: 125,
        height: 125,
        borderRadius: 10,
        borderWidth: 1
    },
    contenedorAnuncioText:{
        alignItems: "flex-start",
        marginLeft: 5,
        marginRight: 10,
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
      flexWrap: 'wrap',
      padding: 8,
      marginBottom: 20
    }
  });