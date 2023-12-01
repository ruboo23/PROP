import React, { useEffect, useState } from "react";
import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants'
import TicketAnuncioComercio from "../../screens/Feed/FeedComercios/components/TicketAnuncioComercios";

export default function TicketListaComerciosGuardados(props: any){
  useEffect(()=>{
    console.log("prueba: "+ JSON.stringify(props.$values[3]));
  }, [])
    return(
        <View></View>
    )
}