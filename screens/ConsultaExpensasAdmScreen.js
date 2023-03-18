import { View, Text, SafeAreaView, FlatList, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Input } from '@rneui/themed';
import BotonImg from '../components/BotonImg';
import Boton from '../components/Boton';
import DateTimePicker from '@react-native-community/datetimepicker';
import ListComprobantes from '../components/ListComprobantes';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;

const ConsultaExpensasAdmScreen = () => {

  const[casa, setCasa] = useState(true);

  const[nocasa, setNocasa] = useState("");
  const[nocomp, setNocomp] = useState("");

  const [datouser, setDatoUser] = useState("");
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

  const onChangeNocasa = (value) => setNocasa(value);
  const onChangeNocomp = (value) => setNocomp(value);

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

  const buscaComp=()=>{
    navigation.navigate('ConsultaPagosCompAdmin', { P1: nocomp, P2: text, P3: textff})
    setNocomp("");
  };

  const limpiarCampos=()=>{
    setNocasa("");
    setNocomp("");
    setText("");
    setTextff("");
  }

  const buscar = () => {
    if(nocasa === "" && text === "" && textff === "" && nocomp === ""){
      alert('Ingrese los datos que correspondan antes de buscar');
    }else if( nocomp != ""){
      buscaComp();
      limpiarCampos();
    }else if( nocasa != "" && text === "" && textff === "" ){
      alert('Ingrese un período para buscar');
    }else if( nocasa === "" && text != "" && textff === "" ){
      alert('Ingrese el número de casa y la fecha final para buscar');
    }else if( nocasa === "" && text === "" && textff != "" && nocomp === ""){
      alert('Ingrese el número de casa y la fecha inicial para buscar');
    }else if( nocasa != "" && text != "" && textff === "" && nocomp === ""){
      alert('Ingrese la fecha final para buscar');
    }else if( nocasa != "" && text === "" && textff != "" && nocomp === ""){
      alert('Ingrese el número de casa y la fecha inicial para buscar');
    }else if( nocasa === "" && text != "" && textff != "" && nocomp === ""){
      alert('Ingrese el número de casa para buscar');
    }else if( nocasa != "" && text != "" && textff != "" && nocomp === ""){
      navigation.navigate('ConsultaPagosCasaAdmin', { P1: nocasa, P2: text, P3: textff})
      setNocasa("");         
    }else{
      alert('Algo esta mal vuelva a intentar')
    }
  };

  const limpiayasigna = () => {
    limpiarCampos();        
    setCasa(!casa);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View >
        <Text style={styles.title}>Consulta Pago de Expensas</Text>       
      </View>
      <Separator/>     
      <View style={{flexDirection: "row", width:'58%'}}>
        <Text style={{marginLeft:10, marginRight:20, color: 'indigo', paddingTop:5, color: theme.color}}>Consulte por:</Text>
        <Button         
          title={!casa ? 'comprobante' : '          casa          '}
          onPress={limpiayasigna}
          color= {!casa ? '#483d8b' : '#342a75'}
        />                                     
      </View>                       
      
      {casa ?(
        <>   
          <Text style = {{fontWeight:'bold', fontSize: 15, marginBottom:10, textAlign:'center', color: 'grey'}}>Consulta por comprobante</Text>
          <View style={{width:'35 %'}}>                                 
            <Input
              style={{ fontSize: 14, textAlign:'center', color: theme.color}}                  
              placeholder="No. Comp"
              value={nocomp}
              onChangeText={onChangeNocomp}
            />
          </View>          
        </>                              
      ) :
        <> 
          <Text style = {{fontWeight:'bold', fontSize: 15, marginBottom:10, textAlign:'center', color: 'grey'}}>Consulta por casa</Text>                  
          <View style={{width:'36%'}}> 
            <Input
              style={{ fontSize: 14, textAlign:'center', color: theme.color}}           
              placeholder="No. Casa"
              value={nocasa}
              onChangeText={onChangeNocasa}
            />          
          </View>

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
            mode = {modeff}
            is24Hour = {true}
            display = 'default'
            onChange = {onChange_ff}
            />
          )}        
        </>                
      }
      <View>
        <FlatList
          data={datouser}
          KeyExtractor={(item) => item.casa}        
          renderItem={({ item, index }) => <ListComprobantes item={item}/>}       
        />
      </View>
      <Separator/>
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
    marginVertical: 10,   
  },
  title:{
    marginTop: 10,
    fontWeight:'bold', 
    fontSize: 20, 
    textAlign:'center', 
    color: 'grey',
    paddingTop:10
  },
  text:{
    marginTop: 20,
    textAlign: "left",
    color: "indigo",
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});
export default ConsultaExpensasAdmScreen