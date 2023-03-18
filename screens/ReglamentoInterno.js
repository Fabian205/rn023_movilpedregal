import React,{useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";

const ReglamentoInterno = () => {

  const navigation = useNavigation();
  useEffect(() =>{
     navigation.setOptions({
         headerLargeTitle: true,
         headerShown: true,
         headerTitle: "Reglamento interno",
         headerTitleAlign: 'center',
         headerTintColor: '#008b8b',
         headerFontWeight: 'bold',
         headerStyle: {
          backgroundColor: '#483d8b'
        },
     })
  }, [navigation]);


  return (
    <View style={styles.container}>
      <WebView
          bounces={false}
          scrollEnabled={false} 
          source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://www.nobasys.com/RegIntCop.pdf' }} />
    </View>
  )
}

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop:Platform.OS === 'ios' ? 115 : 0,
    },
    text:{
      fontWeight:'bold', 
      fontSize: 25, 
      marginBottom:10, 
      textAlign:'center', 
      color: 'grey' 
    },
  });
export default ReglamentoInterno
