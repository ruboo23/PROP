import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ListaPortada from './Lista';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function UsuarioListas() {
  const [Tienelista, setTieneLista] = useState(true)
  const [listas, setListas] = useState(["Valencia", "Barcelona", "Madrid", "Comida", "Cena", "Carnicerias", "meriendas", "LÑAKSHD"])
  return (
    
    <View style={styles.screenContainerFlatList}>
     { !Tienelista ?
     <View style={styles.screenContainerText}>
     <Text>No tienes listas añadidas</Text>
     <Text style={styles.subtitle}>Añade una ayudandote del boton inferior.</Text>
     </View>
     : 
      <FlatList 
        data={listas} 
        numColumns={2} 
        renderItem={({item, index}) => <ListaPortada Nombre={item} Index={index}/>}
        ItemSeparatorComponent={() => <View style={{height: 5, width: 10}} />}
        />
     }
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainerFlatList: {
    flex: 1,
    paddingTop: 20, 
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  screenContainerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  subtitle: {
    color: 'grey',
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
