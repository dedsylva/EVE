import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableHighlight, FlatList} from 'react-native';
import styles from '../../styles/all-styles';
import {ListViewHidden, TodoText, HiddenButton, SwipedTodoText, colors, ModalContainer, ModalView, ModalIcon, HeaderTitle, StyledInput, ModalActionGroup, ModalAction} from "../../styles/appStyles";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from "react-native-swipe-list-view";
import { ModalButton } from "../../styles/appStyles";
import { HOST } from '../../constants';
import dashStyle, { dashColors } from '../../styles/dash';
const axios = require('axios');
import Alert from '../../shared/Alert';


const ListPills = ({pills, setPills, availablePills, setAvailablePills}) => {

  const baseURL= `http://${HOST}:3000`;


  // *** Pills That User Takes *** \\

  const [pillInputValue, setPillInputValue] = useState();

  // function to add a new pill that user takes
  const handleAddPill = async (pill) => {

    if (pill.frequency == undefined) {
      pill.frequency = 'daily';
    }

    let data = Object.assign({}, pill);
    delete data.key;

    let config = {
      method: 'post',
      url: `${baseURL}/api/pills/`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not add pill, reponse status: ${res.status}`);
        beginAlert(0, 'Adding Fail! Please Try Again.');
        return ;
      } else {
        const newPill= [...pills, pill]; 

        setPills(newPill);
        setModalVisible(false);
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 

  }



  const [pillToBeEdited, setPillToBeEdited] = useState(null);

  const handleTriggerEdit = (item) => {
    setPillToBeEdited(item);
    setModalVisible(true);
    setPillInputValue(item.name);
  }

  const handleEditPill = (editedPill) => {
    const newPills = [...pills];
    const pillIndex = pills.findIndex((pill) => pill.key === editedPill.key);
    newPills.splice(pillIndex, 1, editedPill); 

    setPills(newPills); 
    setModalVisible(false);
    setPillToBeEdited(null);
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
    setPillInputValue("");
    setPillToBeEdited(null);
    setAvailablePillInputValue("");
    setAvailablePillToBeEdited(null);
  }

  const handleSubmit = (item) => {

    if (!pillToBeEdited) {
      handleAddPill({
        name: item.name,
        key: `${(pills[pills.length-1] && parseInt(pills[pills.length-1].key) + 1) || 1 }`
      });
    } else {
      handleEditPill({
        name: item.name,
        key: pillToBeEdited.key
      })
    }
    setPillInputValue("");
    setModalVisible(false);
  }

  const handleDeletePill = async (rowMap, rowKey) => {
    const newPills = [...pills];
    const pillIndex = pills.findIndex((pill) => pill.key === rowKey);

    let config = {
      method: 'delete',
      url: `${baseURL}/api/pills/`+pills[pillIndex].name,
      headers: { }
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not remove pill, reponse status: ${res.status}`);
        beginAlert(0, 'Deletion Fail! Please Try Again.');
        return ;
      } else {
        newPills.splice(pillIndex, 1); // delete the only item in that index

        setPills(newPills); 
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 



  }


  // *** Pills Available *** \\ 

  const handleClearAvailablePIlls= () => {
    setAvailablePills([]); //clear the entire state
  }

  // Modal visibility & input value
  const [availablePillInputValue, setAvailablePillInputValue] = useState();

  // // function to add a new pill that user takes
  const handleAddToAvailablePills = async (pill) => {

    if (pill.frequency == undefined) {
      pill.frequency = 'daily';
    }

    let data = Object.assign({}, pill);
    delete data.key;

    let config = {
      method: 'post',
      url: `${baseURL}/api/pills/available`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not add pill, reponse status: ${res.status}`);
        beginAlert(0, 'Adding Fail! Please Try Again.');
        return ;
      } else {
        const newAvailablePills = [...availablePills, pill]; 
        setAvailablePills(newAvailablePills);

        beginAlert(1, 'Pill Added!');
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 

  }



  // Edit an existing todo
  const [availablePillToBeEdited, setAvailablePillToBeEdited] = useState(null);

  const handleTriggerEditAvailable = (item) => {
    setAvailablePillToBeEdited(item);
    setModalVisible(true);
    setAvailablePillInputValue(item.name);
  }

  const handleEditAvailablePill = (editedPill) => {
    const newAvailablePIlls= [...availablePills];
    const pillIndex = availablePills.findIndex((pill) => pill.key === editedPill.key);
    newAvailablePIlls.splice(pillIndex, 1, editedPill); 

    setAvailablePills(newAvailablePIlls); 
    setModalVisible(false);
    setAvailablePillToBeEdited(null);
  }

  const handleListSubmitAvailable = () => {

    if(availablePillInputValue?.length == 0 || availablePillInputValue == undefined) {
      beginAlert(0, 'Adding Fail! Please Try Again.');
      return;
    }

    if (!pillToBeEdited) {
      handleAddToAvailablePills({
        name: availablePillInputValue,
        key: `${(availablePills[availablePills.length-1] && parseInt(availablePills[availablePills.length-1].key) + 1) || 1 }`
      });
    } else {
      handleEditAvailablePill({
        name: availablePillInputValue,
        key: availablePillToBeEdited.key
      })
    }
    setAvailablePillInputValue("");
  }

  const handleDeleteAvailablePill = async (item) => {

    const newAvailablePills = [...availablePills];
    const pillIndex = availablePills.findIndex((pill) => pill.key === item.key);

    let config = {
      method: 'delete',
      url: `${baseURL}/api/pills/available/`+availablePills[pillIndex].name,
      headers: { }
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not remove pill, reponse status: ${res.status}`);
        beginAlert(0, 'Deletion Fail! Please Try Again.');
        return ;
      } else {
        newAvailablePills.splice(pillIndex, 1); // delete the only item in that index
        setAvailablePills(newAvailablePills); 
        beginAlert(1, 'Pill Deleted!');
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 




  }

  // *** Swipe Configuration *** \\

  //styling currently swiped todo row
  const [swipedRow, setSwipedRow] = useState(null);

  const [swipedAvailableRow, setSwipedAvailableRow] = useState(null);

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
    <View style={{height: '100%'}}>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
        <ModalButton onPress={() => setModalVisible(true)} style={styles.plusButton}>
          <AntDesign name="plus" size={50} color={colors.secondary}/>
        </ModalButton> 

          <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
          >
            <ModalContainer>
              <ModalView>
                <ModalIcon>
                  <HeaderTitle>New Pill</HeaderTitle>
                  <AntDesign name="edit" size={50} color={colors.black}/>
                </ModalIcon>

                <StyledInput
                  placeholder="Add a Pill"
                  placeholderTextColor={colors.alternative}
                  selectionColor={colors.secondary}
                  autoFocus={true}
                  onChangeText={(text) => {setAvailablePillInputValue(text)}}
                  value={availablePillInputValue}
                  onSubmitEditing={handleListSubmitAvailable}
                />


                <FlatList
                data={availablePills}
                extraData={setAvailablePills}
                renderItem={({ item}) => (
                  <TouchableOpacity
                    style={styles.pillItems}
                    onPress={() => handleSubmit(item)}
                    onLongPress={() => handleDeleteAvailablePill(item)}
                    >
                    <Text style={styles.items}> {item.name} </Text> 
                  </TouchableOpacity>
                )}
                />

                <SwipeListView 
                  data={pills}
                  renderItem={(data) => {
                    const RowText = data.item.key === swipedAvailableRow ? SwipedTodoText : TodoText;
                    return (
                      <TouchableOpacity
                        style={styles.pillItems}
                        onPress={() => handleSubmit(data.item)}
                        >
                        <Text style={styles.items}> {data.item.name} </Text> 
                      </TouchableOpacity>
                    )
                  }}
                  renderHiddenItem={(data, rowMap) => {
                    return (
                      <ListViewHidden>
                        <TouchableOpacity style={styles.hiddenItem}
                          onPress={() => {
                            handleDeletePill(rowMap, data.item.key)
                          }}
                        >
                          <Entypo name="trash" size={25} colors={colors.secondary}/>
                      </TouchableOpacity>
                      </ListViewHidden>
                    )
                  }}
                  leftOpenValue={80}
                  previewRowKey={"0"}
                  previewOpenValue={80}
                  previewOpenDelay={3000}
                  disableLeftSwipe={true}
                  showsVerticalScrollIndicator={false}
                  style={{
                    flex: 1,  marginBottom: 0
                  }}
                  onRowOpen={(rowKey) => {
                    setSwipedAvailableRow(rowKey);
                  }}
                  onRowClose={() => {
                    setSwipedAvailableRow(null);
                  }}

                /> 




                <ModalActionGroup>
                  <ModalAction color={colors.primary} onPress={handleCloseModal}>
                    <AntDesign name="close" size={38} color={colors.tertiary}/>
                  </ModalAction>

                  <ModalAction color={colors.tertiary} onPress={handleListSubmitAvailable}>
                    <AntDesign name="check" size={38} color={colors.secondary}/>
                  </ModalAction>

                </ModalActionGroup>

              </ModalView>
            </ModalContainer>

          </Modal>

        </View>

        <View style={{flex:4}}>
          <Text style={styles.button}> Pills </Text> 
        </View>
      </View>

      <SwipeListView 
        data={pills}
        renderItem={(data) => {
          const RowText = data.item.key === swipedRow ? SwipedTodoText : TodoText;
          return (

            <TouchableHighlight
              underlayColor={colors.primary}>
              <View style={dashStyle.schedulerPillsContainer}>

                  <View style={{flex: 1, marginLeft: 50, marginTop: 5}}>
                    <MaterialCommunityIcons name="pill" size={24} color={`${dashColors.niceWhite}`} />
                  </View>
                  <View style={{flex: 4, marginTop: 5}}>
                    <Text style={dashStyle.itemsName}> {data.item.name}</Text> 
                  </View>
                  <View style={{flex: 2}}>
                    <Text style={dashStyle.schedulerItemsMsg}> - {data.item.frequency} </Text> 
                  </View>

              </View>
            </TouchableHighlight>
          )
        }}
        renderHiddenItem={(data, rowMap) => {
          return (
            <ListViewHidden>
              <HiddenButton
                onPress={() => {
                  handleDeletePill(rowMap, data.item.key)
                }}
              >
                <Entypo name="trash" size={25} colors={colors.secondary}/>
              </HiddenButton>
            </ListViewHidden>
          )
        }}
        leftOpenValue={80}
        previewRowKey={"0"}
        previewOpenValue={80}
        previewOpenDelay={3000}
        disableLeftSwipe={true}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,  marginBottom: 0
        }}
        onRowOpen={(rowKey) => {
          setSwipedRow(rowKey);
        }}
        onRowClose={() => {
          setSwipedRow(null);
        }}

      /> 


      {/* Modal for alerting */} 
      <Alert 
        showAlert={showAlert} 
        setShowAlert={setShowAlert}
        statusAlert={statusAlert}
        alertText={alertText}
      />

    </View>
    );
}

export default ListPills;
