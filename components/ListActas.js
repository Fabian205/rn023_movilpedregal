import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BotonImg3 from "./BotonImg3";
import { useNavigation } from "@react-navigation/native";

const ListActas = ({ item }) => {
    const navigation = useNavigation();
    const { id, titulo, doc, descripcion, imgResource } = item;
      
  return (
    <View style={styles.container}>
      <View>      
        <BotonImg3
          onPress={() => {
            navigation.navigate("ActasResoDescrip");
          }}         
        />
      </View>
      <View >        
        <Text style={styles.textTitle}>{titulo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 10,
  },
  textTitle: {
    paddingTop: 15,
    paddingBottom: 14,
    fontSize: 14,
    paddingLeft: 12,
    textAlign: "left",    
  },
});

export default ListActas;