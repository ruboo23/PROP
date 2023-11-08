import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Button } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHorario from 'react-native-vector-icons/AntDesign';

interface CabeceraComercioProps {
  nombre?: String,
  direccion?: String,
  descripcion?: String,
  imagen?: String,
  horario?: String,
  id?: number,
  logueadoComoComercio?: boolean
}

export default function CabeceraComercio({ nombre, direccion, descripcion, imagen, horario, id, logueadoComoComercio } : CabeceraComercioProps) {
  const [horarioAbierto, setHorarioAbierto] = useState(false);
  const [esSeguido, setEsSeguido] = useState<boolean>(false);

  function sendToGoogleMaps () {
    const browser = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
    Linking.openURL(browser);
  }
  
  function handleClickHorario(event: GestureResponderEvent): void {
    setHorarioAbierto(!horarioAbierto);
  }

  return (
    <View style={styles.back}>
      <Image source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${imagen?.trim()}` }} style={styles.backgroundImg}></Image>
      <View style={styles.container}>
        <Image source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${imagen}` }} style={styles.profileImg}></Image>
        <View style={styles.headerInf}>
          <Text style={styles.title}>{nombre}</Text>
        <View style={styles.horiz}>
          <Icon name='place' size={10} color='grey'></Icon>
          <TouchableOpacity onPress={sendToGoogleMaps}>
            <Text style={styles.subtitle}>{direccion}</Text>      
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <Text style={styles.desc}>{descripcion}</Text>
      {!logueadoComoComercio &&
          <View style={{width: "90%", justifyContent: "center", alignSelf: "center", marginVertical: 5}}>
            <Button  
              title = {esSeguido ? "Dejar de seguir" : "Seguir"} 
              color= {esSeguido ? "gray" : "blue"} 
              onPress = {() => { esSeguido ? setEsSeguido(false) : setEsSeguido(true)}} 
            />
          </View>
      }
      <View style={styles.horario}>
        <TouchableWithoutFeedback onPress={handleClickHorario} >
          <View style={styles.horiz}>
            {horarioAbierto ? 
              <IconHorario name="minuscircleo" size={12} color="grey" onPress={() => {setHorarioAbierto(false)}}></IconHorario>
            :
              <IconHorario name="pluscircleo" size={12} color="grey" onPress={() => {setHorarioAbierto(true)}}></IconHorario>
            }
            <Text style={{ paddingLeft: 5}}>Horario</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          {horarioAbierto ? 
            <Text>{horario}</Text>
          :
            <View></View>
          }
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horario: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  horiz: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  subtitle: {
    paddingRight: 8,
    color: 'grey',
    flexWrap: 'wrap',
  },
  back: {
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
  headerInf: {
    marginLeft: 20,
    maxWidth: '75%'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    flexWrap: 'wrap'
  },
  backgroundImg: {
    height: 100,
    width: 400
  }, profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'lightgrey',
    borderWidth: 1
  }, desc: {
    margin: 10,
    flexWrap: 'wrap',
    backgroundColor: '#E3E3E3',
    borderRadius: 5,
    padding: 8,
  }
});
