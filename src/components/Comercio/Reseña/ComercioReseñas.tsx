import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import ListaReseñas from './ListaReseñas';
import Reseña from './Reseña';
import IUsuario from '../../../Interfaces/IUsuario';

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  idUsuario: number,
  usuarioObject: IUsuario;
}

interface ComercioReseñasProps {
  scrollWrap: () => void;
  scrollUnWrap: () => void;
  reseñas: Reseña[]
}

export default function ComercioReseñas({ scrollWrap, scrollUnWrap, reseñas } : ComercioReseñasProps) {
  const [scrollY, setScrollY] = useState(0);
  const [modalVisible, setModalVisible] = useState(false)

  function cerrarVentana() { setModalVisible(false) }

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const date = new Date();
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      scrollWrap();
    } else if (scrollDifference < 0) {
      // El ScrollView está subiendo
      scrollUnWrap();
    } else {

    }
    setScrollY(currentY);
  };

  return (
    <View style={styles.screenContainer}>
      {reseñas.length<=0 ?
        <View style={styles.screenContainer}>
          <Text>Todavía no tiene reseñas.</Text>
          <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
        </View>
      :
        <ScrollView onScrollEndDrag={handleScroll} showsVerticalScrollIndicator={false}>
          {reseñas.map((reseña : Reseña, index : number) => (
            <Reseña key={index} puntuacion={reseña.puntuacion} descripcion={reseña.descripcion} usuarioNickname={reseña.usuarioObject.nickname} fecha={reseña.fecha} imagenesNombre={reseña.nombreimagen} titulo={reseña.titulo} close={cerrarVentana} visibilidad={modalVisible} setVisibilidad={setModalVisible}></Reseña>
          ))} 
        </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
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
