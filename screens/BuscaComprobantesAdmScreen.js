import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Input } from '@rneui/themed';
import BotonImg from '../components/BotonImg';
import Boton from '../components/Boton';
import DateTimePicker from '@react-native-community/datetimepicker';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
const Separator2 = () => <View style={styles.separator2} />;

const BuscaComprobantesAdmScreen = () => {

  const[ date, setDate] = useState(new Date());
  const[ dateff, setDateff] = useState(new Date());
  const[ mode, setMode] = useState('date');
  const[ modeff, setModeff] = useState('dateff');
  const[ show, setShow] = useState(false);
  const[ showff, setShowff] = useState(false);
  const[ text, setText] = useState("");
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

  const buscar=()=>{
    navigation.navigate('BuscaCompAdminDetalle', { P1: text, P2: textff})
  }

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

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View >
        <Text style={styles.title}>Buscar comprobantes</Text>          
        <Text style = {[styles.text, {color:theme.color}]}>Ingrese el período de busqueda</Text>    
      </View>
      <Separator/>
      
      <View  style={{flexDirection: "row", width:'48%'}}>                        
            <Input
              style={{ fontSize: 14, textAlign:'center', color: theme.color}}                  
              placeholder="Fecha inicial"
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
              />
              )
            }
          
          <View  style={{flexDirection: "row", width:'48%'}}>
            <Input
              style={{ fontSize: 14, textAlign:'center', color: theme.color}}                
              placeholder="Fecha final"
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
            mode = {mode}
            is24Hour = {true}
            display = 'default'
            onChange = {onChange_ff}
            />
          )}
      <Separator/>
      <Separator2/>
      <View style={{marginBottom:20}}>
        <Boton
          text='Buscar'
          onPress={buscar}
        />
        <Boton 
          text="Home" 
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
  separator: {
    marginVertical: 30,   
  },
  separator2: {
    marginVertical: 23,
    borderBottomWidth: StyleSheet.hairlineWidth, 
  },
  title:{
    fontWeight:'bold', 
    fontSize: 20, 
    textAlign:'center', 
    color: 'grey',
    paddingTop:10
  },
  text:{
    marginTop: 30, 
    textAlign: "left",
    color: "indigo",
    fontSize: 12,
    marginBottom: 10,
  },
});
export default BuscaComprobantesAdmScreen