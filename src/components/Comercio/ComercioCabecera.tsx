import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHorario from 'react-native-vector-icons/AntDesign';
import { setPriority } from 'os';

interface Comercio {
  nombre: string,
  direccion: string,
  telefono: number,
  horario: string,
  web: string,
  descripcion: string,
  imagenNombre: string,
  provincia: string,
  instagram: string,
  facebook: string
}


export default function CabeceraComercio(props: any) {
  const [horarioAbierto, setHorarioAbierto] = useState(false);

  function sendToGoogleMaps () {
    const browser = `https://www.google.com/maps/search/?api=1&query=${props.direccion}`;
    Linking.openURL(browser);
  }
  

  return (
    <View style={styles.back}>
      <Image source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/${props.imagen}` }} style={styles.backgroundImg}></Image>
      <View style={styles.container}>
        <Image source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/${props.imagen}` }} style={styles.profileImg}></Image>
        <View style={styles.headerInf}>
        <Text style={styles.title}>{props.nombre}</Text>
        <View style={styles.horiz}>
          <Icon name='place' size={10} color='grey'></Icon>
          <TouchableOpacity onPress={sendToGoogleMaps}>
            <Text style={styles.subtitle}>{props.direccion}</Text>      
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <Text style={styles.desc}>{props.descripcion}</Text>
      <View style={styles.horario}>
        <View style={styles.horiz}>
          {horarioAbierto ? 
            <IconHorario name="minuscircleo" size={12} color="grey" onPress={() => {setHorarioAbierto(false)}}></IconHorario>
          :
            <IconHorario name="pluscircleo" size={12} color="grey" onPress={() => {setHorarioAbierto(true)}}></IconHorario>
          }
          <Text style={{ paddingLeft: 5}}>Horario</Text>
        </View>
        <View>
          {horarioAbierto ? 
            <Text>{props.horario}</Text>
          :
            <View></View>
          }
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horario: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  horiz: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  subtitle: {
    color: 'grey'
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
    marginLeft: 20
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
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
