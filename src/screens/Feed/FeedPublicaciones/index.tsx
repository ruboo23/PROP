import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketPublicaciones from "./components/TicketPublicaciones";
import FeedPrincipalScreen from "..";
import TicketPublicacionesList from "./components/TicketPulicacionesList";
import { GetAllUsuarios } from "../../../Servicies/UsuarioService/UsuarioServices";
interface Comercio {
  id: number,
  nombre: string,
  nombreUsuario: String,
  descripcion: string,
  nombreimagen: string,
  horaPublicacion: String
}
const ejemploTicket: Comercio[] = [
  {
    id: 1,
    nombre: "Estela",
    nombreUsuario: "@estelita014",
    descripcion: "Podeis creer lo bueno que es comprar aldo de tu casa y ni sabia que se podia",
    nombreimagen: "Estelaaa",
    horaPublicacion: "12:45 PM",
  },
  {
    id: 2,
    nombre: "Pablo",
    nombreUsuario: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    nombreimagen: "Martinrcv",
    horaPublicacion: "10:00 AM",
  }
];

export default function FeedPublicacionScreen(props: any){
  useEffect(() => {
      GetAllUsuarios().then((res: any) => {
        
      });
  }, [])
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>publicaciones</Text>
          <TicketPublicacionesList 
            ListaPublicaciones = {ejemploTicket}>
          </TicketPublicacionesList>
        </ScrollView>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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
