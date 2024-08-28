
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView, Linking } from 'react-native'
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
import RNPickerSelect from 'react-native-picker-select';

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
  const [Varia, setVaria] = useState(userState.variTemp);
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
  const [open, setOpen] = useState(false);
  const [DadoTitu, setDadoTitu] = useState(userState.QN4)
  const [DadoFili, setDadoFili] = useState(userState.QN3)
  const [DadosBet, setDadosBet] = useState(userState.versaoBanco)
  const [DatIn, setDatIn] = useState(0);
  const [CalIn, setCalIn] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [Jogos, setJogos] = useState('Meus Jogos');
  const [Ind, setInd] = useState([])
  const [LisEsc, setLisEsc] = useState([])
  const [QJogos, setQJogos] = useState(0)
  const [DaApos, setDaApos] = useState(0)
  const [PesId, setPesId] = useState("")
  const [Status, setStatus] = useState("")

  useEffect(() => {
    setDadoTitu(userState.QN4)
     setDadoFili(userState.QN3)
     setDadosBet(userState.versaoBanco)
  }, [userState.QN4, userState.QN3, userState.versaoBanco])
 
  useEffect(() => {
    if(dataNasc !== null){
      ListandoOc();
    }
    
  }, [dataNasc, DatIn, Jogos]);

  useEffect(() => {
    tempo();
  }, [Varia])

  useEffect(() => {
    console.log(Lista);
  }, [Lista])

  useEffect(() => {
    if(Status !== ""){
      StatusLista()
    }
   
   
  }, [Status])

  useEffect(() => {
    PesqCod();
  }, [PesId])

  useEffect(() => {
    setVaria(userState.variTemp);
  }, [userState.variTemp])
  
  useEffect(() => {
    if(ListOc.length >= 1){
      PegandoLig()
    }

   }, [ListOc])

   useEffect(() => {
    if(IdApos !== ""){
      ConcluidoAposta()
    }
 
   }, [Concluir])

   useEffect(() => {
    if(SimAp.length !== 0 ){
      AnalisandoOlds();
    }

 
   }, [SimAp])

   useEffect(() => {
    console.log(SimAp)
   setQuanJog(SimAp.length)
   if(SimAp.length > 0){
     Caulc();
   }
   
  }, [SimAp])

  useEffect(() => {
    ValorPermio();
   }, [ValApos, VaToCo])

   useEffect(() => {
    console.log(Jogos);
   }, [Jogos])

   useEffect(() => {
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])

  useEffect( ()=>{ 
    
    PegandoGrupCot() 
           
   }, [Ind]);

  const PegandoGrupCot = ()=>{
    console.log("entrou awqui")
   // { label:'Cambistas', value:'Cambistas',}
    var resli1 = [];
    if(Ind.length > 0){
    for(let i in Ind){
      
      
          resli1.push({
            label:Ind[i].Nome,
            value:Ind[i].Id,
          })
       
    }
  }  
      


   

 
    
    setLisEsc(resli1)
    console.log(resli1)
   }


  const ConcluidoAposta = ()=>{
    Api.TiraConcluidoApos(IdApos, Concluir)
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds( DadosBet, DadoTitu, DadoFili, SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

  const AnalisandoOldsGeral = ()=>{
    setModalCalend(true)
    setVerNotajogo(true)
    setPgCash(true)
    
     Api.AnaliseOldsGeral(Lista, DadosBet, DadoTitu, DadoFili, setQJogos, setPgCash, setAlert, setAlertTipo, setModalCalend, setVerNotajogo)
  }

  const AnalisandoOldsFilt = ()=>{
        
    if(userState.QN4.Funcionario === true){
  
      if(userState.QN3.DataVenc >= DataMin){
        if(userState.QN3.Dinheiro <= userState.versaoBanco.ValMinSalDev){
          AnalisandoOldsGeral() 
        } else {
          setModalCalend(true);
        setVerNotajogo(false);
        setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${userState.versaoBanco.ValMinSalDev}). Vá ao financeiro e pague seu saldo devedor!  `);
        setAlertTipo("danger");
        }
        
      } else {
        setModalCalend(true);
      setVerNotajogo(false);
      setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!   ");
      setAlertTipo("danger");
      }
  
     
  
  
    } else {

      if(userState.QN4.DataVenc >= DataMin){
        if(userState.QN4.Dinheiro <= DadosBet.ValMinSalDev){
          AnalisandoOldsGeral() 
        } else {
          setModalCalend(true);
        setVerNotajogo(false);
        setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${DadosBet.ValMinSalDev}).Vá ao financeiro e pague seu saldo devedor! `);
        setAlertTipo("danger");
        }
        
      } else {
        setModalCalend(true);
      setVerNotajogo(false);
      setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!  ");
      setAlertTipo("danger");
      }
  
    
  
    }
    
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
    if(ListOc === "nada"){
      setLista("nada")
    } else {
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
 
    
   }

   const StatusLista = ()=>{
    var resli = [];
    var resRev = [];
  
      for(let i in ListOc){
       if(Status === "Prêmio Pago"){

        if(ListOc[i].PremioPago === true){
          resRev.push(ListOc[i])
        }
        
       } else if(Status === "Em Analise"){
        if(ListOc[i].AnaliTotal === false && ListOc[i].Pago === true){
          resRev.push(ListOc[i])
        }

       }  else if(Status === "Reprovados"){
        if(ListOc[i].AnaliTotal === true &&  ListOc[i].Aprovado === false){
          resRev.push(ListOc[i])
        }

       }  else if(Status === "Aprovados"){
        if(ListOc[i].PremioPago === false && ListOc[i].Aprovado === true){
          resRev.push(ListOc[i])
        }

       }  else if(Status === "Em Debito"){
        if(ListOc[i].Pago === false){
          resRev.push(ListOc[i])
        }

       }  else if(Status === "Todos"){
        
          resRev.push(ListOc[i])
        

       }
        
           
    
        }
     
        if(resRev.length !== 0){
          setLista(resRev)
        } else {
          setLista("nada")
        }
      
        
       
    
   }

   const PesqCod = ()=>{
   
   if(PesId !== ""){
    let listra2 = [];
    for(let i in Lista ) {
    
        if( Lista[i].id.toLowerCase().includes(PesId.toLowerCase())  ) {
          
          listra2.push({
            IdCri:Lista[i].IdCri,
            id: Lista[i].id,
            dataJogo:Lista[i].dataJogo,
            NomeCam:Lista[i].NomeCam,
            TelCam :Lista[i].TelCam,
            Nome:Lista[i].Nome,
            TelCli:Lista[i].TelCli,
            Pago:Lista[i].Pago,
            Aprovado:Lista[i].Aprovado,
            PremioPago:Lista[i].PremioPago,
            AnaliTotal:Lista[i].AnaliTotal,
            ValPreDemos:Lista[i].ValPreDemos,
            ValorReal:Lista[i].ValorReal,
            SimAp:Lista[i].SimAp,
            ValCambis:Lista[i].ValCambis,
            VaToCo:Lista[i].VaToCo,
            ValApos:Lista[i].ValApos,
            Cash:Lista[i].Cash, 
            dataForm:Lista[i].dataForm,
           Cambista:Lista[i].Cambista,
           Mp:Lista[i].Mp,
        });   
        }
       
      
      
      setLista(listra2);
     
    }

   } else {
    PegandoLig()
   }
   
    
  }

   const Pesquisa = async (Pais, Liga)=>{
    setVerLiga(Liga);
    setVerLigPais(Pais)
    var bet = ListOc.filter(word => word.liga.name === Liga);
    setLista(bet);
  }

   const ListandoOc = ()=>{
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
    let CompDat = moment(currentDate1+" 23:59:00").unix();
    
    let currentDate12 = '';
    let meg12 = DatIn.split("/");
    let Dia12 = meg12[0];
    let Mes12 =  meg12[1];
    let Ano12 = meg12[2];
    Dia12 = Dia12 < 10 ? '0'+Dia12 : Dia12;
    Mes12 = Mes12 < 10 ? '0'+Mes12 : Mes12;
    currentDate12 = Ano12+'-'+Mes12+'-'+Dia12;
    let CompDat2 = moment(currentDate12+" 00:00:00").unix();


    let Dat2 = CompDat * 1000;
    let Dat = CompDat2 * 1000;
    if(Dat < Dat2){
    setCarreg(true)
    Api.MeusJogos(Jogos, Page, setListOc, setCarreg, setInd,  Dat, Dat2, );
  } 
    
  }

  const TirarEsse = (position) =>{
    setSimAp([...SimAp.filter((item, index) => index !== position)]);
   
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
    await ListandoOc();
    await setRefreshin(false);
  }
  const tempo = ()=>{
    setdataNasc(moment().format("DD/MM/YYYY"))
    setDatIn(moment().format("DD/MM/YYYY"))
    setCalIn(moment().unix()*1000)
    setDtEsc(moment().unix()*1000)
    setDataMin((moment().unix()+Varia)*1000)
    setDataMax(moment().unix()*1000)
    //let currentDate1 = Ano+'-'+Mes+'-'+Dia;
    // let CompDat1 = new Date(currentDate1+"T23:59:59.000").getTime();
    // CompDat1 = CompDat1+10800000;
    // let CompDat3 = CompDat1+10800000;
    // let dif = CompDat3-TimeIni;
    // let div = dif/86400000;
    // console.log(parseInt(div));
    // setQuantD(parseInt(div))
    // setTimeFin(CompDat1);
    // setTimeEve(CompDat1);
    // setDataEve(currentDate);
    // setDataFin(currentDate);
    // setDaExFin(currentDate)
  }

  const AbrindoClend = ()=>{
    setModalCalend(true);
    setOpen(true);
  }

  const FecharCalend = ()=>{
    setModalCalend(false);
    setOpen(false);
  }

  const Mudedate = (date)=>{
    console.log("entrou data")
    console.log(date.date)
    setModalCalend(false)
    setOpen(false);
    setdataNasc("")
    let currentDate = "";
    let now25 =date.date.getTime();
    setDtEsc(now25)
    let Dia = date.date.getDate();
    let Mes = (date.date.getMonth()+1);
    let Ano = date.date.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setdataNasc(currentDate)
    let currentDate1 = Ano+'-'+Mes+'-'+Dia;

  }

  const Mudedate2 = (date)=>{

    console.log("entrou data")
    console.log(date.date)
    setModalCalend(false)
    setOpen2(false);
    setDatIn("")
    let currentDate = "";
    let now25 =date.date.getTime();
    setCalIn(now25)
    let Dia = date.date.getDate();
    let Mes = (date.date.getMonth()+1);
    let Ano = date.date.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Dia+'/'+Mes+'/'+Ano;
    setDatIn(currentDate)
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
           setPago(false);
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
           setAnliAp(false);
           setStatusAp([]);
           setAproPag(false);
           setPgCash(false)
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false)
          setDaApos(0)
        }
        const BaixandoPag = ()=>{
          window.location.reload(true);
        }
      
        const VerLinkMsg2 = ()=>{
      
          if(userState.versaoBanco.LinkMsg2 !== ""){
            Linking.openURL(userState.versaoBanco.LinkMsg2);
          }
          
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
          
            
              
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.PagandoJogo(DadoFili, DadoTitu, IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.PagandoJogo(DadoFili, DadoTitu, IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo  )
                 
                  
  
                  } else {
                    setModalCalend(true);
                    setVerNotajogo(false);
                    setAlert("Preencha o Nome Do Cliente");
                    setAlertTipo("danger");
  
                  }
  
                 
                 
                }
             
             
             
             
             
    
           
        
  
          }
          
         
         
         
         }

         const AbrindoClend2 = ()=>{
          setModalCalend(true);
          setOpen2(true);
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
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("Algum desses jogos já esta preste a começar ou já começou, exclua e escolha outro jogo!");
            setAlertTipo("danger");
  
  
          } else {
            if(ValorReal <= 1000 ){
            if(ValorReal >= 5){
              if(SimAp.length > 1){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.PagandoJogoCASH(IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.PagandoJogoCASH(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                  
  
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
          } else {
            setModalCalend(true);
            setVerNotajogo(false);
            setAlert("R$ 1000,00 é o Maior valor que você pode aposta!");
            setAlertTipo("danger");
  
  
          }
  
          }
          
         
         
         
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

            const Imprimindo = ()=>{
            //   setNomeCam(item.NomeCam);
            //   setTelCam(item.TelCam);
            //  setTelCli(item.TelCli);
            //  setNomeCli(item.Nome)
            //  setPago(item.Pago);
            //  setValPreDemos(item.ValPreDemos);
            //  setValorReal(item.ValorReal);
            //  setSimAp(item.SimAp);
            //  setValCambis(item.ValCambis);
            //  setVaToCo(item.VaToCo);
            //  setValApos(item.ValApos); 
            //  setQCash(item.Cash);
            //  setIdApos(item.id);
            //  setQuanJog(item.SimAp.length);
            //  setPremio(item.PremioPago)
            //  setAnalisado(item.AnaliTotal)
            //  setAprov(item.Aprovado)
            //  setCambis(item.Cambista);
            //  setVCash(item.ValorReal*100);
            //  setVerNotajogo(true);
            //  setModalCalend(true)
            //  setDaApos(item.dataJogo)
            let currentDate25 = '';
            let now25 =new Date(DaApos);
            let hours25 = now25.getHours();
            let minutes25 = now25.getMinutes();
            let Dia25 = now25.getDate();
            let Mes25 = (now25.getMonth()+1);
            let Ano25 = now25.getFullYear(); 
            hours25 = hours25 < 10 ? '0'+hours25 : hours25;
            minutes25 = minutes25 < 10 ? '0'+minutes25 : minutes25;
            Dia25 = Dia25 < 10 ? '0'+Dia25 : Dia25;
            Mes25 = Mes25 < 10 ? '0'+Mes25 : Mes25;
            currentDate25 = Dia25+'/'+Mes25+'/'+Ano25;
            currentDate25 += ' ';
            currentDate25 += hours25+':'+minutes25;

            if(DadoTitu.Funcionario === true){

              var Msg = ""      
              Msg = Msg + `Boleto%20de%20Aposta%20${DadoFili.ConfigEmp.NomeEmp}%0A`
              Msg = Msg + `Codigo:%20${IdApos}%0A`
              Msg = Msg + `Nome:%20${NomeCli}%0A`
              Msg = Msg + `Telefone:%20${TelCli}%0A`
              Msg = Msg + `Data:%20${currentDate25}%0A`
              Msg = Msg + `----------------------------%0A`
              for(let i in SimAp){
  
                let currentDate = '';
                let now =new Date((SimAp[i].dataJogo) * 1000);
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

                Msg = Msg + `${SimAp[i].CasaTime.name.substr(0, 15)}%20X%20${SimAp[i].ForaTime.name.substr(0, 15)}%0A`
                Msg = Msg + `Palpite:%20${SimAp[i].Casa}%0A`
                Msg = Msg + `Cota:%20${SimAp[i].Olds}%20(${SimAp[i].Grupo})%0A`    
                Msg = Msg + `${currentDate}%0A`
                Msg = Msg + `--------------------------%0A`

               
                }
              Msg = Msg + `Cota Total:%20${VaToCo}%0A`
              Msg = Msg + `Valor Premio:%20R$%20${ValPreDemos}%0A`
              Msg = Msg + `Valor Pago:%20R$%20${ValApos}%0A`
              Msg = Msg + `Cambista:%20-------------%0A`;
              Msg = Msg + `Nome:%20${NomeCam}%0A`;
              Msg = Msg + `Telefone:%20${TelCam}%0A`;
              Msg = Msg + `Cambista%20Ganhara%20${DadoTitu.PorcenPremio}%%20em%20Cima%20do%20Premio.%0A`;
              Msg = Msg + `Quando%20Terminar%20todos%20os%20Jogos,%20analisaremos%20sua%20aposta,%20e%20enviaremos%20para%20seu%20WhatsApp%20se%20voce%20ganhou%20ou%20perdeu%20o%20premio%0A`; 
              Msg = Msg + `Caso%20Ganhe%20o%20Premio,%20entraremos%20em%20contato%20com%20voce%20via%20WhatsApp,%20para%20efetuarmos%20o%20Pagamento%20do%20Premio.%0A`;
              Msg = Msg + `WhatsApp%20da%20${DadoFili.ConfigEmp.NomeEmp}:%20${DadoFili.Telefone}.%0A`;

            } else {

              var Msg = ""      
              Msg = Msg + `Boleto%20de%20Aposta%20${DadoTitu.ConfigEmp.NomeEmp}%0A`
              Msg = Msg + `Codigo:%20${IdApos}%0A`
              Msg = Msg + `Nome:%20${NomeCli}%0A`
              Msg = Msg + `Telefone:%20${TelCli}%0A`
              Msg = Msg + `Data:%20${currentDate25}%0A`
              Msg = Msg + `----------------------------%0A`
              for(let i in SimAp){
  
                let currentDate = '';
                let now =new Date((SimAp[i].dataJogo) * 1000);
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

                Msg = Msg + `${SimAp[i].CasaTime.name.substr(0, 15)}%20X%20${SimAp[i].ForaTime.name.substr(0, 15)}%0A`
                Msg = Msg + `Palpite:%20${SimAp[i].Casa}%0A`
                Msg = Msg + `Cota:%20${SimAp[i].Olds}%20(${SimAp[i].Grupo})%0A`    
                Msg = Msg + `${currentDate}%0A`
                Msg = Msg + `--------------------------%0A`

               
                }
              Msg = Msg + `Cota Total:%20${VaToCo}%0A`
              Msg = Msg + `Valor Premio:%20R$%20${ValPreDemos}%0A`
              Msg = Msg + `Valor Pago:%20R$%20${ValApos}%0A`
              Msg = Msg + `Cambista:%20-------------%0A`;
              Msg = Msg + `Nome:%20${NomeCam}%0A`;
              Msg = Msg + `Telefone:%20${TelCam}%0A`;
              Msg = Msg + `Cambista%20Ganhara%20${DadoTitu.PorcenPremio}%%20em%20Cima%20do%20Premio.%0A`;
              Msg = Msg + `Quando%20Terminar%20todos%20os%20Jogos,%20analisaremos%20sua%20aposta,%20e%20enviaremos%20para%20seu%20WhatsApp%20se%20voce%20ganhou%20ou%20perdeu%20o%20premio%0A`; 
              Msg = Msg + `Caso%20Ganhe%20o%20Premio,%20entraremos%20em%20contato%20com%20voce%20via%20WhatsApp,%20para%20efetuarmos%20o%20Pagamento%20do%20Premio.%0A`;
              Msg = Msg + `WhatsApp%20da%20${DadoTitu.ConfigEmp.NomeEmp}:%20${DadoTitu.Telefone}.%0A`;
            }

           

            
              Linking.openURL(`rawbt:${Msg}`);
              //Linking.openURL(`rawbt:Hello,%20world!%0A%0AHello,%20world!%0A%0A`);
            }


            const EnviandoLink =  async ()=> {
              

              
             
              if(Robo === false){
                setCarre(true)
                Api.EnviandoNota(DadosBet, DadoTitu, DadoFili, IdApos,  setPago, setRobo,  setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos);
              } else {
               
                setAlert("Por Favor Clique em NÃO SOU ROBÔ!");
                setAlertTipo("danger")
              }     
         
     
        
             
                
             
               
              }

          const CompPgCash = ()=>{

            if(parseInt(Senha)  === CodLast){
            setCarre(true)
            Api.PgCshAti(VCash, IdAposta, setCarre, setLinkEnv, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setValApos, setVCash, setRobo, setCodG, setTentativa, setSenha  )
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
            
            ListandoOc();
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

          const AbrirEnviarFiltro = (item)=>{
        
            if(userState.QN4.Funcionario === true){
          
              if(userState.QN3.DataVenc >= DataMin){
                if(userState.QN3.Dinheiro <= userState.versaoBanco.ValMinSalDev){
                  AbrirEnviar(item) 
                } else {
                  setModalCalend(true);
                setVerNotajogo(false);
                setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${userState.versaoBanco.ValMinSalDev}). Vá ao financeiro e pague seu saldo devedor!  `);
                setAlertTipo("danger");
                }
                
              } else {
                setModalCalend(true);
              setVerNotajogo(false);
              setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!   ");
              setAlertTipo("danger");
              }
          
             
          
          
            } else {
  
              if(userState.QN4.DataVenc >= DataMin){
                if(userState.QN4.Dinheiro <= DadosBet.ValMinSalDev){
                  AbrirEnviar(item) 
                } else {
                  setModalCalend(true);
                setVerNotajogo(false);
                setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${DadosBet.ValMinSalDev}).Vá ao financeiro e pague seu saldo devedor! `);
                setAlertTipo("danger");
                }
                
              } else {
                setModalCalend(true);
              setVerNotajogo(false);
              setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!  ");
              setAlertTipo("danger");
              }
          
            
          
            }
          }

          const AbrirEnviar = (item)=>{
            setModalCalend(true);
            setCriarCli(true)
            setEnviLin(true);
            setPago(item.Pago);
            setIdApos(item.id);
           
           
          }
          const AbrimodalFilt = (item)=>{
        
            if(userState.QN4.Funcionario === true){
          
              if(userState.QN3.DataVenc >= DataMin){
                if(userState.QN3.Dinheiro <= userState.versaoBanco.ValMinSalDev){
                  AbrirModal(item) 
                } else {
                  setModalCalend(true);
                setVerNotajogo(false);
                setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${userState.versaoBanco.ValMinSalDev}). Vá ao financeiro e pague seu saldo devedor!  `);
                setAlertTipo("danger");
                }
                
              } else {
                setModalCalend(true);
              setVerNotajogo(false);
              setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!   ");
              setAlertTipo("danger");
              }
          
             
          
          
            } else {
  
              if(userState.QN4.DataVenc >= DataMin){
                if(userState.QN4.Dinheiro <= DadosBet.ValMinSalDev){
                  AbrirModal(item) 
                } else {
                  setModalCalend(true);
                setVerNotajogo(false);
                setAlert(`Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a Seu Saldo Devedor, passou o valor máximo permitido (R$${DadosBet.ValMinSalDev}).Vá ao financeiro e pague seu saldo devedor! `);
                setAlertTipo("danger");
                }
                
              } else {
                setModalCalend(true);
              setVerNotajogo(false);
              setAlert("Você Não Pode Usar O Sistema, Pois sua Conta está desativada devido a data de Vencimento da Conta. Vá ao financeiro e atualize a data de vencimento!  ");
              setAlertTipo("danger");
              }
          
            
          
            }
            
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
            setDaApos(item.dataJogo)
            
          }

          const FechaModal = ()=>{
            
            setNomeCam("");
            setTelCam("");
           setTelCli("");
           setNomeCli("")
           setPago(false);
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
            Api.Enviandopaga(ValPremi, DadosBet, DadoTitu, DadoFili, IdApos, ValPreDemos, setPremio, setCarre)
         }

         const placeholder = {
          label: 'Meus Jogos',
          value: null,
          color: '#000',
      };

      const placeholder2 = {
        label: 'Todos',
        value: null,
        color: '#000',
    };

  

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
                {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
                <View style={styles.QuadNota} >
                <ScrollView>
                  {EnviLin === true ?
                  <>
                   <View  style={styles.CaixadeapostaTitulo}  >
                   <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Enviar Link</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                     </View> 
                     <View  style = {styles.AraCli}>
                         
                            </View>
                           
                  </>
                  :
                  <>
                  <View  style={styles.CaixadeapostaTitulo}  >
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Criar Cliente</Text> <View  style={styles.fechaModal} ><TouchableHighlight onPress={() =>SairCriar()}><Text>X</Text></TouchableHighlight></View>
                  </View> 
                  <View  style = {styles.InputAra}>
                  <FontAwesome name="phone-square" size={24} color="black" />
                  
                   <Telefone                      
                       placeholder="Whatsapp do Cliente" 
                       value={TelCli}
                       onChangeText={t=>setTelCli(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                   
                   /> 
                   </View>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="user" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Nome do Cliente" 
                       value={NomeCli}
                       onChangeText={t=>setNomeCli(t)}
                       autoCapitalize="none"
                       keyboardType={"default"}
                       posi={18}
                   />
                  
                   </View>
                   </>
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

                            {EnviLin === true ?
                              <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EnviandoLink()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Enviando Link</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>CriandoCliente()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Criar Cliente para Jogo</Text>
                          </TouchableHighlight>

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

                 <DatePickerModal
                  locale="pt"
                  mode="single"
                  visible={open}
                  onDismiss={FecharCalend}
                  date={new Date(DtEsc)}
                  saveLabelDisabled={true} 
                  onChange={(range1) => Mudedate(range1)}
                editIcon={false} // optional, default is "pencil"
                
                />
                   <DatePickerModal
                    locale="pt"
                    mode="single"
                    visible={open2}
                    onDismiss={FecharCalend}
                    date={new Date(CalIn)}
                    saveLabelDisabled={true} 
                    onChange={(range1) => Mudedate2(range1)}
                  editIcon={false} // optional, default is "pencil"                 
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

                {Carre === true ?
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
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Estamos Analisando</Text><TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View> 
                    
                      <Image source={require('../assets/carreg.gif')}  style={styles.ImageVerEsp3 } />
                      <Image source={require('../assets/futebol.gif')}  style={styles.ImageVerEsp5 } /> 
                      <Text  style={{fontWeight:"bold", marginLeft:120, fontSize:35  }}>{QJogos}%</Text>
                        
                       
                       
                        </>
                        :
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Boleto da Aposta</Text> <TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
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
                           
                            <View  style = {styles.AraCli}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{TelCli}</Text>
                            </View>
                            <View  style = {styles.AraCli}>
                            <FontAwesome name="user" size={24} color="black" />
                             <Text  style={{ margin:10, fontSize:17  }}>{NomeCli}</Text>
                            </View>
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#316FEB", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Imprimindo()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Imprimir Boleto</Text>
                          </TouchableHighlight>
                            </>
                            :
                            <>
                          
                        
                            </>
                              }
                              {Pago === false &&
                              <>
                          
                          {userState.QN4.Funcionario === false ?
                          <>
                          {DadoTitu.ConfigEmp.LinkMp !== "" &&
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar a Aposta</Text>
                          </TouchableHighlight>
                          }
                          </>

                          :
                          <>
                          {DadoFili.ConfigEmp.LinkMp !== "" &&
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar a Aposta</Text>
                          </TouchableHighlight>
                          }
                          </>

                           }
                         

                          {/* <TouchableHighlight style={{width:150, height:50, backgroundColor:"#9B1AD3", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoCash()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Com Cash</Text>
                          </TouchableHighlight> */}


                              
                              </>

                              }
                         
                           {AproPag=== true &&
                          <>
                          {Premio === false ?
                          <>
                          {Pago === true &&
                          <>
                          {userState.QN4.Funcionario === false &&
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#E77E1E", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagarDinheiro()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Prêmio</Text>
                          </TouchableHighlight>
                            }
                          </>
                          }
                         
                         </>
                         :
                         <>
                          
                         <Text  style={{ marginLeft:10, fontSize:17, color:"#000"  }}>Premio Pago</Text>
                         </> 
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
              <TouchableHighlight  style={styles.CaixaDados}>
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
              </TouchableHighlight>
            
             

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              Jogos
             </Text>
              </TouchableHighlight>
              <View  style={styles.AreaBtnTopConf}>
              {userState.QN4.Funcionario === false &&
              <>
               <TouchableHighlight onPress={()=>AbrinoMoney() } style={styles.CaixaDados}>
              <>
              {userState.nome >0 &&
                 <View style={{marginBottom:-15, marginRight:-20, width:20, height:20, backgroundColor:"red", borderRadius:10, flex:1, display:"flex", justifyContent:"center", alignItems:"center"}} ><Text style={{color:"#fff"}}>D</Text></View>
              }
              
              <FontAwesome name="money" size={24} color="#fff" />
              </>
              </TouchableHighlight>


              <TouchableHighlight onPress={()=>AbrindoVenc() }  style={styles.CaixaDados}>
                {userState.DatAti < new Date().getTime() ?
                <>
                 <View style={{marginBottom:-15, marginRight:-20, width:20, height:20, backgroundColor:"red", borderRadius:10, flex:1, display:"flex", justifyContent:"center", alignItems:"center"}} ><Text style={{color:"#fff"}}>V</Text></View> 
                 <FontAwesome name="calendar-times-o" size={24} color="#fff" />
                </>
               
                :
                <FontAwesome name="calendar-check-o" size={24} color="#fff" />
                }
              
              </TouchableHighlight>
              
              </>
              }
             

            

              <TouchableHighlight onPress={()=>IrNoti()}  style={styles.CaixaDados}>
              <>
              {userState.Noti >0 &&
              <>
                <View style={{marginBottom:-15, marginRight:-20, width:20, height:20, backgroundColor:"red", borderRadius:10, flex:1, display:"flex", justifyContent:"center", alignItems:"center"}} ><Text style={{color:"#fff"}}>{userState.Noti}</Text></View> 
                
                </>
              }
              <FontAwesome name="bell"  size={24} color="#fff" />
              </>
             
              </TouchableHighlight>

              <TouchableHighlight  onPress={()=>IrConfig()}  style={styles.CaixaDados}>
              <FontAwesome name="gear" size={24} color="#fff" />
              </TouchableHighlight>

              <TouchableHighlight  onPress={()=>Atualizar()}  style={styles.CaixaDados}>
              <FontAwesome name="refresh" size={24} color="#fff" />
              </TouchableHighlight>


           </View>
            </View >
            {AbMoney === true &&
             <View style={styles.TextInforma}>
              <Text style={{margin:10, fontSize:17, color:"red", fontWeight:"bold"}} >SALDO DEV.: R${userState.nome.toFixed(2)}</Text>
             </View>


            }

            {AbVenc === true &&
            <View style={styles.TextInforma}>

          <Text style={{margin:10, fontSize:17, color:"#000", fontWeight:"bold"}} >VENCIMENTO: {userState.data_nasc}</Text>
            </View>

            }
             {userState.QN4.Funcionario === true ?
            <>

              {userState.QN3.DataVenc <= DataMin?
                <>
                 <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber se a conta está vencida</Text>
            </>
            </TouchableHighlight>
                </>
                :
                <></>
              }

              {userState.QN3.Dinheiro >= userState.versaoBanco.ValMinSalDev?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber se seu saldo devedor passou do limite permitido de R$ {userState.versaoBanco.ValMinSalDev}</Text>
            </>
            </TouchableHighlight>
              </>
              :
              <></>
              }

            </>
             :
            <>
              {userState.QN4.DataVenc <= DataMin?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber se a conta está vencida </Text>
            </>
            </TouchableHighlight>
              </>
              :
              <></>
              }

              {userState.QN4.Dinheiro >= userState.versaoBanco.ValMinSalDev?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber  se seu saldo devedor passou do limite permitido de R$ {userState.versaoBanco.ValMinSalDev}</Text>
            </>
            </TouchableHighlight>
              </>
                :
              <></>
              }
              </>
              }
            {userState.versao !== userState.versaoBanco.Versao &&
            <TouchableHighlight onPress={()=>BaixandoPag()} style={{width:370, marginBottom:5, height:120, backgroundColor:"#B7AD00", borderRadius:10, padding:10, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="download" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >{userState.versaoBanco.Msg1}</Text>
            </>
            </TouchableHighlight>
            }
            {userState.versaoBanco.Msg2 !== "" &&
            <TouchableHighlight onPress={()=>VerLinkMsg2()} style={{width:370, height:90, backgroundColor:"#00A859", borderRadius:10, marginBottom:10, padding:10, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="warning"  size={40} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >{userState.versaoBanco.Msg2}</Text>
            </>
            </TouchableHighlight>
            }
            
             <View  style={styles.AreaBtn}>
             {userState.QN4.Funcionario === false &&
          <RNPickerSelect
           placeholder={placeholder}
            onValueChange={(value) =>setJogos(value)}
            items={LisEsc}
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'eggplant',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
              textAlign :'right',
            }}
            
        />
      }
      
      <TouchableHighlight onPress={()=>AnalisandoOldsFilt()} style={{backgroundColor:"#11BBBD", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:25, borderRadius:5, marginLeft:10, marginRight:10, paddingLeft:5, paddingRight:5,}} >
         <>
       <Text  style={{fontSize:15, color:"#fff", margin:5}}>Analisar Jogos</Text>
       </>            
       </TouchableHighlight>
       <RNPickerSelect
           placeholder={placeholder2}
            onValueChange={(value) =>setStatus(value)}
            items={[
              {label:"Prêmio Pago", value:"Prêmio Pago", },
              {label:"Em Analise", value:"Em Analise", },
              {label:"Reprovados", value:"Reprovados", },
              {label:"Aprovados", value:"Aprovados", },
              {label:"Em Debito", value:"Em Debito", },
            ]}
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'eggplant',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
              textAlign :'right',
            }}
            
        />
        </View>
         
         
           
           <View  style={styles.AreaBtn}>
          
              
          {/* <TouchableHighlight onPress={()=>setRelogio(true)}  style={styles.InputHora}>
            <>
          <FontAwesome name="clock-o" size={20} color="black" />
          <Text  style={styles.modalText6}> {hr} </Text>
          </>     
                
          </TouchableHighlight> */}
            <View  style={styles.AreaBtn4}>
              <Text style={{fontSize:14}}>Início </Text>
                <FontAwesome name="calendar" size={20} color="black" />
            </View>
            <TouchableHighlight onPress={()=>AbrindoClend2()}  style={styles.AreaBtn3}>
            <View style={styles.modalView3}><Text  style={styles.modalText6}> {DatIn} </Text></View>
       
                  </TouchableHighlight>
                       <View  style={styles.AreaBtn4}>
                       <Text style={{fontSize:14}}>Fim </Text>
                       <FontAwesome name="calendar" size={20} color="black" />
            </View>
            <TouchableHighlight onPress={()=>AbrindoClend()}  style={styles.AreaBtn3}>
            <View style={styles.modalView3}><Text  style={styles.modalText6}> {dataNasc} </Text></View>
       
                  </TouchableHighlight>
          
          </View>
          <View style={styles.InputHora}>
                  
                    <SignInput
                       
                       placeholder="Digite o Código do Boleto" 
                       value={PesId}
                       onChangeText={t=>setPesId(t)}
                       autoCapitalize="none"
                       keyboardType={"default"}
        
                   />   
                   </View>


          {/* <View  style={styles.AreaBtnLiga}>
        
  
            <TouchableHighlight onPress={()=>AbrirCriar()} style={{backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:50, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
            <>
          <Text  style={{fontSize:25, color:"#fff", margin:10}}>Criar Jogo Para Cliente</Text>
          </>     
                
          </TouchableHighlight>
              
          
       
        </View> */}
       
       <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
            <FontAwesome name="" size={30} color="black" />
            <Text  style={{  fontWeight:"bold",  fontSize:17, color:"#000"  }}>Jogos</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:15, color:"#000"  }}>Quantidade: {Lista === "nada"? 0 : Lista.length}  </Text>
            </View>
        <ScrollView>
        { Lista[0] && Lista !== "nada"?
          <>
          {Lista.map((item, key)=>(
           <>
            <View  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:70, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: item.AnaliTotal === true? item.Aprovado === true? item.PremioPago === true? "#E5AC1E":"#7CBEFB":"#FB7C7C" : item.Pago === true?"#8BF39C":"#fff",}}>
               <View  style={styles.CaixaNome}>
               {item.Cambista === false ?
                <Text style={styles.Time}>Prêmio: R${item.ValPreDemos}</Text>
                :
                <>
                <Text style={styles.Time}>{item.Nome.substring(0, 10)}</Text>
                <Text style={styles.Time}>{item.TelCli}</Text>
                </>
              }
                
                <Text style={styles.Time}>{item.dataForm}</Text>
                </View> 
                <View  style={styles.CaixaNome}>
                  {item.Aprovado === false ?
                    <>
                  {item.AnaliTotal === false ?
                  <Text style={styles.Time}>Em Analise</Text>
                  :
                  <Text style={styles.Time}>Reprovado</Text>
                  }
                    
                    </>
                  :
                  <>
                   <Text style={styles.Time}>Aprovado</Text>
                   {item.PremioPago === false ?
                  <Text style={styles.Time}>Receber Prêmio</Text>
                  :
                  <Text style={styles.Time}>Prêmio Pago</Text>
                    }
                  </>
                 
                  }

                {item.Pago === false ?
                  <Text style={styles.Time}>Aposta Em Debito</Text>
                  :
                  <Text style={styles.Time}>Aposta Paga {item.Mp === true? "MP":""}</Text>
                    }
                    {item.Cambista === true &&
                  <Text style={styles.Time}>Camb: {item.NomeCam}</Text>
                
                    }
                
                </View> 
    
                <View  style={styles.TempDat}>
                <TouchableHighlight onPress={()=>AbrirEnviarFiltro(item)} style={{backgroundColor:"#DDBE0D", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:25, marginBottom:5, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
                <>
              <Text  style={{fontSize:15, color:"#fff", margin:5}}>Enviar Nota</Text>
              </>            
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>AbrimodalFilt(item)} style={{backgroundColor:"#009DFF", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:25, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
                <>
              <Text  style={{fontSize:15, color:"#fff", margin:5}}>Visualizar</Text>
              </>            
              </TouchableHighlight>
                </View>



              </View >
       
             
           


            </View>
           
              </>

              ))}

              </>
              :
              <>
              {Lista === "nada"?
                <Text style={{fontSize:20, color:"red"}}>Não Existe Dados </Text>
              :
              <View style={{marginLeft:100, marginTop:20}}>
              <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
              <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
              </View>

              }
              
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
  },
  ModVie: {
    backgroundColor: "#FFF",
    width:200,
    
    borderRadius:20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"
  },
  ModVieTex: {
    width:180,
 
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

  ImageVerEsp3:{
    width:100,
    height:90,
    marginTop: 10,
    marginLeft:100,

   
  }, 
  
  ImageVerEsp5:{
    width:50,
    height:100,
    marginTop: 10,
    marginLeft:120,

   
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
    width:70,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    height:30,
    marginLeft:5,
    marginRight:-5,
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
    marginBottom:5,
    paddingLeft:5,
 
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