import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, GestureResponderEvent, TouchableWithoutFeedback, Button } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconHorario from 'react-native-vector-icons/AntDesign';
import userSingleton from '../../Servicies/GlobalStates/UserSingleton';
import { GetUsuarioById, dejarSeguirComercio, seguirComercio } from '../../Servicies/UsuarioService/UsuarioServices';
interface CabeceraComercioProps {
  nombre?: String,
  direccion?: String,
  descripcion?: String,
  imagen?: String,
  horario?: String,
  id?: number,
  logueadoComoComercio?: boolean
  valoracionpromedio?: Number
}

export default function CabeceraComercio({ nombre, direccion, descripcion, imagen, horario, id, logueadoComoComercio, valoracionpromedio } : CabeceraComercioProps) {
  const User = userSingleton.getUser();

  const [horarioAbierto, setHorarioAbierto] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState<boolean>(true);
  const [esSeguido, setEsSeguido] = useState<boolean>(false);

  function sendToGoogleMaps () {
    const browser = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
    Linking.openURL(browser);
  }

  useEffect(() => {
    fetchFollow(); 
  },[])

  function fetchFollow(){
    if(User != null && User != undefined){
      GetUsuarioById(User.id).then((res: any) => {
        if(res != null && res != undefined){
          if(res.idcomercio.$values != null && res.idcomercio.$values != undefined && res.idcomercio.$values.length > 0){
            let ids = res.idcomercio.$values.map((comercio: any) => comercio.id)
            setEsSeguido(ids.includes(id));
            setLoadingFollow(false)
          }else{
            setEsSeguido(false);
            setLoadingFollow(false)
          }
        }
      })
    } 
  };

  function handleClickHorario(event: GestureResponderEvent): void {
    setHorarioAbierto(!horarioAbierto);
  }

  function seguirButton(){
    setLoadingFollow(true);
    if(esSeguido){
      dejarSeguirComercio(User?.id, id).then(() => {
        fetchFollow();
      });
    } else {
      seguirComercio(User?.id, id).then(() => {
        fetchFollow();
      });
    }
  }

  return (
    <View style={styles.back}>
          <Image source={{uri: imagen? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}`:'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}} 
          style={styles.backgroundImg}></Image>
        

      <View style={styles.container}>
      <Image source={{uri: imagen? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}`:'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}} 
          style={styles.profileImg}></Image>  
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
      {valoracionpromedio != undefined &&
        <View style={{display: 'flex', flexDirection: 'row', marginLeft: 25}}>
          <Icon size={20} name={'star'} color={'grey'}></Icon>
          {valoracionpromedio == 0 ?
            <Text>0</Text>
          :<Text>{valoracionpromedio.toString().substring(0,4)}</Text>
  }
        </View>
      }
      <Text style={styles.desc}>{descripcion}</Text>
      {!logueadoComoComercio &&
          <View style={{width: "90%", justifyContent: "center", alignSelf: "center", marginVertical: 5}}>
            {loadingFollow 
            ?
              <Image source={require('../../../assets/loading.gif')} style={{ height: 30, width: 30, justifyContent: 'center', alignSelf:"center"}}/>
            :
              <Button  
                title = {esSeguido ? "Dejar de seguir" : "Seguir"} 
                color= {esSeguido ? "gray" : "blue"} 
                onPress = {() => { seguirButton()}} 
              />
            }
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