import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

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
  const reseñasOrdenadas = reseñas.slice().sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  return (
    <View style={styles.screenContainer}>
      {reseñasOrdenadas.length <= 0 ? (
        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', paddingTop: 100 }}>
          <Text>Todavía no tiene reseñas.</Text>
          <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
        </View>
      ) : (
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white'}}>
          {reseñasOrdenadas.map((reseña : Reseña, index : number) => (
            <TouchableOpacity key={index} onPress={() => {redirectToPerfilScreen(reseña.usuario)}}>
              <Reseña tipo='Comercio' key={index} puntuacion={reseña.puntuacion} descripcion={reseña.descripcion} usuarioImagen={reseña.usuarioObject.nombreimagen} usuarioNickname={reseña.usuarioObject.nickname} fecha={reseña.fecha} imagenesNombre={reseña.nombreimagen} titulo={reseña.titulo} setImagenSeleccionada={(a:string) => setImagenSeleccionada(a)} imagenSeleccionada={imagenSeleccionada} close={cerrarVentana} visibilidad={modalVisible} setVisibilidad={setModalVisible}></Reseña>
            </TouchableOpacity>
          ))} 
          <View style={{ height: 100 }}></View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start'
  },
  subtitle: {
    color: 'white',
  },
});
