import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import userSingleton from "../Servicies/GlobalStates/UserSingleton";
import TicketComercioGuardadoExtended from "../components/Comercio/TicketComercioGuardadoExtended";



export default function ComerciosGuardadosExtended() {
  const [comerciosGuardadosList, setComerciosGuardadosList] = useState<any>(
    userSingleton.getUser()?.idcomercio
  );

  useEffect(() => {
    console.log('Comercios Guardados: ' + comerciosGuardadosList.$values[1].nombre);
  }, []);

  const chunkArray = (arr: any, size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, (index + 1) * size)
    );
  };

  const groupedComercios = chunkArray(comerciosGuardadosList.$values, 2);

  return (
    <ScrollView>
      {groupedComercios.map((comercioGroup: any[], groupIndex: number) => (
        <View key={groupIndex} style={{ flexDirection: "row" }}>
          {comercioGroup.map((comercio: any, index: number) => (
            <TicketComercioGuardadoExtended key={index} Comercio={comercio}   />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
