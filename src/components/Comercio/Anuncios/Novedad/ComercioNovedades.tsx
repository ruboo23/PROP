import { Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import Novedad from './Novedad';
import { useEffect, useRef, useState } from 'react';

const { width, height } = Dimensions.get('window');

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string,
  fechaini?: Date,
  fechafin?: Date
}

export default function ComercioNovedades(props: any) {
  const [modalVisible, setModalVisible] = useState(false)
  const [imagenSeleccionada, setImagenSeleccionada] = useState('')

  function cerrarVentana() { setModalVisible(false) }

  return (
    <View style={ styles.screenContainer } >
      {props.anuncios && props.anuncios?.length > 0 ? 
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ }}>
          {props.anuncios.map((novedad : Anuncio, index : number) => (
            <Novedad fechaIni={novedad.fechaini} fechaFin={novedad.fechafin} tipo={novedad.tipo} key={index} imagenComercio={props.imagenComercio} fecha={novedad.fecha} setImagenSeleccionada={(a:string) => setImagenSeleccionada(a)} imagenSeleccionada={imagenSeleccionada} close={cerrarVentana} imagenesNombre={novedad.imagenes} titulo={novedad.titulo} desc={novedad.descripcion} visibilidad={modalVisible} setVisibilidad={setModalVisible}></Novedad>
            ))} 
          <View style={{ height: 100 }}></View>
        </ScrollView>
      :
        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', paddingTop: 100 }}>
          <Text style={{ fontWeight: '300', color: 'grey'}}>Todavía no tiene novedades.</Text>
        </View>
      }
      </View>
  );
}

const styles = StyleSheet.create({
    screenContainer: {
      paddingTop: 10,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'flex-start',
    },
    subtitle: {
      color: 'white',
    },
  });