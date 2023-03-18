import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native'
import React,{useState, useEffect, useContext} from 'react'
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import Boton from '../components/Boton';
import ListHistorial from '../components/ListHistorial';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

const ConsultaHistorialAdmScreen = () => {
  
  const [casa, setCasa] = useState("");
  const[datohistorial, setDatoHistorial] = useState("");
  
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  
  const onChangeCasa = (value) => setCasa(value);

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

  const generaHistorial = () => {
    fetch("https://nobasys.com/api/busca_hist.php", {
    //fetch("http://10.0.2.2:80/api/busca_hist.php", {
      method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",       
        },
        body: JSON.stringify({
          Departamento: casa,
        }),
      })
        .then((respuesta) => respuesta.json())
        .then((responseJson) => {
          //console.log(responseJson);
          if(responseJson==='La propiedad no existe o no hay registros para mostrar !!'){
            alert(responseJson);
          }else{
            setDatoHistorial(responseJson);
          }                 
        })
        .catch((error) => {
        console.log(error);
    });  
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View >
        <Text style={styles.title}>Consulta Historial</Text>       
      </View>
      <View style={{flexDirection:"row", width:'30%', marginLeft: 20}}>
        <Text style={{fontSize: 14, fontWeight:'bold', textAlign:'center', color: 'gray', paddingTop:10}}>Propiedad</Text>
        <Input
          style={{ fontSize: 16, marginLeft: 10, textAlign:'center', color: theme.color}}
          placeholder="No."
          value={casa}
          onChangeText={onChangeCasa}
        />
      </View>
      <Pressable onPress={generaHistorial}>
        <Text style={[styles.text, {color: theme.color}]}>Ver el Historial de la propiedad!</Text>
      </Pressable>
      <Separator />
      <View>
        <FlatList
        data={datohistorial}
        KeyExtractor={(item) => item.Propietario}        
        renderItem={({ item, index }) => <ListHistorial item={item}/>}      
        />
      </View>    
      <Separator2 />
      <View>            
        <Boton text="Home" 
          onPress={() => 
          {navigation.navigate("Home");
        }}
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
  title:{
    marginTop: 2,
    fontWeight:'bold', 
    fontSize: 20, 
    textAlign:'center', 
    color: 'grey',
    paddingTop:10
  },
  separator: {
    marginVertical: 10,   
  },
  separator2: {
    marginVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth, 
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
export default ConsultaHistorialAdmScreen
