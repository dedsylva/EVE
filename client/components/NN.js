import React, { useState, useEffect, useRef } from 'react';
import { Button, FlatList, Text, View, Image, TouchableOpacity, Modal, TextInput, PermissionsAndroid } from 'react-native';
import dashStyle, {dashColors} from "../styles/dash";
import { RNCamera } from 'react-native-camera';
import Ionicons from  'react-native-vector-icons/Ionicons';
import AntDesign from  'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from  'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from  'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'; 
import styles, { DARK_PURPLE } from '../styles/all-styles';
import { colors } from '../styles/appStyles';
const axios = require('axios');
import { HOST } from '../constants';
import Alert from '../shared/Alert';
import { check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import  {openOTG}  from '../UsbModule';
import RNFetchBlob from 'rn-fetch-blob';


const NN = ({ navigation }) => {

  const baseURL= `http://${HOST}:3000`;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [modalCamera, setModalCamera] = useState(false);
  const [openDetails, setOpenDetails] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [classData, setClassData] = useState();
  const [probData, setProbData ] = useState();
  const [choose, setChoose] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState();
  const [statusAlert, setStatusAlert] = useState(false);

  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(null);
  const [location, setLocation] = useState(null);

  const [showResults, setShowResults] = useState(false);


  const allLocations= [
    {name: 'abdomen',      key: '1'},
    {name: 'acral',      key: '2'},
    {name: 'back',    key: '3'},
    {name: 'chest',   key: '4'},
    {name: 'ear',     key: '5'},
    {name: 'face',   key: '6'},
    {name: 'foot',   key: '7'},
    {name: 'genital',   key: '8'},
    {name: 'hand',   key: '9'},
    {name: 'lower extremity',   key: '10'},
    {name: 'neck',   key: '11'},
    {name: 'scalp',   key: '12'},
    {name: 'trunk',   key: '13'},
    {name: 'upper extremity',   key: '14'},
  ];

  const [availableLocations, setAvailableLocations] = useState(allLocations);
  const [modalLocation, setModalLocation] = useState(null);

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

  const handleShowResults = () => {
    setShowResults(false);
    setOpenDetails(false);
    setChoose(false);
    setModalCamera(false);
  }

  const validateInformations = () => {


    // *** Validating Age *** \\

    let ageIsValid = false;
    if (isNaN(parseInt(age)) ) {
      beginAlert(0, 'Invalid Age! Please Try Again.');
      return;
    } else if (typeof(age) == 'undefined') {
        beginAlert(0, 'Invalid Age! Please Try Again.');
        return;
    } else if (age == null) {
        beginAlert(0, 'Invalid Age! Please Try Again.');
        return;
    } else {
      ageIsValid = true;
    };


    // *** Validating Sex *** \\
    let validSex= ['male', 'female'];
    let sexIsValid = false;
    if (!(validSex.includes(sex))) {
        beginAlert(0, 'Invalid Sex! Please Try Again.');
        return;
    } else if (typeof(sex) == 'undefined') {
        beginAlert(0, 'Invalid Sex! Please Try Again.');
        return;
    } else if (sex == null) {
        beginAlert(0, 'Invalid Sex! Please Try Again.');
        return;
    } else {
      sexIsValid = true;
    };


    // *** Validating Location *** \\

    let locationIsValid = false;
    let result =  allLocations.find(o => o.name == location);
    if (typeof(result) == 'undefined') {
      beginAlert(0, 'Invalid Location! Please Try Again.');
      return;
    } else if (Object.keys(result).length === 0) {
        beginAlert(0, 'Invalid Location! Please Try Again.');
        return;
      } else if (location == null) {
        beginAlert(0, 'Invalid Location! Please Try Again.');
      } else {
      locationIsValid = true;
      
    }

    // *** Checks if everything is Valid *** \\

    if (!ageIsValid) {
      beginAlert(0, 'Invalid Age! Please Try Again.');
    } else if (!sexIsValid) {
        beginAlert(0, 'Invalid Sex! Please Try Again.');
    } else if (!locationIsValid) {
        beginAlert(0, 'Invalid Location! Please Try Again.');
    } else {
      beginAlert(1, 'Running Model... ');
      console.log(age, sex, location);
      uploadImage();
    }

  }


  const cancelsEverything = () => {
    setOpenDetails(false); 
    setAge('');
    setSex('');
    setLocation('');
  }


  const checkStatus = (permission) => {
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
    })
    .catch((error) => {
      console.log(`Failed while trying to check permission ${permission}`);
      console.log(error);
    });
  }


  useEffect(() => {
    async function getPermission() {
      try {
        const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        console.log("Camera Permission: ",cameraPermission); 

        const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        console.log("Storage Permission: ", storagePermission);

        // const readPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        // console.log("Read Permission: ", readPermission);

        // const managePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE);
        // console.log("Manage Permission: ", managePermission);


        if (cameraPermission === 'granted') {
          setHasPermission('granted');
        }
      } catch(err) {
        console.log(err);
      }

    }
    getPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const handleSave = async(photo) => {
    const { status } = await RNCamera.requestCameraPermissionsAsync();
    if (status === "granted"){
      const assert = await MediaLibrary.createAssetAsync(photo);
      MediaLibrary.createAlbumAsync('Tutorial', assert);
      console.log(assert);
    }
    else {
      console.log('You forgot to give permisssion!');
    }
  }

  const uploadImage = async () => {
    const uri = photoUri;
    const formData = new FormData();
    formData.append('inference', {
      name: "testing.jpg", 
      uri: uri,
      type: 'image/jpg'
    })
    try {
      const res = await axios.post(`http://${HOST}:81/model`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });
      const result = res.data.prob;
      setProbData(res.data.prob);
      setShowResults(true);

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(formData["_parts"][0][1]["type"]);
      console.log(err.message);
    } 
  }
 

  

  const handleDashboard = () => {
    navigation.push('Dashboard'); //goes to Daily (put daily in stack)
  }

  const handleDaily = () => {
    navigation.push('Daily'); //goes to Daily (put daily in stack)
  }

  const handleScheduler = () => {
    navigation.push('Scheduler'); //goes to NN (put NN in stack)
  }

  const handleAbout = () => {
    navigation.push('About'); //goes to About (put about in stack)
  }

  const openOTGView = async () => {
    setChoose(false); 
    try {
      await openOTG((a) => {console.log('Opening OTG was a: ', a)});

      const path = '/storage/emulated/0/DCIM/OTG View2/photo/';
      let uri = await RNFetchBlob.fs.ls(path);
      setCapturedImage('file://' + path + uri[0]);

      if (uri[0] === undefined || uri[0] === null || capturedImage === null) {
        uri = await RNFetchBlob.fs.ls(path);
        setCapturedImage('file://' + path + uri[0]);
      }
      console.log('aaaaa', capturedImage);
      setModalCamera(true);
    } catch (err) {
      console.log(err);
    }
}

  const takePicture = async (camera) => {
    const options = { quality: 1, base64: true };
    try {
      const data = await camera.takePictureAsync(options);

      setCapturedImage(data.uri);
      setModalCamera(true);
      //handleSave(data.uri);
      setPhotoUri(data.uri);
      console.log('GOTCHYA ', data.uri);

    } catch(err){
      console.log(err);
    }
  };



  return (
    <View style={dashStyle.nnContainer}>
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

          <TouchableOpacity style={dashStyle.dashListItem}>
            <View style={{display: 'flex', flexDirection: 'row' }}>
              <View style={{flex: 1  }}>
                <Ionicons name="ios-star-sharp" size={24} color={`${dashColors.darkPurple}`} />
              </View>
              <View style={{flex: 1  }}>
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

            <RNCamera
              style={styles.cameraStyle}
              type={type}
              flashMode={RNCamera.Constants.FlashMode.on}
            >      

              {({ camera }) => {
                  return (
                
                  <View style={{display: "flex", flexDirection: "row", paddingTop: 585,}}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={styles.nnButton}
                        onPress={() => {
                          setType(
                            type === RNCamera.Constants.Type.back
                              ? RNCamera.Constants.Type.front
                              : RNCamera.Constants.Type.back
                          );
                        }}>
                        <Text style={styles.nnText}> Flip </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={styles.nnButton}
                        onPress={() => takePicture(camera)}>
                        <Text style={styles.nnText}> Take picture</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                

                  );
              }}

            </RNCamera>

          {/* Modal for choosing camera or microcospic*/}
            <Modal animationType="slide"
              transparent={false}
              visible={choose}>
              
              <View style={styles.chooseContainer}>
                <Text style={styles.optionsBigText}>Use Camera or Microscope?</Text>

                <View style={{flexDirection: 'row', marginTop: 50}}>

                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress = { () => {setChoose(false)}} style={styles.chooseButton}>
                      <Text style={styles.optionsText}>Camera</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress = { () => {openOTGView()}} style={styles.chooseButton}>
                      <Text style={styles.optionsText}>Microscope</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>

            </Modal>


            {/* Modal for confirming picture*/}
            { capturedImage && 
              <Modal animationType="slide"
              transparent={false}
              visible={modalCamera}>

                <View style={styles.imageContainer}> 

                    <Text style={styles.optionsBigText}>Confirming Image </Text>

                    <Image style = {styles.imageDetails}
                    source={{uri: capturedImage}}>
                    </Image>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress = { () => {setModalCamera(false); setChoose(true); }} style={styles.chooseButton}>
                        <Text style={styles.optionsText}>Take Other Picture</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                      <TouchableOpacity  onPress = { () => setOpenDetails(true)} style={styles.chooseButton}>
                        <Text style={styles.optionsText}>Confirm Picture</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>

                <View 
                style={styles.little_view}
                >
                      <TouchableOpacity style={styles.litte_button}>
                        <Text style={styles.inference}> Predicted: {classData} </Text>
                        <Text style={styles.inference}> Prob: {probData} </Text>
                      </TouchableOpacity>
                </View>

              </Modal>
            }

            {/* Modal for providing more details and make inference on Model*/}
              <Modal animationType="slide"
              transparent={false}
              visible={openDetails}>
                <View style={styles.inferenceContainer}>

                  <View style={styles.inference_modal}>
                    <Text style={styles.detailsInferenceButton}>Age</Text>
                    <TextInput
                      style={styles.detailsTextInput}
                      onChangeText={(value) => setAge(value)}
                      keyboardType='numeric'
                    />

                    <Text style={styles.detailsInferenceButton}>Sex </Text>
                    <TextInput
                      style={styles.detailsTextInput}
                      placeholder='  e.g. male/female'
                      onChangeText={(value) => setSex(value.trim().toLowerCase())}
                      />

                    <TouchableOpacity onPress = {() => setModalLocation(true)}>
                      <Text style={styles.detailsInferenceButton}>Location</Text>
                      </TouchableOpacity>         
                      <TextInput 
                        style={styles.detailsTextInput}
                        onChangeText={(value) => setLocation(value.toLowerCase())}
                        value={location}
                        />


                    {/* Modal for location */}
                    <Modal animationType="slide"
                    transparent={true}
                    visible={modalLocation}>
                      <View style={styles.locationsModal}>
                        <FlatList
                        data={availableLocations}
                        extraData={setAvailableLocations}
                        renderItem={({ item}) => (
                          <View >
                            <TouchableOpacity style={styles.locationsItems} onPress={() => {setLocation(item.name); setModalLocation(false)}}>
                              <Text style={styles.items}> {item.name} </Text> 
                            </TouchableOpacity>
                          </View>
                        )}
                        />

                        <TouchableOpacity style={styles.locationsItems} onPress={() => setModalLocation(false)}>
                            <AntDesign name="closecircle" size={50} color={colors.secondary}/>
                        </TouchableOpacity>

                      </View>
                    </Modal>

                  </View>

                  <View style={{flexDirection: 'row', marginTop: 40}}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress = { cancelsEverything} style={styles.inferenceCancelButton}>
                        <Text style={styles.cancelText}>Cancel </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                      <TouchableOpacity  onPress = { validateInformations } style={styles.inferenceConfirmButton}>
                        <Text style={styles.inferenceText}>Make Prediction</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              </Modal>

              {/* Modal for alerting */} 
              <Alert 
                showAlert={showAlert} 
                setShowAlert={setShowAlert}
                statusAlert={statusAlert}
                alertText={alertText}
              />

              {/* Modal for showing results*/}
              <Modal animationType="slide"
                transparent={false}
                visible={showResults}>

                  <View style={ styles.resultsContainer}> 
                    <Text style={ styles.resultsTitle} >Probability of Having Skin Cancer</Text>
                    <Text style={ probData > 0.75 ? styles.biggerResultDisplay : ( probData > 0.35  ?  styles.mediumResultDisplay : styles.smallResultDisplay )} >{(probData*100).toPrecision(3)} %</Text>

                    <View style={ styles.resultsSubContainer}> 
                        <View style={{display: 'flex', flexDirection: 'row',}}>
                          <View style={{flex: 1, paddingLeft: 150,}}>
                            <Feather name="alert-circle" size={50} color="black" />
                          </View>
                          <View style={{flex: 2,}}>
                            <Text style={ styles.resultsText} > This is only a prototype ! </Text>
                          </View>
                          <View style={{flex: 1, paddingLeft: 140,}}>
                            <Feather name="alert-circle" size={50} color="black" />
                          </View>

                        </View>
                      <Text style={ styles.resultsText} > The number above should NOT be considered the final result!</Text>
                      <Text style={ styles.resultsText} > For an accurate diagnostic please look for a real doctor!</Text>
                    </View>

                    <TouchableOpacity style={styles.resultsCloseButton}  onPress={handleShowResults}>
                      <Text style={styles.resultsCloseText}> Go back</Text>
                    </TouchableOpacity>

                  </View>

              </Modal>

        </View>


      </View>
    </View>
  )
}

export default NN;