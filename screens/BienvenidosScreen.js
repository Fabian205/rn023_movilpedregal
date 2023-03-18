import { View, Text, SafeAreaView, FlatList, Platform,StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Boton from "../components/Boton";
import ListItem from "../components/ListItem";
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const BienvenidosScreen = (props) => {
  const mail = props.route.params.P1;
  const pass = props.route.params.P2;

  const [casaname, setCasaName] = useState("");

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  useEffect(() => {    
    fetch("https://nobasys.com/api/read.php", {
      //fetch("http://10.0.2.2:80/api/read.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //console: console.log(mail,pass),
      body: JSON.stringify({
        email: mail,              
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        setCasaName(responseJson);
        //console.log('responseJson'+ ' ' + JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.log('error:' + ' ' + error);
      });
  }, []);
 
   //cuando hay varios elementos
        //ItemSeparatorComponent = {() => <View style={{ marginVertical:10, borderColor: '#00000050', borderWidth: 0.5,}}></View>}
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View>
      <FlatList
        style={styles.flat}
        data={casaname}
        KeyExtractor={(item) => item.CASA}
        renderItem={({ item, index }) => <ListItem item={item} />}
       
        ListHeaderComponent={() => (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              marginTop: 8,
              marginBottom: 10,
              textAlign: "center",
              color: "grey",
            }}
          >
            Bienvenido{" "}
          </Text>
        )}
      />
      </View>
      <Separator/>
      <View>
        <Boton 
        text="Continuar" 
        onPress={() =>{
          navigation.navigate('MenuInicio', { P1: mail, P2: pass});
        }} 
      />      
      <Boton
        text="Cambiar Contraseña"
        onPress={() => {
          navigation.navigate("CambiaContra", { P1: mail, P2: pass });
        }}
      />
      <Boton
        text="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      </View>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
  },
  flat: {
    margin: 10,
    paddingBottom: 10,
  },
  separator: {
    marginVertical: 5,
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default BienvenidosScreen;
