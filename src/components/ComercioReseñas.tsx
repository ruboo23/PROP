import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';


export default function ComercioReseñas() {

  return (
    <View style={styles.screenContainer}>
      <Text>Todavía no tiene reseñas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    height: 200,
    backgroundColor: 'black'
    
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  }
});
