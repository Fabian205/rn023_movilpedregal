import { View, Text, StyleSheet } from "react-native";
import React,{useContext} from "react";
import themeContext from "../config/themeContext";

const Separator = () => <View style={styles.separator} />;

const ListPagosCasaAdmin = ({ item }) => {
  const { COMPROBANTE, FECHA, DETALLE, VALOR, CARGOS, DESCARGOS } = item;
  const theme = useContext(themeContext);
  return (
    <>
    <View style={styles.container1}>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold", color: theme.color }}>Comp</Text>
        <Text style={{fontSize: 12, paddingLeft: 5, paddingBottom: 5, color:'gray'}}>{COMPROBANTE}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold",color: theme.color, paddingLeft: 35}}>Fecha</Text>
        <Text style={{fontSize: 12, paddingLeft: 16, paddingBottom: 5, color:'gray'}}>{FECHA}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold",color: theme.color, paddingLeft: 25}}>Valor</Text>
        <Text style={{fontSize: 12, paddingLeft: 24, paddingBottom: 5, color:'gray'}}>{VALOR}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold",color: theme.color, paddingLeft: 22}}>Crgs</Text>
        <Text style={{fontSize: 12, paddingLeft: 25, paddingBottom: 5, color:'gray'}}>{CARGOS}</Text>
      </View>
      <View style={{ flexDirection:'column' }}>
        <Text style={{fontSize: 12,fontWeight: "bold",color: theme.color, paddingLeft: 18}}>Dscgs</Text>
        <Text style={{fontSize: 12, paddingLeft: 32, paddingBottom: 5, color:'gray'}}>{DESCARGOS}</Text>
      </View>     
    </View>

    <View style={styles.container2}>
      <View >
        <Text style={{fontSize: 12,fontWeight: "bold",color: theme.color}}>Detalle:</Text>
        <Text style={{fontSize: 12, paddingBottom: 5, color:'gray'}}>{DETALLE}</Text>
      </View>
      <Separator />     
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
  separator: {
    marginVertical: 10,
    marginLeft: 5,
    marginRight: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ListPagosCasaAdmin;