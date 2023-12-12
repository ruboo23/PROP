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
  Pressable,
} from 'react-native';
import ListaPortada from './Lista';
import { EliminarLista, ListasFromUsuario } from '../../Servicies/ListaService/ListaService';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import ModalLista from './ModalCrearLista';
import { AntDesign } from '@expo/vector-icons';
import { DejarSeguirLista, GetListasSeguidas, GetUsuarioById } from '../../Servicies/UsuarioService/UsuarioServices';
import ListaComerciosGuardados from './ListaComerciosGuardados';
import { Svg, Path } from 'react-native-svg';
import ModalMostrarLista from '../../screens/ModalMostrarLista/ModalMostrarLista';
import { useNavigation } from '@react-navigation/native';
import { SvgBackArrow } from './UserSVG';
import { StackNavigationProp } from '@react-navigation/stack';

interface Lista {
  id: number
  nombre: string,
  descripcion: string,
  zona: string,
  duracion: number,
  autor: string,
}

export type RootStackParamList = {
  Perfil: { ListaComercios: any } | undefined;
};

export default function UsuarioListas({ idUsuarioExterno, isLoggedUser }: { idUsuarioExterno?: number, isLoggedUser?: boolean }) {
  const usuarioid = idUsuarioExterno;
  const [listaSeleccionada, setListaSeleccionadas] = useState<Lista>();
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mostrarLista, setMostrarLista] = useState<boolean>(false);
  const [mostrarListas, setMostrarListas] = useState<boolean>(false);
  const [listas, setListas] = useState<Array<Lista>>([{ id: 1, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 2, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 3, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 4, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 5, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 6, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }, { id: 7, titulo: "Noche de cerveceo", descripcion: "Una ruta con los mejores bares teniendo en cuenta el orden de cierro de los locales", autor: "joanna3" }]); // Reemplaza 'any[]' con el tipo correcto de tus datos
  const [externo, setExterno] = useState(false);
  const [habilitarAñadirComercio, setHabilitarAñadirComercio] = useState(false);
  const [comerciosSeguidosList, setComerciosSeguidosList] = useState<any>(userSingleton.getUser()?.idcomercio);
  const [loading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('')

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function setTitleModal(arg0: string) {
    if (arg0 == 'Rutas') {
      if (isLoggedUser) {
        setTitle('Tus rutas');
      } else setTitle('Sus rutas')
    } else {
      if (isLoggedUser) {
        setTitle('Tus rutas preferidas');
      } else setTitle('Sus rutas preferidas')
    }
  }

  function abrirModal() {
    setMostrarModal(true);
  }

  function abrirLista(item: Lista) {
    setMostrarLista(true);
    setListaSeleccionadas(item);
  }

  function DejarDeSeguir(id:number) {
    Alert.alert('Dejar de seguir', '¿Estás seguro de que deseas dejar de seguir la lista?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Aceptar', onPress: () => {
        var listasEliminada = listas.filter(l => l.id != id);
        setListas(listasEliminada);
        DejarSeguirLista(id)
      } },
    ]);
    

  }

  useEffect(() => {
    cargarComerciosGuardados();
  }, [usuarioid]);

  function cargarComerciosGuardados() {
    if (usuarioid != userSingleton.getUser()?.id) {
      GetUsuarioById(usuarioid ? usuarioid : 1).then((e) => {
        setComerciosSeguidosList(e.idcomercio)
      })
    } else {
      setComerciosSeguidosList(userSingleton.getUser()?.idcomercio)
    }
  }

  function cargarListasSeguidas() {
    GetListasSeguidas(usuarioid ? usuarioid : 1).then((r) => { console.log(r); setListas(r); setIsLoading(false); })
    setHabilitarAñadirComercio(false)
  }

  function cargarListasPropias() {
    ListasFromUsuario(usuarioid ? usuarioid : 1).then((response) => { setListas(response); setIsLoading(false); });
    setHabilitarAñadirComercio(true);
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
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15, marginBottom:10}}>
          <Text style = {{fontWeight: 'bold', fontSize: 16}}>Guardados</Text>
          <TouchableOpacity onPress={()=>{
            // @ts-ignore
            navigation.navigate('ComerciosGuardadosExtended', {ListaComercios: comerciosSeguidosList})
          }}>
            <Text style = {{color: 'grey'}}> Ver todo</Text>
          </TouchableOpacity>
        </View>
        <ListaComerciosGuardados
          ListaComercios={comerciosSeguidosList}
          horizontal={true} 
        ></ListaComerciosGuardados>
      </View>
      <View style={{ height: '55%', alignItems: 'center', width: '100%', backgroundColor: 'white', paddingTop: 45 }}>
        <TouchableOpacity
          onPress={() => { setIsLoading(true); setTitleModal('Rutas'); setExterno(false); setMostrarListas(true); cargarListasPropias(); }}
          style={{ width: '90%' }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderBottomColor: '#B8B8B8', borderBottomWidth: 1, marginBottom: 30, paddingBottom: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Svg
                width={24}
                height={20}
                viewBox="0 0 18 18"
                fill="#888DC7"
                stroke="#888DC7"
                strokeWidth={0}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M6 18C4.9 18 3.95833 17.6083 3.175 16.825C2.39167 16.0417 2 15.1 2 14V5.825C1.41667 5.60833 0.9375 5.24583 0.5625 4.7375C0.1875 4.22917 0 3.65 0 3C0 2.16667 0.291667 1.45833 0.875 0.875C1.45833 0.291667 2.16667 0 3 0C3.83333 0 4.54167 0.291667 5.125 0.875C5.70833 1.45833 6 2.16667 6 3C6 3.65 5.8125 4.22917 5.4375 4.7375C5.0625 5.24583 4.58333 5.60833 4 5.825V14C4 14.55 4.19583 15.0208 4.5875 15.4125C4.97917 15.8042 5.45 16 6 16C6.55 16 7.02083 15.8042 7.4125 15.4125C7.80417 15.0208 8 14.55 8 14V4C8 2.9 8.39167 1.95833 9.175 1.175C9.95833 0.391667 10.9 0 12 0C13.1 0 14.0417 0.391667 14.825 1.175C15.6083 1.95833 16 2.9 16 4V12.175C16.5833 12.3917 17.0625 12.7542 17.4375 13.2625C17.8125 13.7708 18 14.35 18 15C18 15.8333 17.7083 16.5417 17.125 17.125C16.5417 17.7083 15.8333 18 15 18C14.1667 18 13.4583 17.7083 12.875 17.125C12.2917 16.5417 12 15.8333 12 15C12 14.35 12.1875 13.7667 12.5625 13.25C12.9375 12.7333 13.4167 12.375 14 12.175V4C14 3.45 13.8042 2.97917 13.4125 2.5875C13.0208 2.19583 12.55 2 12 2C11.45 2 10.9792 2.19583 10.5875 2.5875C10.1958 2.97917 10 3.45 10 4V14C10 15.1 9.60833 16.0417 8.825 16.825C8.04167 17.6083 7.1 18 6 18ZM3 4C3.28333 4 3.52083 3.90417 3.7125 3.7125C3.90417 3.52083 4 3.28333 4 3C4 2.71667 3.90417 2.47917 3.7125 2.2875C3.52083 2.09583 3.28333 2 3 2C2.71667 2 2.47917 2.09583 2.2875 2.2875C2.09583 2.47917 2 2.71667 2 3C2 3.28333 2.09583 3.52083 2.2875 3.7125C2.47917 3.90417 2.71667 4 3 4ZM15 16C15.2833 16 15.5208 15.9042 15.7125 15.7125C15.9042 15.5208 16 15.2833 16 15C16 14.7167 15.9042 14.4792 15.7125 14.2875C15.5208 14.0958 15.2833 14 15 14C14.7167 14 14.4792 14.0958 14.2875 14.2875C14.0958 14.4792 14 14.7167 14 15C14 15.2833 14.0958 15.5208 14.2875 15.7125C14.4792 15.9042 14.7167 16 15 16Z" />
              </Svg>
              {isLoggedUser ?
                <Text style={styles.textStyle}>Mis rutas</Text>
                :
                <Text style={styles.textStyle}>Sus rutas</Text>
              }
            </View>
            <AntDesign name='right' size={21}></AntDesign>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setIsLoading(true); setTitleModal(''); setExterno(true); setMostrarListas(true); cargarListasSeguidas(); }}
          style={{ width: '90%' }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderBottomColor: '#B8B8B8', borderBottomWidth: 1, marginBottom: 30, paddingBottom: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Svg
                width={24}
                height={20}
                viewBox="0 0 20 19"
                fill="#888DC7"
                stroke="#888DC7"
                strokeWidth={0}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M10 19L8.55 17.6539C6.86667 16.0836 5.475 14.7289 4.375 13.5899C3.275 12.451 2.4 11.4285 1.75 10.5225C1.1 9.61648 0.645833 8.78383 0.3875 8.02452C0.129167 7.26521 0 6.48865 0 5.69482C0 4.07266 0.525 2.71798 1.575 1.63079C2.625 0.543597 3.93333 0 5.5 0C6.36667 0 7.19167 0.189827 7.975 0.569482C8.75833 0.949137 9.43333 1.48411 10 2.17439C10.5667 1.48411 11.2417 0.949137 12.025 0.569482C12.8083 0.189827 13.6333 0 14.5 0C16.0667 0 17.375 0.543597 18.425 1.63079C19.475 2.71798 20 4.07266 20 5.69482C20 6.48865 19.8708 7.26521 19.6125 8.02452C19.3542 8.78383 18.9 9.61648 18.25 10.5225C17.6 11.4285 16.725 12.451 15.625 13.5899C14.525 14.7289 13.1333 16.0836 11.45 17.6539L10 19ZM10 16.2044C11.6 14.7203 12.9167 13.4475 13.95 12.3862C14.9833 11.3249 15.8 10.4017 16.4 9.61648C17 8.83129 17.4167 8.13238 17.65 7.51975C17.8833 6.90713 18 6.29882 18 5.69482C18 4.6594 17.6667 3.79655 17 3.10627C16.3333 2.41599 15.5 2.07084 14.5 2.07084C13.7167 2.07084 12.9917 2.2995 12.325 2.75681C11.6583 3.21412 11.2 3.79655 10.95 4.50409H9.05C8.8 3.79655 8.34167 3.21412 7.675 2.75681C7.00833 2.2995 6.28333 2.07084 5.5 2.07084C4.5 2.07084 3.66667 2.41599 3 3.10627C2.33333 3.79655 2 4.6594 2 5.69482C2 6.29882 2.11667 6.90713 2.35 7.51975C2.58333 8.13238 3 8.83129 3.6 9.61648C4.2 10.4017 5.01667 11.3249 6.05 12.3862C7.08333 13.4475 8.4 14.7203 10 16.2044Z" />
              </Svg>
              {isLoggedUser ?
                <Text style={styles.textStyle}>Tus rutas preferidas</Text>
                :
                <Text style={styles.textStyle}>Sus rutas preferidas</Text>
              }
            </View>
            <AntDesign name='right' size={21}></AntDesign>
          </View>
        </TouchableOpacity>
      </View>

      {mostrarListas ? (
        <Modal style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
          {!externo && idUsuarioExterno == userSingleton.getUser()?.id ?
            <View style={styles.addButtonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={() => abrirModal()}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            :
            <></>
          }
          <View style={{ flexDirection: 'row', marginTop: 20 }}> 
            <TouchableNativeFeedback onPress={() => setMostrarListas(false)} style={{ margin: 10, marginTop: 20 }}>
              <SvgBackArrow width={24} height={24} style={{margin: 15 }}></SvgBackArrow>
            </TouchableNativeFeedback>

            <Text style={{ fontSize: 20, fontWeight: '700', padding: 15}}>{title}</Text>
          </View>
         
          {listas.length == 0 && !loading ? (
            <View style={styles.screenContainerText}>
              <Text>No hay listas añadidas</Text>
            </View>
          ) : (
            <View style={{ paddingBottom: 43 }}>
              {loading ?
                <View style={{ alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%", }}>
                  <Image
                    source={require('../../../assets/loading1.gif')}
                    style={{ height: 50, width: 50 }}
                  />
                </View>
                :
                <FlatList
                  data={listas}
                  contentContainerStyle={{ justifyContent: 'space-around' }}
                  numColumns={2}

                  renderItem={({ item, index }) => (
                    <View style={{ width: Dimensions.get('window').width / 2.75, flexDirection: 'row', marginRight: "13%" }}>
                      <ListaPortada Lista={item} Loading={loading} Nombre={item.nombre} Index={item.id} Autor={item.autor} Descripcion={item.descripcion} Externa={externo} AbrirLista={abrirLista} EliminarLista={eliminarLista} DejarDeSeguir={DejarDeSeguir}/>
                    </View>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                />
              }
            </View>
          )}

          {mostrarModal ? <ModalLista setLista={setListas} Lista={listas} close={() => setMostrarModal(false)} idUsuario={usuarioid} /> : <></>}
          <ModalMostrarLista mostrarLista={mostrarLista} setMostrarLista={setMostrarLista} listaSeleccionada={listaSeleccionada} añadirComercios={habilitarAñadirComercio} usuario={usuarioid} />
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  screenContainerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: 'white'
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
    fontSize: 16, fontWeight: '700',
    marginLeft: 15
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 15
  },
});
