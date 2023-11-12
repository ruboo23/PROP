import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListaPortada = ({Nombre, Index, Imagen, AbrirLista, EliminarLista}:any) => {
  return (
    <TouchableOpacity style={[
      {
          borderColor: "grey",
          borderRadius: 5,
          borderWidth: 2,
          width: '100%',
          height: '100%',
          
      },
      Index % 2 === 0
      ? {

      } : {

      }
    ]}
    onPress={() => AbrirLista(Index)}
    onLongPress={() => EliminarLista(Index)}
    >
    <View >
      <Image
        source={{ uri: Imagen == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" :"https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Listas/"+Imagen }}
        style={styles.image}
      />
      <Text style={styles.text}>{Nombre}</Text>
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