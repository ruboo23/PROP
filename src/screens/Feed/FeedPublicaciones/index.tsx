import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TicketPublicacionesList from "./components/TicketPulicacionesList";
import { GetSeguidosByUserId } from "../../../Servicies/UsuarioService/UsuarioServices";
import userSingleton from "../../../Servicies/GlobalStates/UserSingleton";
import { GetPublicacionesByUserIds } from "../../../Servicies/PublicacionService/PublicacionServices";
import AñadirPublicacionButton from '../../../components/publicacion/AñadirPublicacion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function FeedPublicacionScreen(props: any){
  const list: any = [];
  const User = userSingleton.getUser();
  const [publicaciones, setPublicaciones] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  function fetchData(){
    setIsLoading(true);
    GetSeguidosByUserId(User?.id).then((res: any) => {
      if(res != null && res != undefined){
       if(res.$values[0].idseguido.$values.length > 0){
        let ids = res.$values[0].idseguido.$values.map((item: any) => (item.id))
        let seguidos = res.$values[0].idseguido.$values;
        GetPublicacionesByUserIds(ids).then((response: any) => {
          if(response != null && response != undefined){
            if(response.$values != null && response.$values != undefined && response.$values.length > 0){
              let data = response.$values.map((item: any) => ({
                id: item.publicacionId,
                usuarioId: item.usuarioId,
                comercioId: item.comercioId,
                nombre: item.nombre,
                nombreUsuario: item.nickname,
                nombreComercio: item.nombreComercio,
                descripcion: item.descripcion,
                nombreimagenusuario: item?.nombreimagenusuario,
                nombreimagenpublicacion: item?.nombreimagenpublicacion,
                horaPublicacion: item.fecha,
                titulo: item.titulo
                }))
              setIsLoading(false);
              setPublicaciones(data);
            }else{
              setIsLoading(false);
              setPublicaciones([]);
            }
          }
        });
       }else{
          setIsLoading(false);
          setPublicaciones([]);
       }
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])


    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{flexDirection: "row", alignSelf: "center", justifyContent:"center"}}>
            <Text style = {{fontWeight: 'bold', fontSize: 30, textAlign: "center", margin: 10}}>publicaciones</Text>
            {
                (isLoading) 
              ?
                <Image source={require('../../../../assets/loading.gif')} style={{ height: 30, width: 30, marginHorizontal: 10, alignSelf:"center", justifyContent: "space-between"}}/>
              :
                <TouchableOpacity style={{marginHorizontal: 10, alignSelf:"center", justifyContent: "space-between"}} onPress={fetchData}>
                          <FontAwesome name="refresh" size={24} color="grey" />
                </TouchableOpacity>
              }
          </View>
          <TicketPublicacionesList 
            ListaPublicaciones = {publicaciones ? publicaciones : list}>
          </TicketPublicacionesList>
        </ScrollView>
        <View style={styles.addButtonContainer}>
          <View style={styles.absoluteContainer}>
          <AñadirPublicacionButton user={User}/>
          </View>
        </View>
      </View>
      );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
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
