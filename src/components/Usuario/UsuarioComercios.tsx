import { AccessibilityInfo, Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import PerfilComercio from '../../screens/PerfilComercio';


export default function UsuarioComercios({User}: any) {
  
  const [comerciosSeguidos, setComerciosSeguidos] = useState<any>();

  useEffect(() =>{
    if(User != null && User != undefined){
      setComerciosSeguidos(User.IdComercio?.$values.length > 0 ? User.IdComercio.$values: []);
    }
  },[User])
  
  const [idComercioClickeado, setIdComercioClickeado] = useState<number>(0);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const openProfileModal = (id: any) => {
    setIdComercioClickeado(id);
    setShowProfileModal(true);
  }

  return (
    <View style={styles.screenContainer}>
       {!!comerciosSeguidos && comerciosSeguidos.length === 0 ? <Text style={styles.subtitle}>No sigues a ningún comercio</Text> : 
      <>
      <ScrollView>
        <Text style={styles.subtitle}>Comercios seguidos:</Text>
        {!!comerciosSeguidos && comerciosSeguidos.map((comercio: any) => (
          <TouchableOpacity key={comercio.id} onPress={() => openProfileModal(comercio.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10, borderWidth: 1, borderBottomColor: 'grey', padding: 4 }}>
              <Image source={{uri: `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${comercio.nombreimagen}` }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
              <Text style={{ fontSize: 20 }}>{comercio.nombre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal style={{ width: '100%', height: 365 }} animationType='fade' transparent={true} visible={showProfileModal}>
        <PerfilComercio idComercio={idComercioClickeado} withCloseButton closeAction={() => setShowProfileModal(false)}/>
      </Modal>
      </>
      }
      
    </View>
  );
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
