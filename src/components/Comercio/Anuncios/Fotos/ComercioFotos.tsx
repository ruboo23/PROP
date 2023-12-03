import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { GetAllImagesFromComercioId } from '../../../../Servicies/ComercioService';
import Imagen3Component from './Imagen3Component';
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetAllImagesFromComercioId(id).then(res => {
      setImagenesComercios(res);
      setLoading(false);
    }).catch(e => console.log('Error en imagenes del comercio:', e));
  }, [id]);

  const renderImagenes = () => {
    const imagenesArray: React.JSX.Element[] = [];
    for (let i = 0; i < imagenesComercios.length; i += 3) {
      imagenesArray.push(
        <Imagen3Component key={i} imagen1={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i]?.tipo}/${imagenesComercios[i]?.imagen}`}
          imagen2={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i + 1]?.tipo}/${imagenesComercios[i + 1]?.imagen}`}
          imagen3={`https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${imagenesComercios[i + 2]?.tipo}/${imagenesComercios[i + 2]?.imagen}`}
        ></Imagen3Component>
      );
    }
    return imagenesArray;
  };

  return (
    <View style={styles.screenContainer}>
      {loading ?
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: '10%', alignItems: 'center', backgroundColor: '' }}>
          <Image
            source={require('../../../../../assets/loading1.gif')}
            style={{ height: 50, width: 50 }}
          />
        </View>
        :
        <>
          {imagenesComercios.length == 0 ?
            <View style={styles.screenContainer2}>
              <Text>Todavía no tiene fotos.</Text>
              <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 12 }}>
              {renderImagenes()}
            </ScrollView>
          }</>
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