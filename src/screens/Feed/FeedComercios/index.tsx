import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
import getComercios from "../../../Servicies/ComercioService";
import { useRoute } from "@react-navigation/native";
import { GetUsuarioById } from "../../../Servicies/UsuarioService/UsuarioServices";
import { GetNovedadFromComercio, GetOfertasFromComercio } from "../../../Servicies/AnucioService/AnucioService";
import TicketAnuncioComercio from "./components/TicketAnuncioComercios";
import ListaComerciosCercanos from "../../../components/Comercio/ListaComerciosCercanos";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LocationObjectType, useGlobalState } from "../../../components/context";

interface UsuarioLogeado {
  Id: number;
}

const ejemploUssuarioLogeado: UsuarioLogeado = 
  {
    Id: 1,
  };

  interface UsuariosProp {
    id: number
  }



export default function FeedComerciosScreen({ id }: UsuariosProp){
  const list: any = [];
  const [chargeState, setChargeState] = useState<boolean>(false);

  const [comerciosCercanosList, setComerciosCercanosList] = useState<any>();
  const [comerciosNovedadesYOfertas, setComerciosNovedadesYOfertas] = useState<any>();
  const [comerciosSeguidosList, SetcomerciosSeguidosList] = useState<any>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [location, setLocation] = useState<LocationObjectType | null>(null);
  const { state } = useGlobalState();

  useEffect(() => {
    if(location == null || location == undefined){return}
    fetchComercios()
  }, [location])

  const fetchComercios = () => {
    setIsLoading(true);
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
        data = ListaComerciosCercanos(data, location);
        cargarListaComercios(data, true);
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
          const novedades = await GetNovedadFromComercio(comercio.id);
          const ofertas = await GetOfertasFromComercio(comercio.id);
          // Devuelve un nuevo objeto con las novedades y ofertas añadidas
          return { ...comercio, novedades, ofertas };
        })
      );
      if(isCercanos){
        if(listaConNovedadesYOfertas != null && listaConNovedadesYOfertas != undefined){
          setComerciosCercanosList(listaConNovedadesYOfertas)
          setIsLoading(false);
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
      (comercio: any) => comercio.novedades.length > 0 
                        && comercio.ofertas.length > 0 
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
        {isLoading || chargeState
        ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/loading.gif')}
            style={{ height: 80, width: 80 }}
          />        
          </View>
          :
        <ScrollView>
          <View style={{flexDirection: "row", alignSelf: "center"}}>
            <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", marginBottom: 10}}>Comercios</Text>
            <TouchableOpacity style={{marginHorizontal: 10, alignSelf:"center", justifyContent: "space-between"}} onPress={fetchComercios}>
                      <FontAwesome name="refresh" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <TicketAnuncioComerciosList
            ListaAnunciosCercanos = {comerciosCercanosList ? comerciosCercanosList : list}
            ListaAnunciosSeguidos = {comerciosSeguidosList ? comerciosSeguidosList : list}>
          </TicketAnuncioComerciosList>
        </ScrollView>
        }
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
