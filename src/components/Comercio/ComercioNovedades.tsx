import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ComercioNovedades() {

  return (
<View style={styles.screenContainer}>
    <Text>Todavía no tiene novedades.</Text>
    <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
    <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton}>
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