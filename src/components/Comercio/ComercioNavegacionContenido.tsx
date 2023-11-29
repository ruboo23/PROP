import { StyleSheet, Text, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ComercioNovedades from './Anuncios/Novedad/ComercioNovedades';
import IUsuario from '../../Interfaces/IUsuario';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ComercioReseñas from './Reseña/ComercioReseñas';
import ComercioFotos from './Anuncios/Fotos/ComercioFotos';
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

export default function NavegacionContenidoComercio( { idComercio, imagenComercio, scrollWrap, scrollUnWrap, anuncios, reseñas } : NavegacionContenidoComercioProps) {
  return (
        <Tab.Navigator
          screenOptions={({ route }) => ({       
            tabBarAllowFontScaling: true,
            tabBarStyle: { 
              backgroundColor: 'white',
              height: 58,
              shadowColor: 'transparent'
            },
            tabBarIcon: ({ focused }) => {
              if (route.name == "Reseñas") {
                return (
                  <TouchableOpacity style={[ styles.button, focused ? [styles.buttonPressedPub, {height: 35}] : {zIndex: 1, marginLeft: -64, marginTop: 15}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                );
              } else if (route.name == "Fotos") {
                return (
                  <TouchableOpacity style={[ styles.button, focused ? [styles.buttonPressed, {marginLeft: -50, height: 35}] : {zIndex: 1, marginLeft: -49, marginTop: 15}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                )
              } else { // posts 
                return (
                  <TouchableOpacity style={[ styles.button, focused ? [styles.buttonPressed, {marginLeft: -35, height: 35}] : { marginLeft: -35, marginTop: 15}]}>
                    <Text style={[styles.buttonText, focused && styles.buttonTextPressed]}>{route.name}</Text>
                  </TouchableOpacity>
                )
              }
            },
            tabBarPressColor: 'white',
            tabBarLabelStyle: { color: 'transparent' },
            tabBarContentContainerStyle: { backgroundColor: 'white' },
            headerStyle: { backgroundColor: 'transparent' },
            headerTitleStyle: { fontSize: 8 },
          })}
        >
        
        <Tab.Screen name='Posts'>
          {() => <ComercioNovedades imagenComercio={imagenComercio} scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} anuncios={anuncios}/>}
        </Tab.Screen>
        <Tab.Screen name='Fotos'>
          {() => <ComercioFotos id={idComercio ? idComercio : 2}/>}
        </Tab.Screen>
        <Tab.Screen name='Reseñas'>
          {() => <ComercioReseñas scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} reseñas={reseñas}/>}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  buttonPrimero: {
    marginLeft: -35,
  },
  buttonSegundo: {
    marginLeft: -50,
  },
  buttonTercero: {
    marginLeft: -60,
  },
  buttonPressedSegundo: {
    marginLeft: -60,
    zIndex: 5,
  },
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    justifyContent: 'center', alignItems: 'center',
    width: (width/3)-13,
    backgroundColor: 'white',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
    paddingTop: -3,
    marginLeft: -60,
    marginTop: 10,
  },
  buttonPressedPub: {
    marginLeft: -63,
    backgroundColor: 'black',
    zIndex: 5
  },
  buttonPressed: {
    backgroundColor: 'black',
    width: (width/3)-13,
  },
  buttonPressedPrimero: {
    marginLeft: -40,
    zIndex: 5
  },
  buttonText: {
    color: 'black',
  },
  buttonTextPressed: {
    color: 'white',
    fontSize: 17
  },
});
