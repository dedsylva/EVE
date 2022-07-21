import 'react-native-gesture-handler';
import React  from 'react';
import { View } from 'react-native';
import Drawer from './routes/drawer';
import styles from './styles/all-styles';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
      <View style={styles.container}>
        <Drawer />
        {/* <Dashboard/> */}
      </View>
  );

}
