
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, Linking, FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
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
import * as Clipboard from 'expo-clipboard';
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
  const [MsgErro1, setMsgErro1] = useState(false);
  const [MsgErro2, setMsgErro2] = useState(false);
  const [Btn, setBtn] = useState(false);
  const [IdTrans, setIdTrans] = useState("")
  const [Nive3, setNive3] = useState(false);
  const [Nive4, setNive4] = useState(false);
  const [List3, setList3] = useState([]);
  const [Nome2, setNome2] = useState("");
  const [Nome3, setNome3] = useState("")
  const [Qcash3, setQcash3] = useState(0)
  const [List4, setList4] = useState([]);
  const [Qcash4, setQcash4] = useState(0)
  const [Id, setId] = useState("")
  const [CopiedText, setCopiedText] = useState("");
  const [open, setOpen] = useState(false);
  const [DatIn, setDatIn] = useState(0);
  const [CalIn, setCalIn] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [Cab, setCab] = useState({})
  const [AposTot, setAposTot] = useState({})
  const [ValPa, setValPa] = useState(0)
  const [ValCom, setValCom] = useState(0)
  const [ValToP, setValToP] = useState(0)
  const [Jogos, setJogos] = useState("")
  const [DadoTitu, setDadoTitu] = useState(userState.QN4)
  const [DadoFili, setDadoFili] = useState(userState.QN3)
  const [DadosBet, setDadosBet] = useState(userState.versaoBanco)
  const [SairCAm, setSairCAm] = useState(false);
  const [PagCont, setPagCont] = useState(false);
  const [PagCom, setPagCom] = useState(false)
  const [QJogos, setQJogos] = useState(0)
  const [LinkDeIn, setLinkDeIn] = useState("")

  useEffect(() => {
    setDadoTitu(userState.QN4)
     setDadoFili(userState.QN3)
     setDadosBet(userState.versaoBanco)
  }, [userState.QN4, userState.QN3, userState.versaoBanco])
  useEffect(() => {
    console.log(Cab);
  }, [Cab])
 
  useEffect(() => {
    if(dataNasc !== null){
      Pegandodados();
    }
    
  }, [dataNasc, DatIn]);

  useEffect(() => {
    if(TelCli !== "" && TelCli.length === 14 ){
  
        TelWhats();
    
    } else{
      setMsgErro2(false)
    }
    


   }, [TelCli])

   useEffect(() => {
    setVaria(userState.variTemp);
  }, [userState.variTemp])

  useEffect(() => {
    tempo();
  }, [Varia])
  useEffect(() => {
    if(ListOc.length >= 1){
      ListandoOc()
    }

   }, [ListOc])

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
   setLinkDeIn(`https://apostacentral.netlify.app/apostas/${Id}`)
   }, [Id])

   useEffect(() => {
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])


  useEffect( ()=>{ 
    if(AposTot.length >= 1){
      ConfiValor();  
    }            
   }, [AposTot]);

  const TelWhats = ()=>{
   
   Api.AnaliseTelTransf(TelCli, setMsgErro2, setNome, setLoad, setBtn, setIdTrans) 
  
}

const ConfiValor = ()=>{
   var VaPg = 0
   var VaCom = 0
   for(let i in AposTot){
    if(AposTot[i].Pago === false){
      VaPg= VaPg + AposTot[i].ValorAposta
    }
    if(userState.QN4.Funcionario === true){
      if(AposTot[i].ComissaoFun.Pago === false){
        VaCom= VaCom + (AposTot[i].ValorAposta*(AposTot[i].ComissaoFun.Valor/100))
      }

    }else {
      if(AposTot[i].ComissaoFun.Pago === false && AposTot[i].Pago === true){
        VaCom= VaCom + (AposTot[i].ValorAposta*(AposTot[i].ComissaoFun.Valor/100))
      }

    }
   
   }

   setValPa(VaPg);
   setValCom(VaCom);
   setValToP(VaPg - VaCom)
}

const FiltrarList = (item)=>{
var resApo = []
  
 for(let i in AposTot){

    if(item === 'Falta Aprovar Pagamento'){
      if(AposTot[i].Pago === false){
        resApo.push({
          id: AposTot[i].id,
          Pago: AposTot[i].Pago,
          ComissaoEmp: AposTot[i].ComissaoEmp,
          ComissaoFun: AposTot[i].ComissaoFun,
          Nome: AposTot[i].Nome,
          valorAposSimb: AposTot[i].valorAposSimb,
          DataApost: AposTot[i].DataApost,
          PgMp: AposTot[i].PgMp,
          ValorAposta: AposTot[i].ValorAposta,
        })
      }
    }

    if(item === 'Falta Pagar Comissão'){
   if(AposTot[i].ComissaoFun.Pago === false){
    resApo.push({
      id: AposTot[i].id,
      Pago: AposTot[i].Pago,
      ComissaoEmp: AposTot[i].ComissaoEmp,
      ComissaoFun: AposTot[i].ComissaoFun,
      Nome: AposTot[i].Nome,
      valorAposSimb: AposTot[i].valorAposSimb,
      DataApost: AposTot[i].DataApost,
      PgMp: AposTot[i].PgMp,
      ValorAposta: AposTot[i].ValorAposta,
    })
   }
  }

  }
 setJogos(item)
 setAposTot(resApo)
 
}

const EnviarLink = ()=>{
  // var Msg = ""      
  // Msg = Msg + `  Boleto de Aposta PixBetCash   `
  // Msg = Msg + `Nome: Carlos Renan              `
  // Msg = Msg + `Telefone: (86)99543-7113        `
  // Msg = Msg + `Pagamento Aprovado              `
  // Msg = Msg + `Data: 02/03/2022                `
  // Msg = Msg + `--------------------------------`
  // Msg = Msg + `Brasil X Argentina              `
  // Msg = Msg + `Palpite: Vencedor da Partida    `
  // Msg = Msg + `Cota: 1,5  (Casa)               `    
  // Msg = Msg + `01/10/2022                      `
  // Msg = Msg + `--------------------------------`
  // Msg = Msg + `Brasil X Argentina              `
  // Msg = Msg + `Palpite: Vencedor da Partida    `
  // Msg = Msg + `Cota: 1,5  (Casa)               `    
  // Msg = Msg + `01/10/2022                      `
  // Msg = Msg + `--------------------------------`
  // Msg = Msg + `Brasil X Argentina              `
  // Msg = Msg + `Palpite: Vencedor da Partida    `
  // Msg = Msg + `Cota: 1,5  (Casa)               `    
  // Msg = Msg + `01/10/2022                      `
  // Msg = Msg + `Cota Total: 3,2                 `
  // Msg = Msg + `Valor Premio: R$ 20,00          `
  // Msg = Msg + `Valor Pago: R$ 10,00            `
  // Linking.openURL(`rawbt:${Msg}`);

  if(TelCli.length === 14){
    var ver = TelCli.replace("(", "55");
    var par1 = ver.replace(")", "");
    var par3 = par1.replace("-", "");
    Linking.canOpenURL(`https://wa.me/${par3}?text=${LinkDeIn}`).then(supported => {
      if (supported) {
        return Linking.openURL(
          `https://wa.me/${par3}?text=${LinkDeIn}`
        );
      } else {
        return Linking.openURL(
          `https://wa.me/${par3}?text=${LinkDeIn}`
        );
      }
    })
   
  } else{
    setAlert("Coloque o telefone!")
  }
 
}

const copyToClipboard = async () => {
  await Clipboard.setStringAsync(Id);
 
};

const fetchCopiedText = async () => {
  const text = await Clipboard.getStringAsync();
  setCopiedText(text);
};

// const copyToClipboard = async () => {
//   await Clipboard.setStringAsync(`http://pixbetcash.com.br/indicacao/${Id}`);
 
// }


  const ConcluidoAposta = ()=>{
    Api.TiraConcluidoApos(IdApos, Concluir)
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds(SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

  const Pegandodados = ()=>{
    let currentDate1 = '';
    let meg = dataNasc.split("/");
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
    setCarre(true)
    Api.PegarDadosIndiq(DadoTitu, DadoFili, QCash , setId, setListOc, setQCash, setCarre, Dat, Dat2)
  }
   
   }

  const onChangeRecp = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const IndoNive3 = (item, Nome)=>{
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
    let Dat2 =moment().unix()*1000;
    setNome2(Nome)
    setCarre(true)
    Api.PegarDadosIndiq3(item , setList3, setQcash3, setCarre, setNive3, Dat, Dat2)
    
  }

  const IndoNive4 = (item, Nome)=>{
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
    let Dat2 =moment().unix()*1000;
   setNome3(Nome)
    setCarre(true)
    Api.PegarDadosIndiq4(item , setList4, setQcash4, setCarre, setNive4, Dat, Dat2)
    
  }

  const IndoNive2 = ()=>{
    setNive3(false);
    setList3([]);
    setQcash3(0);
  }

  const VoltNive3 = ()=>{
    setNive4(false);
    setList4([]);
    setQcash4(0);
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
  const AbrindoClend2 = ()=>{
    setModalCalend(true);
    setOpen2(true);
  }

  const FecharCalend = ()=>{
    setModalCalend(false);
    setOpen(false);
    setOpen2(false);
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

        const IrEdicaoCam= ()=>{
        navigation.navigate("EditarCam", {
            Id:Cab.id,
            Nome:Cab.Nome,
            Tel:Cab.Telefone,
            Comissao:Cab.Comissao,
            PorcenPremio:Cab.PorcenPremio,
            QuanApos:Cab.QuanApos,
          })
          Siarnota()
       }

        const IrIndicar = ()=>{
           navigation.navigate("Indicarcao")
        }

        const IrGraf = ()=>{
          navigation.navigate("Graficos")
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
          setAlert("");
          setModalCalend(false);
          setVerNotajogo(false);
          setCriarCli(false)
          setMsgErro1(false);
          setMsgErro2(false);
          setValToP(0)
          setTelCli("");
          setBtn(false);
          setIdTrans("");
          setCab({})
          setAposTot({})
          setJogos("");
          setValPa(0)
          setValCom(0);
          setTentativa(0)
          setCodLast("")
          setPagCont(false)
          setPagCom(false)
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

         const TirarEsse = (position) =>{
          setAposTot([...AposTot.filter((item, index) => index !== position)]);
         
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

          const GerarCodDeixa =  async ()=> {
         
            setSairCAm(true)
              
              setCarre(true)
              Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
            setTentativa(0)
            setSenha("")
        
           
              
           
             
            }

            const GerarCodApr =  async ()=> {
         
              setPagCont(true)
                
                setCarre(true)
                Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
              setTentativa(0)
              setSenha("")
          
             
                
             
               
              }

              const GerarCodCom =  async ()=> {
         
                setPagCom(true)
                  
                  setCarre(true)
                  Api.GeradorDeCod(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend);
                setTentativa(0)
                setSenha("")
            
               
                  
               
                 
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
          const BaixandoPag = ()=>{
            window.location.reload(true);
          }
        
          const VerLinkMsg2 = ()=>{
        
            if(userState.versaoBanco.LinkMsg2 !== ""){
              Linking.openURL(userState.versaoBanco.LinkMsg2);
            }
            
          }

          const Atualizar = ()=>{
            
            Pegandodados()
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

          const AbrirCriar = (item)=>{
            console.log(item)
            setCab(item)
            setAposTot(item.Apos)
            setModalCalend(true);
            setCriarCli(true)
          }

          const AbrirCriarFilt = (item)=>{
        
            if(userState.QN4.Funcionario === true){
          
              if(userState.QN3.DataVenc >= DataMin){
                if(userState.QN3.Dinheiro <= userState.versaoBanco.ValMinSalDev){
                  AbrirCriar(item) 
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
                  AbrirCriar(item) 
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
            Api.Enviandopaga(AposTot, ValPreDemos, setPremio, setCarre)
         }

         const onConfirmSingle = ()=>{
         
          (params) => {
           console.log(params.date);
          }, setOpen(false);
            
          [setOpen]
         };

         const saindoFun = ()=>{
          if(parseInt(Senha)  === CodLast){
            setCarre(true)
            Api.SairFun(IdApos, setSairCAm, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2  ) 
           
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }

          
         }

         const Aprovando = ()=>{
          if(parseInt(Senha)  === CodLast){
            setLoad(true)
            Api.AprovandoApos(Cab, DadosBet, ValPa, AposTot, Siarnota, setPagCont, setQJogos, setSairCAm, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  ) 
           
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }

          
         }

         const PagaComi = ()=>{
          if(parseInt(Senha)  === CodLast){
            setLoad(true)
            Api.PgComi(Cab, ValCom, AposTot, Siarnota, setPagCom, setQJogos, setSairCAm, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  ) 
           
          } else {
            setTentativa(Tentativa +1)
           setAlertTipo("danger")
            setAlert("Código Errado "+(Tentativa+1)+"° tentativa de 3");
            setModalCalend(true);
            setVerNotajogo(false);
          }

          
         }

         const placeholder = {
          label: 'Todas As Apostas',
          value: null,
          color: '#000',
      };
      
      const PgApostaCam= ()=>{
         

         
        setLoad(true);
        Api.PgAsApostas(ValCom, ValPa, DadoFili, DadoTitu, DadosBet, ValToP, AposTot, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash, setCriarCli, setValToP, setAposTot  )
   

        }
      const AbriLinkEnv = ()=>{
        setCriarCli(false)
        setVerNotajogo(true)
        setPgCash(true)
        setModalCalend(true)
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
                       <View style={styles.QuadNota} >
                    <Image source={require('../assets/carreg.gif')}  style={styles.ImageVerEsp3 } />
                      <Image source={require('../assets/futebol.gif')}  style={styles.ImageVerEsp5 } /> 
                      <Text  style={{fontWeight:"bold", marginLeft:120, fontSize:35  }}>{QJogos}%</Text>
                      </View>
                      
                      </>

                      :
                      <>
                      
                <View style={styles.QuadNota} >
                <ScrollView>
                 
                   <View  style={styles.CaixadeapostaTitulo}  >
                    
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}> Prestação de Conta</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}> {Cab.Nome}</Text> 
                    <View  style={styles.AreaBtnCima10}>
                    {DadoTitu.Funcionario === true &&
                     <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:10, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PgApostaCam()}>
                       <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar As Apostas</Text>
                     </TouchableHighlight>
                    }
                     {DadoTitu.Funcionario === false &&
                     <TouchableHighlight style={{width:150, height:50, backgroundColor:"#BE36F9", borderRadius:5, margin:10, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrEdicaoCam()}>
                       <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Editar Cambista</Text>
                     </TouchableHighlight>
                      }
                     </View>
                    {DadoTitu.Funcionario === false &&
                     <View  style={styles.AreaBtnCima10}>
                     <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:10, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodApr()}>
                       <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Aprovar Pagamento</Text>
                     </TouchableHighlight>
                     <TouchableHighlight style={{width:150, height:50, backgroundColor:"#BF8C0D", borderRadius:5, margin:10, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodCom()}>
                       <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Comissão</Text>
                     </TouchableHighlight>
                     </View>
                     

                    }

                    

          {PagCont &&
              <>
                  

               {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodApr()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                        {Tentativa === 1 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>1° tentativa de 3</Text> 
                        
                        </>
                        }
                        {Tentativa === 2 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>2° tentativa de 3</Text> 
                        
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>Seu Código foi enviado para o Whatsapp</Text> 
                                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Cód." 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Aprovando()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Aprovar Agora</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }
                       
              </>

                      }

            {PagCom &&
              <>
                  

               {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodCom()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                        {Tentativa === 1 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>1° tentativa de 3</Text> 
                        
                        </>
                        }
                        {Tentativa === 2 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>2° tentativa de 3</Text> 
                        
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15, color:"#000"  }}>Seu Código foi enviado para o Whatsapp</Text> 
                                   <View  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Cód." 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#BF8C0D", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagaComi()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Agora</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }
                       
              </>

                      }

                    {DadoTitu.Funcionario === false ?
                    <>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor Das Apostas Que Falta Aprovar: R$ {ValPa.toFixed(2)}</Text>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor Das Comissões Cambista Que Falta Paga: R$ {ValCom.toFixed(2)}</Text>
                    </>
                    :
                    <>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor Das Apostas: R$ {ValPa.toFixed(2)}</Text>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor da Sua Comissão: R$ {ValCom.toFixed(2)}</Text>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, color:"#BF8C0D"  }}>R$ {ValPa.toFixed(2)} - R$ {ValCom.toFixed(2)} = R$ {(ValPa-ValCom).toFixed(2)}</Text>
                     <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, color:"#BF8C0D"  }}>Valor Para Pagamento: R$ {ValToP.toFixed(2)} </Text>
                    
                    </>
                    }
                   
                  
                      {Jogos === "" &&
                    <RNPickerSelect
                    placeholder={placeholder}
                      onValueChange={(value) =>FiltrarList(value)}
                      items={[
                        { label: 'Falta Aprovar Pagamento', value: 'Falta Aprovar Pagamento' },
                        { label: 'Falta Pagar Comissão', value: 'Falta Pagar Comissão' },
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
                      }
                     
        
        {AposTot.map((item, index)=>(
           <>
            <View  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:70, width:250, borderBottomWidth:2, borderColor:"#ccc", backgroundColor:item.Pago === false? "#fff": item.ComissaoFun.Pago === true? item.ComissaoEmp.Pago === true? "#7CBEFB":"#CF7CFB" : "#8BF39C",}}>
               <View  style={styles.CaixaNome}>
              
                <>
                <Text style={styles.Time}>Cliente: {item.Nome.substring(0, 10)}</Text>
                <Text style={styles.Time}>Valor Ap.: {item.valorAposSimb
}</Text>
                </>
              
                
                <Text style={styles.Time}>{moment(item.DataApost).format("DD/MM/YYYY HH:mm:ss")}</Text>
                </View> 
                <View  style={styles.CaixaNome}>
                {item.Pago === false ?
                  <Text style={styles.Time}>Em Debito</Text>
                  :
                  <Text style={styles.Time}>Pago {item.PgMp? "MP":""}</Text>
                  }
                  {item.ComissaoFun.Pago === false ?
                  <Text style={styles.Time}>Deb. Camb.</Text>
                  :
                  <Text style={styles.Time}>Pag. Camb.</Text>
                  }

                  {item.ComissaoEmp.Pago === false ?
                  <Text style={styles.Time}>Deb. Emp.</Text>
                  :
                  <Text style={styles.Time}>Pag. Emp.</Text>
                  }

                  {/* {item.Aprovado === false ?
                    <>
                 
                    
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
                
                    } */}
                
                </View> 
                
                <View  style={styles.CaixaNome}>
                <TouchableHighlight  style={styles.ExcluirJogo} onPress={()=>TirarEsse(index)}>
                     <FontAwesome name="trash" size={20} color="black" />
                      </TouchableHighlight>
    
                </View>



              </View >
       
             
           


            </View>
           
              </>

              ))}
                      
                     
                     
                 
                    </View>
                   
                           
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
                    
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Link de Indicação</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras Para Link:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>1° Copie o Link segurando o Click no Link por 4 segundos, aparecerá uma barra com o Botão de Copiar. clique no Botão!</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>2° Cole Em suas Redes Sociais ou envie por Whatsapp </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>3° Quem Clicar nesse Link e se cadastrar na PIXBETCASH, entrará como sua indicação</Text> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Seu Link:</Text>
                      
                     
                      <View  style = {styles.InputAra}>
                   <FontAwesome name="link" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Link Recortado" 
                       value={LinkDeIn}
                       onChangeText={t=>setLinkDeIn(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Envie Link para Um Whatsapp:</Text>
                   <View  style = {styles.InputAra}>
                  <FontAwesome name="phone-square" size={24} color="black" />
                  
                   <Telefone                      
                       placeholder="Whatsapp da Pessoa" 
                       value={TelCli}
                       onChangeText={t=>setTelCli(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                   
                   /> 
                   </View>
                   {Alert !== "" &&
                    <Text  style={{ marginLeft:10, fontSize:15, color:"red"  }}>{Alert}</Text>
                    }
                   <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EnviarLink()}>
                      <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Enviar Para Whatsapp</Text>
                    </TouchableHighlight>
                    </View>

                  

                
              
                
                  
                 
                 
                  
                     
                    

                      
                          
                        
                       
                       
                        </>
                        :
                        <>
                        <View  style={styles.CaixadeapostaTitulo}  >
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Simulador de Aposta</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
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
              Cambistas
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
            
              <View  style={styles.AreaBtnCima}>
              {userState.QN4.Funcionario === false ?
              <>
                <TouchableHighlight style={{width:70, height:100, backgroundColor:"#DDBE0D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrIndicar()}>
                          <>
                          <FontAwesome name="user"  size={40} color="#fff" />
                            <Text  style={{ fontWeight:"bold",  fontSize:11, color:"#FFF"  }}>Criar</Text>
                            <Text  style={{ fontWeight:"bold",  fontSize:11, color:"#FFF"  }}>Cambista</Text>
                            </> 
                       </TouchableHighlight>
                       <TouchableHighlight style={{width:70, height:100, backgroundColor:"#30B72D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrGraf()}>
                          <>
                          <FontAwesome name="signal" size={40} color="#fff" />
                            <Text  style={{ fontWeight:"bold",  fontSize:11, color:"#FFF"  }}>Gráficos</Text>
                            
                            </> 
                       </TouchableHighlight>
                       <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbriLinkEnv()}>
                           <>
                           <FontAwesome name="link" size={40} color="#FFF" />
                            <Text  style={{  fontWeight:"bold",  fontSize:11, color:"#FFF"  }}>Indicar</Text>
                            <Text  style={{  fontWeight:"bold",  fontSize:11, color:"#FFF"  }}>Link</Text>
                            </>
                       </TouchableHighlight>
              </>
              :
              <>
              
               
                          {SairCAm ?
                          <>
                          <TouchableHighlight style={{width:70, height:100, backgroundColor:"#F96868", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>setSairCAm(!SairCAm)}>
                          <>
                        
                           <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Voltar</Text>
                            <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Normal</Text>
                            </> 
                       </TouchableHighlight>
                          </>
                          :
                          <>
                          <TouchableHighlight style={{width:70, height:100, backgroundColor:"#F96868", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodDeixa()}>
                          <>
                          <FontAwesome name="user"  size={40} color="#fff" />
                           <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Deixa de Ser</Text>
                            <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Funcionario</Text>
                            </> 
                       </TouchableHighlight>
                        <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbriLinkEnv()}>
                           <>
                           <FontAwesome name="link" size={40} color="#FFF" />
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Indicar</Text>
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Link</Text>
                            </>
                       </TouchableHighlight>
                          </>
                          }
                           
                    

              </>
              }
            
              
                  
                       {/* <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirCriar()}>
                           <>
                           <FontAwesome name="link" size={40} color="#FFF" />
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Indicar</Text>
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Link</Text>
                            </>
                       </TouchableHighlight> */}
                    </View>
                    <View  style={styles.AreaBtnCima}>
              
                    {/* <TouchableHighlight style={{width:70, height:100, backgroundColor:"#30B72D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrGraf()}>
                          <>
                          <FontAwesome name="signal" size={40} color="#fff" />
                            <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gráficos</Text>
                            
                            </> 
                       </TouchableHighlight> */}
                       {/* <TouchableHighlight style={{width:70, height:100, backgroundColor:"#840D8D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirCriar()}>
                           <>
                           <FontAwesome name="bar-chart-o" size={40} color="#FFF" />
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gráficos</Text>
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Níveis</Text>
                            </>
                       </TouchableHighlight> */}
                    </View>
                    {SairCAm &&
              <>
                    <View style={styles.QuadNota12} >

               {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15, color:"#fff"  }}>Você atingiu a quantidade máxima de erros</Text> 
                         <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCodDeixa()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Reenviar Codigo</Text>
                      </TouchableHighlight>
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                   <Text  style={{ marginLeft:10, fontSize:15, color:"#fff"  }}>Seu Código foi enviado para o Whatsapp</Text> 
                                   <View  style = {styles.InputAra12}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Cód." 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>saindoFun()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Deixar Agora</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }
                        </View>
              </>

                      }
             {Nive3 === false &&
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

             }     
         


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
          {Nive3 === false ?
          <>
          <TouchableHighlight  style={styles.Post}>
            <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
            <FontAwesome name="" size={30} color="black" />
            <Text  style={{  fontWeight:"bold",  fontSize:17, color:"#000"  }}> {ListOc.length} Cambistas.</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:12, color:"#000"  }}>Total R$ {QCash}</Text>
            </View>
          </TouchableHighlight>
          {ListOc.map((item, key)=>(
           <>
            <TouchableHighlight key={key} onPress={()=>AbrirCriarFilt(item)}  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
               <View  style={styles.CaixaNome}>
              
               
                <Text style={styles.Time}>Cadastro:</Text>
                <Text style={styles.Time}>{moment(item.dataCadas).format("DD/MM/YYYY")}</Text>
 
                </View> 
                <View  style={styles.CaixaNome}>
                  
                  <>
                  <Text style={styles.Time}>Nome: {item.Nome.substring(0, 10)}</Text>
                  <Text style={styles.Time}>Tel: {item.Telefone}</Text>

                  </>
                
                </View> 
    
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Rendeu</Text>
              <Text style={styles.Time}>R$ {item.Rendeu}</Text>

              </View> 



              </View >
       
             
           


            </TouchableHighlight>
           
              </>

              ))}

          </>
          :
          <>
           {Nive4 === false ?
          <>
            <TouchableHighlight  onPress={()=>IndoNive2()} style={styles.Post}>
            <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
            
            <Text  style={{  fontWeight:"bold",  fontSize:12, color:"#000"  }}>N2 {Nome2.substring(0, 10)}</Text>
            <FontAwesome name="arrow-circle-left" size={30} color="black" />
           
            <Text  style={{  fontWeight:"bold",  fontSize:17, color:"#000"  }}>N3 - {List3.length} IND.</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:12, color:"#000"  }}>Total {Qcash3} Cash</Text>
            </View>
          </TouchableHighlight>
          {List3.map((item, key)=>(
           <>
            <TouchableHighlight key={key} onPress={()=>IndoNive4(item.Indicados, item.Nome)}  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
               <View  style={styles.CaixaNome}>
              
               
                <Text style={styles.Time}>Cadastro:</Text>
                <Text style={styles.Time}>{moment(item.dataCadas).format("DD/MM/YYYY")}</Text>
 
                </View> 
                <View  style={styles.CaixaNome}>
                  
                  <>
                  <Text style={styles.Time}>Nome: {item.Nome.substring(0, 10)}</Text>
                  <Text style={styles.Time}>Tel: {item.Telefone}</Text>

                  </>
                
                </View> 
    
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Rendeu</Text>
              <Text style={styles.Time}>{item.Rendeu} Cash</Text>

              </View> 



              </View >
       
             
           


            </TouchableHighlight>
           
              </>

              ))}

          </>
          :
          <>
           <TouchableHighlight  onPress={()=>VoltNive3()} style={styles.Post}>
            <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
            <Text  style={{  fontWeight:"bold",  fontSize:12, color:"#000"  }}>N3 {Nome3.substring(0, 10)}</Text>
            <FontAwesome name="arrow-circle-left" size={30} color="black" />
          
            <Text  style={{  fontWeight:"bold",  fontSize:17, color:"#000"  }}>N4 - {List4.length} IND.</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:12, color:"#000"  }}>Total {Qcash4} Cash</Text>
            </View>
          </TouchableHighlight>
          {List4.map((item, key)=>(
           <>
            <TouchableHighlight key={key}  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
               <View  style={styles.CaixaNome}>
              
               
                <Text style={styles.Time}>Cadastro:</Text>
                <Text style={styles.Time}>{moment(item.dataCadas).format("DD/MM/YYYY")}</Text>
 
                </View> 
                <View  style={styles.CaixaNome}>
                  
                  <>
                  <Text style={styles.Time}>Nome: {item.Nome.substring(0, 10)}</Text>
                  <Text style={styles.Time}>Tel: {item.Telefone}</Text>

                  </>
                
                </View> 
    
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Rendeu</Text>
              <Text style={styles.Time}>{item.Rendeu} Cash</Text>

              </View> 



              </View >
       
             
           


            </TouchableHighlight>
           
              </>

              ))}
          
          </>
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
 InputAra12 :{
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
      width: 30,
      height:30,
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
   flex:1,

   justifyContent:"center",
   backgroundColor:"#fff",
   padding:30
    
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
  QuadNota12: {

    width:300,

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

 AreaBtnCima11 :{
  width:300,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
 
 },
 AreaBtnCima10 :{
  width:220,
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