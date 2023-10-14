import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import Novedad from './Novedad';
import {Dimensions} from 'react-native';
import { useState } from 'react';


export default function ComercioNovedades(props: any) {
  const novedades = true;
  const fechaEspecifica: Date = new Date('2023-10-14T12:00:00');

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
      {novedades ? 
        <ScrollView onScrollEndDrag={handleScroll} showsVerticalScrollIndicator={false} style={styles.scroll} >
          <Novedad 
            fecha={`${fechaEspecifica.getDay()}-${fechaEspecifica.getMonth()}-${fechaEspecifica.getFullYear()}`}
            titulo={"Tenemos tulipanes"} 
            desc={"Ven a nuestra floristería a disfrutar de nuestros tulipanes. Pero ven pronto porque se agotan."} 
            nombreImagenes={""}
          ></Novedad>
          <Novedad 
            fecha={`${fechaEspecifica.getDay()}-${fechaEspecifica.getMonth()}-${fechaEspecifica.getFullYear()}`}
            titulo={"Se nos han acabado ya"} 
            desc={"Ven a nuestra floristería a disfrutar de nuestros tulipanes. Pero ven pronto porque se agotan."} 
            nombreImagenes={""}
          ></Novedad>
          <Novedad 
            fecha={`${fechaEspecifica.getDay()}-${fechaEspecifica.getMonth()}-${fechaEspecifica.getFullYear()}`}
            titulo={"Se nos han acabado ya"} 
            desc={"Ven a nuestra floristería a disfrutar de nuestros tulipanes. Pero ven pronto porque se agotan. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"} 
            nombreImagenes={""}
          ></Novedad>
          <Novedad 
            fecha={""}
            titulo={"Se nos han acabado ya"} 
            desc={"Ven a nuestra floristería a disfrutar de nuestros tulipanes. Pero ven pronto porque se agotan."} 
            nombreImagenes={""}
          ></Novedad>
        </ScrollView>
      :
        <View style={styles.screenContainer}>
          <Text>Todavía no tiene novedades.</Text>
          <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
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