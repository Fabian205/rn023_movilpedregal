import { StyleSheet, Text, View, Image, Switch, Platform } from 'react-native';
import image from '../assets/logoTranspar.png'
import { useNavigation } from "@react-navigation/native"
import Boton from '../components/Boton'
import React,{useState, useContext} from 'react'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext'

const Separator = () => (
  <View style={styles.separator} />
);
const Separator2 = () => (
  <View style={styles.separator2} />
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const[mode, setMode] = useState(false); 

  return(
    <View style={[styles.container, {backgroundColor:theme.background}]}>     
      <Text style={[styles.title, {color: theme.color}]}>Conjunto Habitacional</Text>
      <Text style={[styles.title, {color: theme.color}]}>"El Pedregal"</Text>
      <Text style={[styles.subtitle, {color: theme.color}]}>Av. Zamora y 5ta. Transv. Valle de los Chillos</Text>
      <Separator /> 
      <Separator />           
      <Image 
        source={image}
        style= {styles.image}
      />
      <Separator2 />         
      <View style={{flexDirection: "row", alignItems:'flex-start'}}>
        <Text style={[styles.text, {color: theme.color}]}>Dark Mode</Text>
        <Switch 
          value={mode} 
          onValueChange={(value)=> {
            setMode(value);
            EventRegister.emit("changeTheme", value);
          }}
          trackColor={{true: '#e0bcff', false: 'indigo'}}
        />        
      </View>
      <Separator/>
      <Separator/>
      <Separator/>     
      <Boton
        text="Login"
        onPress={() => {navigation.navigate('Login')}}                      
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: Platform.OS === 'ios' ? 30 : 22,
    color: 'indigo',
  },
  subtitle:{
    fontSize: Platform.OS === 'ios' ? 16 : 12,
    color: 'indigo'
  },
  versionapp:{
    marginTop: 10,
    fontSize: 10,
    color: 'indigo'
  },
  separator: {
    marginVertical: 24,
    borderBottomColor: 'indigo',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator2: {
    marginVertical: Platform.OS === 'ios' ? 10 : 5,
    borderBottomColor: 'indigo',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text:{
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 16 : 12,
    paddingTop: 15,
    paddingRight: 15,    
  },
});

export default HomeScreen;