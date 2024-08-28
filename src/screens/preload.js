import React, { Component, useEffect, useContext, useState  } from 'react'
import { Text, View, StyleSheet, ImageBackground, Image, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';
//import CityLogo from '../../assets/logomarca.svg';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    const [Cidade, setCidade] = useState('');
    const [Estado, setEstado] = useState('');
    const [Area, setArea] = useState(null);
    const [Regiao, setRegiao] = useState('')
    const [Id, setId] = useState('');
    const [Nome, setNome] = useState('');
    const [Emp, setEmp] = useState('');
    const [IrHome, setIrHome] = useState(false);
    const [IrLogin, setIrLogin] = useState(false);
    const [IdArea, setIdArea] = useState("");
    const [Lat, setLat] = useState("");
    const [Lng, setLng] = useState("");
   // console.log(window.location.href);
    useEffect(() => {
        if(IrLogin === true){
            irParaLogin();
        }
         }, [IrLogin])


      

    useEffect(async() => {
      if(IrHome === true){
          await  guardaDados();
         await irParaHome();
       
      }
       }, [IrHome])
    
    useEffect(()=>{
     
      EntrandoLinks();


    }, []);

    const EntrandoLinks = () => {
      const Site = window.location.href;
    const VerSite =  Site.split("/");
    console.log(VerSite)
    if(VerSite[3] === "links"){
  
    navigation.navigate("ApCambis", {
      id:VerSite[4],
    });


    } else if(VerSite[3] === "boleto") {
      navigation.navigate("Boleto", {
        id:VerSite[4],
      });

    } else if(VerSite[3] === "apostas") {
      navigation.navigate("LinkApos", {
        id:VerSite[4],
      });

    }  else  {
      checkAuth();
    }  
     
    }


    const checkAuth = async () => {
      await AsyncStorage.setItem('@empresa', '');
      var tel = await AsyncStorage.getItem('Tel');
      var cod = await AsyncStorage.getItem('@codigo');
      var time = await AsyncStorage.getItem('@entrada');
      var Emp = await AsyncStorage.getItem('@empresa');

 

  
      if(tel){
          let user = await Api.checkToken(tel, cod, time, setIrHome, setIrLogin,   setId, ); 
      } else {
          await navigation.reset({
              routes:[{name:'SignIn'}]
          });

      }
     

      }


   const irParaHome = ()=>{
    navigation.reset({
        routes:[{name:"MainTab"}]
    });
   }

   const irParaLogin = ()=>{
    navigation.reset({
        routes:[{name:'SignIn'}]
    });
   }

    const  guardaDados =()=>{
    
        userDispatch({
            type: 'setId',
            payload:{
                id: Id
            }
        });
    }


   
  
    
    return (
      <View style={styles.Container}>
        
        
           <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode="cover" 
          style={styles.imageBack} >
            <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
       
      
       <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
       <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
            </ImageBackground> 
      </View>
    )
  }


const styles = StyleSheet.create({

    image: {
      width:  100,
      height: 100,
       flex: 1 ,
       alignItems:"center",
       justifyContent: "center",
       backgroundColor:"#000"
       
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
        marginTop: 300,
       
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