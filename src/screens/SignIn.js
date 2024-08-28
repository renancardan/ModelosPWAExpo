import React, { Component, useEffect, useContext, useState, useRef  } from 'react'
import {Platform, Modal, Alert, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
import Telefone from '../components/NumberTel';
import SignInput from '../components/SignInputIni';
import ReCAPTCHA from "react-google-recaptcha";
import {FontAwesome} from "@expo/vector-icons";


export default () => {

  const captcha = useRef(null)
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    const [Nome, setNome] = useState("");
    const [Tel, setTel] = useState("");
    const [Te1, setTe1] = useState(false);
    const [TelMsg, setTelMsg] = useState(true)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(null);
    const [IrEnt, setIrEnt] = useState(false);
    const [IrCad, setIrCad] = useState(false)
    const [Loading, setLoading] = useState(false);
    const [Carreg, setCarreg] = useState(false)
    const [Btn, setBtn] = useState(false);
    const [ModalLoad, setModalLoad] = useState(false);
    const [ModalText, setModalText] = useState("");
    const [ModalAlert, setModalAlert] = useState(false);
    const [Robo, setRobo] = useState(true);
    const [IdInd2, setIdInd2] = useState("");
    const [VerSite2, setVerSite2] = useState("");
   // console.log(window.location.href);
 
    useEffect(() => {
      EntrandoLinks()
     }, [Te1])

  useEffect(() => {
      if(IrEnt === true){
          Entrando();
      }
     }, [IrEnt])

     useEffect(() => {
      if(IrCad === true){
          Cadastrado();
      }
     }, [IrCad])

     useEffect(() => {
      if(Tel !== "" && Tel.length === 14 && Robo === false){
    
          TelWhats();
      
      } else {
        if(Robo === true && Tel.length > 3 ){
          setModalAlert(true);
          setModalText("Clique no Não sou Robô!")
        }
      }
      


     }, [Tel, Robo])


     const EntrandoLinks = () => {
      const Site = window.location.href;
    const VerSite =  Site.split("/");
   
    if(VerSite[3] === "indicacao"){
    setIdInd2(VerSite[4])
    setVerSite2(VerSite[3])
    }   
     
    }

   const handleMessageButtonClick = () => {
   
     if(Robo === false){
      if(TelMsg === true){
        if(Tel !== '' && Nome !=="" ) {
            setLoading(true);
            Api.signIn(Tel, Nome, IdInd2, VerSite2, setIrCad, setIrEnt, setLoading, setModalAlert, setModalText );
             
          
        }  else {
          setModalAlert(true);
          setModalText("Preencha todos os campos!")
      
        }

    } else {
      setModalAlert(true);
      setModText("Este Telefone Não é um Whatsapp!")
    }

     } else {
      setModalAlert(true);
      setModText("Clique no Não Sou Robô!")
    }
      
     

    }

  const Cadastrado = ()=> {
      navigation.navigate("AvisoLoc", { 
          Nome:Nome,
          Tel:Tel, 
          Tipo:"Cadastro"
        });
   }

 
   const Entrando = async () => {
      navigation.navigate("SignInCod", { 
          Nome:Nome,
          Tel:Tel, 
          Tipo:"Entrada"
        });
   
      
      }

    const TelWhats = ()=>{
       setLoading(true)
      Api.VerWhats(Tel, setTelMsg, setNome, setBtn, setLoading)
      Api.AnaliseTel(Tel, setTe1, setNome) 
     
   }

  //  const onMessage = (event)=>{
  //   if (event && event.nativeEvent.data) {
  //     if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
  //       captcha.current.hide();
  //         return;
  //     } else {
  //         console.log('Verified code from Google', event.nativeEvent.data);
  //         setTimeout(() => {
  //           captcha.current.hide();
  //             // do what ever you want here
  //         }, 1500);
  //     }
  // }
  //  }

  const onChange = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

   
  
    
    return (
      <KeyboardAvoidingView style={styles.Container}>
       <Modal
                       transparent={true}
                      animationType="slide"
                      visible={ModalAlert}
                      >
                <View style={styles.centeredView4}>
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{ModalText}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>setModalAlert(false)} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
             </View>
          </Modal>
        
        
           <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode="cover" 
          style={styles.imageBack} >
            <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
             <View  style={styles.AreaLogin}>
             <ReCAPTCHA
                                    ref={captcha}
                                        sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                                        size="normal"
                                        hl="pt"
                                        theme="dark"
                                        onChange={onChange}
                                      />
             <View  style = {styles.InputAra}>
             <FontAwesome name="phone-square" size={40} color="black" />
             <Telefone
                       
                       placeholder="Digite seu Whatsapp" 
                       value={Tel}
                       onChangeText={t=>setTel(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                      TelWhats={TelWhats}
                   /> 
                  
                
                       </View>

                    
                      
              
                     
                          
                     {Loading === false ?   
            <>      
            {Btn === true ?
            <>
              <View  style = {styles.InputAra}>
              <FontAwesome name="user" size={40} color="black" />
             <SignInput
                        placeholder="Digite Nome Completo" 
                        value={Nome}
                        onChangeText={t=>setNome(t)}
                        autoCapitalize="none"
                        keyboardType={"default"}
                        posi={1000}
                    /> 
                
                       </View>
           
             <TouchableHighlight  style={styles.Btn} onPress={handleMessageButtonClick} >
                            <Text style={styles.BtnText}>Criar Código</Text>
                 </TouchableHighlight>
                        
            </>
            :
            <>
            {TelMsg=== false &&
                <Text style={styles.TexMsg} >Este Telefone Não é um Whatsapp!</Text>
                }
            </>
            }

            </>  
                :
               <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
       <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
               </>
                        }
              
             </View>
       
            
            </ImageBackground> 
    
      </KeyboardAvoidingView>
    )
  }


const styles = StyleSheet.create({
  centeredView4: {
    backgroundColor:'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  BtnText: {
    fontSize: 18,
    color: "#FFF212",
    fontWeight: "bold",
  },
  Avitext: {
    fontSize: 15,
    color: "#000",
  },
  ModVie: {
    backgroundColor: "#FFF",
    width:200,
    height:100,
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"
  },
  ModVieTex: {
    width:180,
    height:70,
    justifyContent: "center",
    alignItems: "center",
  },
  ModVieBtn: {
    width:180,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },
  ModVieBtnBtn: {
    width:90,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none'
  },
  ModVieTexSim: {
    fontSize: 18,
    color: "#00C9FB",
    fontWeight: "bold",
  },
  ModVieTexNao: {
    fontSize: 18,
    color: "#EB7560",
    fontWeight: "bold",
  },
InputAra :{
   width:"90%",
   height:60,
   backgroundColor: "#fff",
   flexDirection:"row",
   borderRadius:20,
   alignItems: "center",
   marginBottom:15,
   paddingLeft:5,
   marginTop:15,
},

AreaLogin :{
  width:300,
  flexDirection:"column",
  borderRadius:20,
  alignItems: "center",
  justifyContent:"center",
  marginBottom:15,
  paddingLeft:5,
},

Btn: {
  width:"90%",
  marginTop:10,
 height:60,
 backgroundColor: "#00A859",
 borderRadius:20,
 justifyContent:"center",
 alignItems: "center",
borderColor:"#FFF212",
borderWidth:2,
 
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
    marginBottom:15,
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
    ImageVer5:{
      width:50,
      height:100,
      marginTop: 10,
   
     
    },  
    ImageVer3:{
      width:100,
      height:90,
      marginTop: 140,
  
     
    },    
});