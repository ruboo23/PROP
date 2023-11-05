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
        navigation.navigate('Perfil', { id: props.id })
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
                        <Image source={{uri: "http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/" + props.imagen}} style={styles.ComercioImg}></Image>
                        <Text style = {{ fontSize: 15, alignSelf: "center", fontWeight: "bold"}}> {props.tipo_id} </Text>
                        <Text style = {{ fontSize: 12, alignSelf: "center"}}> {props.provincia} </Text>
                        <Text style = {{ fontSize: 10, alignSelf: "flex-start"}}> {props.direccion} </Text>
                        
                        {/* <Text style = {{ fontSize: 15 }}> {props.Horario} </Text> */}
                    </View>
                    <View style={styles.contenedorAnuncioText}>
                        <View style={styles.ContenedorAnuncioTextCont}>
                            
                            <View style={styles.contenedorAnuncioTextCabecera}>
                                <Text style = {{ fontWeight: 'bold', fontSize: 18}} numberOfLines={1} ellipsizeMode="tail"> {props.nombre} </Text>
                            </View>
                            {
                                ((props.novedades._j != null 
                                    && props.novedades._j != undefined
                                    && props.novedades._j.length > 0)
                                || (props.ofertas._j != null 
                                    && props.ofertas._j != undefined
                                    && props.ofertas._j.length > 0)) ? ( 
                                    <TouchableOpacity  onPress={() => {setModalVisible(true)}}>
                                        <Entypo name={"flash"} color={"red"} size={30}></Entypo> 
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
                    <AnuncioModal novedades = {props.novedades._j} ofertas = {props.ofertas._j}></AnuncioModal>
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