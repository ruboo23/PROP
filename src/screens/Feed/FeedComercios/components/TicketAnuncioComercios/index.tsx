import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants'
import { all } from "axios";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from "@expo/vector-icons";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import AnuncioModal from "../AnunciosModal";
import PerfilComercio from "../../../../PerfilComercio";

export type RootStackParamList = {
    PerfilComercio: { id: number, esComercioLogueado: boolean };
  };

export default function TicketAnuncioComercio(props: any){
    const [modalVisible, setModalVisible] = useState(false);
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const redirectToPerfilScreen = () => {
        navigation.navigate('PerfilComercio', { id: props.id, esComercioLogueado: false})
      };

    return(
        <TouchableOpacity onPress={() => redirectToPerfilScreen()}>
        <View style={styles.containerComercio}>
            {props.seguidor == 1 ? (
                 <View style={{margin: 5, alignSelf: "flex-start"}}>
                    <Text>siguiendo</Text>
                </View>
                ) : (
                <View style={{margin: 5, alignSelf: "flex-start"}}>
                    <Text>Cercano</Text>
                </View>
            )}
            <View style={{flexDirection: 'row'}}>
                <View style={styles.cabeceraComercio}>
                    <Image source={{ uri:  "http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/" + props.imagen }} style={styles.profileImg} />
                    <View style={styles.cabeceraTexto}>
                        <Text style={styles.nombre}>{props.nombre}</Text>
                        {(props.distancia)
                        ? <Text style={styles.textDistancia}>{'A ' + props.distancia?.toFixed(1) + ' km de ti'}</Text>
                        : <Text style={styles.textDistancia}>{props.provincia}</Text>
                        }
                        
                    </View>
                </View>
                <View style={styles.containerIntermedio}></View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionField}>
                        <Text style={styles.tipo}>{props.tipo_id}</Text>
                    </View>
                    {
                        ((props.novedades != null 
                            && props.novedades != undefined
                            && props.novedades.length > 0)
                        || (props.ofertas != null 
                            && props.ofertas != undefined
                            && props.ofertas.length > 0)) 
                            ?
                        <TouchableOpacity  onPress={() => {setModalVisible(true)}}>
                            <Entypo name={"flash"} color={"red"} size={30}></Entypo> 
                        </TouchableOpacity>
                        :
                        (
                            <View></View>
                        )
                    }
                </View>              
            </View>
            <View style={style.descriptionField}>
                    <Text style={style.desc}>{props.descripcion}</Text>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={style.modalAnuncios}>
                    <View style={{justifyContent: 'flex-end', width: 35}}>
                        <TouchableNativeFeedback onPress={() => setModalVisible(false)} >
                            <Entypo name={"back"} size={30} color={"blue"}></Entypo>
                        </TouchableNativeFeedback>
                    </View>
                    <AnuncioModal novedades = {props.novedades} ofertas = {props.ofertas}></AnuncioModal>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    modalAnuncios:{
        alignSelf: "center", 
        width: "95%", 
        height: "75%", 
        backgroundColor: "white", 
        marginVertical: "25%", 
        padding: 20,
        borderRadius: 30,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 4
    },
    anuncio: {
        width:"95%",
        height: 220,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#FDD09A',
        borderRadius: 20,
        padding: 5
    }, 
    contenedorAnuncio:{
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        margin: 5
    },
    ContenedorAnuncioTextCont:{
        width:"95%",
        height:"18%",
        flexDirection: "row",
    },
    contenedorAnuncioDetalles:{
        width: "25%",
        height:"100%",
        marginBottom: 10,
        marginTop: 10,
        padding: 5
    },
    ComercioImg: {
        alignSelf: "center",
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 1
    },
    contenedorAnuncioText:{
        height: "100%",
        flex: 1,
        alignItems: "flex-start",
        margin: 5,
        padding: 5
    },
    contenedorAnuncioTextCabecera:{
        flex: 1,
        alignItems: "flex-start",
        margin: 5,
    },
    contenedorAnuncioTextDesc: {
        alignItems: 'center',
        width:"95%",
        height:"75%",
        marginBottom: 5,
        marginRight: 10,
        marginTop: 10
    },
    descriptionField: {

        flex: 2,
        width: "90%",
        margin: 10,
        backgroundColor: '#EBEFF3',
        borderRadius: 20,
    }, 
    desc: {
        flexWrap: 'wrap',
        padding: 8,
        marginBottom: 20
    }
  });

  const styles = StyleSheet.create({
    containerComercio: {
      backgroundColor: 'white',
      borderRadius: 10,
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
      flexDirection: "row",
      
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