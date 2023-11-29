import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { GetAllImagesFromComercioId } from '../../../../Servicies/ComercioService';

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

  useEffect(() => {
    GetAllImagesFromComercioId(id).then(res => {
      setImagenesComercios(res);
    });
  }, [id]);

  return (
    <View style={styles.screenContainer}>
      {imagenesComercios.map((img, index) => (
        <View key={index} style={{ flexDirection: 'row', display: 'flex', marginRight: 7, marginBottom: 10 }}>
          <Image key={index} style={{ width: (index%2==0) ? 210 : 125, height: 100, borderRadius: 5 }} source={{ uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/${img.tipo}/${img.imagen}` }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 15,
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    width: screenWidth,
    justifyContent: 'center',
    padding: 20
  },
});
