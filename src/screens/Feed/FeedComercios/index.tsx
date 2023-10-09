import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
interface Comercio {
  id: number,
  nombreComercio: string,
  nombreUsuarioComercio: String,
  descripcion: string,
  imagenNombre: string,
  horaPublicacion: String
}
const ejemploTicket: Comercio[] = [
  {
    id: 1,
    nombreComercio: "Pablo",
    nombreUsuarioComercio: "@pablooo.b",
    descripcion: "Una locura, moltes gracies :)",
    imagenNombre: "imagen1.jpg",
    horaPublicacion: "10:00 AM",
  },
  {
    id: 2,
    nombreComercio: "Jesus",
    nombreUsuarioComercio: "@jesuin",
    descripcion: "Las mejores prendas de vestir al mejor precio, im on fashion",
    imagenNombre: "imagen2.jpg",
    horaPublicacion: "11:30 AM",
  },
  {
    id: 3,
    nombreComercio: "Estela",
    nombreUsuarioComercio: "@estelita014",
    descripcion: "Podeis creer lo bueno que es comprar aldo de tu casa y ni sabia que se podia",
    imagenNombre: "imagen3.jpg",
    horaPublicacion: "12:45 PM",
  },
];

export default function FeedComerciosScreen(){
    return (
      <View>
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>Comercios</Text>
          <TicketAnuncioComerciosList ListaAnuncios = {ejemploTicket}></TicketAnuncioComerciosList>
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
