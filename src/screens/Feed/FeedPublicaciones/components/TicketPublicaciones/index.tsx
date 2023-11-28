import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import PerfilUsuarioExterno from "../../../../PerfilUsuarioExterno";
import ModalImagen from "../../../../../components/Comercio/Anuncios/ModalImagen";

export default function TicketPublicaciones(props: any){
    const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);
    const [modalImagenVisible, setModalImagenVisible] = useState(false);
    const closeModal = () => { setModalUsuarioVisible(false); }
    const [image, setImage] = useState<String>("");
    const [imagenSeleccionada, setImagenSeleccionada] = useState('')

    const redirectToPerfilScreen = () => {
        setModalUsuarioVisible(true);
      };

      const renderizarImagenes = () => {
        const imagenes = [];
        if (props.nombreimagenpublicacion) {
          const lastNumber = parseInt(props.nombreimagenpublicacion?.charAt(props.nombreimagenpublicacion?.length-1), 10)
          for (let i = 0; i <= lastNumber; i++) {
            const uri = `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Publicaciones/${props.nombreimagenpublicacion.substring(0, props.nombreimagenpublicacion.length - 1)}${i}`;
            imagenes.push(
                <TouchableOpacity key={i} style={{ width: 90, height: 90, marginTop: 10, marginBottom: -10 }} 
                    onPress={() => {
                        setImage(uri); 
                        setImagenSeleccionada(uri);
                        setModalImagenVisible(true)
                    }}>
                    <Image key={uri} source={{ uri }} style={{ flex: 1/1.2, width: 70, height: 70, marginRight: 20, marginLeft: 10, borderRadius: 20}} />
                </TouchableOpacity>
            );
          }
        }
        return imagenes;
      };

    return(
      <View>
        <TouchableOpacity onPress={redirectToPerfilScreen}>
        <View style={styles.ticket}>
            <View style={styles.cabeceraTicket}>
                <Image source={
                    {uri: props.nombreimagenusuario 
                        ? "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/" + props.nombreimagenusuario
                        : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}
                        } style={styles.profileImg}></Image>
                <View style={{flexDirection: "row", flex: 1, justifyContent:"space-between", marginRight: 20}}>
                    <View style={{padding: 5}}>
                        <Text style = {{fontWeight: 'bold', fontSize: 17}}> {props.nombreUsuario} </Text>
                        <Text style = {{fontSize: 12}}> {"sobre @" + props.nombreComercio} </Text>
                    </View> 
                    <Text style = {styles.textHoraPublicacion}> {props.horaPublicacion.toString().substring(11, 16)} </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={{alignSelf:"flex-start", fontSize: 15, fontWeight: "bold"}}>{props.titulo}</Text> 
                <View style={styles.descriptionField}>
                    <Text style={styles.desc}>{props.descripcion}</Text>    
                </View>
            </View> 
            <View style={{flexDirection: 'row', display: 'flex', marginLeft: 60}}>
                {renderizarImagenes()}
            </View>
        </View>
        </TouchableOpacity>
        <View style={{borderColor: "gray", borderWidth: 1, marginHorizontal: 30}}></View>
        {(modalImagenVisible && imagenSeleccionada==image) && <ModalImagen imagen={image} close={() =>{setModalImagenVisible(false)}} /> }
        <Modal
                visible={modalUsuarioVisible}
                animationType="slide"
                transparent={false}
            >
                <View>
                    <View style={{display: 'flex', justifyContent: 'flex-end', marginRight: 50, marginTop: 10, width: '100%'}}>
                        <TouchableNativeFeedback onPress={() => setModalUsuarioVisible(false)} >
                            <Image source={{uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png'}} style={{width: 40, height: 40}}></Image>
                        </TouchableNativeFeedback>
                    </View>
                    <PerfilUsuarioExterno id={props.usuarioId} closeModal={closeModal}/>
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
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 5
    },
    textNombre:{
        marginTop: 10, 
        marginRight: 5,
    },
    textHoraPublicacion:{
        top:0,
        right:0
    },
    container: {
      alignItems: 'center',
      paddingLeft: 70
    },
    descriptionField: {
      width: '100%',
    }, 
    desc: {
      flexWrap: 'wrap',
    }
  });