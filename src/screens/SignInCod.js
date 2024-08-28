import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import SignInput from '../components/SignInput';
import {FontAwesome} from "@expo/vector-icons";

import Api from '../Api';



export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);

    const navigation = useNavigation(); 
    const [Nome, setNome] = useState("");
    const [Tel, setTel] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(null);
    const [Irpre, setIrpre] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Pos, setPos] = useState(0);
    const [Whats, setWhats] = useState(0);
    const [Tele, setTele] = useState(0);
    const [Inicio, setInicio] = useState("");
    const [ModalText, setModalText] = useState("");
    const [ModalAlert, setModalAlert] = useState(false);
    const [Tentativa, setTentativa] = useState(0)


    useEffect( ()=>{                     
       QuantidadeWhats()                       
      }, []);

    useEffect(() => {
        if(Irpre === true){
            confirmCode();
        }
       }, [Irpre])

       useEffect(() => {
        if(Tentativa === 3){
            Voltar();
        }
       }, [Tentativa])


       const CirandoWhats = ()=>{
        Api.CriandoW(Inicio, setPos, setWhats, setTele)
     }  

     const QuantidadeWhats = ()=>{
      Api.QuantiWhats(Inicio, setPos, setWhats, setTele)
    }  

    const handleMessageButtonClick = () => { 

        if( code != null ) {
        setLoading(true);
        Api.signIn3(Tel, code, Tentativa, setIrpre, setLoading, setModalAlert, setModalText, setTentativa);
         
      
    }  else {
      setModalAlert(true)
      setModalText("Prencha o Código Corretamente!")
    }

    }

    const PreencherTel = async ()=>{    
        var tel = await AsyncStorage.getItem('Tel');
        setTel(tel);
       }
      

    const confirmCode= ()=> {
        navigation.reset({
           routes:[{name:'Preload'}]
       });
     }

     const Voltar= ()=> {
        navigation.reset({
           routes:[{name:'SignIn'}]
       });
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
          resizeMode='cover' 
          style={styles.imageBack} >
            <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
            <View  style={styles.AreaLogin}>
           {Loading === false ? 
         
         <View  style={styles.InputArea}>

                
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />
            <SignInput
                    
                        placeholder="Digite o Código" 
                        value={code}
                        onChangeText={t=>setCode(t)}
                        autoCapitalize="none"
                        keyboardType={"numeric"}
                    />
                    </View>
                    <TouchableHighlight  style={styles.Btn} onPress={handleMessageButtonClick} >
                            <Text style={styles.BtnText}>Entrar</Text>
                 </TouchableHighlight>
                {/* <CustomButton1 onPress={IrcadasSim} >
                        <CustomButtonText1> Cadastro Simples CLIQUE AQUI!</CustomButtonText1>
                </CustomButton1> */}
    
            </View>
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
    imageLoad: {
        width:  100,
        height: 100,
          flex: 1 ,
          alignItems:"center",
          justifyContent: "center",
          
      },
    BtnText: {
      fontSize: 18,
      color: "#FFF212",
      fontWeight: "bold",
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
    image: {
      width: '100%',
      height: '100%',
       flex: 1 ,
       alignItems:"center",
       justifyContent: "center",
    },
    imageIcon: {
        width:  60,
        height: 60,
          flex: 1 ,
          alignItems:"center",
          justifyContent: "center",
          
      },
    ImageVer2:{
        width:200,
        height:200,
        marginTop: 100,
    },
    TituText:{
        fontSize: 15,
        color: "#fff",
        marginBottom: 30,
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
          imageBack: {
            width:  "100%",
            height: "120%",
              flex: 1 ,
              alignItems:"center",
              justifyContent: "center",
            
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