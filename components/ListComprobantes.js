import { View, Text, StyleSheet } from "react-native";
import React,{useContext} from "react";
import themeContext from "../config/themeContext";

const ListComprobantes = ({ item }) => {
  const { CASA, COMPROBANTE, FECHA, DETALLE, VALOR, CARGOS, DESCARGOS } = item;
  const theme = useContext(themeContext);
  return (
    <>
    <View style={styles.container1}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color}}>Casa</Text>
        <Text style={{fontSize: 11, paddingLeft: 13, paddingBottom: 5, color:'gray'}}>{CASA}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color, paddingLeft: 30}}>Fecha</Text>
        <Text style={{fontSize: 11, paddingLeft: 13, paddingBottom: 5, color:'gray'}}>{FECHA}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color, paddingLeft: 30}}>Valor</Text>
        <Text style={{fontSize: 11, paddingLeft: 30, paddingBottom: 5, color:'gray'}}>{VALOR}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color, paddingLeft: 30}}>Crgs</Text>
        <Text style={{fontSize: 11, paddingLeft: 34, paddingBottom: 5, color:'gray'}}>{CARGOS}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color, paddingLeft: 30}}>Dscgs</Text>
        <Text style={{fontSize: 11, paddingLeft: 45, paddingBottom: 5, color:'gray'}}>{DESCARGOS}</Text>
      </View>     
    </View>

    <View style={styles.container2}>
      <View >
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color, paddingLeft: 5}}>Detalle:</Text>
        <Text style={{fontSize: 11, paddingLeft: 5, paddingBottom: 5, color:'gray'}}>{DETALLE}</Text>
      </View>     
    </View>
    </>   
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",  
  },
  container2: {
    flexDirection: "column",
    marginBottom:5, 
  },
});

export default ListComprobantes;