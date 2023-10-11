import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ComercioNovedades() {

  return (
    <View style={styles.screenContainer}>
        <Text>Todavía no tiene novedades.</Text>
        <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
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
  });