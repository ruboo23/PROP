import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TicketComercioGuardado from "./TicketComercioGuardado";

export default function ListaComerciosGuardados(comerciosGuardadosList: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: 'white'}}>
      <View style={{ flexDirection: 'row', width: '90%' }}>
        {comerciosGuardadosList.ListaComercios.$values.length == 0 ?
          <View style={{ width: 400, paddingLeft: 15, paddingTop: 90}}>
            <Text style={{ color: 'grey', fontWeight: '300'}}>No hay ningún comercio guardado.</Text>
          </View>
          :
          <>
            {comerciosGuardadosList?.ListaComercios.$values.map((comercio: any, index: number) => (
              <TicketComercioGuardado key={index} Comercio={comercio} />
            ))}
          </>
        }
      </View>
    </ScrollView>

  );
}
