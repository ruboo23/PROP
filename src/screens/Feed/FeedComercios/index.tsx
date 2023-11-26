import React from "react";
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
import getComercios from "../../../Servicies/ComercioService";
import { GetUsuarioById } from "../../../Servicies/UsuarioService/UsuarioServices";
import { GetAnuncioById} from "../../../Servicies/AnucioService/AnucioService";
import ListaComerciosCercanos from "../../../components/Comercio/ListaComerciosCercanos";
import { LocationObjectType, useGlobalState } from "../../../components/context";

  interface UsuariosProp {
    id: number
  }



export default function FeedComerciosScreen({ id }: UsuariosProp){
  const list: any = [];
  const [chargeState, setChargeState] = useState<boolean>(false);

  const [comerciosCercanosList, setComerciosCercanosList] = useState<any>();
  const [comerciosNovedadesYOfertas, setComerciosNovedadesYOfertas] = useState<any>();
  const [comerciosSeguidosList, SetcomerciosSeguidosList] = useState<any>();

  const [location, setLocation] = useState<LocationObjectType | null>(null);
  const { state } = useGlobalState();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchComercios();
  };

  const handleScroll = ({ nativeEvent }: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const isAtTop = contentOffset.y === 0;

    if (isAtTop) {
      handleRefresh();
    }
  };

  useEffect(() => {
    if(!!location){
      fetchComercios()
    }
  }, [location]);

  const fetchComercios = () => {
    var data: any;
    getComercios().then((res:any) => {
      if(res != null || res != undefined){
        data = res.map((item: any) => ({
          seguidor: 0,
          descripcion: item.descripcion,
          horario: item?.horario,
          id: item.id,
          ImagenNombre: item?.nombreimagen,
          direccion: item.direccion,
          nombre: item.nombre, 
          provincia: item.provincia, 
          telefono: item.telefono,
          tipo_id: item.tipo_id.$values.length > 0 && item.tipo_id.$values[0].nombre != undefined ? item.tipo_id.$values[0].nombre : 'TIPO',
          Latitud: item.latitud,
          Longitud: item.longitud  
        }));
        cargarListaComercios(ListaComerciosCercanos(data, location), true);
      } 
    });
  }

  useEffect(() => {
    if(comerciosCercanosList === undefined || comerciosCercanosList === null){return}
    let ids: any;
    let data: any;
    ids = comerciosCercanosList.map((item: any) => (item.id))
    GetUsuarioById(id).then((res:any) => {
      if(res != null && res != undefined){
        if(res.idcomercio.$values != null && res.idcomercio.$values != undefined){
          data = res.idcomercio.$values.filter(
            (comercio: any) => !ids.includes(comercio.id)
          );
          cargarListaComercios(data, false)
        }
      }
    });
  }, [comerciosCercanosList]);

  const cargarListaComercios = async (comercios: any, isCercanos: boolean) => {
      const listaConNovedadesYOfertas = await Promise.all(
        comercios.map(async (comercio: any) => {
          const ofertas = await GetAnuncioById(comercio.id);
          // Devuelve un nuevo objeto con las novedades y ofertas añadidas
          return { ...comercio, ofertas };
        })
      );
      if(isCercanos){
        if(listaConNovedadesYOfertas != null && listaConNovedadesYOfertas != undefined){
          setComerciosCercanosList(listaConNovedadesYOfertas)
          setRefreshing(false);
        }
      }else{
        if(listaConNovedadesYOfertas != null && listaConNovedadesYOfertas != undefined){
          setComerciosNovedadesYOfertas(listaConNovedadesYOfertas);
        }
      }
    };

  useEffect(() => {
    if(comerciosNovedadesYOfertas == undefined || comerciosNovedadesYOfertas == null){return}
    let data = comerciosNovedadesYOfertas;
    data = data.filter(
      (comercio: any) => 
                         comercio.ofertas?.length > 0 
    );
    if(data != null && data != undefined){
      data = data.map((item: any) => ({
      novedades: item.novedades,
      ofertas: item.ofertas,
      seguidor: 1,
      descripcion: item.descripcion,
      horario: item?.horario,
      id: item.id,
      ImagenNombre: item?.nombreimagen,
      direccion: item.direccion,
      nombre: item.nombre, 
      provincia: item.provincia, 
      telefono: item.telefono,
      tipo_id: item.tipo_id.$values.length > 0 && item.tipo_id.$values[0].nombre != undefined ? item.tipo_id.$values[0].nombre : 'TIPO',
      Latitud: item.latitud,
      Longitud: item.longitud 
      }))
    }
    SetcomerciosSeguidosList(data);
  }, [comerciosNovedadesYOfertas]);

  useEffect(() => {
    setLocation({ latitude: state?.coordinates?.latitude, longitude: state?.coordinates?.longitude });
  }, [state.coordinates]);
    return (
      <View style={styles.ventana}>
        <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        >
          <View style={{flexDirection: "row", alignSelf: "center", justifyContent:"center"}}>
          </View>
          
            <TicketAnuncioComerciosList
              ListaAnunciosCercanos = {comerciosCercanosList ? comerciosCercanosList : list}
              ListaAnunciosSeguidos = {comerciosSeguidosList ? comerciosSeguidosList : list}>
            </TicketAnuncioComerciosList>
        </ScrollView>
      </View>
      );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  ventana: {
    height: '100%',
    paddingTop: 30,
    overflow: 'hidden'
  },
  addButton: {
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
});
