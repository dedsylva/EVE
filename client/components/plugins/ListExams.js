import React , {useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
const axios = require('axios');
import { Calendar } from 'react-native-calendars';
import { SwipeListView } from "react-native-swipe-list-view";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../styles/all-styles';
import {ListViewHidden, TodoText, SwipedTodoText, ModalActionGroup, ModalAction} from "../../styles/appStyles";
import { HOST } from '../../constants';
import { DARK_PURPLE } from "../../styles/all-styles";
import dashStyle, {dashColors} from "../../styles/dash";
import Alert from '../../shared/Alert';


const ListExams = ({exams, setExams, markedDates}) => {

  const baseURL= `http://${HOST}:3000`;

  const [examModal, setExamModal] = useState(false);
  const [examModalValues, setExamModalValues] = useState(false);
  const [addExamModal ,setAddExamModal] = useState(false);

  const [swipedRow, setSwipedRow] = useState(null);
  const [swipedAvailableRow, setSwipedAvailableRow] = useState(null);


  const [examName, setExamName] = useState(null);
  const [examType, setExamType] = useState(null);
  const [examDate, setExamDate] = useState(null);

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

  const handleExams = async (day) => {
    const result = await getExams(day);
    if (result == 0){
      setExamDate(day.dateString);
      setAddExamModal(true);
    }
    return; 
  }



  const getExams = async (day) => {
    // check in databse if there is something on that particular day
    // returns 1 if there is, 0 otherwise
    try {
      const res = await axios.get(`${baseURL}/api/exams/${day.dateString}`); 

      if (res.data.results == 0) {
        return 0;
      }

    if (res.status != 200)  throw Error(res.status)

      let newExam = [];
      let newDate;

      for (let i = 0; i< res.data.length; i++) {

        newDate = new Date(res.data[i].examDate).toISOString().split('T')[0].split('-');
        newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];
        newExam.push({ 
          name: res.data[i].name, 
          examDate: newDate, 
          examType: res.data[i].examType, 
          key: i+1});
      }

    setExamModalValues(newExam);
    setExamModal(true);
    return 1;


    } catch (err) {
      console.log(err);
      return 0;
    }

  }

  const handleDeleteExam = async (rowMap, wrongDate) => {
    let examToBeDeletedDate = wrongDate.split('-');
    examToBeDeletedDate = examToBeDeletedDate[2]+'-'+examToBeDeletedDate[1]+'-'+examToBeDeletedDate[0];
    const newExam = [...exams];
    const examIndex = exams.findIndex((exam) => exam.examDate === examToBeDeletedDate);

    let config = {
      method: 'delete',
      url: `${baseURL}/api/exams/`+exams[examIndex].name+'/'+exams[examIndex].examDate+'/'+exams[examIndex].examType,
      headers: { }
    };

    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not delete exam, reponse status: ${res.status}`);
        beginAlert(0, 'Deletion Fail! Please Try Again.');
      } else {
        newExam.splice(examIndex, 1); // delete the only item in that index

        beginAlert(1, 'Exam Deleted!');
        setExams(newExam);
        setExamModal(false); 
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 


  }

 const handleSubmitExam = async () => {

  let data = {name: examName.trim(), examDate: examDate, examType: examType.trim()};


    if (examName == null || examDate == null || examType == null) {
      console.log('Fail! Empty data provided while adding exam');
      beginAlert(0, 'Adding Fail! Please Try Again.');
    }

    let config = {
      method: 'post',
      url: `${baseURL}/api/exams`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };


    // Add to database
    try {
      const res = await axios(config);

      if (res.status != 200) {
        console.log(`Could not add exam, reponse status: ${res.status}`);
        beginAlert(0, 'Adding Fail! Please Try Again.');
      } else {

        data.key= `${(exams[exams.length-1] && parseInt(exams[exams.length-1].key) + 1) || 1 }`

        beginAlert(1, 'Exam Added!');
        const newExams= [...exams, data]; 

        setExams(newExams);
        setAddExamModal(false);
      }

    } catch (err) {
      console.log('FATAL ERROR: CONNECTION COULD NOT BE ESTABLISHED !');
      console.log(err.message);
    } 




 }

  return (

  <>
    <View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={addExamModal}
        onRequestClose={() => setAddExamModal(false)}
      >
        <View style={styles.addExamContainer}>
          <View style={styles.addExamSubContainer}>
            <Text style={styles.addExamButton}>Name</Text>
            <TextInput
              style={styles.addExamTextInput}
              onChangeText={(value) => setExamName(value)}
              />
          </View>

          <View style={styles.addExamSubContainer}>
            <Text style={styles.addExamButton}>Exam</Text>
            <TextInput
              style={styles.addExamTextInput}
              placeholder='  e.g. blood exam'
              onChangeText={(value) => setExamType(value)}
              />
          </View>


          <ModalActionGroup style={{paddingTop: 50, paddingLeft: 50,}}>
            <ModalAction color={'red'} onPress={() => {setAddExamModal(false)}}>
              <AntDesign name="close" size={38} color={'white'}/>
            </ModalAction>

            <ModalAction color={'green'} onPress={handleSubmitExam}>
              <AntDesign name="check" size={38} color={'white'}/>
            </ModalAction>

          </ModalActionGroup>

        </View>


      </Modal>


    </View>

      <Calendar
        Arrow = "left"
        minDate={'2021-12-05'}
        maxDate={'2025-12-31'}
        onDayPress={(day) => handleExams(day)}
        monthFormat={'yyyy MM'}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        hideArrows={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        enableSwipeMonths={false}
        // markedDates={{
        //   toDay: {selected: true, marked: false, selectedColor: DARK_PURPLE},
        //   '2022-04-22': {selected: true, marked: false, selectedColor: DARK_PURPLE},
        // }}
        markedDates={ {markedDates}}
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


    <Modal
      animationType="fade"
      transparent={true}
      visible={examModal}
      onRequestClose={() => setExamModal(false)}
    >
      <View style={styles.examCalendar}>

        <SwipeListView 
          data={examModalValues}
          renderItem={(data) => {
            const RowText = data.item.key === swipedAvailableRow ? SwipedTodoText : TodoText;
            return (
              <TouchableOpacity
                style={styles.examContainer}
                // onPress={() => handleSubmit(data.item)}
                >
                {/* <Text style={styles.examsItems}>  </Text>  */}
                <RowText style={{ color: 'white',}}>{data.item.name} - {data.item.examType} </RowText>
                <RowText style={{ color: 'white',}}>{data.item.examDate}</RowText>
              </TouchableOpacity>
            )
          }}
          renderHiddenItem={(data, rowMap) => {
            return (
              <ListViewHidden style={{height: 100,}}>
                <TouchableOpacity style={styles.examsItems}
                  onPress={() => {
                    handleDeleteExam(rowMap, data.item.examDate)
                  }}
                >
                  <Entypo name="trash" size={50} colors={'white'}/>
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

        <TouchableOpacity style={styles.locationsItems} onPress={() => setExamModal(false)}>
            <AntDesign name="closecircle" size={50} color={'white'}/>
        </TouchableOpacity>



      </View>

    </Modal>

    {/* Modal for alerting */} 
    <Alert 
      showAlert={showAlert} 
      setShowAlert={setShowAlert}
      statusAlert={statusAlert}
      alertText={alertText}
    />


  </>

);
}


export default ListExams;
