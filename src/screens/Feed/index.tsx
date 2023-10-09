import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedPublicacionScreen from './FeedPublicaciones';
import FeedComerciosScreen from './FeedComercios';

const Tab = createMaterialTopTabNavigator();

export default function FeedPrincipalScreen(){
    return (
        <NavigationContainer independent={true}>
          
          <Tab.Navigator screenOptions = {({ route }) => ({
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#eaeaea', borderRadius: 50, marginHorizontal: 75 ,marginTop: 10,  height: 40},
            headerStyle: { backgroundColor: 'transparent' },
            headerTitleStyle: { fontSize: 10 },
          })}
        >
          <Tab.Screen name='Comercios' component={FeedComerciosScreen}/>
          <Tab.Screen name='Publicaciones' component={FeedPublicacionScreen} />
        </Tab.Navigator>
        
      </NavigationContainer>
    );
}