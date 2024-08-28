import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';
import {decode, encode} from 'base-64';





if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


export default function App() {



  const customStyle = {
    container: {
      backgroundColor: '#e8e8e8',
      borderRadius: 10,
    },
    buttonCancel: {
      backgroundColor: '#b51919',
      borderRadius: 5,
      paddingLeft:10,
      paddingRight:10,
    },
    buttonConfirm: {
      backgroundColor: '#4490c7',
      borderRadius: 5,
      paddingLeft:10,
      paddingRight:10,
    },
    textButtonCancel: {
        color: '#fff',
        fontWeight: 'bold'
    },
    textButtonConfirm: {
        color: '#fff',
        fontWeight: 'bold'
    },
    title: {
      color: '#003d69',
      fontSize: 17,
      fontWeight: 'bold'
    },
    message: {
      color: '#4f4f4f',
      fontSize: 12
    }
  }


  return (
    <UserContextProvider>
    
   <MainStack />
 
   </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
