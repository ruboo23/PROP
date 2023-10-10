import { Animated, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { GetImageByName } from '../Servicies/ImagenesService';

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
  ImagenURL?: string
}

export default function PerfilComercio() {
  const [comercio, setComercio] = useState<Comercio>();
  const [wrap, setWrap] = useState<boolean>(false);
  const translation = useRef(new Animated.Value(0)).current;
  const translationContent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      GetComercioByName("Plantukis").then((res:any) => {
        if(res != null || res != undefined){
            
            const c : Comercio = {
              Direccion: res?.data.Direccion,
              Descripcion: res?.data.Descripcion,
              Facebook: res?.data.Facebook,
              Horario: res?.data.Horario,
              Id: res?.data.Id,
              ImagenNombre: res?.data.ImagenNombre, 
              Instagram: res?.data.Instagram,
              Mail: res?.data.Mail,
              Nombre: res.data.Nombre, 
              Provincia: res.data.Provincia, 
              Telefono: res.data.Telefono,
              Tipo: res.data.Tipo, 
              Web: res?.data.Web
            }
            if (c.ImagenNombre != null) {
              GetImageByName(c.ImagenNombre).then((res:any) => {
                if (res != null || res != undefined) {
                  console.log(c.ImagenNombre);
                  c.ImagenURL = res?.data;
                }
              });
            }
            setComercio(c);
            console.log(c);
          }
        });

  }, []);

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
        {wrap ? <CabeceraComercioWrap /> : <CabeceraComercio nombre={comercio?.Nombre} direccion={comercio?.Direccion} descripcion={comercio?.Descripcion}/>}
      </Animated.View>
      <Animated.View style={{
        height: '100%',
        paddingBottom: 100,
        transform: [{ translateY: translationContent }]
      }}>
        <NavegacionContenidoComercio scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></NavegacionContenidoComercio>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
