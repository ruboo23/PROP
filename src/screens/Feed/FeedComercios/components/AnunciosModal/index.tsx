import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Modal, Pressable, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Novedad from '../../../../../components/Comercio/Anuncios/Novedad/Novedad';

export default function AnuncioModal(props: any) {
    const [modalVisible, setModalVisible] = useState(false)
    const [imagenSeleccionada, setImagenSeleccionada] = useState('')

    function cerrarVentana() { setModalVisible(false) }

    const NovedadesAnuncioModal = () => {
        return (
            <View style={ styles.screenContainer }>
                {props.ofertas.length > 0 ? 
                <ScrollView style={styles.scroll} >
                    {props.ofertas.map((novedad : any, index : number) => (
                        <Novedad key={index} fecha={novedad.fecha} setImagenSeleccionada={(a:string) => setImagenSeleccionada(a)} imagenSeleccionada={imagenSeleccionada} close={cerrarVentana} imagenesNombre={novedad.imagenes} titulo={novedad.titulo} desc={novedad.descripcion} visibilidad={modalVisible} setVisibilidad={setModalVisible}></Novedad>
                    ))} 
                </ScrollView>
                :
                    <View style={styles.screenContainer}>
                        <Text>Todavía no tiene novedades.</Text>
                        <Text style={styles.subtitle}>Sé el primero en añadir.</Text>
                     </View>
                }
                </View>
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
                <Tab.Screen name='anuncios' component={NovedadesAnuncioModal}/>
            </Tab.Navigator>
        </View>
    );

}

const styles = StyleSheet.create({
    scroll: {
      
    },
    screenContainer: {
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    subtitle: {
      color: 'grey',
    },
  });