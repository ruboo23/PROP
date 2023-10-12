import React from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { all } from "axios";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';


export default function TicketAnuncioComercio(props: any){
    

    const navigation = props.navegator;
    

    const redirectToPerfilScreen = () => {
        console.log(navigation);
        navigation.navigate('Perfil', { id: props.Id })
      };
    
    return(
        <TouchableOpacity onPress={redirectToPerfilScreen}>
            <View style={styles.anuncio}>
                <View style={styles.contenedorAnuncio}>
                    <View style={styles.contenedorAnuncioDetalles}>
                        <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.ComercioImg}></Image>
                        <Text style = {{ fontSize: 15 }}> {props.Provincia} </Text>
                        <Text style = {{ fontSize: 15 }}> {props.Horario} </Text>
                    </View>
                    <View style={styles.contenedorAnuncioText}>
                        <View style={styles.contenedorAnuncioTextCabecera}>
                            <Text style = {{ fontWeight: 'bold', fontSize: 20}}> {props.Nombre} </Text>
                            <Text style = {{ fontSize: 15 }}> {props.Tipo} </Text>
                        </View>
                        <View style={styles.contenedorAnuncioTextDesc}>
                            <View style={styles.descriptionField}>
                                <Text style={styles.desc}>{props.Descripcion}</Text>
                            </View>
                        </View>       
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    anuncio: {
        width:"95%",
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#FDD09A',
        borderRadius: 20
    }, 
    contenedorAnuncio:{
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    contenedorAnuncioDetalles:{
        width: 120,
        height:"100%",
        marginBottom: 10,
        marginTop: 10
    },
    ComercioImg: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 1
    },
    contenedorAnuncioText:{
        height: "100%",
        flex: 1,
        alignItems: "flex-start",
        margin: 5
    },
    contenedorAnuncioTextCabecera:{
        width:"95%",
        height:"30%",
        alignItems: "flex-start",
        margin: 5
    },
    contenedorAnuncioTextDesc: {
      alignItems: 'center',
      width:"95%",
        height:"60%",
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10,
    },
    descriptionField: {
        width:"100%",
        height:"100%",
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