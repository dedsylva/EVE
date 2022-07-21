import React, {useState} from "react";
import { Modal, Text, View, TouchableHighlight } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {ListViewHidden, TodoText, TodoDate, HiddenButton, SwipedTodoText, colors, ModalContainer, ModalView, ModalIcon, HeaderTitle, StyledInput, ModalActionGroup, ModalAction} from "../../styles/appStyles";
import styles from "../../styles/all-styles";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { ModalButton } from "../../styles/appStyles";
import dashStyle, { dashColors } from '../../styles/dash';
const axios = require('axios');
import { HOST } from '../../constants';
import Alert from "../../shared/Alert";


const ListTodos = ({todos, setTodos }) => {

  const baseURL= `http://${HOST}:3000`;

  const handleClearTodos = () => {
    setTodos([]); //clear the entire state
  }

  const [todoInputValue, setTodoInputValue] = useState(null);
  const [todoInputDate, setTodoInputDate] = useState(null);

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


  // function to add a new todo
  const handleAddTodo = async (todo) => {
    console.log('called');
    console.log(todo);

    let data = {name: todo.name, todoDate: todo.date} 

    let config = {
      method: 'post',
      url: `${baseURL}/api/todos/`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not add todo , reponse status: ${res.status}`);
        beginAlert(0, 'Adding Fail! Please Try Again.');
      } else {

          const newTodos = [...todos, todo];
          setTodos(newTodos); 
          beginAlert(1, 'Todo Added!');
          setModalVisible(false);

      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    }

  }

  // Edit an existing todo
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);

  const handleTriggerEdit = (item) => {
    setTodoToBeEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.name);
    setTodoInputDate(item.date);
  }

  const handleEditTodo = (editedTodo) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
    newTodos.splice(todoIndex, 1, editedTodo); //remove 1 element of index todoIndex and insert in that index editedTodo

    setTodos(newTodos); //updates state to newTodos
    beginAlert(1, 'Todo Updated!');
    setModalVisible(false);
    setTodoToBeEdited(null);
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
    setTodoInputValue(null);
    setTodoInputDate(null);
    setTodoToBeEdited(null);
  }

  const handleSubmit = () => {

    var newDate = new Date; 
    const name = todoInputValue;

    // If user didnt provide Date, we use the current one 
    if (!todoInputDate) { 
      newDate = newDate.toISOString().split('T')[0].split('-');
      newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0]
    } else {
      newDate = todoInputDate;
    } 

    if (!todoToBeEdited) {
      const key = `${(todos[todos.length-1] && parseInt(todos[todos.length-1].key) + 1) || 1 }`

     
      handleAddTodo({
        name: name,
        todoDate: newDate,
        key: key
      });
    } else {
      handleEditTodo({
        name: name,
        todoDate: newDate,
        key: todoToBeEdited.key
      })
    }
    setTodoInputValue(null);
    setTodoInputDate(null);
  }


  //styling currently swiped todo row
  const [swipedRow, setSwipedRow] = useState(null);

  const handleDeleteTodo = async (rowMap, rowKey) => {

    const newTodos = [...todos]; // copy everything in the todos 
    const todoIndex = todos.findIndex((todo) => todo.key === rowKey);

    // This is annoying, but we show the date in DD-MM-YYYY so in database we need to convert back
    // to YYYY-MM-DD
    let todoDate = todos[todoIndex].todoDate.split('-');
    todoDate = todoDate[2]+'-'+todoDate[1]+'-'+todoDate[0]

    let config = {
      method: 'delete',
      url: `${baseURL}/api/todos/`+todos[todoIndex].name+'/'+`${todoDate}`,
      headers: { }
    };


    // Delete to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not delete todo, reponse status: ${res.status}`);
        beginAlert(0, 'Deletion Fail! Please Try Again.');
      } else {

        newTodos.splice(todoIndex, 1); // delete the only item in that index
        beginAlert(1, 'Deletion Completed!');
        setTodos(newTodos); //updates state to newTodos
        setModalVisible(false); 
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
 
    }

  }

  const handleNewTodo = () => {
    if (!todoInputValue) {
      beginAlert(0, 'Adding Fail! Please Try Again.');
    } else {
      handleSubmit();
      
    }
  }


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
                  <HeaderTitle>New Todo</HeaderTitle>
                  <AntDesign name="edit" size={50} color={colors.black}/>
                </ModalIcon>

                <StyledInput
                  placeholder="Add a Todo"
                  placeholderTextColor={colors.alternative}
                  selectionColor={colors.secondary}
                  autoFocus={true}
                  onChangeText={(text) => {setTodoInputValue(text)}}
                  value={todoInputValue}
                  onSubmitEditing={handleNewTodo}
                />

                <StyledInput
                  placeholder="Date of Todo (YYYY-MM-DD)"
                  keyboardType='numeric'
                  placeholderTextColor={colors.alternative}
                  selectionColor={colors.secondary}
                  autoFocus={true}
                  onChangeText={(text) => {setTodoInputDate(text)}}
                  value={todoInputDate}
                  onSubmitEditing={handleNewTodo}
                />



                <ModalActionGroup>
                  <ModalAction color={colors.primary} onPress={handleCloseModal}>
                    <AntDesign name="close" size={38} color={colors.tertiary}/>
                  </ModalAction>

                  <ModalAction color={colors.tertiary} onPress={handleNewTodo}>
                    <AntDesign name="check" size={38} color={colors.secondary}/>
                  </ModalAction>

                </ModalActionGroup>

              </ModalView>
            </ModalContainer>

          </Modal>

        </View>

        <View style={{flex:4}}>
          <Text style={styles.button}> Todos </Text> 
        </View>
      </View>

      <SwipeListView 
        data={todos}
        renderItem={(data) => {
          const RowText = data.item.key === swipedRow ? SwipedTodoText : TodoText;
          return (
            <TouchableHighlight
              underlayColor={colors.primary}
              onPress={() => { handleTriggerEdit(data.item) }}>

              <View style={dashStyle.schedulerPillsContainer}>

                  <View style={{flex: 1, marginLeft: 50, marginTop: 10}}>
                    <Foundation name="clipboard-notes" size={24} color={`${dashColors.niceWhite}`}  />
                  </View>
                  <View style={{flex: 4, marginTop: 10}}>
                    <Text style={dashStyle.itemsName}> {data.item.name}</Text> 
                  </View>
                  <View style={{flex: 3}}>
                    <Text style={dashStyle.schedulerItemsMsg}> {data.item.todoDate} </Text> 
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
                  handleDeleteTodo(rowMap, data.item.key)
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

export default ListTodos;
