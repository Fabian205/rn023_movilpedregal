import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import ListCasa from '../components/ListCasa';
import Boton from "../components/Boton";
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const DocumentosScreen = (props) => {
  const mail = props.route.params.P1;
  
  const [datouser, setDatoUser] = useState("");

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

  return (
  <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
    <View>
      <FlatList
      data={datouser}
      KeyExtractor={(item) => item.casa}        
      renderItem={({ item, index }) => <ListCasa item={item}/>}
      ListHeaderComponent ={() => <Text style = {{fontWeight:'bold', fontSize: 25, marginBottom:10, textAlign:'center', color: 'grey', marginTop: 40}}>Documentos </Text>}        
    />
    </View>
    <Separator />
    <View>
      <Boton 
        text="Reglamento Interno" 
        onPress={() => {
          navigation.navigate("ReglamentoInterno");
        }}
      />
      <Boton 
        text="Actas y Resoluciones" 
        onPress={() => {
          navigation.navigate("ActasResoluciones");
        }}
      />
      <Boton
        text="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Boton text="Atras" onPress={() => {navigation.goBack()}} />
    </View>       
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  separator: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default DocumentosScreen
