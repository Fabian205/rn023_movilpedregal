import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import ListPagosCasaAdmin from '../components/ListPagosCasaAdmin';
import themeContext from '../config/themeContext'

const BuscaCompAdminDetalleScreen = (props) => {
  const text = props.route.params.P1;
  const textff = props.route.params.P2;

  const [comprobantes, setComprobantes] = useState("");

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  useEffect(() =>{
    navigation.setOptions({
        headerLargeTitle: true,
        headerShown: true,
        headerTitle: "Administrador",
        headerTitleAlign: 'center',
        headerTintColor: '#008b8b',
        headerFontWeight: 'bold',
        headerStyle: {
        backgroundColor: '#483d8b'
       },
    })
  }, [navigation]);

  useEffect(() => {
    fetch("https://nobasys.com/api/getDatosCompFecha.php", {
      //fetch("http://10.0.2.2:80/api/getDatosCompFecha.php", {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaini: text,
          fechafin: textff,
        }),
      })
        .then((respuesta) => respuesta.json())
        .then((responseJson) => {
          setComprobantes(responseJson); 
          //console.log(responseJson);
        })
        .catch((error) => {
        console.log(error);
    });
  },[]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>      
      <View style={styles.flat}>
        <FlatList
          data={comprobantes}
          KeyExtractor={(item) => item.casa}        
          renderItem={({ item, index }) => <ListPagosCasaAdmin item={item}/>}
          ListHeaderComponent = {() =>
            <>
            <Text style={styles.title}>Lista de comprobantes de pago</Text>
            <Text style = {{fontWeight:'bold', fontSize: 12, marginBottom:10, textAlign:'center', color: 'grey'}}>
                Desde:{' ' + text + '   '}
                Hasta:{' ' + textff + ' '}
            </Text>
            </>                         
          }          
        />
      </View> 
      <View>
        <Text></Text>
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
  flat: {
    margin: 10,
    paddingBottom: 10,
  },
  title:{
    fontWeight:'bold', 
    fontSize: 20, 
    textAlign:'center', 
    color: 'grey',
    paddingTop:10
  },
});

export default BuscaCompAdminDetalleScreen