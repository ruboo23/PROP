import react from 'react';
import { StyleSheet, View,Image, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgXml } from "react-native-svg";

export default function Metrics() {
  const route = useRoute();
  return (
    <ScrollView >
      <View style={styles.ventana}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Puntuación promedio:
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon name={'star'} size={28} color={'gold'} style={{marginRight: 4}}/>
            <Text style={{fontSize: 18}}>
              4.6
            </Text>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.smallCard}>
            <Text style={styles.title}>
              Reseñas:
            </Text>
            <Text style={styles.subTitle}>
              14
            </Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.title}>
              Novedades:
            </Text>
            <Text style={styles.subTitle}>
              5
            </Text>
          </View>
        </View>
        <View style={{...styles.card, marginTop: 0}}>
          <Text style={styles.title}>
            Clicks en el perfil en el último mes:
          </Text>
          <Image
            style={{width: "100%", height: 200}}
            source={require('../../assets/interestedUsers.png')}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>
            Ventas en el último mes:
          </Text>
          <Image
            style={{width: "96%", height: 200}}
            source={require('../../assets/ventas.png')}
          />
        </View>
        {/* 
         */}

         {/* use the svg and title the chart as: "Género de usuarios interesados:" */}

        <View style={{...styles.card, marginBottom: 40}}>
          <Text style={styles.title}>
            Género de usuarios interesados:
          </Text>
          <Image
            style={{width: "70%", height: 300, marginTop: 10}}
            source={require('../../assets/gender.png')}
          />
        </View>
    </View>
  </ScrollView>
    );
}

const styles = StyleSheet.create({
  ventana: {
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#eaeaea',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'black', 
    borderWidth: 1,
  },
  smallCard: {
    backgroundColor: '#eaeaea',
    width: '50%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    borderColor: 'black', 
    borderWidth: 1,
  },
  cardsContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
});
