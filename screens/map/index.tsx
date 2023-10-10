import { Linking, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { LocationObjectCoords, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import SearchBar from '../../components/searchBar';
import { get } from '../../utils/requests';
import { mapCoordinates } from '../../mappers/location';
import mapStyle from './mapStyle.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import StoresList from './components/list/index';

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

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null);
    const [markers, setMarkers] = useState<Array<{ latlng: { latitude: number, longitude: number }, title: string, description: string }>>([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [loadingMarkers, setLoadingMarkers] = useState(false);
    
    const getMarkersFromDB = async (body?: { name: string }) => {
      setLoadingMarkers(true);
      const response = await get('/comercio', body);
      const mappedMarkers = await mapCoordinates(response.data.$values);
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
        getMarkersFromDB().then((markersFromDB) => {
          setMarkers(markersFromDB);
        }).catch((error) => {
          console.log('Error getting markers from db:', error);
        });
      }, []);

    const handleMapReady = () => {
      setMapLoaded(true);
    };

    const onSubmitSearch = async (name: string) => {
      const markersFromDB = await getMarkersFromDB({name});
      const filteredMarkers = markersFromDB.filter((marker: { title: string; }) => marker.title.toLowerCase().includes(name.toLowerCase()));
      setMarkers(filteredMarkers);
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
            <StoresList markers={markers}/> :
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
                      title={marker.title}
                      description={marker.description}
                      onCalloutPress={(e) => {
                        // TODO: redirect to store screen
                        const browser_url ="https://maps.google.com/?q="+marker.latlng.latitude+","+marker.latlng.longitude;
                        Linking.openURL(browser_url);
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
