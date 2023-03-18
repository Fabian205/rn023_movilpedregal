import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import ListNombreAdm from '../components/ListNombreAdm';
import Boton from '../components/Boton';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const AdministradorScreen = (props) => {
  const email = props.route.params.P1;
  const password = props.route.params.P2;

  const [datouser, setDatoUser] = useState("");

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  useEffect(() => {
    fetch("https://nobasys.com/api/adminLogin.php", {
      //fetch("http://10.0.2.2:80/api/adminLogin.php", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_adm: email,
        pwd_adm: password,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        setDatoUser(respuestaJson);
      })
      .catch((error) => {
      console.log(error);
  });
}, []);

const permisoRegistro=()=>{
  if(email!="maggi7284" && password!="maggi7284"){
    alert("Su usuario no le permite esta opción!");
  }else{
    navigation.navigate('RegistroAdmScreen');
  }
};
const permisoEdicion=()=>{
  if(email!="maggi7284" && password!="maggi7284"){
    alert("Su usuario no le permite esta opción!");
  }else{
    navigation.navigate('EdicionCompAdmin');
  }
};

return (
  <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
    <View style = {{marginTop:Platform.OS === 'ios' ? 10 : 35,}}>
      <Text style = {{fontWeight:'bold', fontSize: 20, textAlign:'center', color: 'grey',}}>Pantalla del Administrador</Text>
    </View>
    <View style={styles.flat}>
      <FlatList
      data={datouser}
      KeyExtractor={(item) => item.nomb_adm}        
      renderItem={({ item, index }) => <ListNombreAdm item={item}/>}
      ListHeaderComponent ={() => <Text style = {{fontWeight:'bold', fontSize: 20, marginBottom:10, textAlign:'center', color: 'grey',}}>Bienvenido/a </Text>}        
      />
    </View>
    <Separator />
    <View style={{marginBottom:100}}>
      <Boton text="Estados de Cuenta" onPress={() => {navigation.navigate('ConsultaCuentasAdmScreen')}} />
      <Boton text="Consulta de Pagos" onPress={() => {navigation.navigate('ConsultaPagosAdmScreen')}}/>
      <Boton text="Consulta Expensas" onPress={() => {navigation.navigate('ConsultaExpensasAdmScreen')}}/>
      <Boton text="Consulta Historial" onPress={() => {navigation.navigate('ConsultaHistorialAdmScreen')}}/>
      <Boton text="Estado Cuenta Gral." onPress={() => {navigation.navigate('EstadosCuentaGralAdmScreen')}}/>
      <Boton text="Registro" onPress={permisoRegistro}/>
      <Boton text="Edición" onPress={permisoEdicion} />
      <Boton text="Atras" onPress={() => {navigation.goBack()}} /> 
    </View>
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
  bienvenido: {
    textAlign: "center",
    color: "indigo",
    fontSize: 16,
  },
  separator: {
    marginVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default AdministradorScreen