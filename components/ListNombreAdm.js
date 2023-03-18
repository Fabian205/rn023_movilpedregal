import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ListNombreAdm = ({ item }) => {
  const { cargo_adm, nomb_adm } = item;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Cargo:</Text>
        <Text style={styles.cargo}>{cargo_adm}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>
          Nombre:
        </Text>
        <Text style={styles.nombre}>{nomb_adm}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
  },
  title: {
    color: "grey",
    fontWeight: "bold",
  },
  cargo: {
    textAlign: "center",
    color: "grey",
    marginBottom: 5,
    fontSize: 14,
    paddingLeft: 40,
  },
  nombre:{
    paddingTop: 2,
    color: "grey",
    fontSize: 12,
    paddingLeft: 15,
  },
  text2: {
    fontSize: 12,
    color: "grey",
    paddingTop: 2
  },
});

export default ListNombreAdm;