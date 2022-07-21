import React , {useState, useEffect}  from "react";
import { Text, View, Button } from "react-native";
import styles, {graphTheme, BACKGROUND, BLUE_BACKGROUND} from "../styles/all-styles";
import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis, VictoryLegend, VictoryPie, VictoryLabel, VictoryBar} from "victory-native";
const axios = require('axios');
import { HOST } from '../constants';

export default function Home ({ navigation }) {

  const baseURL= `http://${HOST}:3000`;

  const [weightData, setWeightData] = useState([]);
  const [bloodData, setBloodData] = useState([]);
  const [pulseData , setPulseData ] = useState([]);
  const [moodData, setMoodData] = useState([]);

  const handleDaily = () => {
    navigation.push('Daily'); //goes to Daily (put daily in stack)
  }

  const handleScheduler= () => {
  navigation.push('Scheduler'); //goes to Scheduler (put scheduler in stack)
  }

  const handleNN = () => {
    navigation.push('NN'); //goes to NN (put NN in stack)
  }

  // TODO: The Low, Good, High Count should be accordingly with age ?
  const weightToPie = (data) => {
    let lbpCount = 0;
    let gbpCount = 0;
    let hbpCount = 0;

    for (let i = 0; i< data.length; i++) {
      if (data[i].diastolicData <= 75 && data[i].systolicData <= 115 ) {
        lbpCount ++;
      } else if (data[i].diastolicData >= 85 && data[i].systolicData >= 130) {
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

        newBloodData.push({ x: `LBP - ${lbp}`, y: lbp});
        newBloodData.push({ x: `GBP - ${gbp}`, y: gbp});
        newBloodData.push({ x: `HBP - ${hbp}`, y: hbp});

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
        for (let i = 0; i< res.data.length; i++) {
          // YYYY-MM-DD
          newDate = new Date(res.data[i].weightDate).toISOString().split('T')[0].split('-');
          newDate = newDate[2]+'-'+newDate[1];

          newWeight.push({ x: newDate, y: parseInt(res.data[i].weightValue)});

        }

        setWeightData(newWeight);

      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchWeights();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once


  // *** MOOD *** \\                      
  useEffect (() => {
    async function fetchMood(){
      try {
        const res = await axios.get(`${baseURL}/api/moods`);

        let newMood= [...moodData];
        for (let i = 0; i< res.data.length; i++) {
          newMood.push({ x: res.data[i].moodData, y: res.data[i].moodCount});
        }

        setMoodData(newMood);

      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchMood();
  }, []) // If you don't put [] it keeps running. if you put the [], it runs only once



  return(

  <View style={{backgroundColor: BACKGROUND}}>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Button title='Daily' onPress={handleDaily} />
      </View>
      <View style={{flex: 1}}>
        <Button title='Scheduler' onPress={handleScheduler}/>
      </View>
      <View style={{flex: 1}}>
        <Button title='NN' onPress={handleNN}/>
      </View>
    </View>

    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={{flex: 1,borderTopWidth: 1}}>
        <Text style={styles.button}> Weight History</Text>
        <VictoryChart 
        theme={graphTheme}
        height={500}
        width={450}
        >
          <VictoryLine
            style={{data: {stroke: 'rgb(134, 65, 244)'}}}
            data={weightData}
          />

          <VictoryScatter 
            data={weightData}
            size={7}
            style={{data: {fill: '#000000'}}}
          />

          <VictoryAxis
            style={{grid: {stroke: 'transparent'}}}
          />

          <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: 'transparent'},
              grid: {stroke: 'grey'}
              
            }}
          />

        </VictoryChart>
      </View>

      <View style={{flex: 1, borderLeftWidth: 1,borderTopWidth: 1}}>
        <Text style={styles.button}> Blood Pressure History</Text>
        <VictoryPie
          data={bloodData}
          height={500}
          width={450}
          colorScale={["red", "#27A22C", "navy"]}
        />



        <VictoryLegend x={100} y={0} 
        centerTitle
        orientation="horizontal"
        gutter={30}
        style={{ border: { stroke: "black" }, title: {fontSize: 15} }}
        data={[
          {name: 'High ', symbol: {fill: "red"} },
          {name: 'Low' , symbol: {fill: "navy"} },
          {name: 'Good', symbol: {fill: "#27A22C"}},
        ]}
        />
      </View>
    

      <View style={{flex: 1, borderLeftWidth: 1,borderTopWidth: 1}}>
        <View>
          <Text style={styles.button}> Mood History </Text>
          <VictoryChart 
          theme={graphTheme}
          height={250}
          width={450}
          >
          <VictoryBar
            data={moodData}
            barRatio={0.6}
            domainPadding={{ x: 300 }}
            style={{
              data: {
                fill: '#414145'
              }
            }}
          />
          </VictoryChart>
        </View>

        <View style={{borderTopWidth: 1}}>
          <Text style={styles.button}> Heart Rate History </Text>
          <VictoryChart 
          theme={graphTheme}
          height={250}
          width={450}
          >
            <VictoryLine
              style={{data: {stroke: 'rgb(134, 65, 244)'}}}
              data={pulseData}
            />

            <VictoryScatter 
              data={pulseData}
              size={7}
              style={{data: {fill: '#000000'}}}
            />

            <VictoryAxis
              style={{grid: {stroke: 'transparent'}}}
            />

            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: 'transparent'},
                grid: {stroke: 'grey'}
                
              }}
            />

          </VictoryChart>
        </View>


      </View>

    </View>
  </View> 

  )
}
