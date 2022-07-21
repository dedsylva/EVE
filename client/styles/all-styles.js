import { StyleSheet } from "react-native";
import { dashColors } from "./dash";

export const BACKGROUND = '#F0F0EC';
export const BLUE_BACKGROUND = '#D0E5EC';
export const RED_INFERENCE = '#D71C1C'; 

export const COOL_GREEN= '#1FB32B';
export const COOL_GRAY= '#B0B7B3';
export const COOL_PINK = '#F9C5E3';
export const COOL_ORANGE = '#E0A64E';
export const COOL_RED = '#D84444';
export const COOL_SALMON = '#F7D9B9';
export const COOL_BLACK = '#31372F';
export const COOL_PURPLE = '#BA9BFB';

export const HEADER = '#AF89F6'; 

export const LIGHT_GREEN = '#1a95b0';
export const LIGHT_BLUE = '#EDF5F7';
export const LIGHT_RED = '#FBE0DD';

export const DARK_PURPLE = '#7A3EE9';

export const RED_ALERT = '#E0442B';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BACKGROUND,
    marginTop: 20
  },
  nnContainer: {
    backgroundColor: BACKGROUND 
  },
  imageContainer: {
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  nnOptionsContainer: {
    flexDirection: 'row',
    margin: 20, 
  },
  inferenceContainer: {
    backgroundColor: 'white',
    height: '70%',
    width: '50%',
    marginLeft: 350,
    marginTop:130, 
    // borderWidth: 1,
    // borderRadius: 20,
  },
  inferenceInputs: {
    backgroundColor: "yellow",
  },
  examContainer: {
    backgroundColor: dashColors.darkPurple,
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
    padding: 5,
    height: 120,
  },
  addExamContainer: {
    backgroundColor: dashColors.background,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 125,
    marginLeft: 260,
    paddingTop: 50,
    width: '65%',
    height: 500,
},
  addExamSubContainer: {
    flexDirection: 'row', 
    width: '100%',
    paddingTop: 50,
    marginBottom: 30,
    height: 90,
  },
  chooseContainer: {
    marginTop:200,
  },
  chooseButton: {
    backgroundColor: DARK_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 100,
    width: 500,
    borderRadius: 80,
    // marginTop: 50,
    marginLeft: 100,
  },
  cameraStyle: {
    height: '80%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsTextInput: {
    backgroundColor: BACKGROUND,
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
  },
  options: {
    flex: 1,
    backgroundColor: BACKGROUND, 
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    fontSize: 30
  },
  nnButton: {
    backgroundColor: DARK_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 50,
    width: '90%',
    borderRadius: 80,
  },
  detailsButton: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    fontSize: 30
  },
  addExamButton: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  detailsInferenceButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    fontSize: 30
  },
  inferenceConfirmButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '85%',
    fontSize: 30,
    backgroundColor: COOL_GREEN, 
    color: "black",
    borderRadius: 80,
    marginLeft: 25
  },
  inferenceCancelButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '85%',
    fontSize: 30,
    backgroundColor: COOL_RED, 
    color: "black",
    borderRadius: 80,
    marginLeft: 25
  },
  calendarButton: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    fontSize: 30,
  },
  nnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: "white",
  },
  imageDetails: {
    width: '80%',
    height: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    margin: 20
  },
  optionsButton: {
    backgroundColor: COOL_GREEN,
    borderRadius: 20,
    borderWidth: 1,
    height: 110,
    width: 280,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 110,

  },
  optionsBigText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 45,
    color: "black",
  },
  optionsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 45,
    color: "white",
  },
  inferenceText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: "black" 
  },
  cancelText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: "black" 
  },
  little_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND, 
    margin: 10,
    borderRadius: 10,
    height: 10,
    fontSize: 10
  },
  inference: {
    color: RED_INFERENCE,
    fontSize: 40,
    borderRadius: 5,
  },
  inference_modal: {
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 20,
  },
  detailsTextInput: {
    width: '100%',
    height: '13%',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  addExamTextInput: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  little_view: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFF',
  },
  items: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
  },
  pillItems: {
    justifyContent: 'space-around',
    backgroundColor: BACKGROUND,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 20,
    paddingBottom: 10,
    height: 50,
  },
  hiddenItem: {
    paddingBottom: 10,
    height: 40,
  },
  subtitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 40,
    fontSize: 30,
  },
  modalTodo:{
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: BACKGROUND,
    width: 550, 
    height: 550,
    marginLeft:300,
  },
  modalText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    fontSize: 30,
    paddingTop: 10
  },
  modalAddButton: {
    width: 60,
    height: 60,
    backgroundColor: BACKGROUND, 
    borderRadius: 50,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  plusButton: {
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  locationsModal: {
    width: '50%',
    height: '35%',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 350,
    marginTop: 435, 
    borderWidth: 1,
    borderRadius: 40,
  },
  locationsItems: {
    padding: 5,
    alignSelf: 'center',
  },
  examCalendar: {
    flex: 1,
    width: '65%',
    height: 600,
    backgroundColor: dashColors.darkPurple,
    justifyContent: 'space-around',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 460,
    marginTop: 435, 
    borderWidth: 1,
    borderRadius: 40,
  },
  examsItems: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    paddingTop: 10,
    width: '100%',
  },
  redAlertContainer: {
    marginLeft: 500,
    marginTop: 660, 
    width: '30%',
  },
  greenAlertContainer: {
    marginLeft: 570,
    marginTop: 660, 
    width: '20%',
  },
  redAlertRound: {
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: RED_ALERT,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  greenAlertRound: {
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'green',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  alertText: {
    color: 'white',
    flex: 4,
  },
  resultsContainer: {
    marginLeft: 80,
    marginTop: 30,
  },
  biggerResultDisplay: {
    fontSize: 50,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: RED_ALERT, 
    width: 250,
    padding: 15,
    marginLeft: 480,
    marginBottom: 70,
    textAlign: 'center',
    textAlignVertical: 'center',

  },
  mediumResultDisplay: {
    fontSize: 50,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'orange',
    width: 250,
    padding: 15,
    marginLeft: 480,
    marginBottom: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  smallResultDisplay: {
    fontSize: 50,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'green',
    width: 250,
    padding: 15,
    marginLeft: 480,
    marginBottom: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  resultsTitle: {
    marginBottom: 50,
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 20,
    color: 'black',
  },
  resultsSubContainer: {
    padding: 40,
    borderWidth: 1,
    borderRadius: 15,
    width: 1150,
    backgroundColor: COOL_RED,
  },
  resultsCloseButton: {
    marginTop: 30,
    marginLeft: 490,
    padding: 20,
    borderWidth: 1,
    borderRadius: 30,
    width: 200,
    backgroundColor: 'white', 
  },
  resultsCloseText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});


export default styles;