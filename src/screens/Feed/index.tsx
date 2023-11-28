import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedPublicacionScreen from './FeedPublicaciones';
import FeedComerciosScreen from './FeedComercios';

import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();

export type RootStackParamList = {
  Perfil: { id: number } | undefined;
};

export default function FeedPrincipalScreen(){
    
  
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <Tab.Navigator screenOptions = {({ route }) => ({
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#eaeaea', borderRadius: 50, marginHorizontal: 75 ,marginTop: 10,  height: 40},
            headerStyle: { backgroundColor: 'transparent' },
            headerTitleStyle: { fontSize: 10 },
          })}
        >
          <Tab.Screen name='Posts' component={FeedPublicacionScreen}/>
          <Tab.Screen name='Para ti'>
            {() => 
                // @ts-ignore
                <FeedComerciosScreen id={userSingleton.getUser()?.id} 
                />}
            </Tab.Screen>
          
        </Tab.Navigator>
    );
}