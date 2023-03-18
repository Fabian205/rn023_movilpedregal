import { View, Text, SafeAreaView, StyleSheet, Platform, Linking } from 'react-native'
import React,{useState, useEffect, useContext} from 'react'
import { useNavigation } from "@react-navigation/native";
import { Input } from "@rneui/themed";
import BotonImg from '../components/BotonImg';
import Boton from '../components/Boton';
import DateTimePicker from '@react-native-community/datetimepicker';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const ConsultaCuentasAdmScreen = () => {

  const [casa, setCasa] = useState("");
  const[ date, setDate] = useState(new Date());
  const[ dateff, setDateff] = useState(new Date());
  const[ mode, setMode] = useState('date');
  const[ modeff, setModeff] = useState('dateff');
  const[ show, setShow] = useState(false);
  const[ showff, setShowff] = useState(false);
  const[ text, setText] = useState('2011-12-01');
  const[ textff, setTextff] = useState("");

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
          backgroundColor: '#483d8b',           
        },
     })
  }, [navigation]);

  const generaInforme = () => {  
    if(textff === ""){
      alert('Ingrese una fecha final para obtener su reporte');
    }else{
    let url = "https://nobasys.com/api/ReportePHPPedregal.php?CASA=";
    //let url = "http://10.0.2.2:80/api/ReportePHPPedregal.php?CASA=";
    Linking.openURL(url + casa + '&FECHA_INI=' + text + '&FECHA_FIN=' + textff);
    setCasa("");
    setTextff("");
    }  
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View >
        <Text style={styles.title}>Estados de Cuenta</Text>
      </View>
      <View>
        <Text style={[styles.text, {color: theme.color}]}>Si desea obtener el saldo real de su cuenta no modifique la fecha inicial que es el inicio de actividades del Conjunto</Text>
      </View>
      <View style={{flexDirection:"row", width:'30%', marginLeft: 20}}>
        <Text style={{fontSize: 14, fontWeight:'bold', color: 'gray', textAlign:'center', paddingTop:10}}>Propiedad</Text>
        <Input
          style={{ fontSize: 16, marginLeft: 10, textAlign:'center', color: theme.color }}
          placeholder="No."
          value={casa}
          onChangeText={onChangeCasa}
        />
      </View>
      <View style={{flexDirection: "row", width:'88%',}}>
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
      <Separator />      
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
  text:{
    marginTop: 10,
    marginLeft: 15,
    textAlign: "left",
    fontSize: 12,
    marginBottom: 10, 
  },
  separator: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title:{
    marginTop:15,
    fontWeight:'bold', 
    fontSize: 20, 
    marginBottom:10, 
    textAlign:'center', 
    color: 'gray'
  }
});

export default ConsultaCuentasAdmScreen