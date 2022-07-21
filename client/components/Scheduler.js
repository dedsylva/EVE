import React , {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity} from "react-native";
import dashStyle, {dashColors} from "../styles/dash";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListTodos from './plugins/ListTodos';
import ListPills from './plugins/ListPills';
import ListExams from './plugins/ListExams';
import { DARK_PURPLE } from '../styles/all-styles';
const axios = require('axios');
import { HOST } from '../constants';


const Scheduler = ({ navigation }) => {

  const baseURL= `http://${HOST}:3000`;
  

  // *** TODOS *** \\

  const [todos, setTodos] = useState([]);

  // Looking in Database for Current Todos 
  useEffect (() => {
    async function fetchTodos(){
      try {
        const res = await axios.get(`${baseURL}/api/todos`);

        let newTodo= [...todos];
        let newDate;

        for (let i = 0; i< res.data.length; i++) {
          // DD-MM-YYYY
          newDate = new Date(res.data[i].todoDate).toISOString().split('T')[0].split('-');
          // newDate = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
          newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];

          newTodo.push({ name: res.data[i].name, todoDate: newDate, key: i+1});
        }

        setTodos(newTodo);


      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchTodos();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once


  // *** PILLS *** \\

  // list of pills the user uses
  const [pills, setPills] = useState([]);

  // list of available pills
  const [availablePills, setAvailablePills] = useState([]);

  // Looking in Database for Current Available Pills 
  useEffect (() => {
    async function fetchPills(){
      try {
        const resAvailable = await axios.get(`${baseURL}/api/pills/available`);
        const res = await axios.get(`${baseURL}/api/pills/`);

        let newAvailablePill = [...availablePills];
        let newPill = [...pills];

        for (let i = 0; i< res.data.length; i++) {
          newPill.push({ name: res.data[i].name, frequency: res.data[i].frequency, key: i+1});
        }

        for (let i = 0; i< resAvailable.data.length; i++) {
          newAvailablePill.push({ name: resAvailable.data[i].name, frequency: resAvailable.data[i].frequency, key: i+1});
        }

        setAvailablePills(newAvailablePill);
        setPills(newPill);


      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchPills();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once




  // *** CALENDAR *** \\

  const [exams, setExams] = useState([]);

  /**  Be pretty on the calendar when you have Exams **/
  const [markedDates, setMarkedDates] = useState([]);
 
  // Looking in Database for Current Exams 
  useEffect (() => {
    async function fetchExams(){
      try {
        const res = await axios.get(`${baseURL}/api/exams`);

        let newExam = [...exams];
        let newDate;
        let datesToBeMarked = [];

        for (let i = 0; i< res.data.length; i++) {
          // DD-MM-YYYY
          newDate = new Date(res.data[i].examDate).toISOString().split('T')[0].split('-');
          // newDate = newDate[1]+'-'+newDate[2]+'-'+newDate[0];
          newDate = newDate[0]+'-'+newDate[1]+'-'+newDate[2];
          datesToBeMarked.push(newDate);
          // newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];

          newExam.push({ name: res.data[i].name, examDate: newDate, examType: res.data[i].examType, key: i+1});
        }

        setExams(newExam);

        // Including Today
        newDate = new Date().toISOString().split('T')[0].split('-');
        newDate = newDate[0]+'-'+newDate[1]+'-'+newDate[2];

        // Adds Today in the first entry (more pretty)
        datesToBeMarked.unshift(newDate);

        // Get unique dates (there might be more than one exam on the same day)
        datesToBeMarked = datesToBeMarked.filter((v, i, a) => a.indexOf(v) === i);

        setMarkedDates(datesToBeMarked);

      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchExams();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once


  useEffect (() => {

    let auxMarkedDates = {}; 

    // console.log(markedDates);


    if (markedDates.length > 0) {
      for (let i=0;i<markedDates.length;i++) {
        auxMarkedDates[markedDates[i]] = {selected: false, marked: true, selectedColor: DARK_PURPLE};
      }

      setMarkedDates(auxMarkedDates);

    }

  }, ) 

  
  const handleDashboard = () => {
    navigation.push('Dashboard'); //goes to Daily (put daily in stack)
  }

  const handleDaily = () => {
    navigation.push('Daily'); //goes to Daily (put daily in stack)
  }

  const handleNN = () => {
    navigation.push('NN'); //goes to NN (put NN in stack)
  }

  const handleAbout= () => {
    navigation.push('About'); //goes to About (put about in stack)
  }

  return (
    <View style={dashStyle.container}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={dashStyle.dashList}>

          <TouchableOpacity style={dashStyle.dashListItem} onPress={handleDashboard}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1  }}>
                <MaterialCommunityIcons name="tablet-dashboard" size={24} color="black" />
              </View>
              <View style={{flex: 7 }}>
                <Text style={dashStyle.headerTitle}> - Dashboard</Text>
              </View>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={dashStyle.dashListItem}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1  }}>
                <Ionicons name="ios-star-sharp" size={24} color={`${dashColors.darkPurple}`} />
              </View>
              <View style={{flex: 1  }}>
                <AntDesign name="calendar" size={24} color="black" />
              </View>
              <View style={{flex: 7 }}>
                <Text style={dashStyle.headerTitle}> - Scheduler </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={dashStyle.dashListItem} onPress={handleDaily}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1 }}>
                <Ionicons name="today" size={24} color="black" />
              </View>
              <View style={{flex: 7 }}>
                <Text style={dashStyle.headerTitle}> - Daily </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={dashStyle.dashListItem} onPress={handleNN}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1 }}>
                <FontAwesome5 name="network-wired" size={24} color="black" />
              </View>
              <View style={{flex: 7 }}>
                <Text style={dashStyle.headerTitle}> - NN </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={dashStyle.dashListItem} onPress={handleAbout}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1  }}>
                <AntDesign name="questioncircleo" size={24} color="black" />
              </View>
              <View style={{flex: 7 }}>
                <Text style={dashStyle.headerTitle}> - About </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{flex: 2}}>

          <ListExams
            exams={exams}
            setExams={setExams}
            markedDates={markedDates}
          />

          <View style={{borderTopWidth: 1, display: 'flex', flexDirection: 'row'}}>
            <View style={{flex:1 }}>
              <ListPills
                pills={pills}
                setPills={setPills}
                availablePills={availablePills}
                setAvailablePills={setAvailablePills}
              />

            </View>

            <View style={{flex:1}}>
              <ListTodos
                todos={todos}
                setTodos={setTodos}
              />

            </View>

          </View>

        </View>


      </View>
    </View>
  )
}

export default Scheduler;