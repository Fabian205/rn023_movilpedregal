import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import ListCasa from '../components/ListCasa';
import ListHistorial from '../components/ListHistorial';
import Boton from '../components/Boton';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

let output = "";
const HistorialPropiedadScreen = (props) => {
  const mail = props.route.params.P1;
  //const pass = props.route.params.P2;

  const [datouser, setDatoUser] = useState("");
  const[datohistorial, setDatoHistorial] = useState("");

  const navigation = useNavigation();
  const theme = useContext(themeContext);
  
  useEffect(() => {
    fetch("https://nobasys.com/api/propiedad.php", {
      //fetch("http://10.0.2.2:80/api/propiedad.php", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        setDatoUser(responseJson);
      })
      .catch((error) => {
      console.log(error);
  });
}, []);

const generaHistorial = () => {
  for (let i = 0; i < datouser.length; i++) {     
    output = output + datouser[i].CASA;
  }   

  fetch("https://nobasys.com/api/busca_hist.php", {
  //fetch("http://10.0.2.2:80/api/busca_hist.php", {
    method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",       
      },
      body: JSON.stringify({
        Departamento: output,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        if(responseJson==='La propiedad no existe o no hay registros para mostrar !!'){
          alert(responseJson);
        }else{
          setDatoHistorial(responseJson);
        }       
      })
      .catch((error) => {
      console.log(error);
  });
  output="";  
};

return (
  <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
    <View  style={styles.flat}>
      <FlatList
      data={datouser}
      KeyExtractor={(item) => item.casa}        
      renderItem={({ item, index }) => <ListCasa item={item}/>}
      ListHeaderComponent ={() => <Text style = {{fontWeight:'bold', fontSize: 23, marginBottom:2, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 2 : 5}}>Historial Propiedad </Text>}        
      />
    </View>
    <Pressable onPress={generaHistorial}>
      <Text style={[styles.text, {color: theme.color}]}>Ver Historial !</Text>
    </Pressable>
    <Separator />
    <View>
      <FlatList
      data={datohistorial}
      KeyExtractor={(item) => item.Propietario}        
      renderItem={({ item, index }) => <ListHistorial item={item}/>}      
      />
    </View>    
    <Separator2 />
    <View>            
      <Boton text="Home" 
        onPress={() => 
          {navigation.navigate("Home");
        }}
      />
    </View>
    <Boton text="Atras" onPress={() => {navigation.goBack()}} />
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  flat:{
    margin:10,
    padding: 15,
  },
  separator: {
    marginVertical: 5,
  },
  separator2: {
    marginVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text:{
    marginTop: 2,
    marginLeft: 10,
    textAlign: "left",
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

export default HistorialPropiedadScreen