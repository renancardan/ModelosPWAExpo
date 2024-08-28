import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import Panico from '../assets/casaAtivo.png';
import ChatIcon from '../assets/casaAtivo.png';
import Lista from '../assets/casaAtivo.png';
import Finan from '../assets/casaAtivo.png';
import Botao from '../assets/casaAtivo.png';
import Feeds from '../assets/casaAtivo.png';
import Pesquisa from '../assets/casaAtivo.png';
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import Api from '../Api';




//79-todosos botões da tab
export default ({ state, navigation }) => {
    //83-vai puxar qual usuario está logado vai pegaro avatar.
    const { state:user } = useContext(UserContext);
    const [Opac, setOpac] = useState("Mural");
    const [Quant, setQuant] = useState(0)
    const [Vizu, setVizu] = useState(0)
    const [IdUser, setIdUser] = useState("");
    useEffect(() => {
            VendoVizu();
      }, []);

  
     
    //     const MudarIdUser = async  ()=>{
    //         var IdUse = await AsyncStorage.getItem('Id');
    //         setIdUser(IdUse)
    //         }

    const VendoVizu = async  ()=>{
         Api.QuantVizu(IdUser, setQuant, setVizu)
    }
         
//81-criando a função de click nas tabs 
    const goTo = (screenName) => {
        navigation.navigate(screenName);
        setOpac(screenName);
    }

    return (
        //82 - criando a opacidade ,tamanbho e cor das tabs 
        <View style={styles.Caixa}>
           <TouchableHighlight style={styles.btn} onPress={()=>goTo("Jogos")}>
                <Feeds style={{opacity: Opac==="Jogos"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TouchableHighlight >
            <TouchableHighlight style={styles.btn} onPress={()=>goTo("Aposta")}>
          
                <ChatIcon style={{opacity: Opac==="Aposta"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
               {Quant !== Vizu &&
                <View style={styles.CaixaDadosChat}>
                <Text style={styles.TextCha}>{Quant - Vizu}</Text>
                </View>
               }
             
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={()=>goTo("Financeiro")}>
                <Pesquisa style={{opacity: Opac==="Financeiro"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TouchableHighlight>
        
            <TouchableHighlight style={styles.btn} onPress={()=>goTo("Rede")}>
                <Lista style={{opacity: Opac==="Rede"? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TouchableHighlight>

            <TouchableHighlight style={styles.btn} onPress={()=>goTo("Cambista")}>
                <Botao style={{opacity: Opac==="Cambista" ? 1 : 0.5}} width="30" height="30" fill="#FFFFFF" />
            </TouchableHighlight>
            
        </View>
    );
}

const styles = StyleSheet.create({
    Caixa:{
        height:50,
        backgroundColor:"#000",
        flexDirection:"row",
    },
    btn:{
       flex:1,
       justifyContent:"center",
       alignItems:"center"
    },
    CaixaDadosChat:{
        display:"center",
        alignItems:"center",
        justifyContent:"center",
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:"red",
        marginLeft:-30,
        marginTop:-20,
     },
     TextCha:{
       fontSize:12,
       color:"#fff"
     },

  
   

})