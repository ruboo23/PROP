import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ListaComerciosCercanos from "../components/Comercio/ListaComerciosCercanos";
import GetAllComercios from "../Servicies/ComercioService";
import { FontAwesome } from '@expo/vector-icons'; 

interface Comercio {
    Descripcion: String,
    Direccion: String,
    Facebook?: String, 
    Horario?: String, 
    Id: 3,
    ImagenNombre: String, 
    Instagram?: String, 
    Mail?: String, 
    Nombre: String, 
    Provincia: String, 
    Telefono?: number, 
    Tipo?: [Object], 
    Web?: String,
    Imagen64?: String
    Latitud: String,
    Longitud: String,
}

export default function ComerciosCercanos()
{
    var data: Comercio[] = [];
    const [comerciosList, setComerciosList] = React.useState(data);
    const [loading, setLoading] = useState(true);

    const fetchComercios = () => {
        
        setLoading(true);
        GetAllComercios().then((res:any) => {
            if(res != null || res != undefined){
              data = res.map((item: any) => (
                {
                    Id: item.id,
                    Nombre: item.nombre, 
                    ImagenNombre: item.imagenid, 
                    Tipo: item.tipo_id.$values[0] ? item.tipo_id.$values[0].nombre : 'TIPO',
                    Latitud: item.latitud,
                    Longitud: item.longitud
                    
                }
                ));
                setComerciosList(data);
              
            }
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); // Asegúrate de ocultar el indicador de carga en caso de error
        });
    }

    useEffect(() => {
        fetchComercios()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Comercios Cercanos</Text>
                <View style={styles.refreshIconContainer}>
                <TouchableOpacity onPress={fetchComercios}>
                    <FontAwesome name="refresh" size={24} color="grey" />
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.listaContainer}>
                <ListaComerciosCercanos ListaComercios={comerciosList} />
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F4F4F4',
          paddingHorizontal: 20,
          paddingTop: 20,
        },
        tituloContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        },
        titulo: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        refreshIconContainer: {
          padding: 5,
        },
        listaContainer: {
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 2,
        },
      });