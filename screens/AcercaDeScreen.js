import { View, SafeAreaView, StyleSheet, Linking, Image } from 'react-native'
import React,{useContext} from 'react'
import BotonWeb from '../components/BotonWeb'
import BotonPhone from '../components/BotonPhone'
import BotonEmail from '../components/BotonEmail'
import BotonWsp from '../components/BotonWsp';
import BotonAtras from '../components/BotonAtras';
import image from '../assets/NobaSysFinalColor2.png'
import themeContext from '../config/themeContext'
import { useNavigation } from "@react-navigation/native";

const Separator = () => <View style={styles.separator} />;

const AcercaDeScreen = () => {

  const navigation = useNavigation();
  const handleWebPress = async() => {
    await Linking.openURL("https://nobasys.com");
  }
  const handleCallPress = async() => {
    await Linking.openURL("tel:+593988011608");
  }
  const handleEmailPress = async() => {
    await Linking.openURL("mailto:informacion@nobasys.com");
  }
  const handleWspPress = async() => {
    await Linking.openURL("https://wa.me/+593988011608");
  }

  const theme = useContext(themeContext);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>    
      <View style={styles.viewImg}>
        <Image 
          source={image}
          style={{width:320, height:95}}
        />
      </View>
      <Separator />     
      <BotonWeb text="www.nobasys.com" onPress={handleWebPress}/>
      <BotonPhone text="Phone" onPress={handleCallPress}/>
      <BotonEmail text="Email" onPress={handleEmailPress}/>
      <BotonWsp text="Whatsapp" onPress={handleWspPress}/>
      <Separator /> 
      <BotonAtras text="Atras" onPress={() => {navigation.goBack()}} />      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  separator: {
    marginVertical: 20,
  },
  
  viewImg: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AcercaDeScreen