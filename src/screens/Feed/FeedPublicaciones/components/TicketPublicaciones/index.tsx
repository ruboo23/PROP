import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants'
import PerfilUsuarioExterno from "../../../../PerfilUsuarioExterno";

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
    console.log(props.nombreimagen)
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => { setModalVisible(false); }

    const redirectToPerfilScreen = () => {
        setModalVisible(true);
      };

    return(
      <View>
        <TouchableOpacity onPress={redirectToPerfilScreen}>
        <View style={styles.ticket}>
            <View style={styles.cabeceraTicket}>
                <Image source={{uri: "http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/" + props.nombreimagen}} style={styles.profileImg}></Image>
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
        </TouchableOpacity>
        <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={false}
            >
                <View>
                    <View style={{display: 'flex', justifyContent: 'flex-end', marginRight: 50, marginTop: 10, width: '100%'}}>
                        <TouchableNativeFeedback onPress={() => setModalVisible(false)} >
                            <Image source={{uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png'}} style={{width: 40, height: 40}}></Image>
                        </TouchableNativeFeedback>
                    </View>
                    <PerfilUsuarioExterno id={props.id} closeModal={closeModal}/>
                </View>
            </Modal>
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