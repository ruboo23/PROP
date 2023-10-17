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
              data = res.map((item: any) => ({
                Descripcion: item.Descripcion,
                Facebook: item?.Facebook,
                Horario: item?.Horario,
                Id: item.Id,
                ImagenNombre: item.ImagenNombre, 
                Instagram: item?.Instagram,
                Mail: item?.Mail,
                Nombre: item.Nombre, 
                Provincia: item.Provincia, 
                Telefono: item.Telefono,
                Tipo: "falta impplementar el tipo", 
                Web: item.Web,
                Latitud: item.Latitud,
                Longitud: item.Longitud
              }));
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
        <View style = {styles.container}>
            <View style = {styles.containerTitulo}>     
                <Text style = {styles.titulo}>Comercios Cercanos</Text>
                <View style = {styles.separador}></View>
                <TouchableOpacity onPress={fetchComercios}>
                    <FontAwesome name="refresh" size={24} color="blue" />
                </TouchableOpacity>
            </View>

            <View>
                <ListaComerciosCercanos ListaComercios = {comerciosList} ></ListaComerciosCercanos>
            </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        paddingTop: 50, 
      },
      containerTitulo:{
        flexDirection: 'row'
      },
      separador: {
        width: 20
      },
      titulo: {
        fontSize: 24, // Cambia el tamaño de la fuente según tus preferencias
        fontWeight: 'bold', // Hace que el texto sea más grueso (opcional)        
    },
})