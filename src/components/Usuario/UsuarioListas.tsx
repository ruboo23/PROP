import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ListaPortada from './Lista';
import { EliminarLista, ListasFromUsuario } from '../../Servicies/ListaService/ListaService';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import ModalLista from './ModalCrearLista';
import ListaComercios from './ListaComercios';

interface Lista {
  id: number,
  nombre: string,
  descripcion: string,
  autor: string
}

export default function UsuarioListas({ idUsuarioExterno }: { idUsuarioExterno?: { idUsuarioExterno: number } }) {
  const usuarioid: number | undefined =
    idUsuarioExterno?.idUsuarioExterno !== null && idUsuarioExterno?.idUsuarioExterno !== undefined
      ? idUsuarioExterno.idUsuarioExterno
      : userSingleton.getUser()?.id;

  const [listaPulsada, setListaPulsada] = useState<number>(-1);
  const [Tienelista, setTieneLista] = useState<boolean>(true);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
  const [mostrarListas, setMostrarListas] = useState<boolean>(false);
  const [listas, setListas] = useState<Array<Lista>>([{ id: 1, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 2, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 3, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 4, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 5, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 6, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 7, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }]); // Reemplaza 'any[]' con el tipo correcto de tus datos
  const [externo, setExterno] = useState(false);

  useEffect(() => {
    ListasFromUsuario(usuarioid).then((response) => setListas(response));
  }, [usuarioid]);

  function abrirModal() {
    setMostrarModal(true);
  }

  function abrirLista(index: number) {
    setMostrarListas(true);
    setListaPulsada(index);
  }

  function eliminarLista(listaPulsada: number) {
    Alert.alert('Eliminar lista', '¿Quieres eliminar esta lista?', [
      {
        text: 'Aceptar',
        onPress: () => {
          let lista = listas.find((lista) => lista.id === listaPulsada);
          if (lista) {
            EliminarLista(lista.nombre);
            const nuevasListas = listas.filter((lista) => lista.id !== listaPulsada);
            setListas(nuevasListas);
          }
        },
      },
      { text: 'Cancelar' },
    ]);
  }

  return (
    <View style={styles.screenContainerFlatList}>

      <View style={{ height: '20%', backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => { setExterno(false); setMostrarListas(true) }}
        >
          <View>
            <Text>Mis Rutas</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ height: '20%', backgroundColor: 'green', justifyContent: 'center', marginBottom: 60, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => { setExterno(true); setMostrarListas(true) }}

        >
          <View>
            <Text>Rutas Preferidas</Text>
          </View>
        </TouchableOpacity>
      </View>

      {mostrarListas ? (
        <Modal style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
          {!externo ? 
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          :
          <></>
          }
          <TouchableNativeFeedback onPress={() => setMostrarListas(false)}>
            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }} />
          </TouchableNativeFeedback>
          {!Tienelista ? (
            <View style={styles.screenContainerText}>
              <Text>No tienes listas añadidas</Text>
              <Text style={styles.subtitle}>Añade una ayudándote del botón inferior.</Text>
            </View>
          ) : (
            <View style={{ paddingBottom: 43 }}>
              <FlatList
                data={listas}
                contentContainerStyle={{ justifyContent: 'space-around' }}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <View style={{ width: Dimensions.get('window').width / 2.75, flexDirection: 'row', marginRight: "13%" }}>
                    <ListaPortada Nombre={item.nombre} Index={item.id} Autor={item.autor} Descripcion={item.descripcion} Externa={externo} AbrirLista={abrirLista} EliminarLista={eliminarLista} />
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              />
            </View>
          )}

          {mostrarModal ? <ModalLista listas={listas} close={() => setMostrarModal(false)} idUsuario={usuarioid} /> : <></>}
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainerFlatList: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
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
    zIndex: 1
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});
