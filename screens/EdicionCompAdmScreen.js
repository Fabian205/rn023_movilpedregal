import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Input } from "@rneui/themed";
import Boton from "../components/Boton";
import { useNavigation } from "@react-navigation/native";
import BotonImg2 from '../components/BotonImg2';
import themeContext from '../config/themeContext'

const Separator = () => <View style={styles.separator} />;
let output = "";
let output2 = "";
let output3 = "";
let output4 = "";
let output5 = "";
let output6 = "";
let output7 = "";
let output8 = "";
let output9 = "";
let output10 = "";
let output11 = "";
let output12 = "";

const EdicionCompAdmScreen = () => {

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

  const[comprob, setComprob] = useState("");
  const[buscacomp, setBuscaComp] = useState("");

  const onChangeComp = (value) => setComp(value);
  const onChangeCasa = (value) => setCasa(value);
  const onChangeNomb = (value) => setNomb(value);
  const onChangeCedu = (value) => setCedu(value);
  const onChangeTele = (value) => setTele(value);
  const onChangeFech = (value) => setFech(value);
  const onChangeDeta = (value) => setDeta(value);
  const onChangeFopa = (value) => setFopa(value);
  const onChangeRepo = (value) => setRepo(value);
  const onChangeValo = (value) => setValo(value);
  const onChangeCarg = (value) => setCarg(value);
  const onChangeDscg = (value) => setDscg(value);

  const onChangeBuscaComp = (value) => setBuscaComp(value);

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
  
  const getDatosComp=()=>{ 
    if(buscacomp==""){
      alert("Es necesario ingresar el número de comprobante.");
    }else{
      fetch("https://nobasys.com/api/getDatosComp.php", {
      //fetch("http://10.0.2.2:80/api/getDatosComp.php", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          COMPROBANTE: buscacomp       
        }),
      })
      .then((respuesta) => respuesta.json())
      .then((responseJson) => {
        alert("El comprobante ha sido encontrado, pulse + para agregar la información");
        setComprob(responseJson);       
      })
      .catch((error) => {
        console.log(error);
      });
      
    }           
  };

  const setDatosComp=()=>{
    for (let i = 0; i < comprob.length; i++) {     
      output = output + comprob[i].CASA;               
    }
    setCasa(output);
    output="";

    for (let i = 0; i < comprob.length; i++) {     
      output2 = output2 + comprob[i].NOMBRE;               
    }
    setNomb(output2);
    output2="";

    for (let i = 0; i < comprob.length; i++) {     
      output3 = output3 + comprob[i].CEDULA;               
    }
    setCedu(output3);
    output3="";

    for (let i = 0; i < comprob.length; i++) {     
      output4 = output4 + comprob[i].TELEFONO;               
    }
    setTele(output4);
    output4="";

    for (let i = 0; i < comprob.length; i++) {     
      output5 = output5 + comprob[i].COMPROBANTE;               
    }
    setComp(output5);
    output5="";

    for (let i = 0; i < comprob.length; i++) {     
      output6 = output6 + comprob[i].FECHA;               
    }
    setFech(output6);
    output6="";

    for (let i = 0; i < comprob.length; i++) {     
      output7 = output7 + comprob[i].DETALLE;               
    }
    setDeta(output7);
    output7="";
    
    for (let i = 0; i < comprob.length; i++) {     
      output8 = output8 + comprob[i].FORMA_PAGO;               
    }
    setFopa(output8);
    output8="";

    for (let i = 0; i < comprob.length; i++) {     
      output9 = output9 + comprob[i].RECIBIDO_POR;               
    }
    setRepo(output9);
    output9="";

    for (let i = 0; i < comprob.length; i++) {     
      output10 = output10 + comprob[i].VALOR;               
    }
    setValo(output10);
    output10="";
    
    for (let i = 0; i < comprob.length; i++) {     
      output11 = output11 + comprob[i].CARGOS;               
    }
    setCarg(output11);
    output11="";

    for (let i = 0; i < comprob.length; i++) {     
      output12 = output12 + comprob[i].DESCARGOS;               
    }
    setDscg(output12);
    output12="";

    setBuscaComp("");
  }

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
    setValo("");
    setCarg("");
    setDscg("");
  };

  const editaComp=()=>{
    if(comp == "" || casa == "" || nomb == "" ||  fech == "" ||  deta == ""  || valo == "" || carg == "" || dscg == ""){
      alert("Complete los campos obligatorios (*) para ingresar este comprobante"); 
    }else{
    fetch("https://nobasys.com/api/updatePagoAlic.php", {
      //fetch("http://10.0.2.2:80/api/updatePagoAlic.php", {
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
        FORMA_PAGO: fopa,
        RECIBIDO_POR: repo,
        VALOR: valo,
        CARGOS: carg,
        DESCARGOS: dscg,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => {
        //console.log(JSON.stringify(respuestaJson));       
        if (respuestaJson == "Ok") {      
          alert("Registro actualizado!");    
        } else {
          alert("El registrado no se ha actualizado !!!");
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
        <Text style = {{fontWeight:'bold', fontSize: 20, marginBottom:10, textAlign:'center', color: 'grey', marginTop:Platform.OS === 'ios' ? 120 : 15,}}>Edición de Comprobantes</Text>
      </View>
      <Separator />
      <View style={{flexDirection:"row", width:'55%'}}>
        <Input
          style={{ fontSize: 16, color: theme.color }}         
          placeholder="Comprobante No."
          value={buscacomp}
          onChangeText={onChangeBuscaComp}
          />
        <Pressable onPress={getDatosComp}>        
          <Text style={[styles.text, {color:theme.color}]}>Buscar</Text>
        </Pressable>       
      </View>
      <View style={styles.inputGroup}>
        <View style={{flexDirection: "row", width:'80%'}}>
          <Input
            style={{ fontSize: 12, color: theme.color }}
            placeholder="Comprobante(*)"
            value={comp}
            onChangeText={onChangeComp}
          />
          <BotonImg2
            text= "Agregar"
            onPress={setDatosComp}
          />
        </View>       
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Casa(*)"
          value={casa}
          onChangeText={onChangeCasa}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Nombre(*)"
          value={nomb}
          onChangeText={onChangeNomb}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Cédula"
          value={cedu}
          onChangeText={onChangeCedu}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Télefono"
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
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Forma_pago"
          value={fopa}
          onChangeText={onChangeFopa}
        />
        <Input
          style={{ fontSize: 12, color: theme.color }}
          placeholder="Recibido_por"
          value={repo}
          onChangeText={onChangeRepo}
        />
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
        <Boton 
          text="Actualizar"
          onPress={editaComp}
        />
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
  });
export default EdicionCompAdmScreen;