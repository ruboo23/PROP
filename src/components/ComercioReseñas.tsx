import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ComercioReseñas() {

  return (
    <View style={styles.screenContainer}>
      <Text>Todavía no tiene reseñas.</Text>
      <Text style={styles.subtitle}>Sé el primero en opinar.</Text>
      <Icon name='arrow-right-bottom' color={'grey'} size={40}></Icon>
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
  subtitle: {
    color: 'grey'
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  }
});
