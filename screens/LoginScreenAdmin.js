import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import CheckBox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import Boton from "../components/Boton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

let STORAGE_KEY3 = "@usuario_input";
let STORAGE_KEY4 = "@pasword_input";

const LoginScreenAdmin = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigation = useNavigation();
  const theme = useContext(themeContext);

  const saveDataAdmin = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY3, email);
      await AsyncStorage.setItem(STORAGE_KEY4, password);
      //alert("Input value adm saved succesfully");
    } catch (err) {
      console.log(err);
    }
  };
  //Lee datos de AsyncStorage para usuarios que guardaron datos de inicio de seción
  const readDataAdmin = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY3);
      const value2 = await AsyncStorage.getItem(STORAGE_KEY4);
      if (value != null) {
        setEmail(value);
        setPassword(value2);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //way 1
  const clearStorage1 = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage succesfully cleared!");
    } catch (err) {
      console.log(err);
    }
  };

  //way2
  const clearStorageAdmin = () => {
    try {
      AsyncStorage.clear();
      alert("Storage succesfully cleared adm!");
    } catch (err) {
      console.log(err);
    }
  };

  //way3 usado
  const clearStorageAdmin2 = () => {
    try {
      AsyncStorage.removeItem(STORAGE_KEY3);
      alert("Storage succesfully cleared!");
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeEmail = (value) => setEmail(value);
  const onChangePassword = (value2) => setPassword(value2);

  const onSubmitEditing = () => {
    if (!email || !password) {
      return;
    }
    saveDataAdmin(email, password);
  };

  useEffect(() => {
    readDataAdmin();    
  }, []);
 
  const LoginAdmin = () => {
    if(email=="" || password==""){
      alert("Ingrese un email y password para continuar");
    }else{
      fetch("https://nobasys.com/api/loginAdministrador.php", {
      //fetch("http://10.0.2.2:80/api/loginAdministrador.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_adm: email,
        pwd_adm: password,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        //console.log(JSON.stringify(respuestaJson));
        if (respuestaJson == "Ok") {
          //console.log(JSON.stringify(datosuser));
          navigation.navigate("Administrador", { P1: email, P2: password });
        } else {
          alert("Usuario o contraseña no válidos, inténtelo otra vez !!!");
        }
      })
      .catch((error) => {
        console.log(error);
      });  
    }     
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor:theme.background}]}>
      <View>
        <Text style = {{fontWeight:'bold', fontSize: 25, marginBottom:10, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 10 : 20,}}>Administración</Text>
        <Text style = {{fontWeight:'bold', fontSize: 25, marginBottom:10, textAlign:'center', color: 'grey',}}>Login</Text>
      </View>
      <Separator />
      <View style={styles.inputGroup}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder="Usuario"
          value={email}
          onChangeText={onChangeEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={[styles.icon, {color: theme.color}]}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          onChangeText={onChangePassword}
        />
      </View>
      <Separator />
      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>
            Recordar datos {isSelected ? onSubmitEditing() : " "}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            style={styles.checkbox}
          />
          <Text style={styles.label}>
            Borrar datos {isChecked ? clearStorageAdmin2() : " "}
          </Text>
        </View>
        <View>
          <Text></Text>
        </View>
        <Separator2 />
        <Boton text="Ingresar" onPress={LoginAdmin} />
        <Boton
          text="Home"
          onPress={() => {
          navigation.navigate("Home");
          }}
        />
        <Boton text="Atras" onPress={() => {navigation.goBack()}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 15,
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  label: {
    marginRight: 4,
    marginLeft: 8,
    marginBottom: 5,
    color: "#008b8b",
  },
  icon: {
    color: "#c1c1c1",
  },
  separator: {
    marginVertical: 20,
  },
  separator2: {
    marginVertical: 28,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  viewImg: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreenAdmin;
