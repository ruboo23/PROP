import react, { useEffect } from "react";
import {
  Modal,
  TouchableNativeFeedback,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  SectionListComponent,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalAñadriComerciLista from "../../components/Usuario/ModalAñadirComercioLista";
import { ComerciosFromLista } from "../../Servicies/ListaService/ListaService";
import { Section } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import userSingleton from "../../Servicies/GlobalStates/UserSingleton";

interface Comercio {
  nombre: string;
  calle: string;
}

export default function ModalMostrarLista({
  mostrarLista,
  setMostrarLista,
  listaSeleccionada,
  añadirComercios,
  usuario
}: any) {

  useEffect(() => {

  }, [setMostrarLista])

  const [comercios, setComercios] = react.useState<Array<Comercio>>([]);
  const [mostrarModalAñadir, setMostrarModalAñadir] = react.useState(false);
  const [cargando, setCargando] = react.useState(false)
  const [cambios, setCambios] = react.useState(false)

  useEffect(() => {
    setCargando(true);

    ComerciosFromLista(listaSeleccionada?.id)
      .then((resp) => {

        var listaComercios: Array<Comercio> = [];
        for (var element in resp) {
          listaComercios.push({ nombre: resp[element].nombre, calle: resp[element].calle });
        }
        setComercios([]);
        setComercios(listaComercios);
      })
      .catch((error) => {
        setComercios([])
      })
      .finally(() => {
        setCargando(false);
      });

  }, [mostrarLista, cambios]);


  const CirculoConNumero = (numero: number) => {
    const radioExterior = 30; // Radio del anillo exterior// Radio del anillo interior
    const grosorAnillo = 3; // Grosor del anillo

    return (
      <View key={'vieww' + numero} style={styles.container}>
        <Svg key={'svgo' + numero} height={2 * radioExterior} width={2 * radioExterior}>
          {/* Anillo exterior */}
          <Circle
            key={'circulo' + numero}
            cx={radioExterior}
            cy={radioExterior}
            r={radioExterior - grosorAnillo / 2}
            stroke="#888dc7"
            strokeWidth={grosorAnillo}
            fill="transparent"
          />

          {/* Número en el centro */}
          <SvgText
            key={'svgTet' + numero}
            x={radioExterior}
            y={radioExterior}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="20"
            fill="#888dc7"
            stroke="#888dc7"
          >
            {numero}
          </SvgText>
        </Svg>
      </View>
    );
  };

  const LineaVertical = (index:number) => {
    return (
      <View key={'ViewmIl'+index} style={{ marginLeft: 5, alignItems: "center", height: 30 }}>
        <Svg height="100%" width={10} key={'svgOchoMil1'+index}>
          <Line
            key={'line1'+index}
            x1={0}
            y1={0}
            x2={0}
            y2="100%"
            stroke="#888dc7"
            strokeWidth={10}
          />
        </Svg>
      </View>
    );
  };

  const GenerarLista = () => {
    var lista = [];
    if (comercios.length == 0) { return <Text style={{ textAlign: "center" }}>No hay comercios en esta lista.</Text> }
    for (var i = 0; i < comercios.length; i++) {
      lista.push(
        <View key={'view1' + i} style={{ alignItems: "flex-start", flexDirection: "row", marginLeft: 20 }}>
          {CirculoConNumero(i + 1)}
          <View
            key={'view2' + i}
            style={{
              alignContent: "center",
              justifyContent: "center",
              height: 60,
              width: "70%"
            }}
          >
            <Text
              key={'text1' + i}
              style={{
                width: "100%",
                fontWeight: "700",
                fontSize: 16,
                textAlign: "center",
                marginLeft: 20
              }}
            >
              {comercios[i].nombre}
            </Text>
            <Text
              key={'text2' + i}
              style={{
                width: "100%",
                marginLeft: 20,
                fontWeight: "400",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {comercios[i].calle}
            </Text>
          </View>
        </View>
      );
      if (comercios.at(comercios.length - 1) != comercios[i]) {
        lista.push(
          <View
            key={'viewNoseQue'+i}
            style={{ width: "100%", alignItems: "flex-start", marginLeft: 42 }}
          >
            {LineaVertical(i)}
          </View>
        );
      }
    }
    return lista;
  };

  return (
    <Modal visible={mostrarLista} style={{ marginLeft: 20 }} onRequestClose={() => { setMostrarLista(false) }}>
      {añadirComercios && usuario == userSingleton.getUser()?.id ? <>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => { setMostrarModalAñadir(true) }}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </> : <></>}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 60 }}>
          <TouchableOpacity style={{ zIndex: 5 }} onPress={() => setMostrarLista(false)}>
            <Image
              source={{
                uri: "https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png",
              }}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "row",
              marginLeft: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                width: '90%',
                height: 35,
                marginTop: 50,
                fontWeight: "700",
                fontSize: 30,
                lineHeight: 35,
              }}
            >
              {listaSeleccionada?.nombre}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "row",
              marginLeft: 20,
            }}
          >
            <Icon name="place" size={15} color="#888dc7"></Icon>
            <Text style={{ marginLeft: 5, fontWeight: "300", fontSize: 12 }}>
              {listaSeleccionada?.zona}
            </Text>
          </View>

          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "row",
              marginLeft: 20,
            }}
          >
            <Icon name="schedule" size={15} color="#888dc7"></Icon>
            <Text style={{ marginLeft: 5, fontWeight: "300", fontSize: 12 }}>
              Duracion estimada:{" "}
              {listaSeleccionada?.duracion == null ||
                listaSeleccionada?.duracion === ""
                ? " "
                : `${listaSeleccionada?.duracion} horas`}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "row",
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                width: "90%",
                flexWrap: 'wrap',
                marginTop: 50,
                fontWeight: "400",
                fontSize: 12,
              }}
            >
              {listaSeleccionada?.descripcion}
            </Text>
          </View>
          {cargando ?
            <View
              style={{
                marginTop: "25%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "",
              }}
            >
              <Image
                source={require("../../../assets/loading1.gif")}
                style={{ height: 60, width: 60 }}
              />
            </View>
            :

            <View style={{ marginLeft: 20 }}>{GenerarLista()}</View>
          }

        </View>
      </ScrollView>
      {mostrarModalAñadir ?
        <ModalAñadriComerciLista close={() => { setMostrarModalAñadir(false) }} Lista={listaSeleccionada} idUsuario={usuario} comercios={comercios} setComercios={setComercios} setCambios={setCambios} cambios={cambios} /> : <></>}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  lineaVertical: {
    height: "100%", // La línea ocupará toda la altura del View
    width: 1, // Grosor de la línea
    backgroundColor: "black", // Color de la línea
  }, addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  }, buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  }
});
