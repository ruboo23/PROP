import { StyleSheet, View,Image } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import AñadirAnuncioButton from '../components/Comercio/Anuncios/AñadirAnuncioButton';

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
          Web: res?.Web,
        }
        if (c.ImagenNombre == null) {
          c.ImagenNombre = "avatarPred.png";
        }
        setComercio(c);
        setIsLoading(false);
      }
    };

  useEffect(() => {
    setWrap(false);
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
        ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/loading.gif')}
            style={{ height: 80, width: 80 }}
          />        
          </View>
        : <>
          {wrap ? <CabeceraComercioWrap imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} /> : <CabeceraComercio horario={comercio?.Horario} imagen={comercio?.ImagenNombre} nombre={comercio?.Nombre} direccion={comercio?.Direccion} descripcion={comercio?.Descripcion}/>}
          <NavegacionContenidoComercio idComercio={id} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></NavegacionContenidoComercio>
          <View style={styles.absoluteContainer}>
            <AñadirAnuncioButton id={comercio?.Id}/>
          </View>
        </>
      }
  </View>)
);
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
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
  }
});
