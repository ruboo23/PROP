import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import VistaReseña from "./VistaReseña";


export default function ListaReseñas(){
    const [PublicationList, setPublicationList] = useState();

    return (
        <ScrollView>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
          <VistaReseña></VistaReseña>
        </ScrollView>
      );
}