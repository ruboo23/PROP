import react from "react";
import {
  Modal,
  TouchableNativeFeedback,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Comercio {
  nombre: string;
  calle: string;
}

export default function ModalMostrarLista({
  mostrarLista,
  setMostrarLista,
  listaSeleccionada,
}: any) {
  const [comercios, setComercios] = react.useState<Array<Comercio>>([
    { nombre: "Carniceria los bros", calle: "C/ General moscardon" },
    { nombre: "Carniceria los bros", calle: "C/ General moscardon" },
    { nombre: "Carniceria los bros", calle: "C/ General moscardon" },
  ]);

  const CirculoConNumero = (numero: number) => {
    const radioExterior = 30; // Radio del anillo exterior// Radio del anillo interior
    const grosorAnillo = 3; // Grosor del anillo

    return (
      <View style={styles.container}>
        <Svg height={2 * radioExterior} width={2 * radioExterior}>
          {/* Anillo exterior */}
          <Circle
            cx={radioExterior}
            cy={radioExterior}
            r={radioExterior - grosorAnillo / 2}
            stroke="#888dc7"
            strokeWidth={grosorAnillo}
            fill="transparent"
          />

          {/* Número en el centro */}
          <SvgText
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

  const LineaVertical = () => {
    return (
      <View style={{ marginLeft: 5, alignItems: "center", height: 30 }}>
        <Svg height="100%" width={10}>
          <Line
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
    for (var i = 0; i < comercios.length; i++) {
      lista.push(
        <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
          {CirculoConNumero(i + 1)}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            <Text
              style={{
                width: 164,
                fontWeight: "700",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {comercios[i].nombre}
            </Text>
            <Text
              style={{
                width: "100%",
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
            style={{ width: "100%", alignItems: "flex-start", marginLeft: 23 }}
          >
            {LineaVertical()}
          </View>
        );
      }
    }
    return lista;
  };

  return (
    <Modal visible={mostrarLista} style={{ marginLeft: 20 }}>
      <ScrollView>
        <View>
          <TouchableNativeFeedback onPress={() => setMostrarLista(false)}>
            <Image
              source={{
                uri: "https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png",
              }}
              style={{ width: 40, height: 40 }}
            ></Image>
          </TouchableNativeFeedback>
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
                width: 258,
                height: 32,
                marginTop: 50,
                fontWeight: "700",
                fontSize: 30,
                lineHeight: 31.8,
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
              Ruzafa
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
              {listaSeleccionada?.tiempo == null ||
              listaSeleccionada?.tiempo === ""
                ? " "
                : `${listaSeleccionada?.tiempo} horas`}
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
                width: "100%",
                height: 28,
                marginTop: 50,
                fontWeight: "400",
                fontSize: 12,
                lineHeight: 31.8,
              }}
            >
              {listaSeleccionada?.descripcion}
            </Text>
          </View>

          <View style={{ marginLeft: 20 }}>{GenerarLista()}</View>
        </View>
      </ScrollView>
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
  },
});