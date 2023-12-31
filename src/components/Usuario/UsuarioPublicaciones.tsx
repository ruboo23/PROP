import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import IComercio from '../../Interfaces/IComercio';
import { StackNavigationProp } from '@react-navigation/stack';
import Reseña from '../Comercio/Reseña/Reseña';

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
  reseñas: Reseña[],
  cargando: boolean,
  closeModal?: () => void
}

export type RootStackParamList = {
  PerfilComercio: { id: number, esComercioLogueado: boolean };
};

export default function UsuarioPublicaciones({ reseñas, cargando, closeModal }: UsuarioPubProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [imagenSeleccionada, setImagenSeleccionada] = useState('')
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const reseñasOrdenadas = reseñas.slice().sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  const redirectToPerfilScreen = async (id: number) => {
    await navigation.navigate('PerfilComercio', { id: id, esComercioLogueado: false });
    if (closeModal) closeModal();
  };

  function cerrarVentana() { setModalVisible(false); 
    if (closeModal) closeModal(); }

  return (
    <View style={styles.screenContainer}>
      {cargando ?
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
          }}
        >
          <Image
            source={require("../../../assets/loading1.gif")}
            style={{ height: 50, width: 50 }}
          />
        </View>
        :
        <>{reseñas.length == 0 ?
          <Text style={{ fontWeight: '300', color: 'grey'}}>No hay publicaciones.</Text>
          :
          <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
            {reseñasOrdenadas.map((reseña: Reseña, index: number) => (
              <TouchableOpacity key={index} style={{ marginRight: 34 }} onPress={() => { redirectToPerfilScreen(reseña.comercio) }}>
                <Reseña key={index} comercioImagen={reseña.comercioObject.nombreimagen} tipo='Usuario' close={cerrarVentana} visibilidad={modalVisible} imagenSeleccionada={imagenSeleccionada} setImagenSeleccionada={setImagenSeleccionada} titulo={reseña.titulo} fecha={reseña.fecha} descripcion={reseña.descripcion} puntuacion={reseña.puntuacion} imagenesNombre={reseña.nombreimagen} usuarioNickname={reseña.comercioObject.nombre} setVisibilidad={setModalVisible}></Reseña>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }</>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  subtitle: {
    color: 'grey',
  },
});
