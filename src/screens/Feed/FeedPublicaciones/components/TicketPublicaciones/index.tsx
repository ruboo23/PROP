import React, { useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableNativeFeedback } from 'react-native';
import PerfilUsuarioExterno from "../../../../PerfilUsuarioExterno";
import ModalImagen from "../../../../../components/Comercio/Anuncios/ModalImagen";
import Imagen3Component from "../../../../../components/Comercio/ImagesComponent.tsx/Imagen3Component";
import Imagen2Component from "../../../../../components/Comercio/ImagesComponent.tsx/Imagen2Component";
import Imagen1Component from "../../../../../components/Comercio/ImagesComponent.tsx/Imagen1Component";

export default function TicketPublicaciones(props: any){
  console.log("publicacion:" + JSON.stringify(props,null,2))
    const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);
    const [modalImagenVisible, setModalImagenVisible] = useState(false);
    const closeModal = () => { setModalUsuarioVisible(false); }
    const [image, setImage] = useState<String>("");
    const [imagenSeleccionada, setImagenSeleccionada] = useState('')
    const fechaEjemplo = new Date(props.horaPublicacion); 

    const redirectToPerfilScreen = () => {
        setModalUsuarioVisible(true);
      };

      function calcularDiferenciaDeTiempo(fecha: Date): string {
        const ahora = new Date();
        const diferenciaEnMillis = ahora.getTime() - fecha.getTime();
      
        // Calcular minutos, horas y días
        const minutos = Math.floor(diferenciaEnMillis / (1000 * 60));
        const horas = Math.floor(diferenciaEnMillis / (1000 * 60 * 60));
        const dias = Math.floor(diferenciaEnMillis / (1000 * 60 * 60 * 24));
      
        if (dias > 4) {
          // Si han pasado más de 4 días, devuelve la fecha completa
          return fecha.toISOString().split('T')[0];
        } else if (dias > 0) {
          // Si han pasado días pero no más de 4, devuelve la cantidad de días
          return `${dias}d`;
        } else if (horas > 0) {
          // Si han pasado horas pero no días, devuelve la cantidad de horas
          return `${horas}h`;
        } else {
          // Si han pasado minutos pero no horas, devuelve la cantidad de minutos
          return `${minutos}m`;
        }
      }

      const renderizarImagenes = () => {
        const imagenes = [];
        if (props.nombreimagenpublicacion) {
          const lastNumber = parseInt(props.nombreimagenpublicacion?.charAt(props.nombreimagenpublicacion?.length-1), 10)
          
          const uri = "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Publicaciones/" + props.nombreimagenpublicacion.substring(0, props.nombreimagenpublicacion.length - 1);
          if (lastNumber == 2) {
            return <Imagen3Component imagen1={uri+"0"} imagen2={uri+"1"} imagen3={uri+"2"} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setModalImagenVisible}></Imagen3Component>
          } else if (lastNumber == 1) {
            return <Imagen2Component imagen1={uri+0} imagen2={uri+1} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setModalImagenVisible}></Imagen2Component>
          } else {
            return <Imagen1Component imagen={uri+0} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setModalImagenVisible}></Imagen1Component>
          }   
        }
      };

    return(
      <View>
        <TouchableOpacity onPress={redirectToPerfilScreen}>
        <View style={styles.ticket}>
            <View style={{width: 60,}}>
                <Image source={
                    {uri: props.nombreimagenusuario 
                    ? "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/" + props.nombreimagenusuario
                    : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}
                } style={styles.profileImg}></Image>
            </View>
            <View style={{flex:1}}>
                <View style={styles.cabeceraTicket}>
                    <View style={{flexDirection: "row", flex: 1, justifyContent:"space-between", marginRight: 20}}>
                        <View>
                            <Text style = {{fontWeight: 'bold', fontSize: 17}}> {props.nombreUsuario} </Text>
                            <Text style = {{fontSize: 12}}> {"sobre @" + props.nombreComercio} </Text>
                        </View> 
                        <Text style = {styles.textHoraPublicacion}> {calcularDiferenciaDeTiempo(fechaEjemplo)} </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {(props.titulo?.length>0 || props.descripcion?.length>0) && <Text>{props.titulo} {props.descripcion}</Text>}
                </View> 
                <View>
                    {renderizarImagenes()}
                    {(modalImagenVisible && imagenSeleccionada==image) && <ModalImagen imagen={image} close={() =>{setModalImagenVisible(false)}} /> }
                </View>
            </View>
        </View>
        </TouchableOpacity>
        <View style={{borderColor: "gray", borderWidth: 0.8, marginHorizontal: 30}}></View>
        <Modal
            visible={modalUsuarioVisible}
            animationType="slide"
            transparent={false}
        >
            <View>
                <PerfilUsuarioExterno id={props.usuarioId} showArrow={true} closeModal={() => setModalUsuarioVisible(false)}/>
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
        borderRadius: 20,
        flexDirection: "row"
    }, 
    cabeceraTicket:{
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 5,
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
        right:0,
        color: 'grey',
        fontSize: 12, 
        fontWeight: '300'
    },
    container: {
      marginTop: 10
    },
    descriptionField: {
      width: '100%',
    }, 
    desc: {
      flexWrap: 'wrap',
    }
  });