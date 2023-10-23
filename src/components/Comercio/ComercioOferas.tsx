import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import Novedad from './Novedad';
import { useState } from 'react';

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string
}

export default function ComercioOfertas(props: any) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const date = new Date();
    // Calcula la diferencia entre la posición actual y la anterior
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      props.scrollWrap();
    } else if (scrollDifference < 0) {
      // El ScrollView está subiendo
      props.scrollUnWrap();
    } else {

    }

    setScrollY(currentY);
  };

  return (
    <View style={ styles.screenContainer }>
      {props.ofertas.length > 0 ? 
        <ScrollView onScrollEndDrag={handleScroll} showsVerticalScrollIndicator={false} style={styles.scroll} >
          {props.ofertas.map((novedad : Anuncio, index : number) => (
            <Novedad key={index} fecha={novedad.fecha} titulo={novedad.titulo} desc={novedad.descripcion}></Novedad>
          ))} 
        </ScrollView>
      :
        <View style={styles.screenContainer}>
          <Text>Todavía no tiene ofertas.</Text>
          <Text style={styles.subtitle}>Añada una.</Text>
        </View>
      }
      </View>
  );
}

const styles = StyleSheet.create({
    scroll: {
      
    },
    screenContainer: {
      paddingTop: 10,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle: {
      color: 'grey',
    },
  });