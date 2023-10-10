import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketPublicaciones from "./components/TicketPublicaciones";
import FeedPrincipalScreen from "..";
import TicketPublicacionesList from "./components/TicketPulicacionesList";
interface Comercio {
  id: number,
  nombre: string,
  nombreUsuario: String,
  descripcion: string,
  imagenNombre: string,
  horaPublicacion: String
}
const ejemploTicket: Comercio[] = [
  {
    id: 1,
    nombre: "Pablo",
    nombreUsuario: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    imagenNombre: "imagen1.jpg",
    horaPublicacion: "10:00 AM",
  },
  {
    id: 2,
    nombre: "Jesus",
    nombreUsuario: "@jesuin",
    descripcion: "Las mejores prendas de vestir al mejor precio, im on fashion",
    imagenNombre: "imagen2.jpg",
    horaPublicacion: "11:30 AM",
  },
  {
    id: 3,
    nombre: "Estela",
    nombreUsuario: "@estelita014",
    descripcion: "Podeis creer lo bueno que es comprar aldo de tu casa y ni sabia que se podia",
    imagenNombre: "imagen3.jpg",
    horaPublicacion: "12:45 PM",
  },
  {
    id: 4,
    nombre: "Pablo",
    nombreUsuario: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    imagenNombre: "imagen1.jpg",
    horaPublicacion: "10:00 AM",
  },
  {
    id: 5,
    nombre: "Jesus",
    nombreUsuario: "@jesuin",
    descripcion: "Las mejores prendas de vestir al mejor precio, im on fashion",
    imagenNombre: "imagen2.jpg",
    horaPublicacion: "11:30 AM",
  },
  {
    id: 6,
    nombre: "Estela",
    nombreUsuario: "@estelita014",
    descripcion: "Podeis creer lo bueno que es comprar aldo de tu casa y ni sabia que se podia",
    imagenNombre: "imagen3.jpg",
    horaPublicacion: "12:45 PM",
  },
];

export default function FeedPublicacionScreen(){
    return (
      <View>
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>publicaciones</Text>
          <TicketPublicacionesList ListaPublicaciones = {ejemploTicket}></TicketPublicacionesList>
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
