
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import { ModalDatePicker } from "react-native-material-date-picker";
import Hora from '../components/Hora';
import SignInput from '../components/SignInputIni';
import SignInputCod from '../components/SignInput';
import Telefone from '../components/NumberTel';
import { Calendar } from 'react-native-calendario';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import Api from '../Api';
import DataTime from '../components/datando';
import Money from '../components/Money';
import { useNavigation } from '@react-navigation/native';
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
//import Datand from '../components/datando';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  
  const captcha = useRef(null)

  const [dataNasc, setdataNasc] = useState(null);
  const [ListOc, setListOc] = useState([]);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  const [DataPesq, setDataPesq] = useState(new Date().getTime());
  const [Carreg, setCarreg] = useState(false);
  const [Refreshin, setRefreshin] = useState(false);
  const [hr, sethr] = useState("00:00");
  const [Pcasa, setPcasa] = useState(false);
  const [Varia, setVaria] = useState('');
  const [ModalIr, setModalIr] = useState(false);
  const [AnaliCont, setAnaliCont] = useState(true);
  const [ModalCalend, setModalCalend] = useState(false);
  const [DataMin, setDataMin] = useState(0);
  const [DataMax, setDataMax] = useState(0);
  const [Relogio, setRelogio] = useState(false);
  const [ListLig, setListLig] = useState([]);
  const [VerLiga, setVerLiga] = useState("");
  const [VerLigPais, setVerLigPais] = useState("");
  const [Lista, setLista] = useState([]);
  const [Vencido, setVencido] = useState(false);
  const [DtEsc, setDtEsc] = useState(0)
  const [SimAp, setSimAp] = useState([]);
  const [QuanJog, setQuanJog] = useState(0);
  const [VaToCo, setVaToCo] = useState(0);
  const [ValApos, setValApos] = useState("R$000,00");
  const [ValPremi, setValPremi] = useState(0);
  const [ValPreDemos, setValPreDemos] = useState(0);
  const [Carre, setCarre] = useState(false);
  const [ValorReal, setValorReal] = useState("");
  const [LinkEnv, setLinkEnv] = useState("nulo");
  const [QCash, setQCash] = useState(0);
  const [Cash, setCash] = useState(9);
  const [Cambis, setCambis] = useState(false);
  const [ValCambis, setValCambis] = useState("");
  const [NomeCli, setNomeCli] = useState("");
  const [TelCli, setTelCli] = useState("");
  const [IdAposta, setIdAposta] = useState("")
  const [IdApos, setIdApos] = useState("")
  const [PgCash, setPgCash] = useState(false);
  const [DCash, setDCash] = useState(0);
  const [VCash, setVCash] = useState(0);
  const [Robo, setRobo] = useState(true);
  const [Tentativa, setTentativa] = useState(0);
  const [CodLast, setCodLast] = useState(0);
  const [CodG, setCodG] = useState(false);
  const [Senha, setSenha] = useState("");
  const [ModalLink, setModalLink] = useState(false);
  const [ModalVer, setModalVer] = useState(true);
  const [VerNotajogo, setVerNotajogo] = useState(false);
  const [Alert, setAlert] = useState("");
  const [AlertTipo, setAlertTipo] = useState(null);
  const [Nome, setNome] = useState("");
  const [Tel, setTel] = useState("");
  const [AdrirMais, setAdrirMais] = useState("");
  const [AbMoney, setAbMoney] = useState(false);
  const [AbVenc, setAbVenc] = useState(false);
  const [CriarCli, setCriarCli] = useState(false);
  const [Concluir, setConcluir] = useState(false);
  const [NomeCam, setNomeCam] = useState("");
  const [TelCam, setTelCam] = useState("");
  const [Pago, setPago] = useState(false);
  const [EnviLin, setEnviLin] = useState(false);
  const [Premio, setPremio] = useState(false);
  const [Aprov, setAprov] = useState(false);
  const [Analisado, setAnalisado] = useState(false)
  const [AproPag, setAproPag] = useState(false);
  const [StatusAp, setStatusAp] = useState([]);
  const [AnliAp, setAnliAp] = useState(false);
  const [MsgErro1, setMsgErro1] = useState(false);
  const [MsgErro2, setMsgErro2] = useState(false);
  const [Btn, setBtn] = useState(false);
  const [IdTrans, setIdTrans] = useState("")

 

 
  useEffect(() => {
    if(dataNasc !== null){
      ListandoOc();
    }
    
  }, [dataNasc, hr]);

  useEffect(() => {
    if(TelCli !== "" && TelCli.length === 14 ){
  
        TelWhats();
    
    } else{
      setMsgErro2(false)
    }
    


   }, [TelCli])

  useEffect(() => {
    tempo();
  }, [])


  //  useEffect(() => {
  //   if(IdApos !== ""){
  //     ConcluidoAposta()
  //   }
 
  //  }, [Concluir])

  //  useEffect(() => {
  //   if(SimAp.length !== 0){
  //     AnalisandoOlds();
  //   }
 
  //  }, [SimAp])

  //  useEffect(() => {
  //   console.log(SimAp)
  //  setQuanJog(SimAp.length)
  //  if(SimAp.length > 0){
  //    Caulc();
  //  }
   
  // }, [SimAp])

  // useEffect(() => {
  //   ValorPermio();
  //  }, [ValApos, VaToCo])

   useEffect(() => {
    Pegandodados();
   }, [])

   useEffect(() => {
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])

  // useEffect( ()=>{ 
  //   if(Page !== 1){
  //     ListandoOc();  
  //   }            
  //  }, [Page]);

 


  const TelWhats = ()=>{
   
   Api.AnaliseTelTransf(TelCli, setMsgErro2, setNome, setLoad, setBtn, setIdTrans) 
  
}


  const ConcluidoAposta = ()=>{
    Api.TiraConcluidoApos(IdApos, Concluir)
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds(SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

  const Pegandodados = ()=>{
    
  }

  const onChangeRecp = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const PegandoLig = ()=>{
    var resli = [];
    var resRev = [];
    for(let i in ListOc){

    resRev.push(ListOc[i])
       
     
        resli.push({
          
        })
      


    }

    resli = resli.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    
    setListLig(resli)
    setLista(resRev)
   }

   const Pesquisa = async (Pais, Liga)=>{
    setVerLiga(Liga);
    setVerLigPais(Pais)
    var bet = ListOc.filter(word => word.liga.name === Liga);
    setLista(bet);
  }

   const ListandoOc = ()=>{
    var resLis = [];
    setLista([])
    setVerLigPais("");
    setVerLiga("");
    let currentDate1 = '';
    let meg = dataNasc.split("/");
    console.log(meg);
    let Dia1 = meg[0];
    let Mes1 =  meg[1];
    let Ano1 = meg[2];
    Dia1 = Dia1 < 10 ? '0'+Dia1 : Dia1;
    Mes1 = Mes1 < 10 ? '0'+Mes1 : Mes1;
    currentDate1 = Ano1+'-'+Mes1+'-'+Dia1;
   
     let CompDat = moment(currentDate1+" "+hr+":00").unix();
   
    let Dat = CompDat * 1000;
    let Dat2 = moment().unix()*1000;
    console.log("Dat "+ Dat)
    console.log("Dat2 "+ Dat2)
  
    if(Dat < Dat2){
      setCarreg(true)
      Api.MeusIndicados( Page, setListOc, setCarreg,  Dat, Dat2, );
    } 



  
 
    
  }

  const TirarEsse = (position) =>{
    setSimAp([...SimAp.filter((item, index) => index !== position)]);
   
  }
  const Voltar = ()=>{
    navigation.goBack();
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
    await ListandoOc();
    await setRefreshin(false);
  }
  const tempo = ()=>{
    setdataNasc(moment().format("DD/MM/YYYY"))
    // setDtEsc(new Date().getTime())
    // setDataMin(new Date().getTime())
    // setDataMax(new Date().getTime())
   
  }

  const Mudedate = (date)=>{
    setModalCalend(false)
    setdataNasc("")
    let currentDate = "";
    let now25 =date.getTime();
    setDtEsc(now25)
    let Dia = date.getDate();
    let Mes = (date.getMonth()+1);
    let Ano = date.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setdataNasc(currentDate)
    let currentDate1 = Ano+'-'+Mes+'-'+Dia;

  }

  const onChangeRec = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }


   const onDismiss = ()=>{
    setRelogio(false)
   }

   const onChange = ({ hours, minutes })=>{
    
    var hora =parseInt(hours) < 10 ? '0'+hours: hours;
    var min = parseInt(minutes) < 10 ? '0'+minutes: minutes;
    console.log(hora+":"+min)
    sethr(`${hora}:${min}`)
    setRelogio(false)
   }

   const ColocarNota=( item3, item)=>{

    function isCherries(fruit) {
      return fruit.IdCasa === item3.idCasaOlds;
  }
    var dei = new Date().getTime()/1000
   if(dei < item.dataJogo){
    var ListSimu = {
      IdCasa:item3.idCasaOlds,  
      Casa: item3.Casa,
      Grupo:item3.Grupo,
      GrupoEng:item3.GrupoEng,
      CasaEng:item3.CasaEng,
      Olds:item3.Olds,
      CasaTime:item.Casa,
      ForaTime:item.Fora,
      fixture:item.fixture,
      Estadio:item.Estadio,
      dataJogo:item.dataJogo,
      liga:item.liga,
    } 
    if(SimAp.find(isCherries)){
     
      setAlert("Cotação repetida não pode, você já escolheu essa Cotação!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);

    }else {
      console.log(ListSimu)
      setSimAp([...SimAp, ListSimu ])
    }
  } else {
    setAlert("Esse Jogo não está mais disponivel !");
    setAlertTipo("danger");
    setModalCalend(true);
    setVerNotajogo(false);
  }
  
  //  console.log(item3)
  //  console.log(item)
  }

  const Caulc = ()=>{
    var tre = 1
     for(let i in SimAp){
      tre = tre*SimAp[i].Olds;
     }
     setVaToCo(tre.toFixed(2))
    }

    const ValorPermio = ()=>{
      console.log(ValApos)
      var preo =  ValApos.replace("R$", "")
       preo = preo.replace(".", "")
  
      var prai = preo.replace(",", ".")
      console.log(prai)
     var int = parseFloat(prai)*VaToCo
     var intCam = (parseFloat(prai)*VaToCo)*0.1
      int = int.toFixed(2)
      int = int.toString()
      int = int.replace('.', ',')

      intCam = intCam.toFixed(2)
      intCam = intCam.toString()
      intCam = intCam.replace('.', ',')

      setValPremi(parseFloat(prai)*VaToCo);
      setValorReal(parseFloat(prai));
      setVCash(parseFloat(prai)*100);
      setQCash(parseInt(prai)*Cash);
      setValPreDemos(int)
      setValCambis(intCam)
      console.log(int)
        }


        const vaiparala = () => {
          // setModalLink(true);
          // setModalVer(false)
        
          window.location.href = LinkEnv
          // navigation.navigate("Pagar", {
          //   Site:LinkEnv
          // })
           
       
        }

        const IrNoti = ()=>{
           navigation.navigate("Notific") 
        }

        const IrConfig = ()=>{
          navigation.navigate("Config") 
       }

        const Vernota = ()=>{
        
          setModalCalend(true);
          setVerNotajogo(true)
        }

        const Siarnota = ()=>{
          setNomeCam("");
          setTelCam("");
           setTelCli("");
           setNomeCli("")
           setPago("");
           setConcluir("");
           setValPreDemos("");
           setValorReal("");
           setSimAp([]);
           setValCambis("");
           setVaToCo("");
           setValApos(""); 
           setIdApos("");
           setQuanJog("");
           setPremio(false)
           setAnalisado(false)
           setAprov(false)
           setCambis(true);
           setVCash("");
           setAnliAp(false);
           setStatusAp([]);
           setAproPag(false);
         
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false)
          setMsgErro1(false);
          setMsgErro2(false);
          setNome("");
          setNomeCli("");
          setTelCli("");
          setBtn(false);
          setIdTrans("");
        }

        const AposCambis = ()=>{
          setCambis(!Cambis);
         }

         const PagandoPix = ()=>{
          var DateVw = parseInt((new Date().getTime() + 60000)/1000);
          console.log(DateVw);
          var verSim = []
  
          for(let i in SimAp){
            console.log(SimAp[i].dataJogo +" - "+DateVw)
             if(SimAp[i].dataJogo < DateVw){
              verSim.push(1)
             } else {
              verSim.push(2)
             }
          }
           console.log(verSim)
          if(verSim.includes(1)){
          
            setAlert("Algum desses jogos já esta preste a começar ou já começou, exclua e escolha outro jogo!");
            setAlertTipo("danger");
            setModalCalend(true);
            setVerNotajogo(false);
  
          } else {
  
            if(ValorReal >= 5){
              if(SimAp.length > 2){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.PagandoJogo(IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.PagandoJogo(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo  )
                 
                  
  
                  } else {
                    setModalCalend(true);
                    setVerNotajogo(false);
                    setAlert("Preencha o Nome Do Cliente");
                    setAlertTipo("danger");
  
                  }
  
                 
                 
                }
             
             
             
             
              } else {
                setModalCalend(true);
                setVerNotajogo(false);
                setAlert("3 jogos são o minimo para aprovar uma aposta");
                setAlertTipo("danger");
      
              }
    
            } else {
              setModalCalend(true);
              setVerNotajogo(false);
              setAlert("R$ 5,00 é o menor valor que você pode aposta!");
              setAlertTipo("danger");
    
    
            }
  
          }
          
         
         
         
         }

         const SairAlert = ()=>{
          setAlertTipo(null);
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
         }

         const SairCriar = ()=>{
          setAlertTipo(null);
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false);
          setEnviLin(false);
          setIdApos("");
         }

         const PagandoCash = ()=>{
          setPgCash(true);
          setVerNotajogo(true)
          setModalCalend(true)

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

          const CriandoCliente =  async ()=> {
            if(NomeCli !== ""){
              if(TelCli !== ""){
            if(Robo === false){
              setCarre(true)
              Api.CriandoCli(NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli);
            } else {
             
              setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
              setAlertTipo("danger")
            }
         
        } else {
           
          setAlert("Preencha o Whatsapp Do Cliente");
          setAlertTipo("danger");

        }
      } else {
           
        setAlert("Preencha o Nome Do Cliente");
        setAlertTipo("danger");

      }
           
              
           
             
            }


            const EnviandoLink =  async ()=> {
              if(Pago === true){

              
             
              if(Robo === false){
                setCarre(true)
                Api.EnviandoNota(IdApos,  setPago, setRobo,  setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos);
              } else {
               
                setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
                setAlertTipo("danger")
              }     
         
      } else {
             
        setAlert("Esse Jogo Não Pode ser Enviado, pois Não Está Pago!");
        setAlertTipo("danger");

      }
        
             
                
             
               
              }

          const CompPgCash = ()=>{

            if(parseInt(Senha)  === CodLast){
            setLoad(true)
            Api.TranfCash(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  )
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }
          }

          const SacarCash = ()=>{

            if(parseInt(Senha)  === CodLast){
            setLoad(true)
            Api.SacarCash(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad, setCriarCli  )
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }
          }
        
          const RenviarCod = ()=>{
            setCodG(false);
            setTentativa(0);
            setSenha("");
          }

          const AbrindoMais = (item)=>{
            if(AdrirMais === ""){
              setAdrirMais(item)
            } else {
              setAdrirMais("")
            }
            
          }

          const Atualizar = ()=>{
            
            ListandoOc()
        //     navigation.reset({
        //      routes:[{name:"Preload"}]
        //  });
         }

          const AbrinoMoney = ()=>{
            setAbMoney(!AbMoney)
            setAbVenc(false)
          }

          const AbrindoVenc = ()=>{
            setAbVenc(!AbVenc)
            setAbMoney(false)
          }

          const AbrirCriar = ()=>{
            setModalCalend(true);
            setCriarCli(true)
          }

          const AbrirEnviar = ()=>{
            setModalCalend(true);
            setCriarCli(true)
            setEnviLin(true);
           
           
           
          }

          const AbrirModal = (item)=>{
            
             setNomeCam(item.NomeCam);
             setTelCam(item.TelCam);
            setTelCli(item.TelCli);
            setNomeCli(item.Nome)
            setPago(item.Pago);
            setValPreDemos(item.ValPreDemos);
            setValorReal(item.ValorReal);
            setSimAp(item.SimAp);
            setValCambis(item.ValCambis);
            setVaToCo(item.VaToCo);
            setValApos(item.ValApos); 
            setQCash(item.Cash);
            setIdApos(item.id);
            setQuanJog(item.SimAp.length);
            setPremio(item.PremioPago)
            setAnalisado(item.AnaliTotal)
            setAprov(item.Aprovado)
            setCambis(item.Cambista);
            setVCash(item.ValorReal*100);
            setVerNotajogo(true);
            setModalCalend(true)
           
            
          }

          const FechaModal = ()=>{
            
            setNomeCam("");
            setTelCam("");
           setTelCli("");
           setNomeCli("")
           setPago("");
           setConcluir("");
           setValPreDemos("");
           setValorReal("");
           setSimAp([]);
           setValCambis("");
           setVaToCo("");
           setValApos(""); 
           setQCash("");
           setIdApos("");
           setQuanJog("");
           setPremio(false)
           setAnalisado(false)
           setAprov(false)
           setCambis(true);
           setVCash("");
           setVerNotajogo(false);
           setModalCalend(false);
           
           
         }
         const PagarDinheiro = ()=>{
          setCarre(true)
            Api.Enviandopaga(IdApos, ValPreDemos, setPremio, setCarre)
         }
  

    return (
      <View style={styles.Container}>
           <Modal
            transparent={true}
            animationType="slide"
            visible={ModalCalend}
            >
              <View style={styles.viewCalend}>
              {CriarCli === true ?

              <>
                {Load === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
                      
                <View style={styles.QuadNota} >
                <ScrollView>
                 
                   <View  style={styles.CaixadeapostaTitulo}  >
                    
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Saque de Cash</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight></View>
                      </View>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras Para Saque:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>1° Valor minimo para saque é de R$ 10,00  </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>2° Em 72 horas seu Dinheiro estará em sua Conta </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>3° Seu Dinheiro Entrará na Lista de transferência da PixBetCash </Text> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Banco de Cash:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{QCash} </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>R$ 1,00 vale 100 Cash:</Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor do Saque Em Reis:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>R${(NomeCli/100).toFixed(2)}</Text>
                    {CodG === false?
                        <>
                          <View  style = {styles.InputAra}>
                   <FontAwesome name="ticket" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Quantidade Cash" 
                       value={NomeCli}
                       onChangeText={t=>setNomeCli(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
                   {QCash < NomeCli  &&
                  <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Seu Saldo de Cash Não é suficiente, para essa Transferência!</Text> 
                   }

                  <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                  size="normal"
                  hl="pt"
                  theme="dark"
                  onChange={onChangeRec}
                    />
                    {Alert !== "" &&
                      <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"red"  }}>{Alert}</Text> 
                    }

                        
                    {QCash >= NomeCli  &&
                    <>
                    {NomeCli >= 1000  &&
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                      <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código de Saque</Text>
                    </TouchableHighlight>
                    }
                    </>
                      }
                       
                       </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>RenviarCod()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o Whatsapp</Text> 
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
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>SacarCash()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sacar </Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }
                        </>
                        }
                      
                         
                           
                          </ScrollView>
              </View>
              </>
                }
              </>


              :
              <>

{VerNotajogo === false ?
              <>
              {AlertTipo === null?
              <>
  <View  style={styles.QuadCalend}>
               <TouchableHighlight onPress={()=>setModalCalend(false)} style={styles.CalendBtn}>
                  <Text style={styles.CalendTexSim}>Fechar</Text>
                 </TouchableHighlight>
                 <Calendar
                onChange={(range) => console.log(range)}
                onPress={(range1) => Mudedate(range1)}
                minDate={new Date(2018, 3, 20)}
                startDate={new Date(2018, 3, 30)}
                endDate={new Date(2018, 4, 5)}
                dayNames={['D', 'S', "T", "Q", "Q", "S", "S"]}
                monthNames={['Janeiro', 'Fevereiro', "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]}
                locale={'pt'}
                theme={{
              activeDayColor: {},
              monthTitleTextStyle: {
                color: '#6d95da',
                fontWeight: '300',
                fontSize: 16,
              },
              emptyMonthContainerStyle: {},
              emptyMonthTextStyle: {
                fontWeight: '300',
              },
              weekColumnsContainerStyle: {},
              weekColumnStyle: {
                paddingVertical: 10,
              },
              weekColumnTextStyle: {
                color: '#b6c1cd',
                fontSize: 13,
              },
              nonTouchableDayContainerStyle: {},
              nonTouchableDayTextStyle: {},
              startDateContainerStyle: {},
              endDateContainerStyle: {},
              dayContainerStyle: {},
              dayTextStyle: {
                color: '#2d4150',
                fontWeight: '300',
                fontSize: 15,
              },
              dayOutOfRangeContainerStyle: {},
              dayOutOfRangeTextStyle: {},
              todayContainerStyle: {},
              todayTextStyle: {
                color: '#6d95da',
              },
              activeDayContainerStyle: {
                backgroundColor: '#6d95da',
              },
              activeDayTextStyle: {
                color: 'white',
              },
              nonTouchableLastMonthDayTextStyle: {},
            }}
          />
              
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                
                </View>
              </>

              :
              <>
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

              </>

              }
                 
             
            
              </>

              :
              <>

                {Load === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
                      <View style={styles.QuadNota} >
                        <ScrollView >
                        {PgCash ?
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Banco de Cash</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight></View>
                      </View> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Banco de Cash:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{QCash} </Text>
                   
                      <View  style = {styles.InputAra}>
                   <FontAwesome name="ticket" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Quantidade Cash" 
                       value={NomeCli}
                       onChangeText={t=>setNomeCli(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
                   {QCash < NomeCli  &&
                  <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Seu Saldo de Cash Não é suficiente, para essa Transferência!</Text> 
                   }
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Digite o Whatsapp da Tranferência:</Text>
                      <View  style = {styles.InputAra}>
                  <FontAwesome name="phone-square" size={24} color="black" />
                  
                   <Telefone                      
                       placeholder="Whatsapp da Conta" 
                       value={TelCli}
                       onChangeText={t=>setTelCli(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                   
                   /> 
                   </View>

                   {Btn === true &&
                   <>
                  <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Nome da Conta</Text>
                  <Text  style={{ marginLeft:10, fontSize:15  }}>{Nome} </Text>

                   </>

                   }

                
              
                
                   {MsgErro2 === true &&
                  <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>Esse Telefone Não Está Registrado no Sistema!</Text> 
                   }
                 
                 
                  
                     
                        {CodG === false?
                        <>
                        {Btn === true &&
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {QCash >= NomeCli  &&
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código de Pagamento</Text>
                          </TouchableHighlight>
                              }

                        </>

                        }
                      

              
                     </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>RenviarCod()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o Whatsapp</Text> 
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
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>CompPgCash()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Transferir</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }

                      
                          
                        
                       
                       
                        </>
                        :
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Simulador de Aposta</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight></View>
                      </View> 
                      {SimAp.map((item3, index)=>( 
                     <View   style={styles.Caixadeaposta}  >
                   
                     <Text style={styles.TexNota1}>{item3.CasaTime.name.substr(0, 15)}. X {item3.ForaTime.name.substr(0, 15)}.</Text> 
                     <Text style={styles.TexNota1}>Palpite: {item3.Casa} | Cota: {item3.Olds}</Text>
                     <Text style={styles.TexNota1}>({item3.Grupo})</Text>
                     <Text style={styles.TexNota1}><DataTime  data={item3.dataJogo*1000} /> </Text>
                     
                     {StatusAp.map((item25, index)=>(
                      <>
                      {item25.id === item3.IdCasa &&
                      <>
                      {item25.Resultado === "Reprovado" ?
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="remove" size={24} color="red" />
                        </View>
                        :
                        <>
                        {item25.Resultado === "Aprovado"?
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="check" size={24} color="green" />
                        </View>
                        :
                        <View  style={styles.ExcluirJogo} >
                        <FontAwesome name="spinner" size={24} color="black" />
                        </View>
                        }
                        
                        </>
                      }
                        
                     </> 

                      }
                     </>
                        ))}
                    
                     </View>             

                              ))}
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </Text>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</Text> 
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Cash(s) Recebida: {QCash}</Text>  
                    


                    <View style={styles.InputHora}>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor:</Text>  
               
              <Text  style={{ margin:10, fontSize:17  }}>{ValApos}</Text>
                  
                  
                   </View>
                 
                          <View style={styles.Valopre}>
                            <View style={styles.Titupre}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15  }}>Valor Do Prêmio: R$ {ValPreDemos}</Text>
                            </View>
                            {Cambis === true ?
                            <>
                           <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Cambista</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Aposta Vencedora</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>10% do Premio para o Cambista.</Text>
                            <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Valor do Ganho: R$ {ValCambis}</Text>
                            <View  style = {styles.AraCli}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{TelCli}</Text>
                            </View>
                            <View  style = {styles.AraCli}>
                            <FontAwesome name="user" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{NomeCli}</Text>
                            </View>
                            </>
                            :
                            <>
                          
                        
                            </>
                              }
                              {Pago === false &&
                              <>
                          
                           
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar a Aposta</Text>
                          </TouchableHighlight>

                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#9B1AD3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoCash()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Com Cash</Text>
                          </TouchableHighlight>


                              
                              </>

                              }
                         
                           {AproPag=== true &&
                          <>
                          {Premio === false ?
                           <TouchableHighlight style={{width:150, height:50, backgroundColor:"#E77E1E", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagarDinheiro()}>
                           <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Receber Prêmio</Text>
                         </TouchableHighlight>
                         :
                         <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Premio Enviado Para Pagamento</Text>
                          } 
                          </>

                          }
                      {Pago === true &&
                      <>
                          {Analisado === false &&
                          <>
                          {AnliAp === false &&
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AnalisandoOlds()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Analisar Resultado</Text>
                          </TouchableHighlight>

                          }
                        
                        </>
                          }
                          </>
                        }
                       

                         
                        
                          </View>
                          
                        </>
                        }

                        </ScrollView>
                      </View>
                      </>
                  }
            
               
                     
                          
                         
              </>
             
              }
              
              </>

              }

              
             </View>
          </Modal>

          {/* <Modal
              transparent={true}
            animationType="slide"
            visible={ModalVer}
            > */}
             
               
          {/* </Modal> */}
          <ImageBackground source={require("../assets/estadio3.jpg")} 
          resizeMode='cover' 
          style={styles.imageBack} >
              
              <View style={styles.CaixaTitulo} >
              <TouchableHighlight  onPress={()=>Voltar()} style={styles.CaixaDados}>
                <>
              <FontAwesome name="arrow-circle-left" size={30} color="#fff" />
            
              </>
              </TouchableHighlight>
            
              <Image source={require('../assets/logomarca.svg')}  style={styles.ImageVer2 } />

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Lista de Indicados
             </Text>
              </TouchableHighlight>
              <TouchableHighlight  onPress={()=>Atualizar()}  style={styles.CaixaDados}>
              <FontAwesome name="refresh" size={24} color="#fff" />
              </TouchableHighlight>
            </View >
          
         
            
                    

          {/* <View  style={styles.AreaBtn}>
          
              
          <TouchableHighlight onPress={()=>setRelogio(true)}  style={styles.InputHora}>
            <>
          <FontAwesome name="clock-o" size={20} color="black" />
          <Text  style={styles.modalText6}> {hr} </Text>
          </>     
                
          </TouchableHighlight>
                       <View  style={styles.AreaBtn4}>
                       <FontAwesome name="calendar" size={20} color="black" />
            </View>
            <TouchableHighlight onPress={()=>setModalCalend(true)}  style={styles.AreaBtn3}>
            <View style={styles.modalView3}><Text  style={styles.modalText6}> {dataNasc} </Text></View>
         
                 
                  </TouchableHighlight>
          
          </View> */}


          {/* <View  style={styles.AreaBtnLiga}>
        
  
            <TouchableHighlight onPress={()=>AbrirCriar()} style={{backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:50, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
            <>
          <Text  style={{fontSize:25, color:"#fff", margin:10}}>Criar Jogo Para Cliente</Text>
          </>     
                
          </TouchableHighlight>
              
          
       
        </View> */}
      

        <ScrollView>
          {Carre === false ?
          <>
       
          {ListOc.map((item, key)=>(
           <>
            <View key={key}  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: item.Aprovado === false && item.DataFin < moment().unix()*1000? "red": item.Aprovado === true ? "#8BF39C" :"#FFF",}}>
               <View  style={styles.CaixaNome}>
              
               
                <Text style={styles.Time}>Data do Vencimento:</Text>
                <Text style={styles.Time}>{item.Data}</Text>
 
                </View> 
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Nome: {item.Nome.substring(0,15)}</Text>
              <Text style={styles.Time}>Tel: {item.Telefone}</Text>

              </View> 
               
    
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Status</Text>
              {item.Aprovado === false && item.DataFin < moment().unix()*1000?
                        
                        <Text style={styles.Time}>Vencido</Text> 
                      :
                      <>
                      {item.Aprovado === false?
                     
                      <Text style={styles.Time}>Analise</Text>  
                      :
                      <Text style={styles.Time}>Aprovado</Text> 
                      
                      }
                    </>
                     }
              

              </View> 



              </View >
       
             
           


            </View>
           
              </>

              ))}

           
                  </>
              :
              <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     

              </>
              }
              </ScrollView>
          
            {/* <DatePickerModal
        mode="single"
        visible={Relogio}
        onDismiss={onDismiss}
        date={new Date()}
        onConfirm={onChange}
        saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={'pt'} // optional, default is automically detected by your system
      /> */}
      <TimePickerModal
        visible={Relogio}
        onDismiss={onDismiss}
        onConfirm={onChange}
        hours={0} // default: current hours
        minutes={0} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'pt'} // optional, default is automically detected by your system
      />
          

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
  marginBottom:10,
  padding:10,
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