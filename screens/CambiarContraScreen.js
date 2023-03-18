import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";

import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import ListCasa from "../components/ListCasa";
import { Icon, Input } from "@rneui/themed";
import Boton from "../components/Boton";
import themeContext from '../config/themeContext'

const CambiarContraScreen = (props) => {
  const mail = props.route.params.P1;

  const [casaname, setCasaName] = useState("");
  const [datouser, setDatoUser] = useState("");
  
  const [password, setPassword] = useState("");
  const [confirmaPassword, setConfirmaPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmaPassword, setShowConfirmaPassword] = useState(false);

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  const onChangePassword = (value) => setPassword(value);
  const onChangeConfirmaPassword = (value2) => setConfirmaPassword(value2);

  useEffect(() => {
    fetch("https://nobasys.com/api/propiedad.php", {
      //fetch("http://10.0.2.2:80/api/read.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: mail,              
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        setCasaName(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cambioPass = () => {
    if (password == 0 || confirmaPassword == 0) {
      alert("Required Field is Missing");
    } else {
      if (password == confirmaPassword) {
        fetch("https://nobasys.com/api/updatePass.php", {
        //fetch("http://10.0.2.2:80/api/updatePass.php", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: mail,
            password: password,
          }),
        })
          .then((respuesta) => respuesta.json())
          .then((responseJson) => {
            setDatoUser(responseJson);
            alert('Your password has been update')
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log(error);
          });          
      } else {
        alert("The passwords do not match, please try again");       
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View>
        <FlatList
          data={casaname}
          KeyExtractor={(item) => item.CASA}
          renderItem={({ item, index }) => <ListCasa item={item} />}
          ListHeaderComponent={() => (
            <Text
              style={{
                marginTop: 30,
                fontWeight: "bold",
                fontSize: 25,
                marginBottom: 10,
                textAlign: "center",
                color: "grey",
              }}
            >
              Modificar contraseña{" "}
            </Text>
          )}
        />
      </View>
      <View style={styles.inputPass}>
        <Input
          style={{ fontSize: 14, marginTop: 10, color: theme.color}}
          placeholder="Ingrese su nueva contraseña"
          secureTextEntry={!showPassword}
          value={password}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          onChangeText={onChangePassword}
        />
      </View>
      <View style={styles.inputConfPass}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder="Confirme su nueva contraseña"
          secureTextEntry={!showConfirmaPassword}
          value={confirmaPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showConfirmaPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowConfirmaPassword(!showConfirmaPassword)}
            />
          }
          onChangeText={onChangeConfirmaPassword}
        />
      </View>      
      <View style={styles.buttons}>
        <Boton text="Modificar" onPress={cambioPass} />
        <Boton
          text="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Boton text="Atras" onPress={() => {navigation.goBack()}} />
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  viewFlatList: {
    marginHorizontal: 10,
    flex: 1,
    marginTop: 40,
  },
  inputPass: {
    marginTop: 20,
    marginBottom: 15,    
    backgroundColor: themeContext.backgroundColor,
  },
  inputConfPass: {
    marginBottom: 15,
    backgroundColor: themeContext.backgroundColor,
  },
  propiedad: {
    textAlign: "left",
    fontSize: 16,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  flat: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 40,
    marginBottom: 40,
  },
  title: {    
    textAlign: "center",
    color: "indigo",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  icon: {
    color: "#c1c1c1",
  },

  buttons: {
    flex: 3,
    marginTop: 50,
  },
});

export default CambiarContraScreen;
