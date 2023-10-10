import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function UsuarioPublicaciones(props:any) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // Calcula la diferencia entre la posición actual y la anterior
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      props.scrollWrap();
    } else if (scrollDifference < 0) {
      // El ScrollView está subiendo
      props.scrollUnWrap();
    } else {

    }
    setScrollY(currentY);
  }

  return (
    <View style={styles.screenContainer}>
      {props.publicaciones ? 
      <Text>Todavía no has publicado.</Text>
      :
      <ScrollView onScrollEndDrag={handleScroll}>
        
      </ScrollView>
      }
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
