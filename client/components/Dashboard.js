import React , {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity} from "react-native";
import { Calendar } from 'react-native-calendars';
import dashStyle, {dashColors} from "../styles/dash";
import Ionicons from  'react-native-vector-icons/Ionicons';
import AntDesign from  'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from  'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from  'react-native-vector-icons/FontAwesome5';
import { graphTheme, DARK_PURPLE } from "../styles/all-styles";
import ListDashPills from './plugins/ListDashPills';
import ListDashExams from './plugins/ListDashExams';
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryArea, VictoryLabel, VictoryBar} from "victory-native";
const axios = require('axios');
import { HOST } from '../constants';
import Alert from '../shared/Alert';

const Dashboard = ({ navigation }) => {

  const baseURL= `http://${HOST}:3000`;

  const [weightData, setWeightData] = useState([]);
  const [bloodData, setBloodData] = useState([]);
  const [pulseData , setPulseData ] = useState([]);


   // TODO: The Low, Good, High Count should be accordingly with age ?
  const weightToPie = (data) => {
    let lbpCount = 0;
    let gbpCount = 0;
    let hbpCount = 0;

    // Only getting the last 30 days for Dashboard
    const lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    const interval = Math.abs(new Date() - lastMonth); // interval between today and last 30 days;
    console.log('lastMonth', lastMonth);

    data = data.filter((a) => { return Math.abs(new Date(a.heartDate) - lastMonth) < interval }); 



    for (let i = 0; i< data.length; i++) {
      if (data[i].diastolicData <= 60 && data[i].systolicData <= 90 ) {
        lbpCount ++;
      } else if (data[i].diastolicData >= 90 && data[i].systolicData >= 140) {
        hbpCount ++;
    } else {
        gbpCount ++;
    }
  }

    return { lbpCount, gbpCount, hbpCount };

  }


  // *** HEART RATE *** \\                      
  useEffect (() => {
    async function fetchHeart(){
      try {
        const res = await axios.get(`${baseURL}/api/hearts`);

        let lbp;
        let gbp;
        let hbp;
        let bp;

        let newBloodData = [...bloodData];
        let newPulseData = [...pulseData];
        let newDate;

        // Getting Blood Pressure History 
        bp = weightToPie(res.data);

        lbp = bp.lbpCount;
        gbp = bp.gbpCount;
        hbp = bp.hbpCount;

        newBloodData.push({ x: "Low", y: lbp });
        newBloodData.push({ x: "Good", y: gbp });
        newBloodData.push({ x: "High", y: hbp });



        setBloodData(newBloodData);

        for (let i = 0; i< res.data.length; i++) {
          // YYYY-MM-DD
          newDate = new Date(res.data[i].heartDate).toISOString().split('T')[0].split('-');
          newDate = newDate[2]+'-'+newDate[1];

          newPulseData.push({ x: newDate, y: parseInt(res.data[i].pulseData)});
        }

        setPulseData(newPulseData);


      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchHeart();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once



  // *** WEIGHTS *** \\                      
  useEffect (() => {
    async function fetchWeights(){
      try {
        const res = await axios.get(`${baseURL}/api/weights`);

        let newWeight = [...weightData];
        let newDate;
        let data;

        // Only getting the last 30 days for Dashboard
        const lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
        const interval = Math.abs(new Date() - lastMonth); // interval between today and last 30 days;

        data = res.data.filter((a) => { return Math.abs(new Date(a.weightDate) - lastMonth) < interval }); 

        for (let i = 0; i< data.length; i++) {
          // YYYY-MM-DD
          newDate = new Date(data[i].weightDate).toISOString().split('T')[0].split('-');
          newDate = newDate[2]+'-'+newDate[1];


          newWeight.push({ x: newDate, y: parseInt(data[i].weightValue), id: new Date(data[i].weightDate) - 0});

        }


        // sorting by year, month and day
        newWeight = newWeight.sort((a,b) => (a.id > b.id) ? 1: -1 ); 

        setWeightData(newWeight);

      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchWeights();
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


  // *** EXAMS *** \\
  const [exam, setExam] = useState([]);

useEffect (() => {
  async function fetchExams(){
    // Looks in database for all exams in current month
    try {
      const res = await axios.get(`${baseURL}/api/exams`); 

      if (res.data.results == 0) {
        console.log("No Exams for that Date!");
        beginAlert(0, "No Exams for that Date!");
        return;
      }

    if (res.status != 200) throw Error(res.status);

      let newExam = [... exam];
      let newDate;
      const currentMonth = new Date().toISOString().split('T')[0].split('-')[1];

      for (let i = 0; i< res.data.length; i++) {

        newDate = new Date(res.data[i].examDate).toISOString().split('T')[0].split('-');

        // Only current month exams
        if (newDate[1] !== currentMonth) { continue };

        newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];
        newExam.push({ 
          name: res.data[i].name, 
          examDate: newDate, 
          examType: res.data[i].examType, 
          key: i+1});
      }

      // newExam = newExam.filter(function(a) { return a.examDate[1] = currentMonth});

      setExam(newExam);


    } catch (err) {
      console.log(err);
    }
  }
  fetchExams();

  }, []) 


  const handleDaily = () => {
    navigation.push('Daily'); //goes to Daily (put daily in stack)
  }

  const handleScheduler= () => {
  navigation.push('Scheduler'); //goes to Scheduler (put scheduler in stack)
  }

  const handleNN = () => {
    navigation.push('NN'); //goes to NN (put NN in stack)
  }

  const handleAbout= () => {
    navigation.push('About'); //goes to About (put about in stack)
  }


  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState();
  const [statusAlert, setStatusAlert] = useState(false);

  const beginAlert = (status, text) => {

    // 1 === greenAlert
    if (status === 1) {
      setStatusAlert(true);
    } else {
      setStatusAlert(false);
    }

    setShowAlert(true);
    setAlertText(text);
  };

  return (


    <View style={dashStyle.container}>

      <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={dashStyle.dashList}>

            <TouchableOpacity style={dashStyle.dashListItem}>
              <View style={{display: 'flex', flexDirection: 'row' }}>
                <View style={{flex: 1  }}>
                  <Ionicons name="ios-star-sharp" size={24} color={`${dashColors.darkPurple}`} />
                </View>
                <View style={{flex: 1  }}>
                  <MaterialCommunityIcons name="tablet-dashboard" size={24} color="black" />
                </View>
                <View style={{flex: 7 }}>
                  <Text style={dashStyle.headerTitle}> - Dashboard</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={dashStyle.dashListItem} onPress={handleScheduler}>
              <View style={{display: 'flex', flexDirection: 'row' }}>
                <View style={{flex: 1 }}>
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

        <View style={{flex: 1}}>

              <Text style={dashStyle.graphTitle}> Weight - Last 30 Days</Text>
              <VictoryChart 
              theme={graphTheme}
              height={160}
              width={400}
              minDomain={{y: 80}}
              >
                <VictoryArea
                  style={{data: {fill: "#8641f4", fillOpacity: 0.3, stroke: "#8641f4", strokeWidth: 4}}}
                  data={weightData}
                  interpolation="natural"
                />


                <VictoryScatter 
                  data={weightData}
                  size={7}
                  style={{data: {fill: '#000000'}}}
                  labels={({datum}) => { datum.y}}
                  labelComponent={
                    <VictoryLabel
                    text={({ datum }) => datum.y} 
                    style={[
                      {fill: `${dashColors.darkPurple}`}
                    ]}
                    textAnchor={"middle"}
                    verticalAnchor={"end"}
                    />
                  }
                  />

                <VictoryAxis
                  style={{grid: {stroke: 'transparent'}}}
                />


              </VictoryChart>

              <View style={{marginTop: 20,}}>
                <Text style={dashStyle.graphTitle}> Blood Pressure - Last 30 Days</Text>

                <VictoryChart
                  domainPadding={20}
                  height={210}
                  width={350}
                >

                  <VictoryBar horizontal
                    cornerRadius={{ topLeft: 20, topRight: 20 }}
                    barWidth={30}
                    data={bloodData}
                    style={{
                      data: {
                        fill: ({ datum }) =>  
                          datum.x == "Low" ? "#dbd94b" 
                          : datum.x == "Good" ? "green"
                          : "tomato"}
                  }}

                    labels={({datum}) => { datum.y}}
                    labelComponent={
                      <VictoryLabel
                      text={({ datum }) => datum.y} 
                      style={[
                        {fill: "black"}
                      ]}
                      textAnchor={"middle"}
                      verticalAnchor={"end"}
                      />
                    }
                  />


                  <VictoryAxis
                    style={{grid: {stroke: 'transparent'}}}
                  />

                </VictoryChart>
              </View>


              <ListDashPills
                // TODO: FlatList is not scrollingg Brooo, We need scrooolling, we are only showing 3 pillsss mannn
                pills={pills.slice(0,3)}
                setPills={setPills}
              />

        </View>

        <View style={{flex: 1}}>

          <Calendar
            Arrow = "left"
            minDate={'2021-12-05'}
            maxDate={'2025-12-31'}
            // onDayPress={ (day) => beginAlert(0, "No Exams for that Date!")}
            monthFormat={'yyyy MM'}
            hideExtraDays={true}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            hideArrows={true}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableArrowLeft={false}
            disableArrowRight={false}
            enableSwipeMonths={false}
            markedDates={{toDay: {selected: true, marked: false, selectedColor: DARK_PURPLE},}}
            style={{backgroundColor: dashColors.background}}
            theme={{
              calendarBackground: dashColors.background,
              todayBackgroundColor: DARK_PURPLE,
              todayTextColor: 'white', 
              textSectionTitleColor: 'black', 
              arrowColor: 'black',
            }}

                renderHeader={(date) => {
                  const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
              ];
              const month = monthNames[date.getMonth()];
              const year = date.getFullYear();

              return (
                <Text style={dashStyle.subTitle}>{month} - {year}</Text>
              )
            }}
          />


            <ListDashExams exam={exam} setExam={setExam} />

        </View>


      </View>


      {/* Modal for alerting */} 
      <Alert 
        showAlert={showAlert} 
        setShowAlert={setShowAlert}
        statusAlert={statusAlert}
        alertText={alertText}
      />



    </View>
  )
}

export default Dashboard;