import { Animated, DimensionValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import AñadirAnuncioButton from '../components/Comercio/AñadirAnuncioButton';

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
      setWrap(true);
    }
  }
  const scrollUnWrap = () => {
      setWrap(false);
  }

  return (
    (<View style={styles.ventana}>
      {isLoading 
        ? <Text style={{textAlign: 'center', marginTop: 20}}>Cargando...</Text>
        : <>
          {wrap ? <CabeceraComercioWrap imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} /> : <CabeceraComercio horario={comercio?.Horario} imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} direccion={comercio?.Direccion} descripcion={comercio?.Descripcion}/>}
          <NavegacionContenidoComercio scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></NavegacionContenidoComercio>
          <View style={styles.absoluteContainer}>
            <AñadirAnuncioButton />
          </View>
        </>
      }
  </View>)
);
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 16, // Puedes ajustar la posición según tus necesidades
    right: 16, // Puedes ajustar la posición según tus necesidades
  },
  add: {
    borderRadius: 50
  },
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
