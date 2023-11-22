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
                    <Image key={uri} source={{ uri }} style={{ flex: 1/1.2, width: 70, height: 70, marginRight: 20, marginLeft: 10 }} />
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
                <Text style = {{ marginBottom: 10, marginLeft: 10, fontWeight: 'bold', fontSize: 20}}> {props.nombre} </Text>
                <Text style = {{ marginBottom: 10, marginLeft: 1, fontSize: 15}}> {"@" + props.nombreUsuario} </Text>
                <Text style = {styles.textHoraPublicacion}> {props.horaPublicacion} </Text>
            </View>
            <View style={styles.container}>
            <Text style={{alignSelf:"flex-start", marginHorizontal: 10, fontSize: 20, marginVertical: 5, fontWeight: "bold"}}>{props.titulo}</Text> 
                <View style={styles.descriptionField}>
                    <Text style={styles.desc}>{props.descripcion}</Text>    
                </View>
            </View>
            <View style={{flexDirection: 'row', display: 'flex'}}>
                {renderizarImagenes()}
            </View>
        </View>
        </TouchableOpacity>
        {(modalImagenVisible && imagenSeleccionada==image) && <ModalImagen imagen={image} close={setModalImagenVisible(false)} /> }
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