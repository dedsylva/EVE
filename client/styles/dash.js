import { StyleSheet } from "react-native";

export const dashColors = {
  background: "#F0F0EC",
  darkPurple: '#7A3EE9',
  niceWhite: '#E2E1E6',
  cool_orange: '#E6A57C',
};

const dashStyle = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 20,
    marginRight: 20,
    // marginLeft: 20,
    backgroundColor: dashColors.background,
  },
  nnContainer: {
    marginBottom: 20,
    marginRight: 20,
    // marginLeft: 20,
    backgroundColor: dashColors.background,
  },
  dashList: {
    marginBottom: 70,
    marginTop: 10,
    marginRight: 70,
    flex: 1,
  },
  dashListItem: {
    margin: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  currentDash: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  pillContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30, 
    borderWidth: 1,
    backgroundColor: dashColors.darkPurple, 
    marginBottom: 6,
    marginTop: 6,
    width: '80%',
  },
  examContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30, 
    borderWidth: 1,
    backgroundColor: dashColors.darkPurple, 
    marginBottom: 6,
    marginTop: 6,
  },
  itemsName: {
    fontSize: 20,
    color: dashColors.niceWhite, 
  },
  examsName: {
    fontSize: 20,
    color: dashColors.niceWhite, 
  },
  schedulerPillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30, 
    borderWidth: 1,
    backgroundColor: 'green', 
    marginTop: 6,
    marginBottom: 6,
  },
  schedulerItemsMsg: {
    fontSize: 15,
    color: dashColors.niceWhite, 
    margin: 15,
  },
  graphTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  noExamContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: dashColors.background, 
    margin: 40,
  },
  noExams: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 30,
    marginTop: 50,
  },
});

export default dashStyle;