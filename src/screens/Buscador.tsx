import react, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Pressable,
  Modal,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import TarjetaUsuario from "../components/Buscador/tarjetaUsuario";
import {
  JSONtoUsuario,
  GetAllUsuarios,
  GetListasSeguidas,
} from "../Servicies/UsuarioService/UsuarioServices";
import axios, { CancelTokenSource } from "axios";
import Constants from "expo-constants";
import PerfilUsuarioExterno from "./PerfilUsuarioExterno";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { ListasFromUsuario, ListasGetAll } from "../Servicies/ListaService/ListaService";
import ModalMostrarLista from "./ModalMostrarLista/ModalMostrarLista";
import userSingleton from "../Servicies/GlobalStates/UserSingleton";

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
  const [rutasSeguidas, setRutasSeguidas] = useState<Array<Lista>>([])
  const [rutasPropias, setRutasPropias] = useState<Array<Lista>>([])
  const [mostrarLista, setMostrarLista] = useState(false);
  const [listaSeleccionada, setListaSeleccionada] = useState<Lista>();
  const closeModal = () => {
    setModalVisible(false);
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

  async function fetchData() {
    try {
      
      const [rutasRecomendadasResponse, rutasSeguidasResponse, rutasCreadasResponse] = await Promise.all([
        ListasGetAll(),
        GetListasSeguidas(userSingleton.getUser()?.id),
        ListasFromUsuario(userSingleton.getUser()?.id)
      ]);
  
    
      setRutasRecomendadas(rutasRecomendadasResponse);
  
      setRutasPropias(rutasCreadasResponse);
      setRutasSeguidas(rutasSeguidasResponse);
  
    } catch (error) {
      console.error("Error al obtener datos:", error);
      
    }
  }

  useEffect(() => {
    
    fetchData();
    var resultado = rutasRecomendadas.filter((e) => rutasSeguidas.includes(e));
    console.log(resultado)
    console.log(rutasRecomendadas)
    setRutasRecomendadas(resultado);
    resultado = rutasRecomendadas.filter((e) => !rutasPropias.includes(e))
    setRutasRecomendadas(resultado)
    GetAllUsuarios().then((response) => {
      setUsuariosRecomendados(response);
    });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 27,
          fontWeight: "700",
          marginTop: 20,
          marginHorizontal: 10,
        }}
      >
        Inspírate de tu entorno
      </Text>
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
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUser(usuario);
                      setModalVisible(true);
                    }}
                  >
                    <TarjetaUsuario
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
              {rutasRecomendadas.map((lista: Lista, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    setMostrarLista(true);
                    setListaSeleccionada(lista);
                  }}
                >
                  <View
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
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 20,
                      }}
                    >
                      {lista?.nombre}
                    </Text>
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Icon name="place" size={15} color="#888dc7"></Icon>
                      <Text
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
                      style={{
                        alignItems: "flex-start",
                        width: "100%",
                        flexDirection: "row",
                        height: "10%",

                      }}
                    >
                      <Icon name="schedule" size={15} color="#888dc7"></Icon>
                      <Text
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
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#888dc7" }}>
                        By @{lista?.autor}
                      </Text>
                      <TouchableOpacity>
                        <Icon name="favorite" size={15} color="#888dc7"></Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
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
            style={{ height: 60, width: 150 }}
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
                <TarjetaUsuario
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
          <Modal
            visible={modalVisible}
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
                <TouchableNativeFeedback onPress={() => setModalVisible(false)}>
                  <Image
                    source={{
                      uri: "https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png",
                    }}
                    style={{ width: 40, height: 40 }}
                  ></Image>
                </TouchableNativeFeedback>
              </View>
              <PerfilUsuarioExterno
                id={selectedUser?.id}
                closeModal={closeModal}
              />
            </View>
          </Modal>
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
