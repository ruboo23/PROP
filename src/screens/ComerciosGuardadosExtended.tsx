import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import userSingleton from "../Servicies/GlobalStates/UserSingleton";
import TicketComercioGuardadoExtended from "../components/Comercio/TicketComercioGuardadoExtended";
import { GetUsuarioById } from "../Servicies/UsuarioService/UsuarioServices";

import { useRoute } from "@react-navigation/native";

export default function ComerciosGuardadosExtended() {
  const [comerciosGuardadosList, setComerciosGuardadosList] = useState<any[] | null>(null);

  const route = useRoute();
  const ListaComercios = route.params;

  useEffect(() => {
    // @ts-ignore
    setComerciosGuardadosList(ListaComercios.ListaComercios.$values);
  }, [ListaComercios]);

  const chunkArray = (arr: any, size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, (index + 1) * size)
    );
  };

  const groupedComercios = comerciosGuardadosList ? chunkArray(comerciosGuardadosList, 2) : [];

  return (
    <ScrollView>
      {groupedComercios.map((comercioGroup: any[], groupIndex: number) => (
        <View key={groupIndex} style={{ flexDirection: "row" }}>
          {comercioGroup.map((comercio: any, index: number) => (
            <TicketComercioGuardadoExtended key={index} Comercio={comercio} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
