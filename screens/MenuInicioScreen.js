import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";

import ListCasa from '../components/ListCasa';
import Boton from '../components/Boton';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const MenuInicioScreen = (props) => {
  const mail = props.route.params.P1;
  const pass = props.route.params.P2;
  
  const [datouser, setDatoUser] = useState('');

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
        body: JSON.stringify({
          email: mail,
        }),
      })  
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        setDatoUser(responseJson)          
      })
      .catch((error) => {
        console.log(error);
      });      
  },[]);

  const prueba =()=>{
    alert("prueba");
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.flat}>
        <FlatList
        data={datouser}
        KeyExtractor={(item) => item.casa}        
        renderItem={({ item, index }) => <ListCasa item={item}/>}
        ListHeaderComponent ={() => <Text style = {{fontWeight:'bold', fontSize: 25, marginBottom:10, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 2 : 25}}>Menu Inicio </Text>}        
      />
      </View>
      <Separator />
      <View style={{marginBottom:100}}>
        <Boton text="Estados de Cuenta" onPress={() => {navigation.navigate('EstadosCuenta', { P1: mail, P2: pass })}} />
        <Boton text="Consulta de Pagos" onPress={() => {navigation.navigate('ConsultaPagos', { P1: mail, P2: pass })}}/>
        <Boton text="Historial de la propiedad" onPress={() => {navigation.navigate('HistorialPropiedad', { P1: mail, P2: pass })}}/>
        {/*<Boton text="Documentos" onPress={() => {navigation.navigate('Documentos', { P1: mail, P2: pass })}}/>
        <Boton text="Administrador" onPress={() => {navigation.navigate('LoginAdmin', { P1: mail, P2: pass })}}/>
        <Boton text="Acerca de" onPress={() => {navigation.navigate('AcercaDe', { P1: mail, P2: pass })}}/> */}
        
        {/* <Boton text="Estados de Cuenta" onPress={prueba} />
        <Boton text="Consulta de Pagos" onPress={prueba}/>
        <Boton text="Historial de la propiedad" onPress={prueba}/> */}
        <Boton text="Documentos" onPress={prueba}/>
        <Boton text="Administrador" onPress={prueba}/>
        <Boton text="Acerca de" onPress={prueba}/>
        <Boton text="Home" onPress={() => {navigation.navigate('Home')}} />
        <Boton text="Atras" onPress={() => {navigation.goBack()}} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,      
  },
  flat:{
    margin:10,
    padding: 15,
  },
  separator: {
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default MenuInicioScreen