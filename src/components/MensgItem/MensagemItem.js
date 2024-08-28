import React, { useState, useContext, useEffect } from 'react';
import {Modal, Linking, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'

//import Video from 'react-native-video';
//import Slider from '@react-native-community/slider';
import Play from '../../assets/play.svg';
import PararAudio from '../../assets/stop.svg';
import AbrirVideo from '../../assets/video.svg';
import FecharQ from '../../assets/fechar.svg';
//import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import Maps from '../../assets/google-maps.svg';
//import CampoText from '../../components/campTextPos';
import Fechar from '../../assets/fechar.svg';

let rever = '';
//tempo atual menos 12 hrs
var Time = new Date().getTime()
var temp = Time - 43200000;
var temp2 = Time - 3600000;




export default ({data, user,  setInfoAudi, InfoAudi, Mudar, setMudar, modalVisible, setModalVisible, Bady,  setBady, ModalImg, setModalImg, inicial,  idOuvi, Ocorre, Desc, idDesc, idCar, SimEntrega, NaoEntrega, PosiInicial, PosiFinal, LocIni, LocFin, PedidoDeEntrega, FechaQuadro, setModalLoad, NomeOuvi  }) => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    
    const navigation = useNavigation();
    const [time, setTime] = useState();
    const [Loading, setLoading] = useState(false);
    const [Varia, setVaria] = useState(userState.variTemp)
    const [ListSegAnu, setListSegAnu] = useState(userState.SegAnun)
    const [SegAnun, setSegAnun] = useState("");
    const [ModalCri, setModalCri] = useState(false);
    const [NomeEd, setNomeEd] = useState("");
    const [Log, setLog] = useState(0);
    const [Lat, setLat] = useState(0);
    const [Estado, setEstado] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Carreg, setCarreg] = useState(true);
    const [Img, setImg] = useState("")
   

    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.item.date);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setTime(currentDate);
    }
    
    useEffect(()=>{
        tempo();
    }, []);

    useEffect(() => {
        ColocarSegAnun();
        }, []);
   
 
    const ColocarSegAnun = ()=>{
        if(data.item.body){
            for(let i in ListSegAnu){
                if(ListSegAnu[i].id === data.item.body.tipo ){
                  setSegAnun(ListSegAnu[i].nome);
                }
               }

        }
       
      }

      const AbrirModalCri = (item)=>{
          
        setImg(item)
        setModalCri(true);
      }
    

      const FechaModalCri = ()=>{
       
        setModalCri(false);
      }

      const CriandoPosicao = () =>{
        
        if(NomeEd !== ""){
            FechaModalCri();
          Api.CriarPosicao(NomeEd, Lat, Log, Estado, Cidade, setNomeEd, setCarreg, setLat, setLog, setCidade, setEstado );
        } else{
         
        }
       
      }

       

    const ouvirAudi = async (data, key)=>{
     
      

        await setLoading(true);
        await setInfoAudi(key);
         rever = await new Player(data, 
            {
                autoDestroy : true,
            }).play(()=>{
              
                setLoading(false);
                setMudar(true);
             }).on('ended', () => {
                setInfoAudi('');
                setMudar(false); 
             });
            
    }
    const AbrirModalImg = (data)=>{
        setBady(data);
        setModalCri(true);
    }

   
       const AbrirModal = (data)=>{
           setModalVisible(true);
           setBady(data);
       }

    const parar = ()=>{

        rever.stop((err) => {
           setInfoAudi('');
           setMudar(false); 
        });
    }

    const Entrar = (item)=>{
        navigation.navigate('FotoTeu', {
          item:item,
          idRo:item.IdUser,
      })
      }

      const EntrarProduto = (item)=>{
        navigation.navigate("Produto", {
            item:item,
            idRo:item.IdUser,
        })
      }

      const EntrarAnuncio = (item)=>{
        navigation.navigate("Anuncio", {
          item:item,
          idRo: item.IdUser,
      })
      }

      const EntrarEvento = (item)=>{
        navigation.navigate("Evento", {
          item:item,
          idRo: item.IdUser,
      })
      }

      const EntrarMap = (item)=>{
    
        navigation.navigate("LocArea4" , { 
          item: item,
         
        });
      }

      const Compartilhando = (item)=>{
        
  
        navigation.navigate("Compartilhar", {
          item:item,
          Tip:'Posicao'
        });
          }

      const EntrarAtendimento = ()=>{
        
        navigation.navigate("Atendimento",
        {
          IdOc:Ocorre,
          LocFin:LocFin,
          LocIni:LocIni,
          idOuvi:idOuvi,
          NomeOuvi:NomeOuvi
        })
      }

      const EntrarFinanceiro = ()=>{
        navigation.navigate("financeiro")
      }
     
      const UtilDesconto = (DataFim, Desconto, Nome, Descr, Img, id, Use)=>{
        console.log(idDesc);
        console.log(user);
        if( idDesc === user || idDesc === ""){
        if(idCar === user || idCar === "" ){
          if(DataFim > Time){
            setModalLoad(true);
            Api.UtiliDesconto(Varia, NomeUse, Time, user, Ocorre, DataFim, Desconto, Nome, Descr, Img, id )
         } else {
             alert("AVISO",
             "Esse Desconto Já Passou da Data de Validade!"
             )
         }

        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
      
        
      }

      const ComprarPromcao = (id, NomePro, DescPro,  imageUrl, Valor, Descont,  DatFinTime,)=>{
        let Valo1 = parseFloat(Valor.replace("," , "."));
        let Cal = Valo1-(Valo1*(parseFloat(Descont)/100));
        if( idDesc === user || idDesc === ""){
          if(idCar === user || idCar === "" ){
        if(DatFinTime > Time){
            let PorcDesc = Descont;
            let ValDesc = Cal.toFixed(2).toString().replace("." , ",");;
            let Val = Valor;
            let ValReal = Cal;
            setModalLoad(true);
            Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
          } else {
              alert(
                  "AVISO",
                  "Esse Item Não tem mais Validade de Compra!"
              )
          }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }

    }

      const ComprarProduto = (DescPro, NomePro, Valor, ValorDesc, Desconto, imageUrl, id)=>{
      
       let Valo1 = parseFloat(Valor.replace("," , "."));
       let Valo2 = parseFloat(ValorDesc.replace("," , "."));
       if( idDesc === user || idDesc === ""){
        if(idCar === user || idCar === "" ){

        if(Desconto === true){
        let Valor3 = parseInt((Valo2/Valo1)*100);


         let PorcDesc = Valor3+"%";
         let ValDesc = ValorDesc;
         let Val = Valor;
         let ValReal = Valo2;
         setModalLoad(true);
        Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)

        } else {
            if(Desc === "0%"){

                let PorcDesc = "0%";
                let ValDesc = Valor;
                let Val = Valor;
                let ValReal = Valo1;
                setModalLoad(true);
                Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
             
            } else {
               let Cal = Valo1-(Valo1*(parseFloat(Desc)/100));
                let PorcDesc = Desc;
                let ValDesc = Cal.toFixed(2).toString().replace("." , ",");
                let Val = Valor;
                let ValReal = Cal;
                setModalLoad(true);
             Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
             
            }
        }
            } else {
              alert("AVISO",
              "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
              )
          }
            } else {
              alert("AVISO",
              "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
              )
          }
      }

      const ComprandoItens = (id, DescPro, NomePro, Valor, DatFinTime, imageUrl)=>{
        if( idDesc === user || idDesc === ""){
          if(idCar === user || idCar === "" ){

        if(DatFinTime > Time){
           setModalLoad(true);
            let PorcDesc = "0%";
            let ValDesc = Valor;
            let Val = Valor;
            let ValReal = parseFloat(Valor.replace("," , "."));
            Api.ComprarProduto(Varia, NomeUse, Time, user, Ocorre, imageUrl, id, DescPro, NomePro, PorcDesc, Val, ValDesc, ValReal)
          } else {
              alert(
                  "AVISO",
                  "Esse Item Não tem mais Validade de Compra!"
              )
          }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        } else {
          alert("AVISO",
          "Esse Carrinho já Está sendo Usado pelo outro Usuário, espere ele finalizar a comprar para você poder iniciar o uso do carrinho !"
          )
      }
        
      }

      const EntrarFila = (Extra)=>{
        setModalLoad(true);
        Api.ChamarAvulso(NomeOuvi, idOuvi, NomeUse, user, Varia, Ocorre, Extra, setModalLoad )
      }

      const IndoLink = (item)=>{
        Linking.openURL(item);
      }

      const SairCriar = ()=>{
        setModalCri(false)
        setImg("")
      }
    
  
    return (
        <View style={{marginTop:5, marginBottom:5, marginLeft:10,  marginRight:10, padding:10, alignSelf:"baseline", maxWidth:"80%", borderRadius:5, backgroundColor: data.item.autor === user ?"#98ABE1":"#A9CFE1", alignSelf: data.item.autor === user ?"flex-end":"flex-start", textAlign: data.item.autor === user ? "right":"left"}} >
             <Modal
           animationType="slide"
           visible={ModalCri}
          >
          <View style={styles.viewCalend}>
          <View style={styles.QuadNota} >
                   
                 <View  style={styles.CaixadeapostaTitulo}  >
                    
                  <TouchableHighlight style={styles.fechaModal} onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight>
                   </View>
                  
                   
                   <Image  source={{uri:Img }}  style={{ width:300, height:300 }} />
                   
                </View>


          </View>


          </Modal>
            { data.item.autor !== user &&
                <Text style={{fontSize:10, fontWeight:"bold", color: data.item.autor === user ?"#FFF":"green"}}>{data.item.nome}</Text>
            }
             {data.item.type === "text" &&
                <Text  style={{   fontSize:16, textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</Text>
            }

      

            {data.item.type === "image" &&
             <TouchableHighlight style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} onPress={()=>{AbrirModalCri(data.item.body)}}>
                <Image  source={{uri:`${data.item.body}`}} style={styles.ImageVer } />
             </TouchableHighlight>
            }
            {data.item.type === "Link" &&
            <>
             <Text  style={{   fontSize:16, textAlign: data.item.autor === user ?"right":"left"}}>Link:</Text>
             <TouchableHighlight style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}} onPress={()=>{IndoLink(data.item.body)}}>
                <Text  style={{ color:"blue",  fontSize:16, textAlign: data.item.autor === user ?"right":"left"}}>{data.item.body}</Text>
             </TouchableHighlight>
             </>
            }

          

            {/* {data.item.type === "video" &&
                <>
                <BtnVideo onPress={()=>{AbrirModal(data.item.body)}}>
                <Titulo>Vídeo</Titulo>
                <AbrirVideo width="50" height="50" backgroundColor="#000" />
                </BtnVideo>
               
               </>
            } */}

            {/* {data.item.type === "audio" &&
            <AdioArea>
                {Loading === true ?
               <LoadingIcon size="large" color="#FFFFFF" />
               :
               <>
               {Mudar === false  ?
                <Btnplay  onPress={()=>{ouvirAudi(data.item.body, data.index)}}>
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <>
                {data.index !== InfoAudi ?
                <Btnplay  >
                    <Play width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                :
                <Btnplay  onPress={()=>{parar()}}>
                    <PararAudio width="30" height="30" backgroundColor="#000" />
                </Btnplay>
                }
                </>
               }
              
                {data.index === InfoAudi &&
                    <Image 
                    source={require('../../assets/sonora.gif')}  
                    style={{width: 200, height: 50 }}
                    />
                    }
                </>
                }
               

            </AdioArea>
                
            }        */}
            
            {time &&
             <Text style={{marginTop:5, fontSize:10, textAlign:"right"}}>{time}</Text>
            }
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    ImageVer:{
        width:100,
        height:100,
        margin: 5,
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
        width:100,
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
          backgroundColor:"red",
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
         width:80,
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
         justifyContent:"flex-start",
         backgroundColor:"#FFF",
         height:60,
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
            marginLeft:10,
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