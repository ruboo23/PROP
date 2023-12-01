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
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import TicketAnuncioComerciosList from '../../screens/Feed/FeedComercios/components/TicketAnuncioComerciosList';
import GetAllComercios from '../../Servicies/ComercioService';
import { GetUsuarioById } from '../../Servicies/UsuarioService/UsuarioServices';
import TicketListaComerciosGuardados from '../Comercio/TicketListaComerciosGuardados';
import { GetListasSeguidas } from '../../Servicies/UsuarioService/UsuarioServices';


interface Lista {
  id: number
  nombre: string,
  descripcion: string,
  zona: string,
  duracion: number,
  autor: string
}

export default function UsuarioListas({ idUsuarioExterno }: { idUsuarioExterno?: { idUsuarioExterno: number } }) {
  const usuarioid: number | undefined =
    idUsuarioExterno?.idUsuarioExterno !== null && idUsuarioExterno?.idUsuarioExterno !== undefined
      ? idUsuarioExterno.idUsuarioExterno
      : userSingleton.getUser()?.id;

  const [listaPulsada, setListaPulsada] = useState<number>(-1);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
  const [mostrarListas, setMostrarListas] = useState<boolean>(false);
  const [listas, setListas] = useState<Array<Lista>>([{ id: 1, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 2, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 3, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 4, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 5, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 6, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 7, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }]); // Reemplaza 'any[]' con el tipo correcto de tus datos
  const [externo, setExterno] = useState(false);
  const [comerciosSeguidosList, setComerciosSeguidosList] = useState<any>();
  const [comerciosList, setComerciosList] = useState<any>();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setComerciosSeguidosList(userSingleton.getUser()?.idcomercio)
    //console.log('Comercios Seguidos '  + JSON.stringify(comerciosSeguidosList.$values[3]))
  });

  function abrirModal() {
    setMostrarModal(true);
  }

  function abrirLista(index: number) {
    setMostrarListas(true);
    setListaPulsada(index);
  }

  function cargarListasSeguidas() {
    GetListasSeguidas(usuarioid).then((r) => { setListas(r); setIsLoading(false); })

  }

  function cargarListasPropias() {
    ListasFromUsuario(usuarioid).then((response) => {setListas(response); setIsLoading(false);});
    
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

      
      <View style = {{ height: '45%'}}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15}}>
          <Text style = {{fontWeight: 'bold', fontSize: 16}}>Guardados</Text>
          <Text style = {{color: 'grey'}}> Ver todo</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingLeft: 20 }}>
         
        </ScrollView>
        
        
      </View>

      <View style =  {{  height: '20%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => { setIsLoading(true); setExterno(false); setMostrarListas(true); cargarListasPropias();  }}
        
        >
          <View style =  {{flexDirection: 'row'}}>
            <View style= {{justifyContent: 'center'}}>
              <FontAwesome5 name='route' size = {25} ></FontAwesome5>
            </View> 
            <View style = {{width: 15}}></View>
            <View style= {{justifyContent: 'center'}}>
              <Text style={styles.textStyle} >Mis Rutas</Text>
            </View>
            <View style = {{width: 165}}></View>
            <View  style= {{justifyContent: 'center'}}>
              <AntDesign name='right'size = {30}></AntDesign>
            </View>
          </View>
          <View style = {styles.linea}></View>
        </TouchableOpacity>
      </View>

      <View style =  {{  height: '20%', justifyContent: 'center', marginTop: -25, marginBottom: 60, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => { setIsLoading(true); setExterno(true); setMostrarListas(true); cargarListasSeguidas();  }}


          >
          <View style =  {{flexDirection: 'row'}}>
            <View style= {{justifyContent: 'center'}}>
              <AntDesign name='hearto'size = {25}></AntDesign>
            </View> 
            <View style = {{width: 15}}></View>
            <View style= {{justifyContent: 'center'}}>
              <Text style={styles.textStyle} >Rutas Preferidas</Text>
            </View>
            <View style = {{width: 110}}></View>
            <View  style= {{justifyContent: 'center'}}>
              <AntDesign name='right'size = {30}></AntDesign>
            </View>
          </View>
          <View style = {styles.linea}></View>
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
          {listas.length == 0 && !loading ? (
            <View style={styles.screenContainerText}>
              <Text>No tienes listas añadidas</Text>
            </View>
          ) : (
            <View style={{ paddingBottom: 43 }}>
              {loading ?
                <View style={{alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%", }}>
                  <Image
                    source={require('../../../assets/loading1.gif')}
                    style={{ height: 70, width: 70 }}
                  />
                </View> 
                :
                <FlatList
                  data={listas}
                  contentContainerStyle={{ justifyContent: 'space-around' }}
                  numColumns={2}

                  renderItem={({ item, index }) => (
                    <View style={{ width: Dimensions.get('window').width / 2.75, flexDirection: 'row', marginRight: "13%" }}>
                      <ListaPortada Loading={loading} Nombre={item.nombre} Index={item.id} Autor={item.autor} Descripcion={item.descripcion} Externa={externo} AbrirLista={abrirLista} EliminarLista={eliminarLista} />
                    </View>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                />
              }
            </View>
          )}

          {mostrarModal ? <ModalLista setLista={setListas} Lista={listas} close={() => setMostrarModal(false)} idUsuario={usuarioid} /> : <></>}
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
  textStyle: {
    fontSize: 16, fontWeight: 'bold'
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 15
  },
});
