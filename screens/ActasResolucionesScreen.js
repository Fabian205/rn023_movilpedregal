import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { SearchBar } from '@rneui/base';
import { useNavigation } from "@react-navigation/native";
import themeContext from '../config/themeContext'

const ActasResolucionesScreen = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    let img = "";
    
    useEffect(() =>{
        navigation.setOptions({
            headerLargeTitle: true,
            headerShown: true,
            headerTitle: "Actas y Resoluciones",
            headerTitleAlign: 'left',
            headerTintColor: "#008b8b",
            headerFontWeight: "bold",
            headerStyle: {
            backgroundColor: "#483d8b",
          },             
        });
    }, [navigation]);

    useEffect(() => {       
        fetch("https://nobasys.com/api/getActasResolu.php", {
          //fetch("http://10.0.2.2:80/api/getActasResolu.php", {
          method: "POST",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //email: mail,
            //password: pass,
          }),
        })
          .then((respuesta) => respuesta.json())
          .then((responseJson) => {
            setMasterDataSource(responseJson);
            setFilteredDataSource(responseJson);
            //console.log(JSON.stringify(responseJson)); 
          })
          .catch((error) => {
          console.log(error);
      });
    }, []) 

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.titulo
            ? item.titulo.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };
  
    const ItemView = ({ item }) => { 
    const doc = item.doc;         
      if(doc=="Acta"){
        img="actas32.png";
      }else if(item.doc=="Resolución"){
        img="resoluciones32.png"
      }else if(item.doc=="Balance"){
        img="balances32.png"
      }
      return (      
        <View style={{flexDirection:'row'}}>
            <Image
                style={styles.image}
                source={{uri: "https://nobasys.com/images/" + img}}
            />
            <Text 
              style={styles.itemStyle} 
              onPress={() => getItem(item)}
            >                                        
            {item.titulo.toUpperCase()}                  
          </Text>
        </View>        
      );
    }; 
  
    const ItemSeparatorView = () => {
      return (
        <View
          style={{
            height: 1.7,
            width: '100%',
            backgroundColor: 'gray'
          }}
        />
      );
    };
  
    const getItem = (item) => {
      const title = item.titulo;
      const des = item.descripcion;
      navigation.navigate('ActasResoDescrip',{P1: title, P2:des});
    };
  
    return (
      <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]} >
        <View >
          <SearchBar            
            round
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}          
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search..."
            value={search}
          />
        </View>
        <View style={styles.container2}>
          <FlatList                                                  
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />         
        </View>       
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Platform.OS === 'ios' ? 115 : 0,
  },
  container2: {
    padding: 15,
  },
  itemStyle: {
    padding: 10,
    color: 'gray',
  }, 
  inputContainerStyle: {
    backgroundColor: 'transparent',
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderTopColor: 'transparent',        
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default ActasResolucionesScreen