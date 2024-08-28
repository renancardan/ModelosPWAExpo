import React, { Component, useEffect, useContext, useState  } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
import Telefone from '../components/NumberTel';
import SignInput from '../components/SignInputIni';

export default ({route}) => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    console.log("Entrando no "+route.params.Tipo)


    const handleMessageButtonClick = () => {
      if(route.params.Tipo ==="Cadastro" ){
       navigation.navigate("CadastroSim");
      } else {
       navigation.navigate("SignInCod");
    

      }
      

   }

//   const Cadastrado = ()=> {
//       navigation.navigate("AvisoLoc", { 
//           Nome:Nome,
//           Tel:Tel, 
//           Tipo:"Cadastro"
//         });
//    }

 
//    const Entrando = async () => {
//       navigation.navigate("AvisoLoc", { 
//           Nome:Nome,
//           Tel:Tel, 
//           Tipo:"Entrada"
//         });
   
      
//       }

//     const TelWhats = ()=>{
//        setLoading(true)
//       Api.VerWhats(Tel, setTelMsg, setNome, setBtn, setLoading)
//       Api.AnaliseTel(Tel, setTe1, setNome)  
//    }
   
  
    
    return (
      <KeyboardAvoidingView style={styles.Container}>
      
        
        
           <ImageBackground source={require("../assets/fundo.png")} 
          resizeMode="cover" 
          style={styles.imageBack} >
            <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />
             <View  style={styles.InputArea}>
             <Text style={styles.InformText}>ROUTECITY coleta dados de localização para permitir o serviço de Entrega, Apoio e Produção De Rotas, mesmo quando o aplicativo está fechado ou não está em uso."</Text>

             <TouchableHighlight  style={styles.Btn} onPress={handleMessageButtonClick} >
                            <Text style={styles.BtnText}>PRÓXIMO</Text>
             </TouchableHighlight>
                     
             

             </View>
       
            
            </ImageBackground> 
    
      </KeyboardAvoidingView>
    )
  }


const styles = StyleSheet.create({
  BtnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  InformText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom:50,
    textAlign:"center",
  },
InputAra :{
   width:"90%",
   height:60,
   backgroundColor: "#fff",
   flexDirection:"row",
   borderRadius:20,
   alignItems: "center",
   marginBottom:15,
},

Btn: {
  width:"90%",
  marginTop:10,
 height:60,
 backgroundColor: "#000",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
 
},


TexMsg: {
  fontSize: 16,
  color: "red",
  marginBottom: 15,
  marginTop: -10,
},

image: {
  width:  30,
  height: 30,
    flex: 1 ,
    alignItems:"center",
    justifyContent: "center",
    
},

imageLoad: {
  width:  100,
  height: 100,
    flex: 1 ,
    alignItems:"center",
    justifyContent: "center",
    
},

imageBack: {
    width:  "100%",
    height: "120%",
      flex: 1 ,
      alignItems:"center",
      justifyContent: "center",
  },
ImageVer2:{
    width:200,
    height:200,
    marginTop: 100,
},
    
  InputArea:{
    width: "100%",
    padding: 40,
    
    },  
  Container:{
    backgroundColor: "#FFE767",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingBottom: 100,
    
  },  
  ContainerImg:{
    width:200,
    height:200,
    backgroundColor: "#000",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
    
    },  
});