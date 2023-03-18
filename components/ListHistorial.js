import { View, Text, StyleSheet } from "react-native";
import React, {useContext} from "react";
import themeContext from '../config/themeContext'

const ListHistorial = ({ item }) => {

  const theme = useContext(themeContext);
  const {
    Departamento,
    Propietario,
    Historial,    
  } = item;
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <Text style={styles.text}>{Propietario}</Text>
      <Text style={styles.propiedad}>Propietario</Text>
      <Text style={styles.histo}>{Historial}</Text>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  ctaPedregal: {
    textAlign: "center",
    color: "indigo",
    fontSize: 12,
    marginBottom: 10,
  },
  flex:{
    flexDirection: 'row'
  },
  propiedad:{
    textAlign: "center",
    marginBottom: 10,
    color: "grey",
    fontWeight: "bold",
  },
  histo:{
    textAlign: "auto",
    marginBottom: 10,
    fontSize: 14,
    color: 'grey'
  },
  text: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 12,
    color: 'grey',
    textAlign: "center",
  },
  text2: {
    fontSize: 12,
  }, 
});

export default ListHistorial;