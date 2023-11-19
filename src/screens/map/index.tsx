import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import mapStyle from './mapStyle.json'
import Icon from 'react-native-vector-icons/FontAwesome';
import StoresList from './components/list/index';
import GetAllComercios, { GetComerciosConNombre, GetComerciosFiltrados } from '../../Servicies/ComercioService';
import { useNavigation } from '@react-navigation/core';
import {Callout} from 'react-native-maps';
import axios from 'axios'
import SearchBar from '../../components/searchBar';
import { mapCoordinates } from '../../mappers/location';
import { LocationObjectType, useGlobalState } from '../../components/context';
import { GetAllTipos } from '../../Servicies/TipoComercioService';
import ValoracionEstrellas from '../../components/Comercio/Reseña/ValoracionEstrellas';
import { calcularDistancia } from '../../components/Comercio/ListaComerciosCercanos';
import ModalDropdown from 'react-native-modal-dropdown';

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
  descripcion: string,
  direccion: string,
  facebook: string,
  horario: string,
  imagenNombre: string,
  instagram: string,
  mail: string,
  nombre: string,
  provincia: string,
  telefono: number,
  tipo: string,
  web: string,
  latitud: number,
  longitud: number
}

export type RootStackParamList = {
  Perfil: { id: number } | undefined;
};

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObjectType | null>(null);
    const [markers, setMarkers] = useState<Array<Marker>>([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [searchName, setSearchName] = useState<string>("");
    const [loadingMarkers, setLoadingMarkers] = useState(false);
    const navigation = useNavigation<any>();
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [storeTypes, setStoreTypes] = useState<Array<any>>([{label: 'Seleccione un tipo', value: 0}]);
    const [filterValues, setFilterValues] = useState({
      distancia: 0,
      tipo: 0,
      puntuacion: 0,
    });
    const distanceOptions = [{label: 'Seleccione una distancia', value: 100000}, {label: '1 km', value: 1},{ label: '5 km', value: 5 }, { label: '10 km', value: 10 }, { label: '20 km', value: 20 }, { label: '50 km', value: 50 }, { label: '100 km', value: 100 }]
    const { state } = useGlobalState();

    useEffect(() => {
      setLocation({ latitude: state?.coordinates?.latitude, longitude: state?.coordinates?.longitude });
    }, [state.coordinates]);

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
        getMarkersFromDB().catch((error) => {
          console.log('Error getting markers from db:', error);
        });
        GetAllTipos().then((res) => {
          setStoreTypes([{label: 'Seleccione un tipo', value: 0}, ...res.map((tipo: any) => ({ label: tipo.nombre, value: tipo.id }))]);
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
        getMarkersFromDB(name);
      }, 500)
    }

    const filterMarkers = async () => {
      GetComerciosFiltrados(filterValues).then((res) => {
        const data = res?.data?.$values;
        const mappedMarkers = data.length ? mapCoordinates(data) : [];
        const comerciosCercanos = !!filterValues.distancia ? mappedMarkers.filter((marker: any) => calcularDistancia(location?.latitude, location?.longitude, marker.latitud, marker.longitud) < filterValues.distancia) : mappedMarkers;
        setMarkers(comerciosCercanos);
        setFilterModalVisible(false);
      }
      ).catch((error) => {
        console.log('Error getting markers from db:', error);
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginRight: 12 }}>
          <SearchBar onSearchChange={setSearchName} />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Icon name='filter' size={24} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.loader}>
        {!mapLoaded && <Text>Cargando mapa...</Text>}
        {loadingMarkers && <Text>Cargando comercios...</Text>}
        {location?.latitude && location?.longitude && (
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
                      coordinate={{ latitude: marker.latitud, longitude: marker.longitud}}
                      title={marker.nombre}
                      description={marker.descripcion}
                      onCalloutPress={(e) => {
                        navigation.navigate('PerfilComercio', {id: marker.id, esComercioLogueado: false})
                      }}
                  >
                    <Callout>
                        <SafeAreaView style={styles.container}>
                              <Image source={{uri: `https://propapi-ap58.onrender.com/api/Imagen/${marker.imagenNombre}`}} style={{ width: 22, height: 22}} />
                          <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>
                              {marker.nombre}
                            </Text>
                            <Text style={{ flex: 1 }}>
                              {marker.descripcion}
                            </Text>
                            <Text style={{ flex: 1, color: '#999' }}>
                              {marker.direccion}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => {
            setFilterModalVisible(!filterModalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, padding: 10 }}>
                <View style={{ }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Filtros</Text>
                  <TouchableOpacity onPress={() => {setFilterModalVisible(false)}} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Icon name='close' size={24} color='black' />
                  </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Distancia máxima</Text>
                <TouchableOpacity style={{ width: '100%', height: 40, borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding:10, marginBottom: 8, alignContent: 'center', justifyContent: 'center' }} >
                  <ModalDropdown
                    options={distanceOptions.map((option) => option.label)}
                    onSelect={(index, value) => setFilterValues({ ...filterValues, distancia: distanceOptions[index].value })}
                    defaultValue={filterValues.distancia ? distanceOptions.find((option) => option.value == filterValues.distancia)?.label : distanceOptions[0].label}
                    dropdownStyle={{ width: '100%', height: 200 }}
                    textStyle={{ fontSize: 16 }}
                    dropdownTextStyle={{ fontSize: 16 }}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Tipo</Text>
                <TouchableOpacity style={{ width: '100%', height: 40, borderRadius: 5, borderWidth: 1, borderColor: 'grey', padding:10, marginBottom: 8, alignContent: 'center', justifyContent: 'center' }}>
                  <ModalDropdown
                    options={storeTypes.map((option) => option.label)}
                    onSelect={(index, value) => setFilterValues({ ...filterValues, tipo: storeTypes[index].value })}
                    defaultValue={filterValues.tipo ? storeTypes.find((option) => option.value == filterValues.tipo)?.label : storeTypes[0].label}
                    dropdownStyle={{ width: '100%', height: 200 }}
                    textStyle={{ fontSize: 16 }}
                    dropdownTextStyle={{ fontSize: 16 }}
                  />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Valoración mínima</Text>
                <ValoracionEstrellas onChangeRating={(value) => setFilterValues({ ...filterValues, puntuacion: value })} value={filterValues.puntuacion} />
                <TouchableOpacity onPress={() => setFilterValues({
                  distancia: 0,
                  tipo: 0,
                  puntuacion: 0,
                })} style={{ width: '100%', height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>Limpiar filtros</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('filters:', filterValues) || filterMarkers()} style={{ backgroundColor: 'blue', width: '100%', height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Aplicar</Text>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
      </View>
    );
}