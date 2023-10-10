import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
import getComercios from "../../../Servicies/ComercioService";
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

export default function FeedComerciosScreen(){
  var data: Comercio[] = [];
  const [comerciosList, setComerciosList] = useState(data);


  useEffect(() => {
    getComercios().then((res:any) => {
    if(res != null || res != undefined){
      data = res.map((item: any) => ({
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
        Web: item.Web
      }));
      setComerciosList(data);
    }
    });
  }, []);

    return (
      <View>
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>Comercios</Text>
          <TicketAnuncioComerciosList ListaAnuncios = {comerciosList}></TicketAnuncioComerciosList>
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
