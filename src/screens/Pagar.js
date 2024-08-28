
import React, { Component } from 'react'
import {Modal, Text, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { WebView } from 'react-native-webview';

export default ({route})=> {
  const stateChange= (state)=>{
    // console.log(state); 
    // let url = state.url
    // if(state.canGoBack=== true && !url.includes('mercadopago')){
    //     if(url.includes("approved")){
    //         setLoad(true);
    //         Api.PagandoAnuncio(IdRo);
    //       navigation.navigate("Preload");
    //     }
    // }
}

const ActivityIndicatorElement = () => { 
  return ( 
    <>
    </>
      //<LoadingIcon size="large" color="#000" />
  ); 
};
 
    return (
      <View style={styles.Container}>
          <WebView 
          source={{ uri: route.params.Site }} 
          style={{marginTop: 10}}
          startInLoadingState={true}
          onNavigationStateChange={state=>stateChange(state)}
          renderLoading={ActivityIndicatorElement}
          />
      </View>
    );
  
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
      color: "#000",
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