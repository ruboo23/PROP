import { Animated, DimensionValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { GetImageByName } from '../Servicies/ImagenesService';
import { Stream } from 'stream';
import { RouteProp, useRoute } from '@react-navigation/core';

interface Comercio {
  Descripcion: String,
  Direccion: String,
  Facebook?: String, 
  Horario?: String, 
  Id: 3,
  ImagenNombre: String, 
  Instagram?: String, 
  Mail?: String, 
  Nombre: String, 
  Provincia: String, 
  Telefono?: number, 
  Tipo?: [Object], 
  Web?: String,
}

type PerfilNavigationParams = {
  id: number;
};

export default function PerfilComercio() {
  const route = useRoute();
  const params = route.params as PerfilNavigationParams | undefined;
  const id = params?.id;
  const [comercio, setComercio] = useState<Comercio>();
  const [wrap, setWrap] = useState<boolean>(false);
  const translation = useRef(new Animated.Value(0)).current;
  const translationContent = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const parseResponse = (res: any) => {
    if(res != null || res != undefined){
        const c : Comercio = {
          Direccion: res?.Direccion,
          Descripcion: res?.Descripcion,
          Facebook: res?.Facebook,
          Horario: res?.Horario,
          Id: res?.Id,
          ImagenNombre: res?.ImagenNombre, 
          Instagram: res?.Instagram,
          Mail: res?.Mail,
          Nombre: res?.Nombre, 
          Provincia: res?.Provincia, 
          Telefono: res?.Telefono,
          Tipo: res.Tipo, 
          Web: res?.Web
        }
        if (c.ImagenNombre == null) {
          c.ImagenNombre = "avatarPred.png";
        }
        setComercio(c);
        setIsLoading(false);
      }
    };

  useEffect(() => {
    setIsLoading(true);
    if(!!id){
      GetComercioById(id).then((res:any) => parseResponse(res)) 
    } else {
      GetComercioByName("Plantukis").then((res:any) => parseResponse(res));      
    }
  }, [id]);

  const scrollWrap = () => {
    if (!wrap) { 
      animateHeader();
      animateContent();
    }
  }
  const scrollUnWrap = () => {
      translation.setValue(0);
      translationContent.setValue(0);
      setWrap(false);
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
  

  return (
    (<View style={styles.ventana}>
      {isLoading 
        ? <Text style={{textAlign: 'center', marginTop: 20}}>Cargando...</Text>
        : <>
            <Animated.View style={{
                //transform: [{ translateY: translation }]
              }}>
                {wrap ? <CabeceraComercioWrap imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} /> : <CabeceraComercio horario={comercio?.Horario} imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} direccion={comercio?.Direccion} descripcion={comercio?.Descripcion}/>}
              </Animated.View>
              <Animated.View style={{
                height: '100%',
                paddingBottom: 100,
                //transform: [{ translateY: translationContent }]
              }}>
                <NavegacionContenidoComercio scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></NavegacionContenidoComercio>
              </Animated.View>
          </>
      }
  </View>)
);
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'red',
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24, 
  },
  ventana: {
    height: '100%',
    paddingTop: 30,
    overflow: 'hidden'
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
