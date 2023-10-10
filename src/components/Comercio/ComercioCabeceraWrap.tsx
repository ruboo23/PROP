import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const ejemploComercio: Comercio = {
  nombre: "Tienda de Ejemplo",
  direccion: "Calle Principal, 123",
  telefono: 123456789,
  horario: "Lunes a Viernes: 9:00 AM - 6:00 PM",
  web: "https://www.ejemplo.com",
  descripcion: "Una tienda de ejemplo para propósitos educativos. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  imagenNombre: "ejemplo.jpg",
  provincia: "Ejemplo",
  instagram: "@tienda_ejemplo",
  facebook: "TiendaEjemplo"
};

export default function CabeceraComercio(props:any) {
  const [comercio, setComercio] = useState(ejemploComercio);

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <Image source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/${props.imagen}`}} style={styles.profileImg}></Image>
        <View style={styles.headerInf}>
        <Text style={styles.title}>{props.nombre}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
   profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'lightgrey',
    borderWidth: 1
  }
});
