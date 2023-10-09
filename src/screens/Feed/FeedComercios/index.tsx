import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketAnuncioComerciosList from "./components/TicketAnuncioComerciosList";
interface Comercio {
  id: number,
  nombreComercio: string,
  tipoComercio: String,
  descripcion: string,
  ranking: String,
  imagenNombre: string,
}
const ejemploTicket: Comercio[] = [
  {
    id: 1,
    nombreComercio: "Pablo",
    tipoComercio: "Fruteria",
    descripcion: "las mejores furtas garantizadas",
    ranking: "4,3/5",
    imagenNombre: "imagen1.jpg",
  },
  {
    id: 2,
    nombreComercio: "Jesus",
    tipoComercio: "Bar/Resturante",
    descripcion: "Los mejores chivitos garantizados",
    ranking: "3,2/5",
    imagenNombre: "imagen2.jpg",
  },
  {
    id: 3,
    nombreComercio: "Estela",
    tipoComercio: "Panaderia",
    descripcion: "El mejor pan garantizado",
    ranking: "4,3/5",
    imagenNombre: "imagen3.jpg",
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
