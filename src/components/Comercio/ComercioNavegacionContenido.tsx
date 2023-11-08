import { StyleSheet } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import IconO from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ComercioNovedades from './ComercioNovedades';
import ComercioOfertas from './ComercioOferas';
import ComercioReseñas from './ComercioReseñas';
import { useEffect } from 'react';
import IUsuario from '../../Interfaces/IUsuario';

const Tab = createMaterialTopTabNavigator();

interface Comercio {
  nombre: string,
  direccion: string,
  telefono: number,
  horario: string,
  web: string,
  descripcion: string,
  imagenNombre: string,
  provincia: string,
  instagram: string,
  facebook: string
}

const ejemploComercio: Comercio = {
  nombre: "Tienda de Ejemplo",
  direccion: "Calle Principal, 123",
  telefono: 123456789,
  horario: "Lunes a Viernes: 9:00 AM - 6:00 PM",
  web: "https://www.ejemplo.com",
  descripcion: "Una tienda de ejemplo para propósitos educativos. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  imagenNombre: "ejemplo.jpg",
  provincia: "Ejemplo",
  instagram: "@tienda_ejemplo",
  facebook: "TiendaEjemplo"
};

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
  novedades: Anuncio[],
  ofertas: Anuncio[],
  reseñas: Reseña[]
}

export default function NavegacionContenidoComercio( { scrollWrap, scrollUnWrap, novedades, ofertas, reseñas } : NavegacionContenidoComercioProps) {
  useEffect(() => {
    // obtener los anuncios y novedades
  }, []);

  return (
      <NavigationContainer 
        independent={true}  
      >
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            
            let iconName: string = "";
            let colour : string = "black"
            switch (route.name) {
              case "Reseñas": iconName = "rate-review"
                break;
              case "Novedades": iconName = "new-releases"
                break;
              case "Ofertas": iconName = "local-offer"
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
        <Tab.Screen name='Reseñas'>
          {() => <ComercioReseñas scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} reseñas={reseñas}/>}
        </Tab.Screen>
        <Tab.Screen name='Novedades'>
          {() => <ComercioNovedades scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} novedades={novedades}/>}
        </Tab.Screen>
        <Tab.Screen name='Ofertas'>
          {() => <ComercioOfertas scrollWrap={scrollWrap} scrollUnWrap={scrollUnWrap} novedades={novedades} ofertas={ofertas}/>}  
        </Tab.Screen>
      </Tab.Navigator>
      </NavigationContainer>
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
