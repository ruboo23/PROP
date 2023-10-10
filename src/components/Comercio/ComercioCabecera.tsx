import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: 'pink',
    borderWidth: 1
  }, desc: {
    margin: 10,
    flexWrap: 'wrap',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    padding: 8,
    marginBottom: 20
  }
});
