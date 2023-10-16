import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketPublicaciones from "./components/TicketPublicaciones";
import FeedPrincipalScreen from "..";
import TicketPublicacionesList from "./components/TicketPulicacionesList";
interface Comercio {
  Id: number,
  nombre: string,
  nombreUsuario: String,
  descripcion: string,
  imagenNombre: string,
  horaPublicacion: String
}
const ejemploTicket: Comercio[] = [
  {
    Id: 1,
    nombre: "Ruben Garcia Rodrigo",
    nombreUsuario: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    imagenNombre: "imagen1.jpg",
    horaPublicacion: "10:00 AM",
  },
  {
    Id: 3,
    nombre: "Jesus",
    nombreUsuario: "@jesuin",
    descripcion: "Las mejores prendas de vestir al mejor precio, im on fashion",
    imagenNombre: "imagen2.jpg",
    horaPublicacion: "11:30 AM",
  },
  {
    Id: 7,
    nombre: "Estela",
    nombreUsuario: "@estelita014",
    descripcion: "Podeis creer lo bueno que es comprar aldo de tu casa y ni sabia que se podia",
    imagenNombre: "imagen3.jpg",
    horaPublicacion: "12:45 PM",
  },
  {
    Id: 4,
    nombre: "Pablo",
    nombreUsuario: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    imagenNombre: "imagen1.jpg",
    horaPublicacion: "10:00 AM",
  }
];

export default function FeedPublicacionScreen(props: any){
    return (
      <View>
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
