import { AccessibilityInfo, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsuarioPublicaciones from './UsuarioPublicaciones';
import UsuarioListas from './UsuarioListas';
import UsuarioComercios from './UsuarioComercios';
import IComercio from '../../Interfaces/IComercio';
import { GetReseñasByUsuarioId } from '../../Servicies/ReseñaService/reseñaService';

const Tab = createMaterialTopTabNavigator();

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  comercioObject: IComercio,
}

export default function NavegacionContenidoUsuario(props:any) {
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  useEffect(() => {
    GetReseñasByUsuarioId(props.User.id).then((res) => {
      var reseñasArray : Reseña[] = [];
      res.map((reseña : Reseña, index : Number) => {
        if (reseña.usuario !== undefined) {
        var r : Reseña= {
          usuario: reseña?.usuario,
          comercio: reseña?.comercio,
          descripcion: reseña?.descripcion,
          puntuacion: reseña?.puntuacion,
          titulo: reseña?.titulo,
          nombreimagen: reseña?.nombreimagen,
          fecha: reseña?.fecha,
          comercioObject: reseña?.comercioObject
        }
        reseñasArray.push(r);
      }})
      setReseñas(reseñasArray);
    });
  }, []);

  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            
            let iconName: string = "";
            let colour : string = "black"
            switch (route.name) {
              case "Publicaciones": 
                iconName = "rate-review"
                break;
              case "Listas": 
                iconName = "list-alt"
                break;
              case "Comercios": 
                iconName = "store"
                break;
            }
            if (!focused) {colour = "grey"}
            return <IconO name={iconName} size={25} color={colour} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#eaeaea', height: 66 },
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontSize: 8 },
        })}
      >
        <Tab.Screen name='Comercios'>
          {() => <UsuarioComercios User={props.User}/>}
        </Tab.Screen>
        <Tab.Screen name='Publicaciones'>
          {() => <UsuarioPublicaciones reseñas={reseñas}/>}
        </Tab.Screen>
        <Tab.Screen name='Listas' >
          {() => <UsuarioListas idUsuarioExterno={props.User.id}/>}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  }
});
