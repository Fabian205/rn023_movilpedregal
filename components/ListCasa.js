import { View, Text, StyleSheet } from "react-native";
import React, {useContext} from "react";
import themeContext from '../config/themeContext'

const ListCasa = ({ item }) => {
  const theme = useContext(themeContext);
  const { CASA, EMAIL } = item;

  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.propiedad}>Propiedad No.</Text>
        <Text style={styles.propiedad_no}>{CASA}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ paddingRight: 15, color: "grey", fontWeight: "bold" }}>
          Usuario:
        </Text>
        <Text style={styles.text2}>{EMAIL}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  propiedad: {
    paddingTop: 5,
    color: "grey",
    fontWeight: "bold",
  },
  propiedad_no: {
    textAlign: "center",
    color: "grey",
    marginBottom: 5,
    fontSize: 18,
    paddingLeft: 56,
  },
  text2: {
    fontSize: 12,
    color: "grey",
    paddingTop: 2
  },
});

export default ListCasa;