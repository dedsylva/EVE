import { StyleSheet } from "react-native";

const darkPurple = '#7A3EE9';
const background = "#F0F0EC";

const headerStyle = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '100%',
    marginLeft: 20,
    backgroundColor: background, 
    display: "flex",
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    textAlign: "center",
    flex: 4,
  },
  subOuterContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  subInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: darkPurple, 
    letterSpacing: 1,
    textAlign: "center",
  },
  headerUserText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "black", 
    letterSpacing: 1,
    flex: 1,
    textAlign: "center",
  },

});


export default headerStyle;