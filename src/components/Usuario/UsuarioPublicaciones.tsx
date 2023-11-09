import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer, useNavigation, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IComercio from '../../Interfaces/IComercio';
import Reseña from '../Comercio/Reseña/Reseña';
import { StackNavigationProp } from '@react-navigation/stack';

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  comercioObject: IComercio,
}

interface UsuarioPubProps {
  scrollWrap: () => {},
  scrollUnwrap: () => {},
  reseñas: Reseña[]
}

export type RootStackParamList = {
  PerfilComercio: { id: number, esComercioLogueado: boolean };
};

export default function UsuarioPublicaciones({ scrollWrap, scrollUnwrap, reseñas } : UsuarioPubProps) {
  const [scrollY, setScrollY] = useState(0);
  const [modalVisible, setModalVisible] = useState(false)
  const [imagenSeleccionada, setImagenSeleccionada] = useState('')

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const redirectToPerfilScreen = (id: number) => {
      navigation.navigate('PerfilComercio', { id: id, esComercioLogueado: false})
    };

  function cerrarVentana() { setModalVisible(false) }

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // Calcula la diferencia entre la posición actual y la anterior
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      scrollWrap();
    } else if (scrollDifference < 0) {
      // El ScrollView está subiendo
      scrollUnwrap();
    } else {

    }
    setScrollY(currentY);
  }

  return (
    <View style={styles.screenContainer}>
      {reseñas.length == 0 ? 
      <Text>Todavía no has publicado.</Text>
      :
      // close, visibilidad, imagenSeleccionada, setImagenSeleccionada, setVisibilidad }: NovedadProps) {

      <ScrollView  onScrollEndDrag={handleScroll}>
        {reseñas.map((reseña : Reseña, index : number) => (
        <TouchableOpacity key={index} style={{ marginRight: 34 }} onPress={() => {redirectToPerfilScreen(reseña.comercio)}}>
          <Reseña key={index}  comercioImagen={reseña.comercioObject.nombreimagen} tipo='Usuario' close={cerrarVentana} visibilidad={modalVisible} imagenSeleccionada={imagenSeleccionada} setImagenSeleccionada={setImagenSeleccionada} titulo={reseña.titulo} fecha={reseña.fecha} descripcion={reseña.descripcion} puntuacion={reseña.puntuacion} imagenesNombre={reseña.nombreimagen} usuarioNickname={reseña.comercioObject.nombre} setVisibilidad={setModalVisible}></Reseña>
        </TouchableOpacity>
      ))}
      </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: 'grey',
  },
});
