import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';

export default function PerfilUsuario() {

    return (
      <View style={styles.ventana}>
        <CabeceraUsuario ImagenName ={""} Nickname={"Ruben"} NumSeguidores={"10"} NumSeguidos={"30"}/>
        <NavegacionContenidoUsuario />
      </View>
    );
}

const styles = StyleSheet.create({
    ventana: {
      height: '100%'
    },
});