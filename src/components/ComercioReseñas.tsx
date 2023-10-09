import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PruebasPeticiones from '../Servicies/PruebasPeticiones'
import ListaReseñas from './ListaReseñas';

export default function ComercioReseñas() {
  const navigation = useNavigation()
  return (
    <View style={styles.screenContainer}>
      <ListaReseñas></ListaReseñas>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  screenContainer: {
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
