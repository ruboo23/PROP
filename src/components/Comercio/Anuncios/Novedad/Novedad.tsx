import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity, Dimensions } from 'react-native';
import ModalImagen from '../ModalImagen';
import { useState } from 'react';
import Imagen3Component from '../../ImagesComponent.tsx/Imagen3Component';
import Imagen2Component from '../../ImagesComponent.tsx/Imagen2Component';
import Imagen1Component from '../../ImagesComponent.tsx/Imagen1Component';

const screenWidth = Dimensions.get('window').width;

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
  imagenComercio: String,
  fechaIni?: Date,
  fechaFin?: Date,
  tipo: string
}

export default function Novedad({ fechaFin, fechaIni, tipo, imagenComercio, titulo, desc, setImagenSeleccionada, imagenSeleccionada, fecha, close, visibilidad, setVisibilidad, imagenesNombre }: NovedadProps) {
  const [image, setImage] = useState<String>("");

  const renderizarImagenes = () => {
    console.log("Images: ",imagenesNombre);
    if (imagenesNombre) {
      const lastNumber = parseInt(imagenesNombre?.charAt(imagenesNombre?.length-1), 10);
      const uri = `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Anuncios/${imagenesNombre.substring(0, imagenesNombre.length - 1)}`;

      if (lastNumber == 2) {
        return <Imagen3Component imagen1={uri+0} imagen2={uri+1} imagen3={uri+2} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen3Component>
      } else if (lastNumber == 1) {
        return <Imagen2Component imagen1={uri+0} imagen2={uri+1} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen2Component>
      } else {
        return <Imagen1Component imagen={uri+0} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen1Component>
      }      
    }
  };
  console.log(fechaIni)

  const renderFecha = () => { 
    if (fechaFin && fechaIni) {
      var fechaF = new Date(fechaFin?.toString());
      var fechaI = new Date(fechaIni?.toString());
      const diaFin = fechaF?.getDate();
      const mesFin = fechaF ? fechaF.getMonth() + 1 : 0;
      const añoFin = fechaF?.getFullYear();
      const diaStringFin = diaFin && diaFin < 10 ? `0${diaFin}` : diaFin?.toString();
      const mesStringFin = mesFin < 10 ? `0${mesFin}` : mesFin.toString();
      const fechaFormateadaFin = `${diaStringFin}/${mesStringFin}/${añoFin}`;
    
      const diaIni = fechaI?.getDate(); 
      const mesIni = fechaI ? fechaI.getMonth() + 1 : 0;
      const añoIni = fechaI?.getFullYear();
      const diaStringIni = diaIni && diaIni < 10 ? `0${diaIni}` : diaIni?.toString();
      const mesStringIni = mesIni < 10 ? `0${mesIni}` : mesIni.toString();
      const fechaFormateadaIni = `${diaStringIni}/${mesStringIni}/${añoIni}`;
    
      return (
        <View>
          <Text style={{ fontSize: 13, paddingTop: 8, paddingLeft: 5, color: 'grey' }}>
            Válido desde el {fechaFormateadaIni} hasta {fechaFormateadaFin}
          </Text>
        </View>
      );
    }
 
  };
  

  return (
    <View style={[styles.screenContainer,{ paddingLeft: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }]}>
      <View style={{ flexDirection: 'row', display: 'flex' }}>
        {true ? 
          <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagenComercio}` }} style={{width: 43, height: 43, borderRadius: 50}}/>
        :
          <></>
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth, marginLeft: 5 }}>
          <Text style={{fontSize: 15, fontWeight: '500' }}> {titulo} </Text>
        </View>
      </View>
    
      <View style={{ marginLeft: 50 }}>
        <Text style={{ marginRight: 5 }}>{desc} </Text>
        {renderizarImagenes()}
        {tipo === "oferta" &&
          <>{renderFecha()}</>
        }
        {(visibilidad && imagenSeleccionada==image) && <ModalImagen imagen={image} close={close} /> }
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
    flex: 1,
    width: screenWidth-15,
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: 'grey',
  },
});