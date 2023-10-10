import { Linking, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { LocationObjectCoords, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import SearchBar from '../../components/searchBar';
import { mapCoordinates } from '../../mappers/location';
import mapStyle from './mapStyle.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import StoresList from './components/list/index';
import GetAllComercios from '../../src/Servicies/ComercioService';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export interface Marker {
  id: number,
  latlng: {
    latitude: number,
    longitude: number,
  },
  Descripcion: string,
  Direccion: string,
  Facebook: string,
  Horario: string,
  Id: number,
  ImagenNombre: string,
  Instagram: string,
  Mail: string,
  Nombre: string,
  Provincia: string,
  Telefono: number,
  Tipo: string,
  Web: string,
}

export type RootStackParamList = {
  Perfil: { id: number } | undefined;
};

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null);
    const [markers, setMarkers] = useState<Array<Marker>>([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [loadingMarkers, setLoadingMarkers] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const getMarkersFromDB = async (body?: { name: string }) => {
      setLoadingMarkers(true);
      const response = await GetAllComercios();
      const mappedMarkers = await mapCoordinates(response);
      setMarkers(mappedMarkers);
      setLoadingMarkers(false);
      return mappedMarkers;
    };

    useEffect(() => {
        async function getLocation() {
          const { status } = await requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const { coords } = await getCurrentPositionAsync();
            setLocation(coords);
          } else {
            throw new Error('Location permission not granted');
          }
        }
        getLocation();
        getMarkersFromDB().catch((error) => {
          console.log('Error getting markers from db:', error);
        });
      }, []);

    const handleMapReady = () => {
      setMapLoaded(true);
    };

    const onSubmitSearch = async (name: string) => {
      if(name !== '') {
        const filteredMarkers = markers.filter((marker) => marker.Nombre.toLowerCase().includes(name.toLowerCase()));
        setMarkers(filteredMarkers);
      }
      else {
        getMarkersFromDB();
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <SearchBar onSubmit={onSubmitSearch} />
        <View style={styles.loader}>
        {!mapLoaded && <Text>Cargando mapa...</Text>}
        {loadingMarkers && <Text>Cargando comercios...</Text>}
        {location && (
          <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            {openList ? 
            <StoresList markers={markers} /> :
              <MapView
              style={styles.map}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              onMapReady={handleMapReady}
            >
              {markers.map((marker, index) => (
                  <Marker
                      key={index}
                      coordinate={marker.latlng}
                      title={marker.Nombre}
                      description={marker.Descripcion}
                      onCalloutPress={(e) => {
                        navigation.navigate('Perfil', { id: marker.id })
                      }}
                  />
              ))}
            </MapView>}
            </SafeAreaView>
          )}
          <View style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: '#000', borderRadius: 50, padding: 10 }}>
            <TouchableOpacity onPress={() => setOpenList(!openList)}>
              {openList ? <Icon name='map' size={24} color='white'/> : <Icon name='list' size={24} color='white'/> }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}
