
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SignInput from '../components/SignInputIni';
import SignInputCod from '../components/SignInput';
import Telefone from '../components/NumberTel';
import Api from '../Api';
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../contexts/UserContext';

export default () => {
  const captcha = useRef(null)
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  const [NomeCli, setNomeCli] = useState("");
  const [TelCli, setTelCli] = useState("");
  const [Carre, setCarre] = useState(false);
  const [Msg1erro, setMsg1erro] = useState(false);
  const [Msg2erro, setMsg2erro] = useState(false);
  const [Msg3erro, setMsg3erro] = useState(false);
  const [Te1, setTe1] = useState(false);
  const [Te2, setTe2] = useState(false);
  const [TelMsg, setTelMsg] = useState(true)
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState(null);
  const [IrEnt, setIrEnt] = useState(false);
  const [IrCad, setIrCad] = useState(false)
  const [Loading, setLoading] = useState(false);
  const [Carreg, setCarreg] = useState(false)
  const [Btn, setBtn] = useState(false);
  const [Btn1, setBtn1] = useState(false);
  const [Btn2, setBtn2] = useState(false);
  const [AppEnv, setAppEnv] = useState("");
  const [NomeConvi, setNomeConvi] = useState("")
  const [DateInd, setDateInd] = useState(0)
  const [Alert, setAlert] = useState("");
  const [AlertTipo, setAlertTipo] = useState(null);
  const [ModalCalend, setModalCalend] = useState(false);
  const [Robo, setRobo] = useState(true);
  const [Tentativa, setTentativa] = useState(0);
  const [CodLast, setCodLast] = useState(0);
  const [CodG, setCodG] = useState(false);
  const [Senha, setSenha] = useState("");
  const [VerNotajogo, setVerNotajogo] = useState(false);
  const [PorComis, setPorComis] = useState("");
  const [LinWhats, setLinWhats] = useState(userState.QN4.ConfigEmp.LinkWhats !== ""?userState.QN4.ConfigEmp.LinkWhats:userState.LinkWhats)
  const [Logo, setLogo] = useState(userState.QN4)
  const [QMAp, setQMAp] = useState(0);
  const [PorPremi, setPorPremi] = useState(0);


  useEffect(() => {
    if(TelCli !== "" && TelCli.length === 14){
        TelWhats();
    }
    
   }, [TelCli])
   useEffect(() => {
    setPorComis(userState.QN4.ConfigEmp.PorcCom)
    setQMAp(userState.QN4.ConfigEmp.MaxAposta)
    setPorPremi(userState.QN4.ConfigEmp.PorPremParaCam)
   }, [])

   const TelWhats = ()=>{
    setLoading(true)
   Api.VerWhatsInd(TelCli, LinWhats, setTelMsg, setNomeCli, setBtn, setLoading)
   Api.AnaliseTelIndic(TelCli, setTe1, setNomeCli, setBtn1, setTe2, setBtn2, setDateInd)  
      }
      const IrIndicar = ()=>{
        navigation.navigate("ListIndiq")
     }


      const onChangeRec = ()=> {
        if(captcha.current.getValue()){
          setRobo(false)
        } else {
          setRobo(true)
        }
      }
     
      const EnviandoMsg = () => {
        if(parseInt(Senha)  === CodLast){
        if(TelMsg === true){
            if(TelCli !== '' && NomeCli !== "") {
                setLoading(true);
                Api.EnviadoApp(NomeCli, QMAp, PorPremi, PorComis, LinWhats, Logo, TelCli, setAlertTipo, setAlert, setLoading, setModalCalend,  setBtn, setBtn1, setBtn2, setCodG, setSenha, setTentativa, setRobo, setNomeCli, setTelCli, setCodLast, setDateInd, setTelMsg, setTe1, setTe2);
                 
              
            }  else {
              setAlert("Preencha todos os campos!")
             setAlertTipo("danger")
             setModalCalend(true)
           
            }

        } else {
          setAlert("Este Telefone Não é um Whatsapp!")
          setAlertTipo("danger")
          setModalCalend(true)
        }
      } else {
        setTentativa(Tentativa +1)
       setAlertTipo("danger")
        setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
        setModalCalend(true);
        
      }
 
       

    }

    const SairAlert = ()=>{
      setAlert("")
      setAlertTipo("")
      setModalCalend(false)
    }

  const Voltar = ()=>{
    navigation.goBack();
  }

  const GerarCod =  async ()=> {
          
    if(Robo === false){
      setCarre(true)
      Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
    } else {
      setModalCalend(true);
      setVerNotajogo(false);
      setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
      setAlertTipo("danger")
    }
   
      
   
     
    }

    return (
      <View style={styles.Container}>
          <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode='cover' 
          style={styles.imageBack} >
             <Modal
            transparent={true}
            animationType="slide"
            visible={ModalCalend}
            >
              <View style={styles.viewCalend}>
              {AlertTipo === "danger"?
              <>
           
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext2}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>SairAlert()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
            
              </>

              :
              <>
             
               <View  style={styles.ModVie}>
                <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>SairAlert()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
               </View>
       
           

              </>

              }

              </View>
              </Modal>
              
             <View style={styles.CaixaTitulo} >
              <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                <>
              <FontAwesome name="arrow-circle-left" size={30} color="#fff" />
            
              </>
              </TouchableHighlight>
              {userState.QN4.LogoEmp !== "" ?
              <>
                <Image  source={{uri:userState.QN4.LogoEmp }}  style={styles.ImageVer2 } />
              </>
              :
              <>
              <Image source={require('../assets/logomarca.png')}  style={styles.ImageVer2 } />
              </>
              }

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Criar Cambista
             </Text>
              </TouchableHighlight>
             
            </View >
           
            <ScrollView>
            {/* <TouchableHighlight style={{width:200, height:50, backgroundColor:"#1AA6D3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrIndicar()}>
                    <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Ver Lista de Indicados</Text>
            </TouchableHighlight> */}
             
                   
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20, color:"#FFF"  }}>Porcentagem de Comissão(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15, color:"#FFF"    }}>Digite a Porcentagem especifica de Comissão por Cambista, caso você queira dá uma comissão diferenciada.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="plus" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Porcentagem" 
                              value={PorComis}
                              onChangeText={t=>setPorComis(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20, color:"#FFF"  }}>Quantidade Máxima de Aposta(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15, color:"#FFF"    }}>Digite a quantidade Limite Máxima de aposta que o Cambista pode fazer sem dar Baixa nos pagamentos. Contudo ele dando Baixa é liberado para ele fazer mais apostas.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="deviantart" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Porcentagem" 
                              value={QMAp}
                              onChangeText={t=>setQMAp(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20, color:"#FFF"  }}>Porcentagem do Prêmio(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15, color:"#FFF"    }}>Digite a porcentagem que o Cambista terá direito sobre o prêmio do seu cliente.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="deviantart" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Porcentagem" 
                              value={PorPremi}
                              onChangeText={t=>setPorPremi(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="user" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Nome do Funcionario" 
                       value={NomeCli}
                       onChangeText={t=>setNomeCli(t)}
                       autoCapitalize="none"
                       keyboardType={"default"}
                       posi={18}
                   />
                  
                   </View>
                   <View  style = {styles.InputAra}>
                  <FontAwesome name="phone-square" size={24} color="black" />
                  
                   <Telefone                      
                       placeholder="Whatsapp do Funcionario " 
                       value={TelCli}
                       onChangeText={t=>setTelCli(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                   
                   /> 
                   </View>
                   {Loading === false ?   
            <>      
            {Btn === true && Btn1 === true && Btn2 === true?
            <>
             {Carre === true ?
                        <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                        </>

                        :
                        <>
                         {CodG === false?
                        <>
                       
                       <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            <TouchableHighlight style={{width:150, height:70, backgroundColor:"#1ED31A", borderRadius:5, margin:10, padding:5, flex:1, justifyContent:"center", alignItems:"center"  }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código de Segurança</Text>
                          </TouchableHighlight>
             
                      </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                        <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff"}}>
             <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Excedeu o Limite de Tentativas!</Text> 
             </View>
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                    <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff"}}>                                
                                   <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o Whatsapp</Text> 
                                   </View>
                                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Código" 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EnviandoMsg()}>
                    <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Criar</Text>
            </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }
                        </>

                        }
           
          
                  
            </>
            :
            <>
            {TelMsg=== false &&
             <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff", marginBottom:10}}>
             <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Este Telefone Não é um Whatsapp!</Text> 
             </View>
               
                }
                 {Te1=== true &&
                  <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff", marginBottom:10}}>
                  <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Esse Telefone já é Funcionario de uma Franquia!</Text> 
                  </View>
                }

              {Te2=== true &&
              <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff", marginBottom:10}}>
              <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Esse Telefone já é Funcionario de uma Franquia!.</Text> 
              </View>
              
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

{/* <View style={{padding:10,width:350, borderRadius:10, backgroundColor:"#fff"}}>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Indicação:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>1° Coloque o Whatsapp e o Nome da Pessoa, e será liberado o Botão de Indicar </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>2° Ao clicar em Indicar, ele receberá um Link em seu Whatsapp para ela ser direcionado para o Cadastro. </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>3° Essa Indicação terá o prazo de 24 horas, a parti do momento em que você clicar em Indicar. Se a Pessoa não se cadastrar entre essas 24 horas, essa indicação  perde a validade, podendo outro Usuário indicar essa pessoa.  </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>4° Se a pessoa Indicada já estiver cadastrada no sistema, você não poderá mais indicá-la  </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>5° Se a pessoa Indicada já foi Indicada por outro usuário, espere passar o tempo de validade da indicação para poder indicá-la novamente. </Text>
                      </View> */}

            </ScrollView>
        </ImageBackground>
      </View>
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
    width:300,
    height:40,
    backgroundColor: "#fff",
    flexDirection:"row",
    borderRadius:20,
    alignItems: "center",
    marginBottom:15,
    paddingLeft:10,
    paddingRight:10,
    marginTop:15,
    marginLeft:10,
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"

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
    justifyContent: "center",
    alignItems: "center",
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
            width:  "100%",
            height: "120%",
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