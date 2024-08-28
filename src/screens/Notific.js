
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SignInput from '../components/SignInputIni';
import MensagemItem from '../components/MensgItem/MensagemItem';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../contexts/UserContext';
import Api from '../Api';

export default () => {
  const body = useRef();
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  const [Msg, setMsg] = useState("");
  const [InfoAudi, setInfoAudi] = useState('');
  const [ImgTmp, setImgTmp] = useState('');
  const [AudTmp, setAudTmp] = useState('');
  const [Ocorre, setOcorre] = useState("nada");
  const [TmpMsg, setTmpMsg] = useState(null);
  const [MstImage, setMstImage] = useState(false);
  const [MsgVideo, setMsgVideo] = useState(false);
  const [Quadro1, setQuadro1] = useState(false);
  const [Quadro2, setQuadro2] = useState(false);
  const [Quadro3, setQuadro3] = useState(false);
  const [Quadro4, setQuadro4] = useState(false);
  const [QuadroG, setQuadroG] = useState(false);
  const [VideoTmp, setVideoTmp] = useState('');
  const [Quadro5, setQuadro5] = useState(false);
  const [Mudar, setMudar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalImg, setModalImg] = useState(false);
  const [Bady, setBady] = useState('');
  const [Carreg, setCarreg] = useState(false);
  const [AparCamera, setAparCamera] = useState(false)
  const [Ativo, setAtivo] = useState(false);
  const [TemUlt, setTemUlt] = useState('');
  const [Cont, setCont] = useState('');
  const [Dig, setDig] = useState(false);
  const [VizuS, setVizuS] = useState(0);
  const [ModalLoc, setModalLoc] = useState(false);
  const [TraLoc, setTraLoc] = useState(false)
  const [ModalCalend, setModalCalend] = useState(false);
  const [VerImg, setVerImg] = useState(false)
  const [Carre, setCarre] = useState(false);
  const [Img, setImg] = useState("");

  const Voltar = ()=>{
    navigation.goBack();
  }

  useEffect( ()=>{ 
    if(Ocorre !== 'nada'){
    VizualT();  
    }              
    }, [TmpMsg, Cont, Ocorre]);

   

    useEffect( ()=>{ 
     
      pegarMsg();
                         
    }, []);

    const pegarMsg = ()=>{
      Api.PegarConversas(Ocorre, setTmpMsg, setOcorre, setTemUlt, setCont, setDig, setVizuS);
  }

  const VizualT = ()=>{
    Api.VizualVit(Ocorre, Cont);
  }

  const renderItem = (item, index)=>{
        
        
    return(
        <MensagemItem
        inicial={null}
         data={item} 
         user={Ocorre} 
         InfoAudi={InfoAudi} 
         setInfoAudi={setInfoAudi}
         Mudar={Mudar}
         setMudar={setMudar}
         setModalVisible={setModalVisible}
         modalVisible={modalVisible}
         setBady={setBady}
         Bady={Bady}
         ModalImg={ModalImg}
         setModalImg={setModalImg}
           />
    );
}

 
const Enviando = async ()=>{
  if(Msg !== ''){
    await setMsg('');
    await  Api.enviandoMsg(Msg);
    
  }
  
   
}

const SairCriar = ()=>{
 
  setModalCalend(false);
  setVerImg(false);
 
 }

 const EnviarImg =()=>{
  setModalCalend(true);
  setVerImg(false);
  setImg("");
 }

 const openImagePickerAsync = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  setImg(pickerResult.uri);
  console.log(pickerResult.uri.split(','))
}

const ExcluirImg = ()=>{
  setImg("")
}

const EnviarImagem = ()=>{
 setCarre(true)
 Api.enviandoImgMsg(Img, setImg, setModalCalend, setVerImg, setCarre )

}

    return (
      <View style={styles.Container}>
         <Modal
            transparent={true}
            animationType="slide"
            visible={ModalCalend}
            >
              <View style={styles.viewCalend}>
              
              {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
    
                      </>

                      :
                      <>
                    {VerImg ?
                    <>
                     <View  style={styles.CaixadeapostaTitulo}  >
                   <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Enviar Link</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                     </View> 
                    </>
                    :
                    <>
                    <View style={styles.QuadNota} >
                   
                     <View  style={styles.CaixadeapostaTitulo}  >
                      
                   <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Enviar Imagem</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                     </View>
                     {Img !== ""?
                     <>
                     
                     <Image  source={{uri:Img }}  style={{ width:200, height:200 }} />
                      <TouchableHighlight style={{width:250, height:50, backgroundColor:"red", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>ExcluirImg()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Excluir</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EnviarImagem()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Enviar Imagem</Text>
                        </TouchableHighlight>
                     </>
                     :
                      <>
                      <View style={{ width:200, height:200, flex:1, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#ccc", borderColor:"#000", borderWidth:1}}>
                      <FontAwesome name="camera" size={100} color="black" />
                      </View>
                      <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>openImagePickerAsync()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Procurar Imagem</Text>
                        </TouchableHighlight>
                     </>
                     }
                     
                     </View> 
                    </>
                    }
                  </>
                  }
            
             </View>
          </Modal>
          <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode='cover' 
          style={styles.imageBack} >
             <View style={styles.CaixaTitulo} >
              <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                <>
              <FontAwesome name="arrow-circle-left" size={30} color="#fff" />
            
              </>
              </TouchableHighlight>
            
           
              {userState.QN4.Funcionario === true ?
              <>
               {userState.QN3.LogoEmp !== "" ?
              <>
              <Image  source={{uri:userState.QN3.LogoEmp }}  style={styles.ImageVer2 } />
              </>
              :
              <>
              <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
              </>
              }
              </>
              :
              <>
               {userState.QN4.LogoEmp !== "" ?
              <>
                <Image  source={{uri:userState.QN4.LogoEmp }}  style={styles.ImageVer2 } />
              </>
              :
              <>
              <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
              </>
              }
              </>
              }

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Notificações
             </Text>
              </TouchableHighlight>
             
            </View >
            {TmpMsg &&
                 <FlatList
                 ref={ body }
                 onContentSizeChange={()=>{body.current.scrollToEnd({animated:true}) }}
                 onLayout={ ()=>{body.current.scrollToEnd({animated:true}) } }
                 style={styles.chatArea }
                 data={TmpMsg}
                 renderItem={(item)=>renderItem(item)}
                 keyExtractor={(item, index) => index.toString()}
                 />
            }
        <View style={{height:50, width:"100%", backgroundColor:"#000", flexDirection:"row", position:"absolute", bottom:0}} >
         <TouchableHighlight onPress={()=>EnviarImg()}  style={{marginLeft:10}}>
         <FontAwesome name="paperclip" size={40} color="#fff" />
         </TouchableHighlight>
         <View  style = {styles.InputAra}>
         <SignInput
                       placeholder="Digite a Mensagem" 
                       value={Msg}
                       onChangeText={t=>setMsg(t)}
                       autoCapitalize="none"
                       keyboardType={"default"}
                       posi={5000}
                   />
                   </View>
        <TouchableHighlight onPress={()=>Enviando()} >
        <FontAwesome name="send" size={40} color="#fff" />
         
         </TouchableHighlight>
        </View>
        
        </ImageBackground>
      </View>
    )
  
}

const styles = StyleSheet.create({
  chatArea:{
    flex:1,
    width:"100%",
    marginBottom:60,
  },
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
  Avitext2: {
    fontSize: 15,
    color: "red",
    margin:10
  },
  ModVie: {
    backgroundColor: "#FFF",
    width:200,
    height:200,
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
    width:270,
    height:40,
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius:5,
    alignItems: "center",
    paddingLeft:10,
    marginLeft:10,
    marginTop:5,
    marginRight:10,
 },

 AraCli:{
  width:200,
  height:40,
  backgroundColor: "#fff",
  flexDirection:"row",
  borderRadius:20,
  alignItems: "center",
  marginBottom:15,
  paddingLeft:5,
  marginTop:15,
},

  Valopre:{
    marginLeft: 10,
    marginBottom: 10,
    width: 250,
    paddingBottom: 10,
    borderColor:"#000",
    borderWidth:1,

  },

  Titupre:{
  width: 248,
  height: 30,
  backgroundColor: "#ccc",
  },

  AvisoJgo:{
   backgroundColor:"red",
   width:20,
   height:20,
   borderRadius:10,
   marginLeft:-30,
   marginTop:-25,
  },

  TexNota1:{
  color:"#fff",
  fontSize:15,
  },

  VerBole:{
   width:50,
   height:50,
   flex: 1,
   flexDirection:"column",
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#000",
   marginRight:10,
   marginTop:10,
   textAlign:"center",
   position:"absolute",
   bottom:50,
   right:10,
   borderRadius:5,
   fontWeight:"bold",
   paddingTop:10,
   color:"#fff",

  },

  Caixadeaposta:{
    marginBottom:5,
    width:300,
    height:500,
    flex:1,
    padding:10,
    justifyContent:"center",
    backgroundColor:"#28a745"  
    },


  fechaModal: {
    textAlign:"center",
    width:30,
    height:30,
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#ccc",
    borderRadius:15,
    marginTop:5,
    marginLeft:250,
    color:"#000",
    fontSize:18,
    fontWeight:"bold",
    position:"absolute",
    top:1,
    right:1,
    },

    ExcluirJogo: {
      textAlign:"center",
      width:40,
      height:40,
      flex:1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#FFF",
      borderRadius:5,
      marginTop:5,
      marginLeft:250,
      color:"#000",
      fontSize:18,
      fontWeight:"bold",
      position:"absolute",
      top:1,
      right:1,
      },

  modaldiv: {
    
   width:"100%",
   height:"100%",
   backgroundColor:"#000"
   },
  
  
  CaixadeapostaTitulo: {
   flexDirection:"column",
   textAlign: "center",
   width:300,
   height:30,
   flex:1,
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"#fff"
    
  },


  flatList: {
    paddingLeft: 15,
    paddingRight: 15, // THIS DOESN'T SEEM TO BE WORKING
    // marginRight: 15   I can't use marginRight because it cuts off the box with whitespace
  },

  AreaBox: {
    backgroundColor:"#fff",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:30,
    borderRadius:5,
    marginRight:10,
    borderColor:"#000",
    borderWidth:2,
    paddingLeft:5,
    paddingRight:5,
  
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

  CalendBtn: {
    width:90,
    height:30,
    justifyContent: "center",
    alignItems: "center",
    outlineStyle: 'none'
  },
  CalendTexSim: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  viewCalend: {
    backgroundColor:'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  QuadCalend: {
    backgroundColor: "#FFF",
    width:300,
    height:600,
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
   
  },

  QuadNota: {
    backgroundColor: "#FFF",
    width:300,
    height:600,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
   
  },

  



  AreaBtn3: {
    backgroundColor:"#fff",
    width:100,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:30,
    marginRight:10,
    borderColor:"#000",
    borderBottomWidth:2,
    borderRightWidth:2,
    borderTopWidth:2,
    borderBottomRightRadius:5,
    borderTopRightRadius:5,
   
  },


  AreaBtn4 :{
    backgroundColor:"#fff",
    width:60,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:30,
    marginLeft:5,
    marginRight:-15,
    borderColor:"#000",
    borderBottomWidth:2,
    borderLeftWidth:2,
    borderTopWidth:2,
    borderBottomLeftRadius:5,
    borderTopLeftRadius:5,

   },


  modalText6: {
    fontSize: 17,
    textAlign: "center",
    color:"#000"
  },

  modalView3: {
    width: '100%',
    height: 100,
    
    backgroundColor: "#fff",
    borderRadius: 5,
   
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },

  InputHora :{
    width:"70%",
    height:30,
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius:5,
    alignItems: "center",
    marginBottom:15,
    paddingLeft:5,
    marginTop:15,
    borderColor:"#000",
    borderWidth:2,
    marginLeft:10,
 },

 TextInforma :{

  height:40,
  backgroundColor: "#fff",
  flexDirection:"row",
  borderRadius:5,
  alignItems: "center",
  paddingLeft:5,
  marginTop:-25,
  borderColor:"#000",
  borderWidth:2,
  marginLeft:10,
},
AreaBtnCima :{
  width:300,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
 
 },
 
  AreaBtn :{
   width:200,
   display:"flex",
   justifyContent:"center",
   alignItems:"center",
   flexDirection:"row",
   marginBottom:10,
   height:40,
   padding:10,
  },
  AreaBtnTopConf :{
    width:150,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
   },

  AreaBtnLiga :{
    width: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginBottom:10,
    height:40,
    padding:10,
   },

  DateNextArea:{
   flex:1,
   alignItems:'flex-start',
  },
  
  
  DateTitle:{
   fontSize:17,
   fontWeight:"bold",
   color:"#000"
     },

  DateTitleArea:{
  width:140,
  justifyContent:"center",
  alignItems:"center"
   },


  DatePrevArea:{
   flex:1,
   justifyContent:'flex-end',
   alignItems:'flex-end',
  },


  DateInfo: {
  flexDirection:"row",
      },
 
 
  TextBody: {
    color:"#000",
    fontSize:15,
 
      },

  BodyBtn: {
    width:80,
    height:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFE767",
      },


  TextTitu: {
    color:"#fff",
    fontSize:12,
 
      },

 TituBtn: {
    width:80,
    height:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#00A859",
      },
  Btn: {
    width:80,
    height:60,
    marginRight:10,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor:"#fff",
      },
  Botoes: {
    width:"100%",
    height:60,
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    padding:15,
    backgroundColor:"rgba(0,0,0,0.3)"
      },
      BotoesAbaixo: {
        width:400,
        display:"flex",
        flex:1,
        justifyContent:"flex-start",
        alignContent:"center",
        flexDirection:"row",
        padding:15,
        backgroundColor:"rgba(0,0,0,0.3)",
        flexWrap:"wrap"
 
          },

      BotoesTitulo: {
        width:400,
        height:40,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        padding:5,
        backgroundColor:"rgba(0,0,0,0.3)",
      
        marginBottom:5,
          },

  TexMais: {
     color:"#000",
     marginLeft:5,
     fontSize:8,
     fontWeight:"bold"
  
       },
 
  TempDat: {
    width:"30%",
    height:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  
       },

  ImageTime: {
    width:30,
    height:30,
    borderRadius:3,
  
       },
       ImageCamp: {
        width:20,
        height:20, 
           },

  FotoTime: {
   width:30,
   height:30,
   borderRadius:3,
   marginLeft:5,
   marginRight:5,
      },


  Time: {
   color:"#000",
   fontWeight:"bold",
   marginLeft:5,
   fontSize:12
     },

     Data: {
      color:"#000",
      marginLeft:5,
      fontSize:12,
      fontWeight:"bold",

        },
 


  CaixaNome: {

     height:40,
     display:"flex",
     justifyContent:"center",
     alignItems:"flex-start",
     flexDirection:"column",
     },

  Post: {
   backgroundColor:"#FFF",
   width:"100%",
    },

    Header: {
     padding:5,
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"space-around",
     backgroundColor:"#FFF",
     height:60,
     width:400,
     borderBottomWidth:2,
     borderColor:"#ccc"
       },

  TextInfo: {
    fontSize: 23,
    color: "#FFF",
    fontWeight: "bold",
    fontStyle:"italic"
    },
   
    BtnText: {
      fontSize: 18,
      color: "#000",
      fontWeight: "bold",
      },

      CaixaDados:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginLeft:10

      }, 
    
  
        Container:{
            backgroundColor: "#FFFF",
            flex:1,
          justifyContent:"center",
           
          }, 

          imageBack: {
          
            
              flex: 1 ,
              alignItems:"center",     
          },

          CaixaTitulo:{
           marginTop:10,
           width:"100%",
           height:50,
           display:"flex",
           justifyContent:"space-around",
           alignItems:"center",
           flexDirection:"row",
           backgroundColor:"#000",
           paddingLeft:10,
           paddingRight:10,
           marginBottom:20,
           
          },
          ImageVer2: {
            width:  40,
            height: 40, 
          }, 
});