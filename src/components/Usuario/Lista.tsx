import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ListaPortada = ({Nombre, Index}:any) => {
  return (
    <View style={[
        {
            borderColor: "grey",
            borderRadius: 5,
            borderWidth: 2,
            width: '49.4%',
            height: '100%',
        },
        Index % 2 === 0
        ? {
          marginRight: 2,
        } : {
          marginLeft: 2
        }
      ]}>
      <Image
        source={{ uri: "https://www.civitatis.com/blog/wp-content/uploads/2020/10/centro-valencia.jpg" }}
        style={styles.image}
      />
      <Text style={styles.text}>{Nombre}</Text>
    </View>
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