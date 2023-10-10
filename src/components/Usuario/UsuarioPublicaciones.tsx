import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function UsuarioPublicaciones() {
  return (
    <View style={styles.screenContainer}>
      <Text>Todavía no has publicado.</Text>
      <Text style={styles.subtitle}>Publica algo o añade una reseña.</Text>
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
