import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import ModalImagen from '../Anuncios/ModalImagen';

const screenWidth = Dimensions.get('window').width;

interface NovedadProps {
  tipo: string,
  titulo: string,
  fecha: Date,
  close: any,
  visibilidad: boolean,
  setVisibilidad: any,
  imagenesNombre?: string,
  usuarioNickname: String,
  puntuacion: number,
  descripcion: string,
  comercioImagen?: string | null,
  imagenSeleccionada: string,
  setImagenSeleccionada: (a: string) => void,
}

export default function Reseña({ comercioImagen, titulo, fecha, descripcion, puntuacion, close, visibilidad, tipo, imagenSeleccionada, setImagenSeleccionada, setVisibilidad, imagenesNombre, usuarioNickname }: NovedadProps) {
  const urls = imagenesNombre?.split(',').map(url => {
      return url.replace(/api\/Imagenes/g, 'api/Imagenes/api/Imagenes/nombre').trim();
    });  
  
  const [image, setImage] = useState<String>("");

  const renderStars = () => {
    const images = [];
    for (let i = 0; i < puntuacion; i++) {
      images.push(
        <Icon
          key={i}
          size={17}
          name={'star'}
          color={'yellow'}
        />
      );
    }
    return images;
  };

  const renderImages = () => {
    const images = [];
    if (imagenesNombre) {
      for (let i = 0; i < 4; i++) {
        images.push(
          <Image key={i} source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${usuarioNickname.trim()}` }} style={{width: 70, height: 70, marginRight: 20, marginTop: 10}}/>
        );
      }
    } 
    return images;
  };

  return (
    <View style={[styles.screenContainer, {paddingLeft: 15, paddingBottom: 15}]}>
      <View style={{ flexDirection: 'row', display: 'flex' }}>
      {comercioImagen ? 
        <Image source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${comercioImagen}` }} style={{width: 60, height: 60, borderRadius: 50}}/>
      :
      <Image source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${usuarioNickname.trim()}` }} style={{width: 60, height: 60, borderRadius: 50}}/>
      }
      <View>
        <Text style={{fontSize: 20, fontWeight: '600', marginLeft: 15}}> {usuarioNickname} </Text>
        <Text style={{ color: '#EEEEEE', marginLeft: 15 }}> {fecha?.toString().substring(0, 10)}   {fecha?.toString().substring(11, 16)}  </Text>
      </View>
      </View>
      <View style={{ flexDirection: 'row'}}>
        {renderStars()}
      </View>
      {titulo?.length>0 && <Text style={styles.desc}>{titulo}</Text> }
      {descripcion?.length>0 && <Text style={styles.desc}>{descripcion}</Text> }
      <View style={{flexDirection: 'row', display: 'flex'}}>
      {urls && urls.map((url, index) => {
        if (url) { 
        return (
          <TouchableOpacity key={url} style={{ width: 90, height: 90, marginTop: 10, marginBottom: -10 }} 
            onPress={() => {
              setImage(url); 
              setImagenSeleccionada(url);
              setVisibilidad(true)
            }}>
            <Image source={{ uri: url }} alt={`Imagen ${index + 1}`} style={{ flex: 1/1.2, width: 70, height: 70, marginRight: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        );} 
        return null; 
      })}
      </View>
      {(visibilidad && imagenSeleccionada==image) && <ModalImagen imagen={image} close={close} /> }
      </View>
  );
}

const styles = StyleSheet.create({
  desc: {
  },
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
    backgroundColor: 'lightgrey',
    margin: 7,
    padding: 6,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'flex-start',
    width: screenWidth-15
  },
  subtitle: {
    color: 'grey',
  },
});