import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useContext,useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import themeContext from '../config/themeContext'
import Boton from '../components/Boton';

const Separator = () => (
  <View style={styles.separator} />
);
const Separator2 = () => (
  <View style={styles.separator2} />
);

const ActasResolDescripScreen = (props) => {
  const title = props.route.params.P1;
  const des = props.route.params.P2;

  const navigation = useNavigation();
  const theme = useContext(themeContext);

  useEffect(() =>{
    navigation.setOptions({
        headerLargeTitle: true,
        headerShown: true,
        headerTitle: "Contenido",
        headerTitleAlign: 'left',
        headerTintColor: "#008b8b",
        headerFontWeight: "bold",
        headerStyle: {
        backgroundColor: "#483d8b",
      },             
    });
}, [navigation]);
  
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.background}]}>
      <Text style={[styles.subtitle, {color: theme.color}]}>{title}</Text>
      <View style={[styles.container2, {backgroundColor:theme.background}]}>
        <Text style={styles.descripcion}>{des}</Text>
      </View> 
      <Separator />      
      <View>             
        <Boton text="Home" 
          onPress={() => 
            {navigation.navigate("Home");
          }}
        />
        <Boton text="Atras" onPress={() => {navigation.goBack()}} />
      </View>
      <Separator2 />            
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 15,
    marginButton: 10        
  },
  container2: {  
    margin:10,
  },
  descripcion: {
    fontSize: 16,
    textAlign:'left',
    color: 'gray',
  },
  title:{
    fontWeight:'bold',  
    fontSize: 20,
    color: 'grey',
    marginTop: 25,
    textAlign:'center',
  },
  title2:{
    fontWeight:'bold',  
    fontSize: 20,
    color: 'grey',
    textAlign:'center',
  },
  subtitle:{
    marginTop:Platform.OS === 'ios' ? 115 : 0,
    fontSize: 18,
    color: 'indigo',
    textAlign:'center',
  }, 
  separator: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator2: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ActasResolDescripScreen