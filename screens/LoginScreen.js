import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import CheckBox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import Boton from "../components/Boton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "../assets/logoTranspar.png";

import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

let STORAGE_KEY = "@user_input";
let STORAGE_KEY2 = "@pass_input";

const LoginScreen = () => {
  const [isSelected, setSelection] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, email);
      await AsyncStorage.setItem(STORAGE_KEY2, password);
      //alert("Input value saved succesfully");
    } catch (err) {
      console.log(err);
    }
  };

  //Lee datos de AsyncStorage para usuarios que guardaron datos de inicio de seción
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      const value2 = await AsyncStorage.getItem(STORAGE_KEY2);
      if (value != null) {
        setEmail(value);
        setPassword(value2);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //way 1
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage succesfully cleared!");
    } catch (err) {
      console.log(err);
    }
  };

  //way2
  const clearStorage2 = () => {
    try {
      AsyncStorage.clear();
      alert("Storage succesfully cleared!");
    } catch (err) {
      console.log(err);
    }
  };

  //way3 utilizada  
  const clearStorageLogin = () => {
    try {
      AsyncStorage.removeItem(STORAGE_KEY);
      //alert("Storage succesfully cleared Login!");
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
    saveData(email, password);
  };

  useEffect(() => {
    readData();
  }, []);

  const Login2 =()=>{
    alert("Login here!");
  }
  const Login = () => {
    if(email=="" || password==""){
      alert("Ingrese un email y password para continuar");
    }else{
      fetch("https://nobasys.com/api/login.php", {
      //fetch("http://10.0.2.2:80/api/login.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        if (respuestaJson == "Ok") {
          navigation.navigate("Welcome", { P1: email, P2: password });
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
    <Separator />   
      <View style={styles.viewImg}>
        <Image source={image} />
      </View>
      <Separator />
      <Separator />
      <View style={styles.inputGroup}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder="Email"
          value={email}
          onChangeText={onChangeEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder="Enter your password"
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

      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={[styles.label, {color: theme.color}]}>
            Recordar datos {isSelected ? onSubmitEditing() : " "}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            style={styles.checkbox}
          />
          <Text style={[styles.label, {color: theme.color}]}>
            Borrar datos {isChecked ? clearStorageLogin() : " "}
          </Text>
        </View>
        <View>
          <Text></Text>
        </View>                       
      </View>
        <Separator/>
        <Separator2 />
        <Boton text="Ingresar" onPress={Login} />     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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

export default LoginScreen;