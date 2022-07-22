import React , {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator} from "react-native";
import VideoPlayer from 'react-native-video-player';
import dashStyle, {dashColors} from "../styles/dash";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryArea, VictoryLabel, VictoryLegend} from "victory-native";
import styles,  { graphTheme, DARK_PURPLE } from "../styles/all-styles";
const axios = require('axios');
import { HOST } from '../constants';
import Alert from '../shared/Alert';

const Daily = ({ navigation }) => {


  const baseURL= `http://${HOST}:3000`;

  const [weightData, setWeightData] = useState([]);
  const [systolicData, setSystolicData] = useState([]);
  const [diastolicData, setDiastolicData] = useState([]);
  const [pulseData , setPulseData ] = useState([]);


  const [showWeightModal, setShowWeightModal] = useState([]);
  const [weightScale, setWeightScale] = useState();
  const [loadingWeight, setLoadingWeight] = useState(false);
  const [gotWeight, setGotWeight] = useState();
  const [getWeightData, setGetWeightData] = useState(false);
  const [userPutScale, setUserPutScale] = useState(false);


  const [showBPModal, setShowBPModal] = useState([]);
  const [BPPulse, setBPPulse] = useState();
  const [BPDiastolic, setBPDiastolic] = useState();
  const [BPSystolic, setBPSystolic] = useState();
  const [loadingBP, setLoadingBP] = useState(false);
  const [gotBP, setGotBP] = useState();
  const [getBPData,setGetBPData ] = useState(false);
  const [userPutMonitor,setUserPutMonitor] = useState(false);



  
  // *** HEART RATE *** \\                      
  useEffect ( () => {
    async function fetchHeart(){
      try {
        const res = await axios.get(`${baseURL}/api/hearts`);

        let newSystolicData = [...systolicData];
        let newDiastolicData = [...diastolicData];
        let newPulseData = [...pulseData];
        let newDate;

        for (let i = 0; i< res.data.length; i++) {
          // YYYY-MM-DD
          newDate = new Date(res.data[i].heartDate).toISOString().split('T')[0].split('-');
          newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0].slice(2,4);

          newPulseData.push({ x: newDate, y: parseInt(res.data[i].pulseData), id: new Date(res.data[i].heartDate) - 0});
          newSystolicData.push({ x: newDate, y: parseInt(res.data[i].systolicData), id: new Date(res.data[i].heartDate) - 0});
          newDiastolicData.push({ x: newDate, y: parseInt(res.data[i].diastolicData), id: new Date(res.data[i].heartDate) - 0});
        }

        setPulseData(newPulseData.sort((a,b) => (a.id > b.id) ? 1: -1 ));
        setSystolicData(newSystolicData.sort((a,b) => (a.id > b.id) ? 1: -1 ));
        setDiastolicData(newDiastolicData.sort((a,b) => (a.id > b.id) ? 1: -1 ));


      } catch (err) {
        console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
        console.log(err.message);
      } 
    }
    fetchHeart();
  }, [getBPData]) // If you don't put [] it keeps running. if you put the [], it runs only once



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
          newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0].slice(2,4);

          newWeight.push({ x: newDate, y: parseInt(res.data[i].weightValue), id: new Date(res.data[i].weightDate) - 0});
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
  }, [getWeightData]) // If you don't put [] it keeps running. if you put the [], it runs only once

  const handleDashboard = () => {
    navigation.push('Dashboard'); //goes to Daily (put daily in stack)
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


  const handleBP = async () => {
    setShowBPModal(true);
    setLoadingBP(true);
    setUserPutMonitor(true);

    try {
      const res = await axios.get(`http://${HOST}:81/heart`);

      if (res.status !== 200) {
        handleCloseBPModal();
        beginAlert(0, 'Blood Pressure Failed! Please Try Again.');
      }
      else { 
        setLoadingBP(false);
        setGotBP(true);
        setBPPulse(res.data.Pulse.split('.')[0]);
        setBPDiastolic(res.data.Diastolic.split('.')[0]);
        setBPSystolic(res.data.Systolic.split('.')[0]);
      }

      console.log(res.data);
      console.log(res.status);


    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
      handleCloseBPModal();
      beginAlert(0, 'Fail getting Blood Pressure! Please Try Again.');
    }

  }


  const handleWeight= async () => {
    setShowWeightModal(true);
    setLoadingWeight(true);
    setUserPutScale(true);

    try {
      const res = await axios.get(`http://${HOST}:81/weight`);

      if (res.status !== 200) {
        handleCloseWeightModal();
        beginAlert(0, 'Fail getting Weight! Please Try Again.');
      }
      else { 
        setLoadingWeight(false);
        setGotWeight(true);
        setWeightScale(res.data.Weight);
      }

      console.log(res.data);
      console.log(res.status);


    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
      handleCloseWeightModal();
      beginAlert(0, 'Fail getting Weight! Please Try Again.');
    }

  }

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState();
  const [statusAlert, setStatusAlert] = useState(false);

  const beginAlert = (status, text) => {

    // 1 === greenAlert (success)
    if (status === 1) {
      setStatusAlert(true);
    } else if (status === 0 ) { // 0 === redAlert (something failed)
      setStatusAlert(false);
    }

    setShowAlert(true);
    setAlertText(text);
  };


  const handleCloseWeightModal = () => {
    setLoadingWeight(false);
    setGotWeight(false);
    setWeightScale(0);
    setShowWeightModal(false);
    setUserPutScale(false);
  }

  const addWeightFromScale = async () => {

    let newDate;
    let data;
    // YYYY-MM-DD
    newDate = new Date();
    console.log({ name: 'Dedsylva', weightDate: newDate, weightValue: weightScale });

    data = ({ name: 'Dedsylva', weightDate: newDate, weightValue: weightScale });

    try {
      const res = await axios.post(`${baseURL}/api/weights`, data , {
        headers: {
          Accept: 'application/json',
        }
      
      });


      beginAlert(1, "Data Added!");

      setGetWeightData(true);
      handleCloseWeightModal();

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    }

  }

  const handleCloseBPModal = () => {
    setLoadingBP(false);
    setGotBP(false);
    setBPPulse(0);
    setBPDiastolic(0);
    setBPSystolic(0);
    setShowBPModal(false);
    setUserPutMonitor(false);
    setUserPutScale(false);
  }


  const addBPFromMonitor = async () => {

    let newDate;
    let data;
    // YYYY-MM-DD
    newDate = new Date();

    data = ({ 
      name: 'Dedsylva',
      heartDate: newDate, 
      systolicData: BPSystolic, 
      diastolicData: BPDiastolic, 
      pulseData: BPPulse, 
    });


    console.log('data');
    console.log(data);

    try {
      const res = await axios.post(`${baseURL}/api/hearts`, data , {
        headers: {
          Accept: 'application/json',
        }
      });

      beginAlert(1, "Weight Added!");

      setBPDiastolic([]);
      setBPSystolic([]);
      setBPPulse([]);
      setGetBPData(true);
      handleCloseBPModal();

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    }

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

            <TouchableOpacity style={dashStyle.dashListItem} onPress={handleScheduler}>
              <View style={{display: 'flex', flexDirection: 'row' }}>
                <View style={{flex: 1 }}>
                  <Entypo name="calendar" size={24} color="black" />
                </View>
                <View style={{flex: 7 }}>
                  <Text style={dashStyle.headerTitle}> - Scheduler </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={dashStyle.dashListItem}>
              <View style={{display: 'flex', flexDirection: 'row' }}>
                <View style={{flex: 1  }}>
                  <Entypo name="star" size={24} color={`${dashColors.darkPurple}`} />
                </View>
                <View style={{flex: 1  }}>
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

        {/* Second Portion of the Screen */}
        <View style={{flex: 2}}>

          {/* Graph of Weights */}
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, flexGrow: 2,}}>
              <Text style={dashStyle.graphTitle}> Weight</Text>
              <VictoryChart 
              theme={graphTheme}
              height={190}
              width={550}
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
                  interpolation="natural"
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
            </View>

            {/* Weights */}
            <View style={{flex: 1,}}>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => setShowWeightModal(true)} 
                >

                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View style={{flex: 1,}}>
                  <AntDesign style={{alignSelf: 'center', borderWidth: 2, borderRadius: 50, marginLeft: 20,}} name="plus" size={70} color={'black'}/>
                  </View>
                  <View style={{flex: 2,}}>
                  <Text style={{textAlign: "center", fontSize: 40, }}> Weight </Text>
                  </View>
                </View>

              </TouchableOpacity>
            </View>


          </View>


          {/* Graph of Blood Pressure */}
          <View style={{display: 'flex', flexDirection: 'row', }}>
            <View style={{flex: 1, flexGrow: 2,}}>
              <Text style={dashStyle.graphTitle}> Blood Pressure </Text>
              <VictoryChart 
              theme={graphTheme}
              height={190}
              width={550}
              minDomain={{y: 40}}
              maxDomain={{y: 130}}
              >

                  <VictoryArea
                    style={{data: {fill: "red", fillOpacity: 0.3, stroke: "red", strokeWidth: 4}}}
                    data={systolicData}
                    interpolation="natural"
                  />

                  <VictoryArea
                    style={{data: {fill: "yellow", fillOpacity: 0.3, stroke: "yellow", strokeWidth: 4}}}
                    data={diastolicData}
                    interpolation="natural"
                  />


                <VictoryAxis
                  style={{grid: {stroke: 'transparent'}}}
                />

                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: {stroke: 'transparent'},
                  }}
                />

                <VictoryLegend x={170} y={0} 
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={{ border: { stroke: "black" }, title: {fontSize: 15} }}
                data={[
                  {name: 'Systolic', symbol: {fill: "red"} },
                  {name: 'Diastolic', symbol: {fill: "#dbd94b"}},
                ]}
                />


              </VictoryChart>

              <VictoryChart 
              theme={graphTheme}
              height={200}
              width={550}
              minDomain={{y: 80}}
              maxDomain={{y: 100}}
              >

                  <VictoryArea
                  style={{data: {fill: "green", fillOpacity: 0.3, stroke: "green", strokeWidth: 4}}}
                  data={pulseData}
                  interpolation="natural"
                />

                <VictoryLegend x={200} y={30} 
                centerTitle
                orientation="horizontal"
                gutter={30}
                style={{ border: { stroke: "black" }, title: {fontSize: 15} }}
                data={[
                  {name: 'Heart Pulse' , symbol: {fill: "green"} },
                ]}
                />

              </VictoryChart>


            </View>

            {/* Blood Monitor */}
            <View style={{flex: 1, paddingTop: 50,}}>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={() => setShowBPModal(true)} 
                >
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View style={{flex: 1,}}>
                  <AntDesign style={{alignSelf: 'center', borderWidth: 2, borderRadius: 50, marginLeft: 20,}} name="plus" size={70} color={'black'}/>
                  </View>
                  <View style={{flex: 2,}}>
                  <Text style={{textAlign: "center", fontSize: 40, }}> Blood </Text>
                  </View>
                </View>

              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>

        {/* Modal for getting weight from scale */}
        <Modal animationType="slide"
          transparent={false}
          visible={showWeightModal}
          onRequestClose={() => setShowWeightModal(false)}>
            <View style={{width: 800, height: 680, borderRadius: 10, borderWidth: 2, marginLeft: 250, marginTop: 20, borderColor: DARK_PURPLE}}>
              {
                !userPutScale?
                  <View style={{marginTop: 50,}}>
                    <Text style={{fontSize: 25, textAlign: 'center', marginBottom: 0, paddingBottom: 0,}}>
                      Please step on the Weight Scale 
                    </Text>


                    <VideoPlayer
                      style={{marginLeft: 100, width: 600, height: 450,marginBottom: 10, }}
                      video={require("../assets/animation_scale.mp4")}
                      videoWidth={100}
                      videoHeight={100}
                      autoplay={true}
                      loop={true}
                      showDuration={false}
                      pauseOnPress={true}
                      />


                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10,}}>

                      <View style={{flex: 1, alignItems: 'center',}}>
                        <TouchableOpacity onPress={handleWeight}>
                          <Text style={{color: 'white', backgroundColor: DARK_PURPLE, textAlign: 'center',fontSize: 50, borderRadius: 10, borderWidth: 2, width: 180,}}>Done</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{flex: 1, alignItems: 'center',}}>
                        <TouchableOpacity onPress={handleCloseWeightModal}> 
                          <Text style={{color: 'white', backgroundColor: 'red', textAlign: 'center',fontSize: 50, borderRadius: 10, borderWidth: 2, width: 180,}}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                    </View>


                  </View>

                : (  loadingWeight ? 
                          <View style={{marginTop: 100,}}>
                            <Text style={{marginBottom: 200, fontSize: 25, textAlign: 'center',}}>
                              Reading weight...
                            </Text>
                            <ActivityIndicator size={150} color={DARK_PURPLE} /> 
                          </View>
                        : gotWeight ? (
                          
                          <View style={{marginLeft: 20, marginTop: 200,}}>
                            <Text style={{marginBottom: 100, fontSize: 50, textAlign: 'center',}}>
                              {weightScale} 
                            </Text>

                            <View style={{display: 'flex', flexDirection: 'row', }}> 

                              <View style={{flex: 1, alignItems: 'center',}}>
                                <TouchableOpacity onPress={addWeightFromScale}> 
                                  <AntDesign name="checkcircleo" size={150} color="green"/>
                                  <Text style={{fontSize:30,}}>Confirm Weight</Text>
                                </TouchableOpacity>
                              </View>

                              <View style={{flex: 1, alignItems: 'center',}}>
                                <TouchableOpacity onPress={handleCloseWeightModal}> 
                                  <AntDesign name="closecircle" size={160} color="red"/>
                                  <Text style={{fontSize:30,}}>Try again</Text>
                                </TouchableOpacity>
                              </View>

                            </View>
                          </View>
                        ) : (
                          <View style={{marginLeft: 20, marginTop: 200,}}>
                            <Text style={{marginBottom: 200, fontSize: 25, textAlign: 'center',}}>
                              Something failed! Please try again!
                            </Text>
                            <AntDesign name="closecircle" size={160} color="red"/>
                          </View>
                        )
                  )
              }
            </View>

        </Modal>

        {/* Modal for getting Blood Pressure from Monitor */}
        <Modal animationType="slide"
          transparent={false}
          visible={showBPModal}
          onRequestClose={() => setShowBPModal(false)}>
            <View style={{width: 800, height: 680, borderRadius: 10, borderWidth: 2, marginLeft: 250, marginTop: 20, borderColor: DARK_PURPLE}}>
              {
                !userPutMonitor ?
                  <View style={{marginTop: 50,}}>
                    <Text style={{fontSize: 25, textAlign: 'center', marginBottom: 0, paddingBottom: 0,}}>
                      Please put the Blood Monitor on your wrist and press START
                    </Text>

                    <VideoPlayer
                      style={{marginLeft: 100, width: 600, height: 450,marginBottom: 10, }}
                      video={require("../assets/animation_bp_monitor.mp4")}
                      videoWidth={100}
                      videoHeight={100}
                      autoplay={true}
                      loop={true}
                      showDuration={false}
                      pauseOnPress={true}
                      />




                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10,}}>

                      <View style={{flex: 1, alignItems: 'center',}}>
                        <TouchableOpacity onPress={handleBP}>
                          <Text style={{color: 'white', backgroundColor: DARK_PURPLE, textAlign: 'center',fontSize: 50, borderRadius: 10, borderWidth: 2, width: 180,}}>Done</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{flex: 1, alignItems: 'center',}}>
                        <TouchableOpacity onPress={handleCloseBPModal}> 
                          <Text style={{color: 'white', backgroundColor: 'red', textAlign: 'center',fontSize: 50, borderRadius: 10, borderWidth: 2, width: 180,}}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                    </View>


                  </View>

                : (  loadingBP ? 
                            <View style={{marginTop: 100,}}>
                              <Text style={{marginBottom: 200, fontSize: 25, textAlign: 'center',}}>
                                Reading Blood Pressure and Pulse...
                              </Text>
                              <ActivityIndicator size={150} color={DARK_PURPLE} /> 
                            </View>
                          : gotBP ? (
                            
                            <View style={{marginLeft: 20, marginTop: 200,}}>
                              <Text style={{fontSize: 40, textAlign: 'center',}}>Diastolic: {BPDiastolic} </Text>
                              <Text style={{fontSize: 40, textAlign: 'center',}}>Systolic: {BPSystolic} </Text>
                              <Text style={{marginBottom: 80, fontSize: 40, textAlign: 'center',}}>Pulse: {BPPulse} </Text>

                              <View style={{display: 'flex', flexDirection: 'row', }}> 

                                <View style={{flex: 1, alignItems: 'center',}}>
                                  <TouchableOpacity onPress={addBPFromMonitor}> 
                                    <AntDesign name="checkcircleo" size={150} color="green"/>
                                    <Text style={{fontSize:30,}}>Confirm Data</Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={{flex: 1, alignItems: 'center',}}>
                                  <TouchableOpacity onPress={handleCloseBPModal}> 
                                    <AntDesign name="closecircle" size={150} color="red"/>
                                    <Text style={{fontSize:30,}}>Try again</Text>
                                  </TouchableOpacity>
                                </View>

                              </View>
                            </View>
                          ) : (
                            <View style={{marginLeft: 20, marginTop: 200,}}>
                              <Text style={{marginBottom: 200, fontSize: 25, textAlign: 'center',}}>
                                Something failed! Please try again!
                              </Text>
                              <AntDesign name="closecircle" size={160} color="red"/>
                            </View>
                          )
                )
                }
            </View>

        </Modal>



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

export default Daily;