import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Input } from "@rneui/themed";
import Boton from "../components/Boton";
import { useNavigation } from "@react-navigation/native";
import BotonImg2 from '../components/BotonImg2';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../config/themeContext'

const data =[
  { label: 'EFECTIVO', valor: 'EFECTIVO' },
  { label: 'DEPOSITO', valor: 'DEPOSITO' },
  { label: 'TRANSFERENCIA', valor: 'TRANSFERENCIA' },
  { label: 'CHEQUE', valor: 'CHEQUE' }
];

const datarp =[
  { label: 'WN', valorrp: 'WN' },
  { label: 'IM', valorrp: 'IM' },
  { label: 'MV', valorrp: 'MV' }
];

const Separator = () => <View style={styles.separator} />;
let output = "";
let output2 = "";
let output3 = "";
let output4 = "";

const RegistroAdmScreen = () => {

  const[comp, setComp] = useState("");
  const[casa, setCasa] = useState("");
  const[nomb, setNomb] = useState("");
  const[cedu, setCedu] = useState("");
  const[tele, setTele] = useState("");
  const[fech, setFech] = useState("");
  const[deta, setDeta] = useState("");
  const[fopa, setFopa] = useState("");
  const[repo, setRepo] = useState("");
  const[valo, setValo] = useState("");
  const[carg, setCarg] = useState("");
  const[dscg, setDscg] = useState("");

  const[datoscasa, setDatosCasa] = useState("");
  const[buscacasa, setBuscaCasa] = useState("");
  const [valor, setValor] = useState(null);
  const [valorrp, setValorrp] = useState(null);

  const onChangeComp = (value) => setComp(value);
  const onChangeCasa = (value) => setCasa(value);
  const onChangeNomb = (value) => setNomb(value);
  const onChangeCedu = (value) => setCedu(value);
  const onChangeTele = (value) => setTele(value);
  const onChangeFech = (value) => setFech(value);
  const onChangeDeta = (value) => setDeta(value);

  const onChangeValo = (value) => setValo(value);
  const onChangeCarg = (value) => setCarg(value);
  const onChangeDscg = (value) => setDscg(value);

  const onChangeBuscaCasa = (value) => setBuscaCasa(value);
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


  const getDatos=()=>{ 
    if(buscacasa==""){
      alert("Es necesario ingresar la propiedad.");
    }else{
      fetch("https://nobasys.com/api/getDatos.php", {
      //fetch("http://10.0.2.2:80/api/getDatos.php", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CASA: buscacasa       
        }),
      })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        if(responseJson== "La propiedad no existe"){
          alert("La Propiedad no ha sido encontrada, revise nuevamente");         
        }else{
          alert("Propiedad encontrada, pulse el botón agregar (+)");
          setDatosCasa(responseJson);
        }                       
      })
      .catch((error) => {
        console.log(error);
      });      
    }           
  };

  //Metodo para obtener la fecha actual con el formato requerido por la db
  const getCurrentDate2=()=>{
    var year = new Date().getFullYear();   
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    var fechaActual= year + '-' + month + '-' + date;//format: y-m-d;
    setFech(fechaActual);
  }

  const getCurrentDate=()=>{
    var year = new Date().getFullYear();   
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    if(month <= 9 && date <= 9){
      var fechaActual = year + '-' + '0' + month + '-' + '0' + date;
      setFech(fechaActual);
    }else if(month >= 9 && date <= 9){
      var fechaActual = year + '-' + month + '-' + '0' + date;
      setFech(fechaActual);
    }else if(month <= 9 && date >= 9){
      var fechaActual = year + '-' + '0' + month + '-'  + date;
      setFech(fechaActual);
    }else{
      var fechaActual= year + '-' + month + '-' + date;
      setFech(fechaActual);
    }    
  }

  const setDatos=()=>{
    if(buscacasa==""){
      alert("Antes de pulsar en agregar, es necesario buscar la propiedad.");
    }else{
    for (let i = 0; i < datoscasa.length; i++) {     
      output = output + datoscasa[i].CASA;               
    }
    setCasa(output);
    output="";

    for (let i = 0; i < datoscasa.length; i++) {     
      output2 = output2 + datoscasa[i].NOMBRES;               
    }
    setNomb(output2);
    output2="";

    for (let i = 0; i < datoscasa.length; i++) {     
      output3 = output3 + datoscasa[i].CEDULA;               
    }
    setCedu(output3);
    output3="";

    for (let i = 0; i < datoscasa.length; i++) {     
      output4 = output4 + datoscasa[i].TELEFONOS;               
    }
    setTele(output4);
    output4="";
    
    getCurrentDate();
    
    setCarg("0.00");
    setDscg("0.00");
    setBuscaCasa("");
  }

      
  };
  const limpiaCampos=()=>{
    setComp("");
    setCasa("");
    setNomb("");
    setCedu("");
    setTele("");
    setFech("");
    setDeta("");
    setFopa("");
    setRepo("");
    setValo("0.00");
    setCarg("0.00");
    setDscg("0.00");
  }

  const ingresaComp=()=>{
    if(comp == "" || casa == "" || nomb == "" ||  fech == "" ||  deta == ""  || valo == "" || carg == "" || dscg == ""){
      alert("Complete los campos obligatorios (*) para ingresar este comprobante"); 
    }else{
      fetch("https://nobasys.com/api/insert.php", {
      //fetch("http://10.0.2.2:80/api/insert.php", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        COMPROBANTE: comp,
        CASA: casa,
        NOMBRE: nomb,
        CEDULA: cedu,
        TELEFONO: tele,
        FECHA: fech,
        DETALLE: deta,
        FORMA_PAGO: valor,
        RECIBIDO_POR: valorrp,
        VALOR: valo,
        CARGOS: carg,
        DESCARGOS: dscg,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {     
        if (respuestaJson == "Ok") {      
          alert("Registro ingresado exitosamente!");    
        } else {
          alert("No registrado !!!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    limpiaCampos();   
  };


  return (
    <ScrollView style={[styles.container, {backgroundColor:theme.background}]}>
      <View>
        <Text style = {{fontWeight:'bold', fontSize: 20, marginBottom:10, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 120 : 15,}}>Registro de Comprobantes</Text>
      </View>
      <Separator />
      <View style={{flexDirection:"row", width:'55%'}}>
        <Input
          style={{ fontSize: 16, color: theme.color }}         
          placeholder="Propiedad No."
          value={buscacasa}
          onChangeText={onChangeBuscaCasa}
          />
        <Pressable onPress={getDatos}>        
          <Text style={[styles.text, {color:theme.color}]}>Buscar</Text>
        </Pressable>       
      </View>
      <View style={styles.inputGroup}>
        <Input          
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Comprobante(*)"
          value={comp}
          onChangeText={onChangeComp}
        />
        <View style={{flexDirection: "row", width:'80%'}}>
          <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Casa(*)"
          disabled={true}
          value={casa}
          onChangeText={onChangeCasa}
          />
          <BotonImg2
            text= "Agregar"
            onPress={setDatos}
          />
        </View>       
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Nombre(*)"
          disabled={true}
          value={nomb}
          onChangeText={onChangeNomb}
        />       
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Cédula"
          disabled={true}
          value={cedu}
          onChangeText={onChangeCedu}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Télefono"
          disabled={true}
          value={tele}
          onChangeText={onChangeTele}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Fecha(*)"
          value={fech}
          onChangeText={onChangeFech}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Detalle(*)"
          value={deta}
          onChangeText={onChangeDeta}
        />

        <View style={{flexDirection:"row"}}>
          <Dropdown
            style={[styles.dropdown, {color: theme.color}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}            
            search
            maxHeight={300}
            labelField="label"
            valueField="valor"
            placeholder="Forma de pago"
            searchPlaceholder="Buscar..."
            valor={valor}
            onChange={item => {
            setValor(item.valor);
            }}          
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="gray" name="creditcard" size={20} />
            )}
          />
        </View>        

        <View style={{flexDirection:"row"}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={datarp}
            search
            maxHeight={300}
            labelField="label"
            valueField="valorrp"
            placeholder="Recibido por"
            searchPlaceholder="Buscar..."
            valor={valorrp}
            onChange={item => {
            setValorrp(item.valorrp);
            }}          
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="gray" name="user" size={20} />
            )}
          />
        </View>
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Valor(*)"
          value={valo}
          onChangeText={onChangeValo}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Cargos(*)"
          value={carg}
          onChangeText={onChangeCarg}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Descargos(*)"
          value={dscg}
          onChangeText={onChangeDscg}
        />
        <Separator />
        <Boton text="Ingresar" onPress={ingresaComp} />
        <Boton text="Busca Datos" onPress={() =>{
            navigation.navigate("BuscaComprobantesAdm")
        }} />
        <Boton
        text="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
        />
      </View>
    </ScrollView>   
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  bienvenido: {
    textAlign: "center",
    color: "indigo",
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
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
  dropdown: {
    margin: 16,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width:'68%',
  },
  icon: {
    marginRight: 25,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'gray', 
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'gray',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'gray',
  },
});
export default RegistroAdmScreen;