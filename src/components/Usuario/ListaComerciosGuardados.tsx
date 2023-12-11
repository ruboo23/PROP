import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TicketComercioGuardado from "./TicketComercioGuardado";

export default function ListaComerciosGuardados(comerciosGuardadosList: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection:'row', width: '90%' }}>
        {comerciosGuardadosList.ListaComercios.$values.map((comercio: any, index: number) => (
          <TicketComercioGuardado key={index} Comercio={comercio} />
        ))}
      </View>
    </ScrollView>

  );
}
