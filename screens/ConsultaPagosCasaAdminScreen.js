import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import ListPagosCasaAdmin from '../components/ListPagosCasaAdmin';
import themeContext from '../config/themeContext'

const ConsultaPagosCasaAdminScreen = (props) => {

  const nocasa = props.route.params.P1;
  const text = props.route.params.P2;
  const textff = props.route.params.P3;

  const [casauser, setCasaUser] = useState("");

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
    fetch("https://nobasys.com/api/getDatosCasaAdmin.php", {
      //fetch("http://10.0.2.2:80/api/getDatosCasaAdmin.php", {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          casa: nocasa,
          fechaini: text,
          fechafin: textff,
        }),
      })
        .then((respuesta) => respuesta.json())
        .then((responseJson) => {
          if(responseJson=="El casa no existe"){
            alert("No existen datos para mostrar, regrese y vuelva a intentar!");
          }else{
            setCasaUser(responseJson);
          }
        })
        .catch((error) => {
        console.log(error);
    });

  },[]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>      
      <View style={styles.flat}>
        <FlatList
          data={casauser}
          KeyExtractor={(item) => item.casa}        
          renderItem={({ item, index }) => <ListPagosCasaAdmin item={item}/>}
          ListHeaderComponent = {() => 
            <>
              <Text style = {{fontWeight:'bold', fontSize: 18, marginBottom:5, textAlign:'center', color: 'grey'}}>                
                Casa {nocasa}
              </Text>
              <Text style = {{fontWeight:'bold', fontSize: 12, marginBottom:10, textAlign:'center', color: 'grey'}}>
                Desde:{' ' + text + '   '}
                Hasta:{' ' + textff + ' '}
              </Text>
            </>            
          }          
        />
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
  text:{
    marginTop: 5,
    marginLeft: 20,
    textAlign: "left",
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

export default ConsultaPagosCasaAdminScreen