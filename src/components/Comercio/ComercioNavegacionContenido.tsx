import { StyleSheet, Text, Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ComercioNovedades from './Anuncios/Novedad/ComercioNovedades';
import IUsuario from '../../Interfaces/IUsuario';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ComercioReseñas from './Reseña/ComercioReseñas';
import ComercioFotos from './Anuncios/Fotos/ComercioFotos';
import { useEffect, useState } from 'react';
const width: number = Dimensions.get('window').width;
const alturaFija: number = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

interface Reseña {
  usuario: number,
  comercio: number,
  descripcion: string,
  puntuacion: number,
  titulo: string,
  nombreimagen: string,
  fecha: Date,
  idUsuario: number,
  usuarioObject: IUsuario
}

interface Anuncio {
  idcomercio: number,
  fecha: Date,
  titulo: string,
  descripcion: string,
  imagenes?: string,
  tipo: string
}

interface NavegacionContenidoComercioProps {
  idComercio: number | undefined,
  scrollWrap: () => void;
  scrollUnWrap: () => void;
  anuncios: Anuncio[],
  reseñas: Reseña[],
  imagenComercio: String
}

export default function NavegacionContenidoComercio({ idComercio, imagenComercio, scrollWrap, scrollUnWrap, anuncios, reseñas }: NavegacionContenidoComercioProps) {
  const [height, setHeight] = useState(100);
  useEffect(() => {
    var altura = 0;
    if (anuncios.length > reseñas.length) {
      if (anuncios.length == 1) altura = anuncios.length * 500;
      else altura = anuncios.length * 400;
    } else if (anuncios.length < reseñas.length) altura = reseñas.length * 500;
    else if (anuncios.length == 0) { altura = alturaFija * 0.5 }
    setHeight(altura);
  });

  return (

    <View style={{ flex: 1, height: 'auto', flexShrink: 1 }}>
      <Tab.Navigator
        style={{ maxHeight: 1300, minHeight: height, flexGrow: 1 }}
        screenOptions={({ route }) => ({
          tabBarAllowFontScaling: true,
          tabBarStyle: {
            backgroundColor: 'white',
            height: 50,
            shadowColor: 'transparent',
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ flex: 1, justifyContent: "center" }}>
                {route.name == "Posts" &&
                  <TouchableOpacity style={[styles.button, focused ? [{ backgroundColor: 'black', marginLeft: 35 }] : { marginLeft: 35, borderRightWidth: 0, }]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                }
                {route.name == "Fotos" &&
                  <TouchableOpacity style={[styles.button, focused ? [{ backgroundColor: 'black', marginRight: 5 }] : { marginRight: 5 }]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                }
                {route.name == "Reseñas" &&
                  <TouchableOpacity style={[styles.button, focused ? [{ backgroundColor: 'black', marginRight: 40 }] : { marginRight: 40, borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                }

              </View>
            )
          },
          headerTitleStyle: { fontSize: 8 },
          tabBarPressColor: 'transparent',
          tabBarLabelStyle: { color: 'transparent' },
          tabBarContentContainerStyle: { backgroundColor: 'transparent' },
          tabBarIndicatorStyle: { backgroundColor: 'transparent' },
          headerStyle: { backgroundColor: 'transparent' },
        })}
      >

        <Tab.Screen name='Posts'>
          {() => <ComercioNovedades imagenComercio={imagenComercio} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} anuncios={anuncios} />}
        </Tab.Screen>
        <Tab.Screen name='Fotos'>
          {() => <ComercioFotos id={idComercio ? idComercio : 2} />}
        </Tab.Screen>
        <Tab.Screen name='Reseñas'>
          {() => <ComercioReseñas scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} reseñas={reseñas} />}
        </Tab.Screen>
      </Tab.Navigator></View>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 1,
    alignSelf: "center",
    justifyContent: 'space-around',
    alignItems: 'center',
    width: (width / 3),
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
    height: 30,

  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
  },
  buttonTextPressed: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400'
  },
});
