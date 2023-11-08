import { StyleSheet, View,Image } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraComercio from '../components/Comercio/ComercioCabecera';
import CabeceraComercioWrap from '../components/Comercio/ComercioCabeceraWrap';
import NavegacionContenidoComercio from '../components/Comercio/ComercioNavegacionContenido';
import { GetComercioById, GetComercioByName }  from '.././Servicies/ComercioService/index';
import { useRoute } from '@react-navigation/core';
import AñadirAnuncioButton from '../components/Comercio/Anuncios/AñadirAnuncioButton';
import { GetNovedadFromComercio, GetOfertasFromComercio } from '../Servicies/AnucioService/AnucioService';
import comercioSingleton from '../Servicies/GlobalStates/ComercioSingleton';
import { GetReseñasByComercioId } from '../Servicies/ReseñaService/reseñaService';
import IUsuario from '../Interfaces/IUsuario';

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
};

export default function PerfilComercio() {
  
  const route = useRoute();
  const params = route.params as PerfilNavigationParams | undefined;
  const id = params?.id;
  const [comercio, setComercio] = useState<any>();
  const [wrap, setWrap] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [novedades, setNovedades] = useState<Anuncio[]>([]);
  const [ofertas, setOfertas] = useState<Anuncio[]>([]);

  const parseResponse = (res: any) => {
    if(res != null || res != undefined){
        const c : Comercio = {
          Direccion: res?.direccion,
          Descripcion: res?.descripcion,
          Facebook: res?.facebook,
          Horario: res?.horario,
          Id: res?.id,
          ImagenNombre: res?.nombreimagen, 
          Instagram: res?.instagram,
          Mail: res?.mail,
          Nombre: res?.nombre, 
          Provincia: res?.provincia, 
          Telefono: res?.telefono,
          Tipo: res?.tipo, 
          Web: res?.web,
        }
        if (c.ImagenNombre == null) {
          c.ImagenNombre = "predeterminado";
        }
        setComercio(comercioSingleton.getComercio());
      }
    };

  useEffect(() => {
    setWrap(false);
    setIsLoading(true);
    if(!!id){
      GetComercioById(id).then((res:any) => {parseResponse(res)}) 
    } else {
      GetComercioByName("Fitandrico").then((res:any) => {parseResponse(res);});   
    }
  }, [id]);

  useEffect(() => {
    if(!!id){
      GetReseñasByComercioId(id).then((res:any) => setReseñas(res));
      GetNovedadFromComercio(id).then((res:any) => setNovedades(res));
      GetOfertasFromComercio(id).then((res:any) => {setOfertas(res); setIsLoading(false);
      });
    } else {
      GetReseñasByComercioId(2).then((res:any) => setReseñas(res));
      GetNovedadFromComercio(2).then((res:any) => setNovedades(res));
      GetOfertasFromComercio(2).then((res:any) => setOfertas(res));
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
          {wrap ? <CabeceraComercioWrap imagen={comercio?.nombreimagen} nombre={comercio?.nombre} /> : <CabeceraComercio horario={comercio?.horario} imagen={comercio?.imagenNombre} nombre={comercio?.nombre} direccion={comercio?.direccion} descripcion={comercio?.descripcion}/>}
          <NavegacionContenidoComercio reseñas={reseñas} idComercio={id} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} novedades={novedades} ofertas={ofertas}></NavegacionContenidoComercio>
          <View style={styles.absoluteContainer}>
            <AñadirAnuncioButton id={comercio?.id}/>
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
