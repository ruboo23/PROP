import { Linking, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { LocationObjectCoords, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      flex:1
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
  
        setMarkers([
          {
            latlng: { latitude: 39.481106, longitude: -0.340987 },
            title: 'Marcador 1',
            description: 'Este es el marcador 1',
          },
          {
            latlng: { latitude: 39.474688, longitude: -0.358344 },
            title: 'Marcador 2',
            description: 'Este es el marcador 2',
          },
        ]);
      }, []);
      console.log(location)
    const handleMapReady = () => {
      // Esta función se llama cuando el mapa se ha cargado completamente
      console.log('Mapa cargado')
      setMapLoaded(true);
    };
    console.log(mapLoaded)
    return (
      <View style={{ flex: 1 }}>
        <Text>Mapa</Text>
        <View style={styles.loader}>
        {!mapLoaded ? (
            <Text>Cargando mapa...</Text>
        ) : (
          location && (
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
          )
        )}
        </View>
      </View>
    );
}
