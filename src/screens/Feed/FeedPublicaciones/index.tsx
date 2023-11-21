import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketPublicacionesList from "./components/TicketPulicacionesList";
import { GetSeguidosByUserId } from "../../../Servicies/UsuarioService/UsuarioServices";
import userSingleton from "../../../Servicies/GlobalStates/UserSingleton";
import { GetPublicacionesByUserIds } from "../../../Servicies/PublicacionService/PublicacionServices";

export default function FeedPublicacionScreen(props: any){
  const list: any = [];
  const User = userSingleton.getUser();
  const [publicaciones, setPublicaciones] = useState<any>();

  useEffect(() => {
    GetSeguidosByUserId(User?.id).then((res: any) => {
      if(res != null && res != undefined){
       if(res.$values[0].idseguido.$values.length > 0){
        let ids = res.$values[0].idseguido.$values.map((item: any) => (item.id))
        GetPublicacionesByUserIds(ids).then((response: any) => {
          if(response != null && response != undefined){
            if(response.$values != null && response.$values != undefined && response.$values.length > 0){
              let data = response.$values.map((item: any) => ({
                id: item.id,
                usuarioId: item.usuarioObject.id,
                nombre: item.usuarioObject.nombre,
                nombreUsuario: item.usuarioObject.nickname,
                descripcion: item.descripcion,
                nombreimagen: item?.usuarioObject.nombreimagen,
                horaPublicacion: item.fecha
                }))
              setPublicaciones(data);
            }
          }
        });
       }
      }
    })
  }, [])


    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>publicaciones</Text>
          <TicketPublicacionesList 
            ListaPublicaciones = {publicaciones ? publicaciones : list}>
          </TicketPublicacionesList>
        </ScrollView>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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
