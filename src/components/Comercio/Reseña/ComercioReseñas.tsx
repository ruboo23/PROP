import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import Reseña from './Reseña';
import IUsuario from '../../../Interfaces/IUsuario';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  PerfilUsuario: { id: number };
};

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
  const [imagenSeleccionada, setImagenSeleccionada] = useState('')

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const redirectToPerfilScreen = (id: number) => {
      navigation.navigate('PerfilUsuario', { id: id })
    };

  function cerrarVentana() { setModalVisible(false) }

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      scrollWrap();
    } else {
      // El ScrollView está subiendo
      scrollUnWrap();
    } 
    setScrollY(currentY);
  };

  const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    // Verifica si el contenido del ScrollView es más pequeño que la altura del ScrollView
    //const isScrollable: boolean = contentHeight > event.nativeEvent.layoutMeasurement.height;

    // if (!isScrollable) {
      // No hay suficiente contenido para hacer scroll, puedes realizar acciones aquí
    //}
  };

  return (
    <View style={styles.screenContainer}>
      {reseñas.length<=0 ?
        <View style={styles.screenContainer}>
          <Text>Todavía no tiene reseñas.</Text>
          <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
        </View>
      :
        <ScrollView onContentSizeChange={handleContentSizeChange} onScrollEndDrag={handleScroll} showsVerticalScrollIndicator={false}>
          {reseñas.map((reseña : Reseña, index : number) => (
            <TouchableOpacity key={index} onPress={() => {redirectToPerfilScreen(reseña.usuario)}}>
              <Reseña tipo='Comercio' key={index} puntuacion={reseña.puntuacion} descripcion={reseña.descripcion} usuarioImagen={reseña.usuarioObject.nombreimagen} usuarioNickname={reseña.usuarioObject.nickname} fecha={reseña.fecha} imagenesNombre={reseña.nombreimagen} titulo={reseña.titulo} setImagenSeleccionada={(a:string) => setImagenSeleccionada(a)} imagenSeleccionada={imagenSeleccionada} close={cerrarVentana} visibilidad={modalVisible} setVisibilidad={setModalVisible}></Reseña>
            </TouchableOpacity>
          ))} 
        </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  subtitle: {
    color: 'white',
  },
});
