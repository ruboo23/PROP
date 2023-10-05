import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { LocationObjectCoords, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import SearchBar from '../../components/searchBar';
import { get } from '../../utils/requests';
import { mapMarkers } from '../../mappers/location';

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

    const getMarkersFromDB = async (body?: { name: string }) => {
      const response = await get('/comercio', body);
      return response.data;
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
          console.log(markersFromDB);
          setMarkers(mapMarkers(markersFromDB));
        }).catch((error) => {
          console.log('Error:', error);
        });

      }, []);
      console.log(location)

    const handleMapReady = () => {
      setMapLoaded(true);
    };

    const onSubmitSearch = (name: string) => getMarkersFromDB({name}).then((markersFromDB) => {
      setMarkers(mapMarkers(markersFromDB));
    }).catch((error) => {
      console.log('Error:', error);
    });

    return (
      <View style={{ flex: 1 }}>
        <SearchBar onSubmit={onSubmitSearch} />
        <View style={styles.loader}>
        {!mapLoaded && <Text>Cargando mapa...</Text>}
        {location && (
          <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            <MapView
              style={styles.map}
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
                        const browser_url ="https://maps.google.com/?q="+marker.latlng.latitude+","+marker.latlng.longitude;
                        Linking.openURL(browser_url);
                      }}
                  />
              ))}
            </MapView>
            </SafeAreaView>
          )}
        </View>
      </View>
    );
}
