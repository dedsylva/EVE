import styled from "styled-components";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
} from "react-native";

// Colors
export const colors = {
  primary: "#332424",
  secondary: "#4D3636",
  tertiary: "#E6E6E6",
  alternative: "#999999",
  cool_background: '#D84444',
  light_red: '#F78A8A',
  background: '#F0F0EC',
  darkPurple: '#7A3EE9',
  cool_orange: '#E6A57C',
  black: '#1B0B02',
};


export const Container = styled.SafeAreaView`
  background-color: ${colors.primary};
  padding: 20px;
  padding-bottom: 0px;
  flex: 1;
  padding-top: 10px;
`;

// Header
export const HeaderView = styled.View`
  padding-vertical: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${colors.black};
  letter-spacing: 2px;
  font-style: italic;
`;
export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary};
`;

// List
export const ListContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
  padding-bottom: 40px;
`;

export const ListView = styled.TouchableHighlight`
  background-color: ${colors.background};
  justify-content: space-around;
  border-radius: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  height: 60px;
`;

export const ListViewHidden = styled.View`
  width: 100%;
  height: 60px;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  border-radius: 11px;
`;

export const HiddenButton = styled.TouchableOpacity`
  width: 55px;
  align-items: center;
`;

export const TodoText = styled.Text`
  letter-spacing: 1px;
  color: black;
  textAlign: center;
  textAlignVertical: center;
  height: 50px;
  fontSize: 30px
`;

export const TodoDate = styled.Text`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${colors.alternative};
  text-align: right;
  text-transform: uppercase;
`;

// Text for swiped todo row
export const SwipedTodoText = styled(TodoText)`
  color: ${colors.alternative};
  font-style: italic;
  text-decoration: line-through;
`;

// Modal
export const ModalButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${colors.background};
  border-radius: 50px;
  align-self: flex-start;
  padding-left: 20px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ModalView = styled.View`
  background-color: ${colors.cool_orange};
  border-radius: 40px;
  padding: 35px;
  margin-top: 100px;
  margin-left: 400px;
`;

export const StyledInput = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
  margin-bottom: 20px;
`;

export const ModalAction = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;
