import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native';
import ModalImagen from './Anuncios/ModalImagen';

interface NovedadProps {
  titulo: string,
  desc: string,
  fecha: Date,
  close: any,
  visibilidad: boolean,
  setVisibilidad: any
}

export default function Novedad({ titulo, desc, fecha, close, visibilidad, setVisibilidad }: NovedadProps) {
  const imagenes = true;
  let imagen;
  const fechaa = new Date(fecha)
  console.log(fechaa.getTime());
  const urlImage = 'http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/' + titulo + fechaa.getDay()+ fechaa.getTime();
  console.log(urlImage);
  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.titulo, { paddingTop: -40 }]}>{titulo}</Text>
      <View style={{ backgroundColor: '#FDFDFD', margin: 10, borderRadius: 10, padding: 10 }}>
        <Text>{desc}</Text>
      </View>
      {imagenes ?
        <View style={{ height: '20%', paddingBottom: 30, paddingLeft: 13, flexDirection: 'row' }}>
          <TouchableNativeFeedback onPress={() => { console.log("pulsado"); imagen = urlImage+0; setVisibilidad(true) }}>
            <Image style={{ marginRight: 13 }} source={{ uri: urlImage+0 }} width={70} height={70}></Image>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => { console.log("pulsado"); imagen = urlImage+1; setVisibilidad(true) }}>
            <Image style={{ marginRight: 13 }} source={{ uri: urlImage+1 }} width={70} height={70}></Image>
          </TouchableNativeFeedback><TouchableNativeFeedback onPress={() => { console.log("pulsado"); imagen = urlImage+2; setVisibilidad(true) }}>
            <Image style={{ marginRight: 13 }} source={{ uri: urlImage+2 }} width={70} height={70}></Image>
          </TouchableNativeFeedback></View>
        : <View style={{ height: 25 }}></View>}

      <View style={styles.absoluteContainer}>
        <Text style={{ color: '#EEEEEE', paddingBottom: 3, paddingRight: 3 }}> {fecha.toString().substring(0, 10)}   {fecha.toString().substring(11, 16)}  </Text>
      </View>
      {visibilidad ?
        <ModalImagen imagen={imagen} close={close} />
        : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  titulo: {
    fontSize: 18,
    marginLeft: 10
  },
  screenContainer: {
    paddingTop: 15,
    backgroundColor: '#9CB57B',
    margin: 7,
    padding: 6,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: 'grey',
  },
});