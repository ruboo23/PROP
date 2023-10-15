import { StyleSheet, Text, View, Image } from 'react-native';

export default function Novedad(props: any) {
  const imagenes = false;
  
  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.titulo, {paddingTop: -40}]}>{props.titulo}</Text>
      <View style={{ backgroundColor: '#FDFDFD', margin: 10, borderRadius: 10, padding:10 }}>
        <Text>{props.desc}</Text>
      </View>
      {imagenes ? 
        <View style={{ height: '20%', paddingBottom: 13, paddingLeft: 13, flexDirection: 'row' }}>
          <Image style={{ marginRight: 13}} source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/avatarPred.png` }} width={70} height={70}></Image>
          <Image style={{ marginRight: 13}} source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/avatarPred.png` }} width={70} height={70}></Image>
          <Image style={{ marginRight: 13}} source={{uri: `https://propapi20231008104458.azurewebsites.net/api/Imagen/avatarPred.png` }} width={70} height={70}></Image>
        </View>
      : <View style={{height: 25}}></View>}
      <View style={styles.absoluteContainer}>
        <Text style={{ color: '#EEEEEE', paddingBottom: 3, paddingRight: 3 }}> {props.fecha} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
    titulo:{
      fontSize: 18,
      marginLeft: 10
    },
    screenContainer: {
      paddingTop: 15,
      backgroundColor: '#9CB57B',
      margin: 7,
      padding: 6,
      borderRadius: 10,
      flex: 1,
      justifyContent: 'flex-start',
    },
    subtitle: {
      color: 'grey',
    },
  });