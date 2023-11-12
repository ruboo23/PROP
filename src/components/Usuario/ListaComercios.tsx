import react, { useEffect } from 'react';
import {useState} from 'react'
import { FlatList, ScrollView,Text, View, Image, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import PerfilComercio from '../../screens/PerfilComercio';
import { ComerciosFromLista } from '../../Servicies/ListaService/ListaService';


export default function ListarComercios({indice}:any) {
    const [comercios, setComercios] = useState([])
    const [mostrarPrerfil, setMostrarPerfil] = useState(false)
    const [idComercioClickeado, setIdComercioClickeado] = useState(null)
    const [cargando, setCargando] = useState(true)
    useEffect(() => {
        ComerciosFromLista(indice).then((response) =>{setCargando(false);setComercios(response)})
    }, [])

    return(
        <View style={styles.screenContainer}>
        {cargando ? <Text style={styles.subtitle}>Cargando...</Text> : <>
       {!!comercios && comercios.length === 0 ? <Text style={styles.subtitle}>Esta lista no contiene ningun comercio.</Text> : 
      <>
      <ScrollView>
        {!!comercios && comercios.map((comercio: any) => (
          <TouchableOpacity key={comercio.id} onPress={() => {setIdComercioClickeado(comercio.id); setMostrarPerfil(true)}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10, borderWidth: 1, borderBottomColor: 'grey', padding: 4 }}>
              <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${comercio.nombreimagen}` }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
              <Text style={{ fontSize: 20 }}>{comercio.nombre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal style={{ width: '100%', height: 365 }} animationType='fade' transparent={true} visible={mostrarPrerfil}>
        <PerfilComercio idComercio={idComercioClickeado} withCloseButton closeAction={() => setMostrarPerfil(false)}/>
      </Modal>
      </>
      }
      </>
        }
    </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    subtitle: {
      color: 'grey',
    },
  });