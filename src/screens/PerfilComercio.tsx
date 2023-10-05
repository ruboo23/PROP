import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/ComercioCabecera';
import NavegacionContenidoComercio from '../components/ComercioNavegacionContenido';
import ComercioReseñas from '../components/ComercioReseñas';

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
  descripcion: "Una tienda de ejemplo para propósitos educativos.",
  imagenNombre: "ejemplo.jpg",
  provincia: "Ejemplo",
  instagram: "@tienda_ejemplo",
  facebook: "TiendaEjemplo"
};

export default function PerfilComercio() {
  const [comercio, setComercio] = useState(ejemploComercio);

  return (
    <View style={styles.ventana}>
      <CabeceraComercio></CabeceraComercio>
      <NavegacionContenidoComercio></NavegacionContenidoComercio>
    </View>
  );
  
}

const styles = StyleSheet.create({
  ventana: {
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, navegation: {
    marginBottom: 31,
    paddingTop: 20 
  }
});
