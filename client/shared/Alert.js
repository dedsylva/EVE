import React, { useState, useEffect, useRef } from 'react';
import { Button, FlatList, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../styles/all-styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


const Alert = ({ showAlert, setShowAlert, statusAlert, alertText }) => {

  const handleAlert = () => {
      setShowAlert(false);
    };

  useEffect(() => {
      setTimeout(() => setShowAlert(false), 1000);

    }, [showAlert]);


  return (
          <Modal animationType="slide"
            transparent={true}
            visible={showAlert}>

              <View style={ statusAlert ? styles.greenAlertContainer: styles.redAlertContainer}> 
                <TouchableOpacity  onPress = { handleAlert } style={ statusAlert ? styles.greenAlertRound : styles.redAlertRound}>
                  <View style={{flex: 1, paddingLeft: 10,}}>
                    {
                      statusAlert ? <AntDesign name="checkcircleo" size={25} color="white" />
                                  : <Feather name="alert-circle" size={25} color="white" />
                    }
                  </View>
                  <Text style={styles.alertText}>{alertText}</Text>
                </TouchableOpacity>
              </View>

          </Modal>

  )

}


export default Alert;