import react from 'react';
import { StyleSheet, View,Image, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import { GetNovedadFromComercio, GetOfertasFromComercio } from '../Servicies/AnucioService/AnucioService';
import comercioSingleton from '../Servicies/GlobalStates/ComercioSingleton';

import IUsuario from '../Interfaces/IUsuario';
import AñadirAnuncioButton from '../components/Comercio/Anuncios/AñadirAnuncioButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userSingleton from '../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/native';
import { ExisteReseña, GetReseñasByComercioId } from '../Servicies/ReseñaService/reseñaService';

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string
}

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

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  idUsuario: number,
  usuarioObject: IUsuario
}
type PerfilNavigationParams = {
  id: number;
  esComercioLogueado: boolean;
};

export default function PerfilComercio({ idComercio, esComercioLogueado, withCloseButton, closeAction } : any) {
  
  const route = useRoute();
  const params = route.params as PerfilNavigationParams | undefined;
  const id = idComercio || params?.id;
  const logueadoComoComercio = esComercioLogueado || params?.esComercioLogueado;
  const [comercio, setComercio] = useState<any>();
  const [wrap, setWrap] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [novedades, setNovedades] = useState<Anuncio[]>([]);
  const [ofertas, setOfertas] = useState<Anuncio[]>([]);
  const navigation = useNavigation();
  const [existeReseña, setExisteReseña] = useState<Boolean>(true);

  const parseResponse = (res: any) => {
    //console.log('res:', res)
    if(res != null || res != undefined){
        const c : any = {
          direccion: res?.direccion,
          descripcion: res?.descripcion,
          facebook: res?.facebook,
          horario: res?.horario,
          id: res?.id,
          nombreimagen: res?.nombreimagen, 
          instagram: res?.instagram,
          mail: res?.mail,
          nombre: res?.nombre, 
          provincia: res?.provincia, 
          telefono: res?.telefono,
          web: res?.web,
        }
        if (c.ImagenNombre == null) {
          c.ImagenNombre = "predeterminado";
        }
        if(!logueadoComoComercio){
          setComercio(c);
        } else {
          setComercio(comercioSingleton.getComercio());
        }
        setIsLoading(false);
        console.log('comercio:', comercio)
      }
    };

  useEffect(() => {
    setWrap(false);
    setIsLoading(true);
    if(!!id){
      GetComercioById(id).then((res:any) => {
        parseResponse(res)}) 
    } else {
      GetComercioByName("Fitandrico").then((res:any) => {parseResponse(res);});   
    }
  }, [id]);

  useEffect(() => {
    if(!!id){
      ExisteReseña(id)
      .then((existeReseña) => {
        setExisteReseña(existeReseña);
        console.log("Existe reseña: " + existeReseña);
      })
      .catch((error) => {
        console.error("Error al verificar reseña:", error);
      });      
      GetReseñasByComercioId(id).then((res:any) => setReseñas(res));
      GetNovedadFromComercio(id).then((res:any) => setNovedades(res));
      GetOfertasFromComercio(id).then((res:any) => {setOfertas(res); setIsLoading(false);
      });
    } else {
      ExisteReseña(2).then((res:any) => {setExisteReseña(res); console.log("\n REEEES: "+res+"\nsdfsdf")});
      GetReseñasByComercioId(2).then((res:any) => setReseñas(res));
      GetNovedadFromComercio(2).then((res:any) => setNovedades(res));
      GetOfertasFromComercio(2).then((res:any) => {setOfertas(res); setIsLoading(false);});
    }
  }, [id, existeReseña]);

  const scrollWrap = () => {
    if (!wrap) { 
      setWrap(true);
    }
  }
  const scrollUnWrap = () => {
      setWrap(false);
  }

  return (
    <View style={styles.ventana}>
      {isLoading 
        ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/loading.gif')}
            style={{ height: 80, width: 80 }}
          />        
          </View>
        : <>
        {withCloseButton &&
          <TouchableOpacity onPress={closeAction} style={{ position: 'absolute', top: 30, left: 10, zIndex: 1000 }}>
            <Icon name='close' size={30} />
          </TouchableOpacity>
        }
        {logueadoComoComercio && 
            <TouchableOpacity
                  style = {{backgroundColor: 'grey', width: 68, padding: 10, borderRadius: 10, position: 'absolute', top: 30, right: 10, zIndex: 1, height: 40 }}
                      onPress={()=> {
                          userSingleton.setUser(null)
                          console.log('logout')
                          // @ts-ignore
                          navigation.navigate('Login')
                      }}
              >
                  <Text>Logout</Text>
            </TouchableOpacity>
          }
          {wrap ? <CabeceraComercioWrap imagen={comercio?.nombreimagen} nombre={comercio?.nombre} /> : <CabeceraComercio horario={comercio?.horario} imagen={comercio?.nombreimagen} nombre={comercio?.nombre} direccion={comercio?.direccion} descripcion={comercio?.descripcion}/>}
          <NavegacionContenidoComercio reseñas={reseñas} idComercio={id} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} novedades={novedades} ofertas={ofertas}></NavegacionContenidoComercio>
          <View style={styles.absoluteContainer}>
            <AñadirAnuncioButton id={comercio?.id} esComercio={logueadoComoComercio} permitir={existeReseña}/>
          </View>
        </>}
    </View>
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
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
