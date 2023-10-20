import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import Constants from 'expo-constants'
import { all } from "axios";
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from "@expo/vector-icons";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import AnuncioModal from "../AnunciosModal";

export type RootStackParamList = {
    Perfil: { id: number } | undefined;
  };

export default function TicketAnuncioComercio(props: any){
    const [modalVisible, setModalVisible] = useState(false);
    

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    

    const redirectToPerfilScreen = () => {
        navigation.navigate('Perfil', { id: props.Id })
      };

    return(
        <TouchableOpacity onPress={redirectToPerfilScreen}>
            <View style={styles.anuncio}>
            {props.Seguidor == 1 ? (
                <View style={{marginLeft: 20}}>
                    <Text>Seguidor</Text>
                </View>
                ) : (
                <View style={{marginLeft: 20}}>
                    <Text>Cercano</Text>
                </View>
            )}
                <View style={styles.contenedorAnuncio}>
                    <View style={styles.contenedorAnuncioDetalles}>
                        <Image source={{uri: "https://i.ibb.co/s6cCQB5/comercio-Local.jpg"}} style={styles.ComercioImg}></Image>
                        <Text style = {{ fontSize: 15 }}> {props.provincia} </Text>
                        {/* <Text style = {{ fontSize: 15 }}> {props.Horario} </Text> */}
                    </View>
                    <View style={styles.contenedorAnuncioText}>
                        <View style={styles.ContenedorAnuncioTextCont}>
                            
                            <View style={styles.contenedorAnuncioTextCabecera}>
                                <Text style = {{ fontWeight: 'bold', fontSize: 20}}> {props.nombre} </Text>
                                <Text style = {{ fontSize: 15 }}> {props.tipo} </Text>
                            </View>
                            {!!props.anuncio ? ( 
                                    <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                                        <Entypo name={"archive"} color={"red"} size={30}></Entypo> 
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <View></View>
                                )
                            }
                        </View>
                        <View style={styles.contenedorAnuncioTextDesc}>
                            <View style={styles.descriptionField}>
                                <Text style={styles.desc}>{props.descripcion}</Text>
                            </View>
                        </View>       
                    </View>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalAnuncios}>
                    <View style={{justifyContent: 'flex-end', width: 35}}>
                        <TouchableNativeFeedback onPress={() => setModalVisible(false)} >
                            <Entypo name={"back"} size={30} color={"blue"}></Entypo>
                        </TouchableNativeFeedback>
                    </View>
                    <AnuncioModal></AnuncioModal>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    ContenedorAnuncioTextCont:{
        width:"95%",
        height:"30%",
        flexDirection: "row", 
        backgroundColor: "yellow"
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
        flex:1,
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