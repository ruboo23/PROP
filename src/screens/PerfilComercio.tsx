import { Animated, StyleSheet, Text, View } from 'react-native';
import { useRef, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';

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
  const [wrap, setWrap] = useState<boolean>(false);
  const translation = useRef(new Animated.Value(0)).current;
  const translationContent = useRef(new Animated.Value(0)).current;

  const scrollWrap = () => {
    if (!wrap) { 
      animateHeader();
      animateContent();
    }
  }

  function animateHeader () {
    Animated.timing(translation, {
      toValue: -113,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      setWrap(true);
      translation.setValue(0);
    });
  }

  function animateContent () {
    Animated.timing(translationContent, {
      toValue: -217,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      setWrap(true);
      translationContent.setValue(0);
    });
  }
  const scrollUnWrap = () => {
    translation.setValue(0);
    translationContent.setValue(0);
    setWrap(false);
  }

  return (
    <View style={styles.ventana}>
      <Animated.View style={{
        transform: [{ translateY: translation }]
      }}>
        {wrap ? <CabeceraComercioWrap /> : <CabeceraComercio />}
      </Animated.View>
      <Animated.View style={{
        height: '100%',
        transform: [{ translateY: translationContent }]
      }}>
        <NavegacionContenidoComercio scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></NavegacionContenidoComercio>
      </Animated.View>
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
