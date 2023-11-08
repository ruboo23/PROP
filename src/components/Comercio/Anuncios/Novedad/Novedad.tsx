import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import ModalImagen from '../ModalImagen';
import { useState } from 'react';

interface NovedadProps {
  titulo: string,
  desc: string,
  fecha: Date,
  close: any,
  visibilidad: boolean,
  setVisibilidad: any,
  imagenesNombre?: string,
  imagenSeleccionada: string,
  setImagenSeleccionada: (a: string) => void,
}

export default function Novedad({ titulo, desc, setImagenSeleccionada, imagenSeleccionada, fecha, close, visibilidad, setVisibilidad, imagenesNombre }: NovedadProps) {
  const urls = imagenesNombre?.split(',').map(url => {
    return url.replace(/api\/Imagenes/g, 'api/Imagenes/api/Imagenes/nombre').trim();
  });  

  const [image, setImage] = useState<String | undefined>(urls?.[0]);

  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.titulo, { paddingTop: -40 }]}>{titulo}</Text>
      <View style={{ backgroundColor: '#FDFDFD', margin: 10, borderRadius: 10, padding: 10 }}>
        <Text>{desc}</Text>
      </View>
      <View style={{flexDirection: 'row', display: 'flex', marginBottom: 10}}>
      {urls && urls.map((url, index) => {
        if (url) { 
        return (
          <TouchableOpacity key={url} style={{ width: 90, height: 90 }} onPress={() => {setImage(url); setVisibilidad(true); setImagenSeleccionada(url)}}>
            <Image source={{ uri: url }} alt={`Imagen ${index + 1}`} style={{ flex: 1/1.2, width: 70, height: 70, marginRight: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        );} 
        return null; 
      })}
      </View>
      <View style={styles.absoluteContainer}>
        <Text style={{ color: '#EEEEEE', paddingTop: 40, paddingRight: 3 }}> {fecha.toString().substring(0, 10)}   {fecha.toString().substring(11, 16)}  </Text>
      </View>
      {(visibilidad && imagenSeleccionada==image) ?
        <ModalImagen imagen={image} close={close} />
        : <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 5,
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