import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsuarioPublicaciones from './UsuarioPublicaciones';
import UsuarioListas from './UsuarioListas';
import IComercio from '../../Interfaces/IComercio';
import { GetReseñasByUsuarioId } from '../../Servicies/ReseñaService/reseñaService';

const width : number = Dimensions.get('window').width;
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
  isLoggedUser?: boolean 
}

export default function NavegacionContenidoUsuario(props:any) {
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [cargando, setCargando] = useState(true);

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
      setCargando(false);
    });
  }, []);

  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({       
          tabBarAllowFontScaling: true,
          tabBarStyle: { 
            marginBottom: 10,
            backgroundColor: 'white',
            height: 40,
            shadowColor: 'transparent',
            
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{flex:1 ,justifyContent:"center"}}>
                {route.name == "Publicaciones" && 
                  <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black', marginLeft:20}] : {marginLeft:20}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                }
                {route.name == "Listas" && 
                <TouchableOpacity style={[ styles.button, focused ? [{backgroundColor: 'black',marginRight:20}] : {marginRight:20}]}>
                  <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                </TouchableOpacity>
                }
              
              </View>
            )
          },
          tabBarPressColor: 'transparent',
          tabBarLabelStyle: { color: 'transparent' },
          tabBarContentContainerStyle: { backgroundColor: 'white' },
          headerStyle: { backgroundColor: 'white' },
          headerTitleStyle: { fontSize: 8 }, 
          tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        })}
      >
        <Tab.Screen name='Publicaciones'>
          {() => <UsuarioPublicaciones cargando={cargando} reseñas={reseñas}/>}
        </Tab.Screen>
        <Tab.Screen name='Listas'>
          {() => <UsuarioListas isLoggedUser={props.isLoggedUser} idUsuarioExterno={props.User.id}/>}
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
    marginBottom: 10,
  }, 
  button: {
    zIndex: 1,
    alignSelf:"center",
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: (width/2-7),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
  },
  buttonText: {
    color: 'black',
  },
  buttonTextPressed: {
    color: 'white',
    fontSize: 17
  },
});
