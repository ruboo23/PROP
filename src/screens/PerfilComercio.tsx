import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

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
  const [comercio, setComercio] = useState(null);
  useEffect(() => {
    tuMetodo();
    return () => {
    };
  }, []); 

  const tuMetodo = () => {
    console.log('El componente se ha montado. Ejecutando tu método...');
  };

  
  return (
    <View>
      <Text>{ejemploComercio.nombre}</Text>
      <Text>{ejemploComercio.descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
