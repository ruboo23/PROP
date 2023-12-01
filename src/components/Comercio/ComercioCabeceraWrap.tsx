import { StyleSheet, Text, View, Image } from 'react-native';

interface CabeceraComercioWrapProps {
  nombre?: String;
  imagen?: String;
}

export default function CabeceraComercio({ nombre, imagen } : CabeceraComercioWrapProps) {
  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <Image source={{uri: (imagen != undefined && imagen != null && imagen.trim.length > 0)? `https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/Comercios/${imagen}`:'https://cgqvfaotdatwfllyfmhr.supabase.co/storage/v1/object/public/Images/predeterminado'}} 
          style={styles.profileImg}></Image>
        <View style={styles.headerInf}>
        <Text style={styles.title}>{nombre}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: 20
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
   profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'lightgrey',
    borderWidth: 1
  }
});
