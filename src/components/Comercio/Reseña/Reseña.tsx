import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import ModalImagen from '../Anuncios/ModalImagen';
import Imagen3Component from '../ImagesComponent.tsx/Imagen3Component';
import Imagen2Component from '../ImagesComponent.tsx/Imagen2Component';
import Imagen1Component from '../ImagesComponent.tsx/Imagen1Component';
import { SvgClose, SvgShapeStar, SvgStar } from '../ComerciosSvg';
import { ExecOptions } from 'child_process';

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
  usuarioImagen?: String
}

export default function Reseña({ comercioImagen, titulo, fecha, descripcion, puntuacion, close, usuarioImagen, visibilidad, tipo, imagenSeleccionada, setImagenSeleccionada, setVisibilidad, imagenesNombre, usuarioNickname }: NovedadProps) {  
  const [image, setImage] = useState<String>("");
  const [tiempoPasado, setTiempoPasado] = useState<string>("");

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

  const renderStars = () => {
    const images = [];
    let i = 0;
    for (i=0; i < puntuacion; i++) {
      images.push(
        <SvgStar key={i} height={14} width={14} style={{ marginLeft: 1 }}></SvgStar>
      );
    }
    for (let j = 5; i < j; i++) {
      images.push(
        <SvgShapeStar key={i} height={13} width={13} style={{ marginLeft: 1 }}></SvgShapeStar>
      );
    }
    return images;
  };

  useEffect(() => {
    try {
      const fechaEjemplo = new Date(fecha); 
    var a = calcularDiferenciaDeTiempo(fechaEjemplo);
    setTiempoPasado(a);
    } catch (e) {
      console.log('Error en reseñas Reseña: ', e);
    }
  }, []);

  const renderizarImagenes = () => {
    if (imagenesNombre) {
      const lastNumber = parseInt(imagenesNombre?.charAt(imagenesNombre?.length-1), 10);
      const uri = `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Resenas/${imagenesNombre.substring(0, imagenesNombre.length - 1)}`;

      if (lastNumber == 2) {
        return <Imagen3Component imagen1={uri+0} imagen2={uri+1} imagen3={uri+2} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen3Component>
      } else if (lastNumber == 1) {
        return <Imagen2Component imagen1={uri+0} imagen2={uri+1} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen2Component>
      } else {
        return <Imagen1Component imagen={uri+0} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen1Component>
      }      
    }
  };

  return (
    <View style={[styles.screenContainer, { paddingLeft: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', flexShrink:1 }]}>
      <View style={{ flexDirection: 'row', display: 'flex' }}>
        {comercioImagen ? 
          <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${comercioImagen}` }} style={{width: 43, height: 43, borderRadius: 50}}/>
        :
        <Image source={{uri: usuarioImagen ? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Usuarios/${usuarioImagen}` : `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado`}} style={{width: 43, height: 43, borderRadius: 50}}/>
        }
        <View style={{ marginLeft: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth }}>
            <Text style={{fontSize: 15, fontWeight: '500', marginLeft: 4 }}> {usuarioNickname} </Text>
            <Text style={{ color: 'grey', marginTop: 4, fontSize: 12, fontWeight: '300', textAlign: 'right', flex: 1, marginRight: 85}}> {tiempoPasado} </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 2, marginBottom: 5 }}>
            {renderStars()}
          </View>
        </View>
      </View>
      
      <View style={{ marginLeft: 54 }}>
        {titulo?.length>0 && <Text style={{ marginRight: 5 }}>{titulo}</Text> }
        {descripcion?.length>0 && <Text style={{ marginRight: 5 }}>{descripcion}</Text> }
        {renderizarImagenes()}

        <Modal visible={visibilidad} style={{ width: '100%', height: 350 }}
            animationType='fade'
            transparent={true}>
              
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%' }}>

              
        <View style={{backgroundColor: 'white', width: '90%', height: 420, alignSelf: 'center', borderColor: 'black', borderWidth: 1.5, borderRadius: 8, marginVertical: '45%', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setVisibilidad(false)} style={{ padding: 5, width: '100%', alignItems: 'flex-end', paddingRight: 5}}>
            <SvgClose width={25} height={25}></SvgClose>
          </TouchableOpacity>
          <Image key={'img2'} source={{ uri: imagenSeleccionada }} style={{ flex: 1/1.05, width: '95%', borderRadius: 10, }} />
        </View>
        </View>
      </Modal>
      </View>
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
    backgroundColor: 'white',
    margin: 7,
    padding: 6,
    borderRadius: 10,
    width: screenWidth - 15,
    justifyContent: 'flex-start',
    flexShrink: 1,
  },
  subtitle: {
    color: 'grey',
  },
});