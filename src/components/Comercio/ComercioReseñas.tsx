import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import ListaReseñas from './ListaReseñas';

interface ComercioReseñasProps {
  scrollWrap: () => void;
  scrollUnWrap: () => void;
}

export default function ComercioReseñas({ scrollWrap, scrollUnWrap } : ComercioReseñasProps) {
  const navigation = useNavigation()

  return (
    <View style={styles.screenContainer}>
      <ListaReseñas scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}></ListaReseñas>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
   // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  subtitle: {
    color: 'grey',
  },
});
