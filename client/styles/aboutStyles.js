import { StyleSheet } from "react-native";

export const aboutColors = {
  darkPurple: '#7A3EE9',
};

const about = StyleSheet.create({
  aboutContainer: {
    margin: 20,
  },
  aboutSubTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: aboutColors.darkPurple,
    flex: 1,
  },
  aboutNormalText: {
    paddingTop: 20,
    paddingLeft: 10,
    fontSize: 20,
  },
  aboutBoldText: {
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  aboutBoldSubText: {
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  aboutFinalNote: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 80,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});


export default about;