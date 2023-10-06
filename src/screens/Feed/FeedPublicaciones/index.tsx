import React from "react";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import TicketPublicaciones from "./components/TicketPublicaciones";
import FeedPrincipalScreen from "..";
export default function FeedPublicacionScreen(){
    const [PublicationList, setPublicationList] = useState();

    return (
        <ScrollView>
         
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>publicaciones</Text>
          <TicketPublicaciones></TicketPublicaciones>
          <TicketPublicaciones></TicketPublicaciones>
          <TicketPublicaciones></TicketPublicaciones>
          <TicketPublicaciones></TicketPublicaciones>
          <TicketPublicaciones></TicketPublicaciones>
          <TicketPublicaciones></TicketPublicaciones>
        </ScrollView>
      );
}