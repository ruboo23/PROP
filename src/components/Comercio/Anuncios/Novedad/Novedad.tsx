import { StyleSheet, Text, View, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import ModalImagen from '../ModalImagen';
import { useState } from 'react';
import Imagen3Component from '../../ImagesComponent.tsx/Imagen3Component';
import Imagen2Component from '../../ImagesComponent.tsx/Imagen2Component';
import Imagen1Component from '../../ImagesComponent.tsx/Imagen1Component';
import { SvgClose } from '../../ComerciosSvg';

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
    if (imagenesNombre) {
      const lastNumber = parseInt(imagenesNombre?.charAt(imagenesNombre?.length - 1), 10);
      const uri = `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Anuncios/${imagenesNombre.substring(0, imagenesNombre.length - 1)}`;

      if (lastNumber == 2) {
        return <Imagen3Component imagen1={uri + 0} imagen2={uri + 1} imagen3={uri + 2} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen3Component>
      } else if (lastNumber == 1) {
        return <Imagen2Component imagen1={uri + 0} imagen2={uri + 1} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen2Component>
      } else {
        return <Imagen1Component imagen={uri + 0} setImage={setImage} setImagenSeleccionada={setImagenSeleccionada} setVisibilidad={setVisibilidad}></Imagen1Component>
      }
    }
  };
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
        <View style={{ height: 30, paddingTop: 5, }}>
          <Text style={{ fontSize: 13, paddingTop: 0, color: 'grey' }}>Válido desde el {fechaFormateadaIni} hasta {fechaFormateadaFin}</Text>
        </View>
      );
    } else return <></>

  };


  return (
    <View style={[styles.screenContainer, { paddingLeft: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', flexShrink:1 }]}>
      <View style={{ flexDirection: 'row', display: 'flex', height: 40, flexShrink: 1 }}>

        {(imagenComercio && imagenComercio != '' && imagenComercio != undefined && imagenComercio != null) ?
          <Image source={{ uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagenComercio}` }} style={{ width: 43, height: 43, borderRadius: 50 }} />
          :
          <Image source={{ uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado?t=2023-12-01T14%3A41%3A42.883Z` }} style={{ width: 43, height: 43, borderRadius: 50 }} />
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', width: screenWidth, marginLeft: 5, flexGrow: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}> {titulo} </Text>
        </View>
      </View>

      <View style={{ marginLeft: 50, flexShrink:1 }}>
        <Text style={{ marginRight: 5 }}>{desc} </Text>
        {renderizarImagenes()}
        {renderFecha()}

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