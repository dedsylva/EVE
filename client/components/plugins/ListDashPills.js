import React, { useState } from 'react';
import { View, Text, FlatList} from 'react-native';
const axios = require('axios');
import { HOST } from '../../constants';
import dashStyle, { dashColors } from '../../styles/dash';
import {Icon as Material} from 'react-native-vector-icons/MaterialCommunityIcons';


const ListDashPills = ({pills, setPills}) => {

  const baseURL= `http://${HOST}:3000`;

  return (
    <View> 

      <View style={{marginBottom: 5}}>
        <Text style={dashStyle.graphTitle}> Pills </Text> 
      </View>

      <View>
        <FlatList
        data={pills}
        extraData={setPills}
        renderItem={({ item}) => (
          <View style={dashStyle.pillContainer}>
            {/* <Text style={dashStyle.items}> {item.name} - Take {item.quantityPerPeriod} per {item.Peiod}  </Text>  */}
            <View style={{flex: 1, marginLeft: 50}}>
              <Material name="pill" size={24} color={'black'} />
            </View>

            <View style={{flex: 2}}>
              <Text style={dashStyle.itemsName}> {item.name}</Text> 
            </View>

            <View style={{flex: 1}}>
              <Text style={dashStyle.itemsName}> - {item.frequency} </Text> 
            </View>
          </View>
        )}
        />
      </View>

    </View>
    );
}

export default ListDashPills;
