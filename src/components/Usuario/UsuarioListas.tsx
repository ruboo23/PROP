import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TouchableNativeFeedback, Dimensions, Modal, Alert } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ListaPortada from './Lista';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalLista from './ModalCrearLista';
import { EliminarLista, ListasFromUsuario } from '../../Servicies/ListaService/ListaService';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import IUsuario from '../../Interfaces/IUsuario';
import ListarComercios from './ListaComercios';
import ListaComercios from './ListaComercios';

export default function UsuarioListas(idUsuarioExterno?: any) {
  let usuarioid: number | Number | undefined;
  if (idUsuarioExterno === null || idUsuarioExterno === undefined) {
    usuarioid = userSingleton.getUser()?.id;
  }
  else { usuarioid = idUsuarioExterno.idUsuarioExterno }
  const [listaPulsada, setListaPulsada] = useState(-1);
  const [Tienelista, setTieneLista] = useState(true)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mostrarLista, setMostrarLista] = useState(false)
  const [listas, setListas] = useState([])
  useEffect(() => {


    ListasFromUsuario(usuarioid).then((response) => { setListas(response) });
  }, []);

  function abrirModal() {
    setMostrarModal(true)
  }

  function abrirLista(index: number) {
    setMostrarLista(true)
    setListaPulsada(index)
  }

  function eliminarLista(listaPulsada: number) {
    Alert.alert("Elimnar lista", '¿Quieres elimar esta lista?', [
      {
        text: 'Aceptar',
        onPress: () => {
          let lista = listas.find(lista => lista.id == listaPulsada);
          EliminarLista(lista.nombre)
          const nuevasListas = listas.filter((lista) => lista.id !== listaPulsada);
          setListas(nuevasListas);
        }
      },
      { text: 'Cancelar' }
    ])
  }

  return (

    <View style={styles.screenContainerFlatList}>
      {!Tienelista ?
        <View style={styles.screenContainerText}>
          <Text>No tienes listas añadidas</Text>
          <Text style={styles.subtitle}>Añade una ayudandote del boton inferior.</Text>
        </View>
        :
        <FlatList
          data={listas}
          contentContainerStyle={{ justifyContent: 'space-around' }}
          numColumns={2}
          renderItem={({ item, index }) =>
            <View style={{
              width: Dimensions.get('window').width/2.07,
              flexDirection: 'row',
              marginRight: 3
            }}>
              <ListaPortada Nombre={item.nombre} Index={item.id} Imagen={item.imagen} AbrirLista={abrirLista} EliminarLista={eliminarLista} />
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: 5, width: 10 }} />}

        />

      }

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}
          onPress={() => { abrirModal() }}
        >

          <Text style={styles.buttonText}>+</Text>

        </TouchableOpacity>
      </View>
      {mostrarModal ?
        <ModalLista listas={listas} close={() => { setMostrarModal(false) }} idUsuario={usuarioid} />
        :
        <></>
      }
      {mostrarLista ?
        <Modal style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
          <TouchableNativeFeedback onPress={() => setMostrarLista(false)} >
            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }}></Image>
          </TouchableNativeFeedback>
          <ListaComercios indice={listaPulsada} />
        </Modal>
        :
        <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainerFlatList: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  screenContainerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  subtitle: {
    color: 'grey',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});
