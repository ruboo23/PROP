import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView,Image, StyleSheet, Text, View, RefreshControl } from 'react-native';
import TicketPublicacionesList from "./components/TicketPulicacionesList";
import { GetSeguidosByUserId } from "../../../Servicies/UsuarioService/UsuarioServices";
import userSingleton from "../../../Servicies/GlobalStates/UserSingleton";
import { GetPublicacionesByUserIds } from "../../../Servicies/PublicacionService/PublicacionServices";
import AñadirPublicacionButton from '../../../components/publicacion/AñadirPublicacion';

export default function FeedPublicacionScreen(props: any){
  const list: any = [];
  const User = userSingleton.getUser();
  const [publicaciones, setPublicaciones] = useState<any>();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };


  function fetchData(){
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
                nombre: item.nombreUsuario,
                nombreUsuario: item.nickname,
                nombreComercio: item.nombreComercio,
                descripcion: item.descripcion,
                nombreimagenusuario: item?.nombreimagenusuario,
                nombreimagenpublicacion: item?.nombreimagenpublicacion,
                horaPublicacion: item.fecha,
                titulo: item.titulo
                }))
              setRefreshing(false);
              setPublicaciones(data);
            }else{
              setRefreshing(false);
              setPublicaciones([]);
            }
          }
        });
       }else{
          setRefreshing(false);
          setPublicaciones([]);
       }
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleScroll = ({ nativeEvent }: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
    const isAtTop = contentOffset.y === 0;

    if (isAtTop) {
      handleRefresh();
    }
  };
    return (
      <View style={{flex: 1}}>
        <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        >
          <View style={{flexDirection: "row", alignSelf: "center", justifyContent:"center"}}>
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
