import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';



const ListaPortada = ({Item, Nombre, Index, Descripcion, Autor, AbrirLista, EliminarLista, Externa }: any) => {
  return (
    <TouchableOpacity
      onPress={()=> {AbrirLista(Item)}}
    >
      <View style={{
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 7,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 8,
        width: Externa? "96%" : "108%",
        height: Externa? 240 : 220
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{Nombre}</Text>
        <View style={{ alignItems: 'flex-start', width: '100%', flexDirection: 'row', }}>
          <Icon name='place' size={15} color='#888dc7'></Icon>
          <Text style={{ marginLeft: 5, fontWeight: '300', fontSize: 12 }}>Ruzafa</Text>
        </View>
        <View style={{ alignItems: 'flex-start', width: '100%', flexDirection: 'row', }}>
          <Icon name='schedule' size={15} color='#888dc7'></Icon>
          <Text style={{ marginLeft: 5, fontWeight: '300', fontSize: 12 }}>Duracion estimada: 3 horas</Text>
        </View>
        
        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 12, width: 134, height: Externa? 80 : "90%" }}>{Descripcion}</Text>
        {Externa ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '86%' }}>
            <Text style={{ fontSize: 12, color: '#888dc7' }}>By @{Autor}</Text>
            <TouchableOpacity>
              <Icon name='favorite' size={15} color='#888dc7'></Icon>
            </TouchableOpacity>
          </View> : 
          <></>}

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 2,
    width: '50%',
    height: '100%',
  },
  image: {
    height: 150,
  },
  text: {

    fontSize: 16,
    backgroundColor: 'grey'
  }
});

export default ListaPortada;