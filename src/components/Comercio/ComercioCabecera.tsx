import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Button, TouchableNativeFeedback, Modal, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHorario from 'react-native-vector-icons/AntDesign';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { GetUsuarioById, dejarSeguirComercio, seguirComercio } from '../../Servicies/UsuarioService/UsuarioServices';
import { AñadirComercio, ComprobarComercio, ListasFromUsuario, ListasFromUsuarioComercio } from '../../Servicies/ListaService/ListaService';

interface CabeceraComercioProps {
  nombre?: String,
  direccion?: String,
  descripcion?: String,
  imagen?: String,
  horario?: String,
  id?: number,
  logueadoComoComercio?: boolean
  valoracionpromedio?: Number
}

interface Lista {
  id: number
  nombre: string;
  imagen: string
}

interface TuplaLista {
  Lista: Lista,
  boolean: boolean
}

export default function CabeceraComercio({ nombre, direccion, descripcion, imagen, horario, id, logueadoComoComercio, valoracionpromedio }: CabeceraComercioProps) {
  const User = userSingleton.getUser();

  const [horarioAbierto, setHorarioAbierto] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(true);
  const [esSeguido, setEsSeguido] = useState<boolean>(false);
  const [mostrarModalLista, setMostrarModalLista] = useState<boolean>(false);
  const [listas, setListas] = useState<Array<TuplaLista>>([]);
  const [tieneLista, setTieneLista] = useState<boolean>(false);

  function sendToGoogleMaps() {
    const browser = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
    Linking.openURL(browser);
  }

  function mostrarListas() { setMostrarModalLista(!mostrarModalLista) }

  useEffect(() => {
    fetchFollow();
    ListasFromUsuarioComercio(User.id, id).then((response) => {
      if (response.length > 0) {
        setListas(response)
        setTieneLista(true)
      }

    })
  }, [])

  function fetchFollow() {
    if (User != null && User != undefined) {
      GetUsuarioById(User.id).then((res: any) => {
        if (res != null && res != undefined) {
          if (res.idcomercio.$values != null && res.idcomercio.$values != undefined && res.idcomercio.$values.length > 0) {
            let ids = res.idcomercio.$values.map((comercio: any) => comercio.id)
            setEsSeguido(ids.includes(id));
            setLoadingFollow(false)
          } else {
            setEsSeguido(false);
            setLoadingFollow(false)
          }
        }
      })
    }
  };

  function handleClickHorario(event: GestureResponderEvent): void {
    setHorarioAbierto(!horarioAbierto);
  }

  function añadirComercio(lista: number) {
    AñadirComercio(lista, id)
    let listaAux = listas
    listaAux[lista].boolean=true;
    setListas(listaAux);
  }

  function seguirButton() {
    setLoadingFollow(true);
    if (esSeguido) {
      dejarSeguirComercio(User?.id, id).then(() => {
        fetchFollow();
      });
    } else {
      seguirComercio(User?.id, id).then(() => {
        fetchFollow();
      });
    }
  }

  function TarjetaLista(nombreLista: string, nombreImage: string) {
    <View style={{ width: '90%' }}>
      <TouchableNativeFeedback onPress={() => { }} style={{ borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
          <Image source={{ uri: 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Listas/avatar' }} style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}></Image>
          <Text style={{ height: '100%', textAlignVertical: 'center', fontSize: 23, fontWeight: "600" }}>Favoritos</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  }

  return (
    <View style={styles.back}>

      <Image source={{ uri: imagen ? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}` : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado' }}
        style={styles.backgroundImg}></Image>


      <View style={styles.container}>
        <Image source={{ uri: imagen ? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}` : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado' }}
          style={styles.profileImg}></Image>
        <View style={styles.headerInf}>
          <Text style={styles.title}>{nombre}</Text>
          <View style={styles.horiz}>
            <Icon name='place' size={10} color='grey'></Icon>
            <TouchableOpacity onPress={sendToGoogleMaps}>
              <Text style={styles.subtitle}>{direccion}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {valoracionpromedio != undefined &&
        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 25 }}>
          <Icon size={20} name={'star'} color={'grey'}></Icon>
          {valoracionpromedio == 0 ?
            <Text>0</Text>
            : <Text>{valoracionpromedio.toString().substring(0, 4)}</Text>
          }
        </View>
      }
      <Text style={styles.desc}>{descripcion}</Text>
      {!logueadoComoComercio &&
        <View style={{ width: "90%", justifyContent: "center", alignSelf: "center", marginVertical: 5, flexDirection: 'row', }}>
          {loadingFollow
            ?
            <View style={{ width: '50%' }}>
              <Image source={require('../../../assets/loading.gif')} style={{ height: 30, width: 30, justifyContent: 'center', alignSelf: "center" }} />
            </View>
            :
            <View style={{ width: '50%', height: 33, marginRight: 5 }}>
              <TouchableOpacity
                style={{ height: '100%', backgroundColor: esSeguido ? 'gray' : 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                onPress={seguirButton}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>{esSeguido ? 'Dejar de seguir' : 'Seguir'}</Text>
              </TouchableOpacity>
            </View>
          }
          <View style={{ width: '50%', height: 33 }}>
            <TouchableOpacity
              style={{ height: '100%', backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
              onPress={mostrarListas}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Añadir a lista</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <View style={styles.horario}>
        <TouchableWithoutFeedback onPress={handleClickHorario} >
          <View style={styles.horiz}>
            {horarioAbierto ?
              <IconHorario name="minuscircleo" size={12} color="grey" onPress={() => { setHorarioAbierto(false) }}></IconHorario>
              :
              <IconHorario name="pluscircleo" size={12} color="grey" onPress={() => { setHorarioAbierto(true) }}></IconHorario>
            }
            <Text style={{ paddingLeft: 5 }}>Horario</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          {horarioAbierto ?
            <Text>{horario}</Text>
            :
            <View></View>
          }
        </View>
      </View>
      {mostrarModalLista ?
        <Modal style={{ width: '100%', height: 365 }}
          animationType='fade'
          transparent={true}
          visible={true}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(128, 128, 128, 0.6)', }}>
            <View style={{ height: '53%', width: '85%', alignItems: 'center', marginVertical: '40%', marginHorizontal: '7.5%', backgroundColor: '#DADADA', borderRadius: 10 }}>
              <View style={{ width: '95%', alignItems: 'flex-end' }}>
                <TouchableNativeFeedback onPress={() => { mostrarListas() }} >
                  <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png' }} style={{ width: 40, height: 40 }}></Image>
                </TouchableNativeFeedback>

              </View>
              {tieneLista ?
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%', marginBottom: 20 }}>
                  {listas.map((tuplalista: TuplaLista, index: number) => (
                    !tuplalista.boolean ? (
                      <TouchableNativeFeedback onPress={() => { añadirComercio(tuplalista.Lista.id) }} style={{ borderRadius: 10 }} >
                        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginBottom: 7 }}>
                          <Image source={{ uri: tuplalista.Lista.imagen == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" : "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Listas/" + tuplalista.Lista.imagen }} style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}></Image>
                          <Text style={{ height: '100%', textAlignVertical: 'center', fontSize: 23, fontWeight: "600" }}>{tuplalista.Lista.nombre}</Text>
                        </View>
                      </TouchableNativeFeedback>
                    )
                      :
                      (<View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'gray', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginBottom: 7 }}>
                        <Image source={{ uri: tuplalista.Lista.imagen == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" : "https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Listas/" + tuplalista.Lista.imagen }} style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}></Image>
                        <Text style={{ height: '100%', textAlignVertical: 'center', fontSize: 23, fontWeight: "600" }}>{tuplalista.Lista.nombre}</Text>
                      </View>
                      )
                  ))}
                </ScrollView>
                :
                <View style={styles.screenContainer}>
                  <Text>Todavía no tiene reseñas.</Text>
                  <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
                </View>
              }
            </View>
          </View>
        </Modal>
        :
        <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  horario: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    paddingRight: 8,
    color: 'grey',
    flexWrap: 'wrap',
  },
  screenContainer: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
  headerInf: {
    marginLeft: 20,
    maxWidth: '75%'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    flexWrap: 'wrap'
  },
  backgroundImg: {
    height: 100,
    width: 400
  }, profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'lightgrey',
    borderWidth: 1
  }, desc: {
    margin: 10,
    flexWrap: 'wrap',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    padding: 8,
  }
});