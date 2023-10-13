import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View, } from 'react-native';
import { useEffect } from 'react';

export default function ComercioNovedades(props: any) {

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