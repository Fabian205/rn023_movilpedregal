import { View, Text, SafeAreaView, FlatList, StyleSheet, Platform, Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import ListCasa from '../components/ListCasa';
import Boton from '../components/Boton';
import BotonImg from '../components/BotonImg';
import { Input } from "@rneui/themed";
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

let output = "";
const EstadosCuentaScreen = (props) => {
  const mail = props.route.params.P1;

  const [datouser, setDatoUser] = useState("");
  const[ date, setDate] = useState(new Date());
  const[ dateff, setDateff] = useState(new Date());
  const[ mode, setMode] = useState('date');
  const[ modeff, setModeff] = useState('dateff');
  const[ show, setShow] = useState(false);
  const[ showff, setShowff] = useState(false);
  const[ text, setText] = useState('2011-12-01');
  const[ textff, setTextff] = useState("");

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  const onChange_fi = (event, selectedDate) =>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    if((tempDate.getMonth()+1) <= 9 && tempDate.getDate() <= 9){
      let fDate = tempDate.getFullYear() + '-' + '0' + (tempDate.getMonth() + 1) + '-' +  '0' + tempDate.getDate() ;
      setText(fDate)
    
    }else if((tempDate.getMonth()+1) >= 9 && tempDate.getDate() <= 9){
      let fDate = tempDate.getFullYear() + '-'  + (tempDate.getMonth() + 1) + '-' + '0' + tempDate.getDate() ;
      setText(fDate)
     
    }else if((tempDate.getMonth()+1) <= 9 && tempDate.getDate() >= 9){  
      let fDate = tempDate.getFullYear() +  '-' + '0' + (tempDate.getMonth() + 1) + '-'  + tempDate.getDate() ;
      setText(fDate)
     
    }else {
      let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' +  tempDate.getDate() ;
      setText(fDate)    
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  
  const onChange_ff = (eventff, selectedDate) =>{
    const currentDate = selectedDate || date;
    setShowff(Platform.OS === 'ios');
    setDateff(currentDate);
        
    let tempDateff = new Date(currentDate);

    if((tempDateff.getMonth()+1) <= 9 && tempDateff.getDate() <= 9){
      let fDateff = tempDateff.getFullYear() + '-' + '0' + (tempDateff.getMonth() + 1) + '-' +  '0' + tempDateff.getDate() ;
      setTextff(fDateff)
   
    }else if((tempDateff.getMonth()+1) >= 9 && tempDateff.getDate() <= 9){
      let fDateff = tempDateff.getFullYear() + '-'  + (tempDateff.getMonth() + 1) + '-' + '0' + tempDateff.getDate() ;
      setTextff(fDateff)
     
    }else if((tempDateff.getMonth()+1) <= 9 && tempDateff.getDate() >= 9){  
      let fDateff = tempDateff.getFullYear() +  '-' + '0' + (tempDateff.getMonth() + 1) + '-'  + tempDateff.getDate() ;
      setTextff(fDateff)

    }else {
      let fDateff = tempDateff.getFullYear() + '-' + (tempDateff.getMonth() + 1) + '-' +  tempDateff.getDate() ;
      setTextff(fDateff)
    }      
  }

  const showModeff = (currentModeff) => {
    setShowff(true);
    setModeff(currentModeff);
  }
  
  useEffect(() => {    
    fetch("https://nobasys.com/api/propiedad.php", {
      //fetch("http://10.0.2.2:80/api/propiedad.php", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mail,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        setDatoUser(responseJson);      
      })
      .catch((error) => {
      console.log(error);
    });
  }, []);

  
  const generaInforme = () => {
    for (let i = 0; i < datouser.length; i++) {     
      output = output + datouser[i].CASA;
    }   
    //console.log(output)
    if(textff === ""){
      alert('Ingrese una fecha final para obtener su reporte');
    }else{
    let url = "https://nobasys.com/api/ReportePHPPedregal.php?CASA=";
    //let url = "http://10.0.2.2:80/api/ReportePHPPedregal.php?CASA=";
    Linking.openURL(url + output + '&FECHA_INI=' + text + '&FECHA_FIN=' + textff);
    output="";
    setTextff("");
    }  
  };
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.flat}>
        <FlatList
        data={datouser}
        KeyExtractor={(item) => item.casa}        
        renderItem={({ item, index }) => <ListCasa item={item}/>}
        ListHeaderComponent ={() => <Text style = {{fontWeight:'bold', fontSize: 25, marginBottom:10, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 0 : 25}}>Estado de Cuenta </Text>}        
        />
      </View>     
      <View>
        <Text style={[styles.text, {color: theme.color}]}>Si desea obtener el saldo real de su cuenta no modifique la fecha inicial que es el inicio de actividades del Conjunto</Text>
      </View>
      <Separator />
      <View style={{flexDirection: "row", width:'88%'}}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder='2011-12-01'
          value={text}
        />
        <BotonImg
          onPress={() => showMode('date')}
        />        
      </View>
      
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value = {date}
          mode = {mode}
          is24Hour = {true}
          display = 'default'
          onChange = {onChange_fi}
        />)} 

      <View style={{flexDirection: "row", width:'88%',}}>
        <Input
          style={{ fontSize: 14, color: theme.color }}
          placeholder='Fecha final'
          value={textff}
        />
        <BotonImg
          onPress={() => showModeff('date')}
        />        
      </View>           
      {showff && (
        <DateTimePicker
          testID='dateTimePicker'
          value = {dateff}
          mode = {modeff}
          is24Hour = {true}
          display = 'default'
          onChange = {onChange_ff}
        />)}
      <Separator2 />
      <View>         
        <Boton 
          text="Generar Informe" 
          onPress={generaInforme}
        />    
        <Boton text="Home" 
          onPress={() => 
            {navigation.navigate("Home");
          }}
        />
        <Boton text="Atras" onPress={() => {navigation.goBack()}} />
      </View>     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,    
  },
  flat:{
    marginLeft:10,
    marginRight:10,
    padding: 10,
  },
  text:{
    textAlign: "left",
    fontSize: 12,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 10,
  },
  separator2: {
    marginVertical: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default EstadosCuentaScreen