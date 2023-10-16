import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
import getComercios from "../../../Servicies/ComercioService";
import { useRoute } from "@react-navigation/native";
import { GetUsuarioById } from "../../../Servicies/UsuarioService/ususarioService";

interface Comercio {
				Descripcion: String
        Facebook?: String, 
				Horario?: String, 
				Id: 3,
				ImagenNombre: String, 
				Instagram?: String, 
				Mail?: String, 
				Nombre: String, 
				Provincia: String, 
				Telefono?: number, 
				Tipo: [Object], 
				Web?: String
}

interface UsuarioLogeado {
  Id: number;
}

const ejemploUssuarioLogeado: UsuarioLogeado = 
  {
    Id: 1,
  };



export default function FeedComerciosScreen(props: any){
  var datos: any[] = [];
  const [comerciosList, setComerciosList] = useState(datos);
  const [comerciosIdList, setComerciosIdList] = useState(datos);
  const [comerciosSeguidosList, SetcomerciosSeguidosList] = useState(datos);
  const [comerciosCombinados, setComerciosCombinados] = useState(datos);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    let data: any;
    let ids: any;
    getComercios().then((res:any) => {
      if(res != null || res != undefined){
        ids = res.map((item: any) => (item.Id))
        datos = res.map((item: any) => ({
          Seguidor: 0,
          Descripcion: item.Descripcion,
          Facebook: item?.Facebook,
          Horario: item?.Horario,
				  Id: item.Id,
			  	ImagenNombre: item.ImagenNombre, 
          Instagram: item?.Instagram,
          Mail: item?.Mail,
			  	Nombre: item.Nombre, 
			  	Provincia: item.Provincia, 
          Telefono: item.Telefono,
			  	Tipo: "falta impplementar el tipo", 
          Web: item.Web,
          Anuncio: item.IdAnuncio.$values
        }));
        setComerciosList(datos);
        setIsLoading(false);
      }

      GetUsuarioById(ejemploUssuarioLogeado.Id).then((res:any) => {
        if(res != null && res != undefined){
          if(res.IdComercio.$values != null && res.IdComercio.$values != undefined){
            data = res.IdComercio.$values.filter(
              (comercio: any) => comercio.IdAnuncio.$values !== null 
                                  && comercio.IdAnuncio.$values !== undefined 
                                  && comercio.IdAnuncio.$values !== 0
                                  && !ids.includes(comercio.Id)
                                  );
            if(data != null && data != undefined){
              data.map((item: any) => ({
                Seguidor: 1,
                Descripcion: item.Descripcion,
                Facebook: item?.Facebook,
                Horario: item?.Horario,
                Id: item.Id,
                ImagenNombre: item.ImagenNombre, 
                Instagram: item?.Instagram,
                Mail: item?.Mail,
                Nombre: item.Nombre, 
                Provincia: item.Provincia, 
                Telefono: item.Telefono,
                Tipo: "falta impplementar el tipo", 
                Web: item.Web,
                Anuncio: item.IdAnuncio.$values
              }))
              SetcomerciosSeguidosList(data);
          }
        }
        }
      });
    });
  }, []);

  useEffect(() => {
    const conjunto = new Set(comerciosList.concat(comerciosSeguidosList));

  }, [comerciosList, comerciosSeguidosList]);

    return (
      <View style={styles.ventana}>
        {isLoading 
        ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/loading.gif')}
            style={{ height: 80, width: 80 }}
          />        
          </View>
          :
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", marginBottom: 10}}>Comercios</Text>
          <TicketAnuncioComerciosList
            ListaAnuncios = {comerciosList.concat(comerciosSeguidosList)}>
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
