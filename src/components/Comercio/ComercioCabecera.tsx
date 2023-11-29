import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Button, TouchableNativeFeedback, Modal, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHorario from 'react-native-vector-icons/AntDesign';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { GetUsuarioById, dejarSeguirComercio, seguirComercio } from '../../Servicies/UsuarioService/UsuarioServices';
import { AñadirComercio, ComprobarComercio, ListasFromUsuario, ListasFromUsuarioComercio } from '../../Servicies/ListaService/ListaService';
import { SvgClock, SvgEllipse, SvgExpand, SvgFixed, SvgPhone, SvgPlace, SvgStar, SvgUnExpand } from './ComerciosSvg';
import { open } from 'fs/promises';

interface CabeceraComercioProps {
  nombre?: String,
  direccion?: String,
  descripcion?: String,
  imagen?: String,
  horario?: String,
  id?: number,
  instagram?: String,
  facebook?: String,
  logueadoComoComercio?: boolean,
  valoracionpromedio?: Number,
  telefono?: String,
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

export default function CabeceraComercio({ telefono, instagram, facebook, nombre, direccion, descripcion, imagen, horario, id, logueadoComoComercio, valoracionpromedio }: CabeceraComercioProps) {
  const User = userSingleton.getUser();
  const [loadingFollow, setLoadingFollow] = useState<boolean>(true);
  const [esSeguido, setEsSeguido] = useState<boolean>(false);
  const [mostrarModalLista, setMostrarModalLista] = useState<boolean>(false);
  const [listas, setListas] = useState<Array<TuplaLista>>([]);
  const [tieneLista, setTieneLista] = useState<boolean>(false);
  const [openHorario, setOpenHorario] = useState<boolean>(false);

  function sendToGoogleMaps() {
    const browser = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
    Linking.openURL(browser);
  }

  function mostrarListas() { setMostrarModalLista(!mostrarModalLista) }

  useEffect(() => {
    fetchFollow();
    ComprobarRedes();
    ListasFromUsuarioComercio(User?.id, id).then((response) => {
      if (response.length > 0) {
        setListas(response)
        setTieneLista(true)
      }

    })
  }, [listas])

  function ComprobarRedes() {
    let posicionInsta = instagram?.indexOf(".com/")
    let posicionFace = facebook?.indexOf(".com/")
    if (posicionInsta !== undefined && posicionInsta !== -1) {
      instagram = instagram?.substring(posicionInsta + 5);
    }
    if (posicionFace !== undefined && posicionFace !== -1) {
      facebook = facebook?.substring(posicionFace + 5);

    }
    facebook = facebook?.replace(/\s/g, '.')
  }

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
    setOpenHorario(!openHorario);
  }

  function añadirComercio(lista: number) {
    AñadirComercio(lista, id)
  }

  const handleListaPress = (tuplalista: TuplaLista) => {
    añadirComercio(tuplalista.Lista.id);
    const updatedListas = listas.map(item =>
      item.Lista.id === tuplalista.Lista.id
        ? { ...item, boolean: true }
        : item
    );
    setListas(updatedListas);
  };

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

  
  const renderAvisoHorario = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
  
    var dayOfWeek: number = now.getDay(); // Cambiar de getDate a getDay para obtener el día de la semana
  
    var horarioArray = horario?.split(';');
    var horasDia = horarioArray?.[dayOfWeek];
  
    if (!horasDia) {
      return <Text>Cerrado</Text>;
    }
  
    const rangos = horasDia.split(' ');
  
    // Verificar si la hora actual está dentro de alguno de los rangos
    const isWithin = rangos.some((rango) => {
      const [startHour, startMinute, endHour, endMinute] = rango.split(/[-:]/).map((time) => parseInt(time, 10));
      const startTime = new Date(now);
      startTime.setHours(startHour, startMinute, 0, 0);
  
      const endTime = new Date(now);
      endTime.setHours(endHour, endMinute, 0, 0);
  
      return now.getTime() >= startTime.getTime() && now.getTime() <= endTime.getTime();
    });
  
    return <Text>{isWithin ? "Abierto" : "Cerrado"}</Text>;
  };
  
  const renderHorario = () => {
    const now = new Date();
    var dayOfWeek: number = now.getDay(); // Cambiar de getDate a getDay para obtener el día de la semana
  
    var horarioArray = horario?.split(';');
    var hora = horarioArray?.[dayOfWeek];
  
    return <Text>{hora}</Text>;
  };

  const renderHorarioCompleto = () => {
    const horarios = horario?.split(';');
  
    if (!horarios || horarios.length !== 7) {
      return <Text>No hay horario disponible.</Text>;
    }
  
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
    return (
      <View style={{ marginLeft: 20 }}>
        {diasSemana.map((dia, index) => {
          const horasDia = horarios[index];
          return (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ marginRight: 8, fontSize: 13}}>{dia}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#7D7D7D'}}>{horasDia || 'Cerrado'}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.back}>
      <Image source={{ uri: imagen ? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}` : 'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado' }} style={styles.backgroundImg}/>
      
      <View style={[{ position: 'absolute', top: 120, right: 30, alignItems:'center', width: 35, height: 35, borderRadius: 50, backgroundColor: 'black'}]}>
          <TouchableWithoutFeedback onPress={seguirButton}>
            <View>
              <SvgEllipse height={40} width={40}></SvgEllipse>
              {esSeguido ?
                <SvgFixed height={24} width={19} color={"#000"} stroke={"#000"} style={{ position: 'absolute', top: 8, right: 10 }}></SvgFixed>
              :
                <SvgFixed height={24} width={19} color={"#fff"} stroke={"#000"} style={{ position: 'absolute', top: 8, right: 10 }}></SvgFixed>
              }
            </View>
          </TouchableWithoutFeedback>
      </View>

      <View style={styles.container}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{ fontWeight: '700', flexWrap: 'wrap', fontSize: 26}}>{nombre}</Text>
            {valoracionpromedio != undefined &&
              <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, alignSelf: 'center', marginTop: 7}}>
                {valoracionpromedio == 0 ? <Text style={{ color: '#888DC7', fontSize: 12 }}>0</Text> : <Text style={{ color: '#888DC7', fontSize: 12 }}>{valoracionpromedio.toString().substring(0, 4)}</Text> }
                <SvgStar height={16} width={16} style={{ marginLeft: 2 }}></SvgStar>
              </View>
            }
          </View>

          <Text style={{ maxWidth: '96%', color: '#646262', marginTop: 10, fontWeight: '400', fontSize: 13, lineHeight: 15.23 }}>{descripcion}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: -3 }}>
            <SvgPlace height={16} width={16}></SvgPlace>
            <TouchableOpacity onPress={sendToGoogleMaps}>
              <Text style={{  marginLeft: 5, paddingRight: 8, color: 'black', flexWrap: 'wrap', fontWeight: '400', fontSize: 14 }}>{direccion}</Text>
            </TouchableOpacity>
          </View>

          {(telefono != '0' && telefono != undefined && telefono != null) &&
            <View style={{ marginTop: 15, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <SvgPhone height={13} width={12}></SvgPhone>
              <Text style={{ marginLeft: 7 }}>{telefono}</Text>
            </View>
          }
          
          <View >
            <View style={{ marginTop: 15, display: 'flex', flexDirection:'row', marginLeft: -3, alignItems: 'center', marginBottom: 10 }}>
              <SvgClock height={16} width={16}></SvgClock>
              <TouchableWithoutFeedback onPress={handleClickHorario} style={{ marginLeft: 6 }}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#61A03B', fontWeight: '400', fontSize: 13, marginLeft: 7 }}>{renderAvisoHorario()}</Text>
                  <Text style={{ paddingLeft: 5 }}>{renderHorario()}</Text>
                  {openHorario ? 
                    <SvgUnExpand width={21} height={21} onPress={() => setOpenHorario(false)}></SvgUnExpand>

                  :
                    <SvgExpand width={21} height={21} onPress={() => setOpenHorario(true)}></SvgExpand>
                  }
                  
                </View>
              </TouchableWithoutFeedback>
            </View>
            {openHorario && 
              <View style={{ display: 'flex', flexDirection: 'row'}}>{renderHorarioCompleto()}</View>
            }
          </View>
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
  absoluteContainer: {
    position: 'absolute',
    top: 110,
    right: 10,
  },
  horario: {
    paddingRight: 15,
    paddingBottom: 10
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
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    flexWrap: 'wrap'
  },
  backgroundImg: {
    height: 140,
    width: 400
  }, profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'lightgrey',
    borderWidth: 1
  }
});