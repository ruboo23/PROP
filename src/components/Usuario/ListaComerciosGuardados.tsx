import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TicketComercioGuardado from "./TicketComercioGuardado";

export default function ListaComerciosGuardados( comerciosGuardadosList : any) {
  return (
    comerciosGuardadosList.ListaComercios.$values.map((comercio: any, index: number) => (
        <TicketComercioGuardado key = {index} Comercio = {comercio}></TicketComercioGuardado>
    ))
  );
}
