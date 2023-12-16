import react, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Modal, Image, TouchableOpacity, RefreshControl, } from "react-native";
import { Searchbar } from "react-native-paper";
import TarjetaUsuario from "../components/Buscador/tarjetaUsuario";
import { JSONtoUsuario, GetAllUsuarios, SeguirLista, DejarSeguirLista, GetNoSeguidores } from "../Servicies/UsuarioService/UsuarioServices";
import PerfilUsuarioExterno from "./PerfilUsuarioExterno";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GetListasRecomendadas } from "../Servicies/ListaService/ListaService";
import ModalMostrarLista from "./ModalMostrarLista/ModalMostrarLista";
import userSingleton from "../Servicies/GlobalStates/UserSingleton";
import axios from "axios";
import TarjetaUsuarioBuscado from "../components/Buscador/tarjetaUsuarioBuscado";

let cancelToken: any;
let timer: ReturnType<typeof setTimeout>;
//la busqueda la hace el backend
interface Usuario {
  id: Number;
  nickname: string;
  imagenname: string;
}

interface Lista {
  id: number;
  nombre: string;
  descripcion: string;
  zona: string;
  duracion: string;
  autor: string;
  seguida: boolean;
}

export default function Buscador() {
  const [searchInfo, setSearchInfo] = react.useState("");
  const [usuariosEncontrados, setUsuariosEncontrados] = react.useState<
    Array<Usuario>
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario>();
  const [usuariosRecomendados, setUsuariosRecomendados] = useState<
    Array<Usuario>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rutasRecomendadas, setRutasRecomendadas] = useState<Array<Lista>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [listaSeleccionada, setListaSeleccionada] = useState<Lista>();
  const [clicRutas, setClicRutas] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const onSearchChange = (query: string) => {
    setIsLoading(true);

    setUsuariosEncontrados([]);
    setSearchInfo(query);
    if (!!timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel();
        cancelToken = undefined;
      }
      cancelToken = axios.CancelToken.source();
      if (query != "") {
        JSONtoUsuario(query, cancelToken.token).then((response: any) => {
          setUsuariosEncontrados(response);
          setIsLoading(false);
        });
      }
      if (query === "") {
        setIsLoading(false);
      }
    }, 500);
  };

  function fetchData(){
    GetListasRecomendadas(userSingleton.getUser()?.id).then((res: any) =>{
      setRutasRecomendadas(res)
      setRefreshing(false);
    })

    GetNoSeguidores(userSingleton.getUser()?.id).then((response: any) => {
      setUsuariosRecomendados(response);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    fetchData()
    setModalVisible(false);
  }, []);

  function manejarLista(lista: Lista) {
    setClicRutas(!clicRutas);
    if (lista.seguida) {
      lista.seguida = false;
      DejarSeguirLista(lista.id)
    }
    else {
      lista.seguida = true;
      SeguirLista(lista.id)

    }
  }

  return (
    <View style={{ height: "100%" }}>
      <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            style={{
              marginTop: 20,
              marginHorizontal: 10}}
          >
      <Text
        style={{
          fontSize: 27,
          fontWeight: "700",
          marginHorizontal: 10,
        }}
      >
        Inspírate de tu entorno
      </Text>
      </RefreshControl>
      <Searchbar
        onChangeText={onSearchChange}
        value={searchInfo}
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: "transparent",
          borderColor: "black",
          borderWidth: 1,
          height: 50,
          alignContent: "center",
        }}
      ></Searchbar>

      {searchInfo == "" ? (
        <View style={{ height: "100%" }}>
          <View style={{ height: "30%", paddingRight: 1 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "700", marginHorizontal: 20 }}
            >
              Perfiles Recomendados
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {usuariosRecomendados.map((usuario: Usuario, index: number) => (
                <View key={index}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setModalVisible(false);
                      setSelectedUser(usuario);
                      setModalVisible(true);
                    }}
                  >
                    <TarjetaUsuario
                      key={index}
                      nickname={usuario.nickname}
                      imagen={usuario.imagenname}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ height: "50%", paddingRight: 1 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "700", marginHorizontal: 20 }}
            >
              Rutas recomendadas
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{}}
            >
              {(rutasRecomendadas != undefined && rutasRecomendadas != null && rutasRecomendadas.length > 0) ? (
              rutasRecomendadas.map((lista: Lista, index: number) => (
                <TouchableOpacity
                  key={'touch1' + index}
                  onPress={() => {
                    setMostrarLista(true);
                    setListaSeleccionada(lista);
                  }}
                >
                  <View
                    key={'view1' + index}
                    style={{
                      alignItems: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      marginHorizontal: 7,
                      marginTop: 10,
                      borderWidth: 1,
                      borderRadius: 8,
                      width: 230,
                      height: 250,
                    }}
                  >
                    <Text
                      key={'text1'+index}
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 20,
                      }}
                    >
                      {lista?.nombre}
                    </Text>
                    <View
                      key={'view2' + index}
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Icon name="place" size={15} color="#888dc7" key={'icon1'+index}></Icon>
                      <Text
                        key={'text2'+index}
                        style={{
                          marginLeft: 5,
                          fontWeight: "300",
                          fontSize: 12,
                        }}
                      >
                        {lista?.zona}
                      </Text>
                    </View>
                    <View
                      key={'view3'+index}
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                        flexDirection: "row",
                        height: "10%",

                      }}
                    >
                      <Icon name="schedule" size={15} color="#888dc7" key={'icon2'+index}></Icon>
                      <Text
                        key={'text3'+index}
                        style={{
                          marginLeft: 5,
                          fontWeight: "300",
                          fontSize: 12,
                        }}
                      >
                        Duracion estimada:{" "}
                        {lista?.tiempo == null || lista?.tiempo === ""
                          ? " "
                          : `${lista?.tiempo} horas`}
                      </Text>
                    </View>
                    <Text
                      key={'texto4'+index}
                      style={{
                        height: "30%",
                        marginTop: 10,
                        marginBottom: 20,
                        fontSize: 16,
                      }}
                    >
                      {lista?.descripcion}
                    </Text>
                    <View
                      key={'view5'+index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#888dc7" }} key={'text5'+index}>
                        By @{lista?.autor}
                      </Text>
                      <TouchableOpacity
                        key={'touch2'+index}
                        onPress={() => manejarLista(lista)}
                      >
                        {lista.seguida ?
                          <Icon name="favorite" size={20} color="#888dc7" key={'icon3'+index}></Icon>
                          :
                          <Icon name="favorite-border" size={20} color="#888dc7" key={'icon3'+index}></Icon>
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )))
              :
              (
                <Text style={{width:"80%", height:50, marginHorizontal:30, marginVertical:10}} numberOfLines={3} ellipsizeMode="tail"> ¡Lo Sentimos!, no hay rutas recomendadas para mostrar</Text>
              )
                }
            </ScrollView>
          </View>
        </View>
      ) : (
        <></>
      )}
      {isLoading ? (
        <View
          style={{
            marginTop: "25%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "",
          }}
        >
          <Image
            source={require("../../assets/loading.gif")}
            style={{ height: 60, width: 160 }}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={searchInfo == "" ? [] : usuariosEncontrados}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedUser(item);
                  setModalVisible(true);
                }}
              >
                <TarjetaUsuarioBuscado
                  nickname={item.nickname}
                  imagen={item.imagenname}
                />
              </Pressable>
            )}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: "center", padding: 20 }}>
                {usuariosEncontrados?.length === 0 && searchInfo !== ""
                  ? "No se han encontrado usuarios con el nombre especificado"
                  : ""}
              </Text>
            )}
          />

          {modalVisible &&

            <Modal
              visible={true}
              animationType="slide"
              transparent={false}
            >
              <View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 50,
                    marginTop: 10,
                    width: "100%",
                  }}
                >
                </View>
                <PerfilUsuarioExterno
                  id={selectedUser?.id}
                  showArrow={true}
                  closeModal={closeModal}
                  isLoggedUser={selectedUser?.id == userSingleton.getUser()?.id}
                />
              </View>
            </Modal>}

          <ModalMostrarLista
            mostrarLista={mostrarLista}
            setMostrarLista={setMostrarLista}
            listaSeleccionada={listaSeleccionada}
          ></ModalMostrarLista>
        </View>
      )}
    </View>
  );
}
