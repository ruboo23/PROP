import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import CabeceraUsuario from '../components/Usuario/UsuarioCabecera';
import {CabeceraUsuarioWrap} from '../components/Usuario/UsuarioCabeceraWrap';

import NavegacionContenidoUsuario from '../components/Usuario/UsuarioNavegacionContenido';

export default function PerfilUsuario() {
  const [wrap, setWrap] = useState(false);

  const scrollWrap = () => {
    if (!wrap) { 
      setWrap(true);
    }
  }
  const scrollUnWrap = () => {
      setWrap(false);
  }

    return (
      <View style={styles.ventana}>
        {wrap ? <CabeceraUsuarioWrap imagenNombre={"avatarPred.png"} Nickname={"Ruben"}></CabeceraUsuarioWrap>: <CabeceraUsuario ImagenName ={""} Nickname={"Ruben"} NumSeguidores={"10"} NumSeguidos={"30"}/>}
        <NavegacionContenidoUsuario scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap}/>
      </View>
    );
}

const styles = StyleSheet.create({
    ventana: {
      height: '100%',
      paddingTop: 20
    }
});