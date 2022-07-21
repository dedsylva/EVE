import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {Icon as FontAwesome} from 'react-native-vector-icons/FontAwesome';
import headerStyle from "../styles/headerStyles";

export default function Header ({ navigation, title }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={headerStyle.headerContainer}>

        <View style={headerStyle.textContainer}>
          <Text style={headerStyle.headerText}>{ title }</Text>
        </View>

        <View style={headerStyle.subOuterContainer}>
          <View style={headerStyle.subInnerContainer}>

            <View style={{flex: 3 }}>
              <Text style={headerStyle.headerUserText}>Deds</Text>
            </View>

            <TouchableOpacity style={{flex: 1, justifyContent: "flex-end"}}>
              <FontAwesome name="user-circle" size={24} color="green" />
            </TouchableOpacity> 
          </View>
        </View>

    </View>
  )
}

