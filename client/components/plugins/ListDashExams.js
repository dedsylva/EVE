import React , {useState } from 'react';
import { View, Text, FlatList} from 'react-native';
const axios = require('axios');
import { HOST } from '../../constants';
import dashStyle, { dashColors } from '../../styles/dash';
import {Icon as FontAwesome} from 'react-native-vector-icons/FontAwesome5';



const ListDashExams = ({exam, setExam}) => {
  const baseURL= `http://${HOST}:3000`;

return (
  <View>
    {

       exam.length > 0 && exam != undefined ?  (

    <FlatList
    data={exam}
    extraData={setExam}
    renderItem={({ item}) => (


        <View style={dashStyle.examContainer}>
          <View style={{flex: 1, margin: 30}}>
            <FontAwesome name="briefcase-medical" size={35} color={`${dashColors.niceWhite}`}/>
          </View>

          <View style={{flex: 3, display: 'flex', flexDirection: 'column',}}>
            <View style={{flex: 1}}>
              <Text style={dashStyle.examsName}>{item.name} - {item.examType}</Text> 
            </View>

            <View style={{flex: 1, marginLeft: 50,}}>
              <Text style={dashStyle.examsName}>{item.examDate} </Text> 
            </View>

          </View>

        </View>
    )}
    />

      ) : (

        <View style={dashStyle.noExamContainer}>

            <Text style={dashStyle.noExams}>No exams for this month !</Text> 

        </View>

      )

    }


  </View>


)

}


export default ListDashExams;