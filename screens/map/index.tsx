import { Image, Linking, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { LocationObjectCoords, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import SearchBar from '../../components/searchBar';
import { mapCoordinates } from '../../mappers/location';
import mapStyle from './mapStyle.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import StoresList from './components/list/index';
import GetAllComercios, { GetComerciosConNombre } from '../../src/Servicies/ComercioService';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import {Callout} from 'react-native-maps';
import axios, { CancelTokenSource } from 'axios'

let cancelToken: any;
let timer: ReturnType<typeof setTimeout>;

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 350,
    }
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
    const [searchName, setSearchName] = useState<string>("");
    const [loadingMarkers, setLoadingMarkers] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const getMarkersFromDB = async (name?: string) => {
      setLoadingMarkers(true);
      let response;
      if(name == "" || name == undefined){
        response = await GetAllComercios();
      }
      else{
        response = await GetComerciosConNombre(name);
      }
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

    useEffect(() => {
      onSearchChange(searchName);
    }
    , [searchName]);

    const onSearchChange = async (name: string) => {
      if (!!timer) {
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
          if (typeof cancelToken !== typeof undefined) {
              cancelToken.cancel()
              cancelToken = undefined
          }
        cancelToken = axios.CancelToken.source();
        getMarkersFromDB(name).then((response) => { setMarkers(response) });
      }, 500)
    }

    return (
      <View style={{ flex: 1 }}>
        <SearchBar onSearchChange={setSearchName} />
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
              onMapReady={handleMapReady}
            >
              {markers.map((marker, index) => (
                  <Marker
                      key={index}
                      coordinate={marker.latlng}
                      title={marker.Nombre}
                      description={marker.Descripcion}
                      onCalloutPress={(e) => {
                        navigation.navigate('Perfil', { id: marker.Id })
                      }}
                  >
                    <Callout>
                        <SafeAreaView style={styles.container}>
                          <Text style={{ flex: 1, width: '100%', height: '100%', marginRight: 10 }}>
                              <Image source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/${marker.ImagenNombre}`}} style={{ width: 22, height: 22}} />
                          </Text>
                          <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>
                              {marker.Nombre}
                            </Text>
                            <Text style={{ flex: 1 }}>
                              {marker.Descripcion}
                            </Text>
                            <Text style={{ flex: 1, color: '#999' }}>
                              {marker.Direccion}
                            </Text>
                          </View>
                            
                        </SafeAreaView>
                    </Callout>
                  </Marker>
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
