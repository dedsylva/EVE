import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles  from "../styles/all-styles";

export default function Home ({ navigation }) {

  return (
    
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>EVE</Text>
      <Image style={{flex: 2, alignSelf: 'center', height: '30%', borderRadius: 90, width: '40%', marginTop: 50,}} source={require("../assets/logo.jpeg")}></Image>

      <View style={{marginTop: 20, flexDirection: 'row', marginLeft: 50, marginBottom: 10, display: 'flex', flexDirection: 'row'}}>

        <View style={{flex: 1, width: 100,}}>
          <TouchableOpacity onPress = { () => {navigation.push('Dashboard')}} style={styles.homeButton}>
            <Text style={styles.homeSpecialText}>Dashboard</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1,}}>
          <TouchableOpacity onPress = { () => {navigation.push('About')}} style={styles.homeButton}>
            <Text style={styles.homeSpecialText}>About</Text>
          </TouchableOpacity>
        </View>

      </View>

  </View>



  );

}
