import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface NovedadProps {
  titulo: string,
  fecha: Date,
  close: any,
  visibilidad: boolean,
  setVisibilidad: any,
  imagenesNombre?: string,
  usuarioNickname: String,
  puntuacion: number,
  descripcion: string
}

export default function Reseña({ titulo, fecha, descripcion, puntuacion, close, visibilidad, setVisibilidad, imagenesNombre, usuarioNickname }: NovedadProps) {
  const urls = imagenesNombre?.split(',').map(url => {
    return url.replace(/api\/Imagenes/g, 'api/Imagenes/api/Imagenes/nombre').trim();
  });  

  const renderImages = () => {
    const images = [];
    for (let i = 0; i < puntuacion; i++) {
      images.push(
        <Icon
          key={i}
          size={17}
          name={'star'}
          color={'yellow'}
        />
      );
    }
    return images;
  };

  return (
    <View style={[styles.screenContainer, {paddingLeft: 15, paddingBottom: 15}]}>
      <View style={{ flexDirection: 'row', display: 'flex' }}>
      <Image source={{uri: `http://propapi-ap58.onrender.com/api/Imagenes/api/Imagenes/nombre/${usuarioNickname.trim()}` }} style={{width: 60, height: 60, borderRadius: 50}}/>
      <View>
        <Text style={{fontSize: 20, fontWeight: '600', marginLeft: 15}}> {usuarioNickname} </Text>
        <Text style={{ color: '#EEEEEE', marginLeft: 15 }}> {fecha?.toString().substring(0, 10)}   {fecha?.toString().substring(11, 16)}  </Text>
      </View>
      </View>
      <View style={{ flexDirection: 'row'}}>
        {renderImages()}
      </View>
      <Text style={styles.desc}>{titulo}</Text>
      <Text style={styles.desc}>{descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  desc: {
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  titulo: {
    fontSize: 18,
    marginLeft: 10
  },
  screenContainer: {
    paddingTop: 15,
    backgroundColor: 'lightgrey',
    margin: 7,
    padding: 6,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'flex-start',
    width: screenWidth-20
  },
  subtitle: {
    color: 'grey',
  },
});