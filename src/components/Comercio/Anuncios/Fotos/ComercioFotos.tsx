import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { GetAllImagesFromComercioId } from '../../../../Servicies/ComercioService';
import Imagen1Component from '../../ImagesComponent.tsx/Imagen1Component';
import Imagen3Component from '../../ImagesComponent.tsx/Imagen3Component';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

interface NovedadProps {
  titulo: string;
  desc: string;
  fecha: Date;
  close: any;
  visibilidad: boolean;
  setVisibilidad: any;
  imagenesNombre?: string;
  imagenSeleccionada: string;
  setImagenSeleccionada: (a: string) => void;
  imagenComercio: String;
}

interface PropsFotos {
  id: number;
}

export default function ComercioFotos({ id }: PropsFotos) {
  const [imagenesComercios, setImagenesComercios] = useState<{ tipo: string; imagen: string }[]>([]);
  const [visibilidad, setVisibilidad] = useState(false);
  const [image, setImagenSeleccionada] = useState<String>('');

  useEffect(() => {
    GetAllImagesFromComercioId(id).then(res => {
      setImagenesComercios(res);
    });
  }, [id]);

  const renderImagenes = () => {
    const imagenesArray: React.JSX.Element[] = [];
    for (let i = 0; i <= imagenesComercios.length; i += 3) {
      imagenesArray.push(
        <Imagen3Component key={i} imagen1={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i]?.tipo}/${imagenesComercios[i]?.imagen}`}
                          imagen2={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i+1]?.tipo}/${imagenesComercios[i+1]?.imagen}`}
                          imagen3={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i+2]?.tipo}/${imagenesComercios[i+2]?.imagen}`}
                          setVisibilidad={setVisibilidad} setImage={() => {}} setImagenSeleccionada={(a:string) => setImagenSeleccionada(a)}></Imagen3Component>
      );
    }
    return imagenesArray;
  };
  

  return (
    <View style={styles.screenContainer}>
      {imagenesComercios.length == 0 ?
      <View style={styles.screenContainer2}>
        <Text>Todavía no tiene fotos.</Text>
        <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
      </View>
    :
      <ScrollView style={{ marginLeft: 12}}>
        {renderImagenes()}
      </ScrollView>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 10,
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
  },
  screenContainer2: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: 'white',
  },
});
