import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ComercioNovedades from '../../../../../components/Comercio/ComercioNovedades';

export default function AnuncioModal() {

    const ReseñasAnuncioModal = () => {
        return (
            <View></View>
        )
    }

    const NovedadesAnuncioModal = () => {
        return (
            <View></View>
        )
    }

    const Tab = createMaterialTopTabNavigator();
    return(
        <View style={{backgroundColor:"green", flex: 1}}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#eaeaea', height: 50 },
                headerStyle: { backgroundColor: 'transparent' },
                headerTitleStyle: { fontSize: 8 },
                })}
            >
                <Tab.Screen name='novedades' component={NovedadesAnuncioModal}/>
                <Tab.Screen name='Ofertas' component={ReseñasAnuncioModal} />
            </Tab.Navigator>
        </View>
    );

}