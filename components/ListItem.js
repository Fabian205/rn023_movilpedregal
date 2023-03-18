import { View, Text, StyleSheet } from "react-native";
import React, {useContext} from "react";
import themeContext from '../config/themeContext'

const ListItem = ({ item }) => {
  const theme = useContext(themeContext);
  const {
    NOMBRES,
    CASA,
    P_ALIC,
    PREDIO,
    CEDULA,
    TELEFONOS,
    EMAIL,
    HABITADO_POR,
    OBSERVACIONES,
  } = item;

  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <Text style={styles.text}>{NOMBRES}</Text>      
      <Text style={[styles.ctaPedregal, {color: theme.color}]}>Estimado copropietario recuerde que sus depósitos los puede realizar en la Cta.Cte. Banco de Guayaquil No. 40404910 a nombre de Conjunto Pedregal RUC: 1792484022001</Text>

      <Text style={styles.propiedad}>Propiedad No.</Text>
      <Text style={styles.propiedad_no}>{CASA}</Text>

      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: 78 }]}>P_Alic:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{P_ALIC}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: 74 }]}>Predio:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{PREDIO}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: 72 }]}>Cédula:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{CEDULA}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: Platform.OS === 'ios' ? 60 : 54 }]}>Teléfono:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{TELEFONOS}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: Platform.OS === 'ios' ? 82 : 85 }]}>Email:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{EMAIL}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.text3, {paddingRight: Platform.OS === 'ios' ? 30 : 16 }]}>Habitado por:</Text>
        <Text style={[styles.text2, {color: theme.color}]}>{HABITADO_POR}</Text>
      </View> 
      <Text style={[styles.text3, {paddingRight: 20, marginBottom:10 }]}>Observaciones:</Text>
      <Text style={[styles.text2, {color: theme.color}]}>{OBSERVACIONES}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  ctaPedregal: {
    textAlign: 'center',
    color: "indigo",
    fontSize: 11,
    marginBottom: 14,
  },
  flex:{
    flexDirection: 'row'
  },
  propiedad:{
    textAlign: "center",
    marginBottom: 10,
    color: "grey",
    fontSize: 18,
    fontWeight: "bold",
  },
  propiedad_no:{
    textAlign: "center",
    color: "grey",
    marginBottom: 10,
    fontSize: 18,  
  },
  text: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  text2: {
    fontSize: 12
  },
  text3:{
    color: 'grey', 
    fontWeight: 'bold'
  }
});

export default ListItem;