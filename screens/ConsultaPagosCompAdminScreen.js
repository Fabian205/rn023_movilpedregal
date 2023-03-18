import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import ListComprobantes from '../components/ListComprobantes';
import { useNavigation } from "@react-navigation/native";
import themeContext from '../config/themeContext'

const Separator = () => (
  <View style={styles.separator} />
);

const ConsultaPagosCompAdminScreen = (props) => {

  const nocomp = props.route.params.P1;
  
  const [datouser, setDatoUser] = useState("");

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
    fetch("https://nobasys.com/api/buscaComp.php", {
      //fetch("http://10.0.2.2:80/api/buscaComp.php", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comp: nocomp,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        if(responseJson=="No existen datos"){
          alert("Este comprobante no existe, regrese y vuelva a intentar!");
        }else{
          setDatoUser(responseJson);
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
          data={datouser}
          KeyExtractor={(item) => item.casa}        
          renderItem={({ item, index }) => <ListComprobantes item={item}/>}
          ListHeaderComponent = {() => 
            <>
              <Text style = {{fontWeight:'bold', fontSize: 18, marginBottom:5, textAlign:'center', color: 'grey'}}>                
                Comprobante {nocomp}
              </Text>
            </>            
          }          
        />
      </View>
      <Separator />           
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
  separator: {
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
export default ConsultaPagosCompAdminScreen