
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
  const [open, setOpen] = useState(false);
  const [DatIn, setDatIn] = useState(0);
  const [CalIn, setCalIn] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [Dia, setDia] = useState("Todos")
  const [QVal, setQVal] = useState(0)
  const [SalDev, setSalDev] = useState(userState.nome)
  const [Ativo, setAtivo] = useState(true);
  const [DadoTitu, setDadoTitu] = useState(userState.QN4)
  const [DadoFili, setDadoFili] = useState(userState.QN3)
  const [DadosBet, setDadosBet] = useState(userState.versaoBanco)
  const [QDias, setQDias] = useState("")
  const [DatFut, setDatFut] = useState(0)
  const [DatFutDemo, setDatFutDemo] = useState("");
  const [ValorDat, setValorDat] = useState(0)
  const [ListInf, setListInf] = useState({});
  const [DatAn, setDatAn] = useState(0)

  

 

 
  useEffect(() => {
    if(dataNasc !== null){
      ListandoOc();
    }
    
  }, [dataNasc, DatIn, Dia]);

  useEffect(() => {
    setDadoTitu(userState.QN4)
     setDadoFili(userState.QN3)
     setDadosBet(userState.versaoBanco)
     setSalDev(userState.nome)
     console.log("mudoou")
  }, [userState.QN4, userState.QN3, userState.versaoBanco])

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

   useEffect(() => {
    calcDias()
 
   }, [QDias])

   

   useEffect(() => {
    if(ListInf !== {}){
      CalDat();
    }
 
   }, [ListInf])

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

  useEffect( ()=>{

    CalcAtivo()
             
   }, [DadoFili, DadoTitu, DadosBet]);

  const TelWhats = ()=>{
   
   Api.AnaliseTelTransf(TelCli, setMsgErro2, setNome, setLoad, setBtn, setIdTrans) 
  
}

const CalDat = ()=>{
  var respDat = 0
  if(ListInf.Status  === "Pagou Ativação da Conta"){
   respDat =  ListInf.IdInf[0].DatFut - (ListInf.IdInf[0].QDias*86400000);

  }
  setDatAn(respDat)
}

const calcDias = ()=>{
 
  if(DadoTitu.DataVenc <= DataMin){

  const VerDi = 86400000 * parseInt(QDias)  ;
  const DiCalen =  moment().unix()*1000 + VerDi;
  const VeFu = moment(DiCalen).format("DD/MM/YYYY")
  setDatFut(DiCalen)
  setDatFutDemo(VeFu)
  setValorDat(parseInt(QDias)*DadosBet.DiariaValor)

  } else {

  const VerDi = 86400000 * parseInt(QDias)  ;
  const DiCalen =  DadoTitu.DataVenc + VerDi;
  const VeFu = moment(DiCalen).format("DD/MM/YYYY")
  setDatFut(DiCalen)
  setDatFutDemo(VeFu)
  setValorDat(parseInt(QDias)*DadosBet.DiariaValor)
     
  }
 
  
 

}

const CalcAtivo = ()=>{

  if(DadoTitu.Funcionario === true){

    if(DadoFili.DataVenc <= DataMin){
      setAtivo(false)
    }

    if(DadoFili.Dinheiro >= DadosBet.ValMinSalDev){
      setAtivo(false)
    }


  } else {

    if(DadoTitu.DataVenc <= DataMin){
      setAtivo(false)
    }

    if(DadoTitu.Dinheiro >= DadosBet.ValMinSalDev){
      setAtivo(false)
    }

  }
  
}

  const ConcluidoAposta = ()=>{
    Api.TiraConcluidoApos(IdApos, Concluir)
  
  }
  const AnalisandoOlds = ()=>{
    setCarre(true)
    Api.AnaliseOlds(SimAp, IdApos, setAnliAp, setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)
  }

  const Pegandodados = ()=>{
    setCarre(true)
    Api.PegarDados( QCash , setListOc, setQCash, setCarre)
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
    var Tot = 0
    setLista([])
    setVerLigPais("");
    setVerLiga("");
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
 
    for(let i in ListOc){

     if(ListOc[i].Data >= Dat && ListOc[i].Data <= Dat2 && Dia === "Todos" ){
      let currentDate = '';
      let now =new Date(ListOc[i].Data);
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let Dia = now.getDate();
      let Mes = (now.getMonth()+1);
      let Ano = now.getFullYear();
      let seg = now.getSeconds(); 
      hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      seg = seg < 10 ? '0'+seg : seg;
      Dia = Dia < 10 ? '0'+Dia : Dia;
      Mes = Mes < 10 ? '0'+Mes : Mes;
      currentDate = Dia+'/'+Mes+'/'+Ano;
      currentDate += ' ';
      currentDate += hours+':'+minutes+":"+seg;

      resLis.push({
        DataReal:currentDate,
        Data:ListOc[i].Data,
        IdInf:ListOc[i].IdInf,
        Moeda:ListOc[i].Moeda,
        Nivel:ListOc[i].Nivel,
        Status:ListOc[i].Status,
        Valor:ListOc[i].Valor,
      }) 
      if(ListOc[i].Nivel ==="1"){
        Tot = Tot -ListOc[i].Valor;

      } else {
        Tot = Tot  +ListOc[i].Valor;
      }
      

     } else if(ListOc[i].Data >= Dat && ListOc[i].Data <= Dat2 && Dia === ListOc[i].Status ){
      
      let currentDate = '';
      let now =new Date(ListOc[i].Data);
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let Dia = now.getDate();
      let Mes = (now.getMonth()+1);
      let Ano = now.getFullYear();
      let seg = now.getSeconds(); 
      hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      seg = seg < 10 ? '0'+seg : seg;
      Dia = Dia < 10 ? '0'+Dia : Dia;
      Mes = Mes < 10 ? '0'+Mes : Mes;
      currentDate = Dia+'/'+Mes+'/'+Ano;
      currentDate += ' ';
      currentDate += hours+':'+minutes+":"+seg;

      resLis.push({
        DataReal:currentDate,
        Data:ListOc[i].Data,
        IdInf:ListOc[i].IdInf,
        Moeda:ListOc[i].Moeda,
        Nivel:ListOc[i].Nivel,
        Status:ListOc[i].Status,
        Valor:ListOc[i].Valor,
      }) 

      if(ListOc[i].Nivel ==="1"){
        Tot = Tot-ListOc[i].Valor;

      } else {
        Tot = Tot +ListOc[i].Valor;
      }

     
    }

     



     resLis.sort((a,b)=>{
      if(a.Data > b.Data) {
        return 1;
      } else {
        return -1;
      }
    });

    setQVal(Tot)

     setLista(resLis)

    }
  //   if(Dat < Dat2){
  //   setCarreg(true)
  //   Api.MeusJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
  // } 
    
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
          setRobo(true);
          setSenha("");
          setCodG(false);
          setTentativa(0);
          setCodLast(0);
          setPgCash(false)
          setQDias("")
          setDatFut(0)
          setDatFutDemo("");
          setValorDat(0)
          setListInf({})
          setDatAn(0)
        }

        const AposCambis = ()=>{
          setCambis(!Cambis);
         }

         const PagandoPix = ()=>{
         
           
  
                  if(QDias !== ""){
                  
                 
                      setLoad(true);
                      Api.PgDatven(QDias, DatFut, ValorDat, setDatFutDemo, setDatFut, setValorDat, setQDias, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash   )
                 
                  
  
                  } else {
                    setModalCalend(true);
                    setVerNotajogo(false);
                    setAlert("Preencha a Quantidade de Dias");
                    setAlertTipo("danger");
  
                  }
  
                 
             
         
         
         
         }

         const PagandoSaldoDe = ()=>{
         

         
              setLoad(true);
              Api.PgSaldoDev(SalDev, QDias, DatFut, ValorDat, setDatFutDemo, setDatFut, setValorDat, setQDias, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash, setCriarCli, setSalDev   )
         
 
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

         const ComprandoCash = (item)=>{
          setListInf(item)
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

          const AbrindoClend2 = ()=>{
            setModalCalend(true);
            setOpen2(true);
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

         const placeholder = {
          label: 'Todos',
          value: null,
          color: '#9EA0A4',
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
                    
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Pagar Taxa de Serviços</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>A Taxa de Serviços está no Valor de {DadosBet.ComissaoAp}% do valor das apostas  </Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>Valor Maximo que poderá atingir, para não Bloquear a sua Conta são R${DadosBet.ValMinSalDev}</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>O pagamento só poderá ser o Valor total da Divida. </Text> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:25, color:"green"   }}>Valor a Pagar:</Text>
                      <Text  style={{ marginLeft:10, fontSize:22, color:"green"  }}>R$ {SalDev.toFixed(2)} </Text>
                      <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoSaldoDe()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Agora</Text>
                      </TouchableHighlight>
                    
                     
                    {/* {CodG === false?
                        <>
                          <KeyboardAvoidingView style = {styles.InputAra}>
                   <FontAwesome name="ticket" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder="Quantidade Cash" 
                       value={NomeCli}
                       onChangeText={t=>setNomeCli(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </KeyboardAvoidingView>
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
                                   <KeyboardAvoidingView  style = {styles.InputAra}>
                   <FontAwesome name="expeditedssl" size={40} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Código" 
                              value={Senha}
                              onChangeText={t=>setSenha(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </KeyboardAvoidingView>
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>SacarCash()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sacar </Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }
                        </>
                        } */}
                      
                         
                           
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
                editIcon={false}   
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
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Atualizar Data De Vencimento</Text> <TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View> 
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras :</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}> - A cada {DadosBet.DiariaValor} reais pago, aumenta mais 1 dia na data de Vencimento.</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}> -Se sua Conta está vencida A Contagem dos dias pagos vai ser encima do dia atual (Hoje) e não na data de vencimento que já está registrado no sistema. Mais se sua Conta Não está vencida, A Contagem dos dias pagos vai ser encima da data de vencimento que já está registrado no sistema. </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Data de Vencimento Registrada No Sistema:</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{userState.data_nasc} </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Data Atual(HOJE):</Text>
                      <Text  style={{ marginLeft:10, fontSize:15  }}>{moment().format("DD/MM/YYYY")} </Text>
  
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:17 , marginTop:20, color:"green" }}>Digite A Quantidade de Dias:</Text>
                      <View  style = {styles.InputAra}>
                   <FontAwesome name="calendar" size={24} color="black" />
                   
                   
                    <SignInput
                       placeholder= "Digite Aqui." 
                       value={QDias}
                       onChangeText={t=>setQDias(t)}
                       autoCapitalize="none"
                       keyboardType={"numeric"}
                       posi={18}
                   />
                  
                   </View>
  
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Sua Data de Vencimento Futuro:</Text>
                      <Text  style={{ marginLeft:10, fontSize:25  }}>{DatFutDemo} </Text>
                      <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:25 , color:"green"  }}>Valor A Pagar:</Text>
                      <Text  style={{ marginLeft:10, fontSize:22, color:"green"   }}>R$ {ValorDat.toFixed(2)} </Text>
                      <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Pagar Agora</Text>
                      </TouchableHighlight>
 
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
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código de Transferência</Text>
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
                    <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>{ListInf.Status}</Text><TouchableHighlight style={styles.fechaModal} onPress={() =>Siarnota()}><Text>X</Text></TouchableHighlight>
                      </View> 
                      <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>{ListInf.DataReal}</Text>
                      <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>R$ {ListInf.Valor.toFixed(2)}</Text>

                      {ListInf.Status  === "Pagou Ativação da Conta"?
                      <>
                  <View  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:70, width:250, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
               <View  style={styles.CaixaNome}>
              
                <>
                
                <Text style={styles.Time}>Data Inicial: {moment(DatAn).format("DD/MM/YYYY")}</Text>
                <Text style={styles.Time}>Data Final: {moment(ListInf.IdInf[0].DatFut).format("DD/MM/YYYY")}</Text>
                </>
 
               
                </View> 
              
               


              </View >
       
             
           


            </View>
                      </>
                      :
                      <>
                        {ListInf.IdInf.map((item, index)=>(
           <>
            <View  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:70, width:250, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
               <View  style={styles.CaixaNome}>
              
                <>
                <Text style={styles.Time}>Cambista: {item.Nome.substring(0, 10)}</Text>
                <Text style={styles.Time}>Valor Ap.: {item.valorAposSimb
              }</Text>
                </>
              
                
                <Text style={styles.Time}>{moment(item.DataApost).format("DD/MM/YYYY HH:mm:ss")}</Text>
                </View> 
                <View  style={styles.CaixaNome}>
              
                
                </View> 
                
               


              </View >
       
             
           


            </View>
           
              </>

              ))}
                      </>

                      }
                    
                     
                          
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
              Financeiro
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
            {DadoTitu.Funcionario === true ?
            <>

              {DadoFili.DataVenc <= DataMin?
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

              {DadoFili.Dinheiro >= DadosBet.ValMinSalDev?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber se seu saldo devedor passou do limite permitido de R$ {DadosBet.ValMinSalDev}</Text>
            </>
            </TouchableHighlight>
              </>
              :
              <></>
              }

            </>
             :
            <>
              {DadoTitu.DataVenc <= DataMin?
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

              {DadoTitu.Dinheiro >= DadosBet.ValMinSalDev?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"red", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="ban" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:15, color:"#fff"}} >Sua conta está desativada, devido um débito da empresa. Vá ao financeiro da empresa, para saber  se seu saldo devedor passou do limite permitido de R$ {DadosBet.ValMinSalDev}</Text>
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
           {DadoTitu.Funcionario === false &&
            <>
              <View  style={styles.AreaBtnCima}>
              
                    <TouchableHighlight style={{width:70, height:100, backgroundColor:DadoTitu.DataVenc >= DataMin ? "#DDBE0D":"red" , borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoCash()}>
                          <>
                          <View style={{ backgroundColor:"#fff", margin:10, borderRadius: 5, padding:5 , borderColor:"#000", borderWidth:1 }} > 
                          <Text  style={{  fontWeight:"bold",  fontSize:15, color:DadoTitu.DataVenc >= DataMin ? "green":"red",}}>Data Ven. {userState.data_nasc}</Text>
                          </View>
                            <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>PAGAR</Text>

                            </> 
                       </TouchableHighlight>
                       <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirCriar()}>
                           <>
                           <View style={{ backgroundColor:"#fff", margin:10, borderRadius: 5, padding:5 , borderColor:"#000", borderWidth:1 }} > 
                          <Text  style={{  fontWeight:"bold",  fontSize:15, color:"green",}}>Saldo Dev. R$ {SalDev.toFixed(2)}</Text>
                          </View>
                            <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>PAGAR</Text>
                            </>
                       </TouchableHighlight>
                    </View>
                    </>
            }
                    <View  style={styles.AreaBtnCima}>
              
              {/* <TouchableHighlight style={{width:70, height:100, backgroundColor:"#30B72D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>IrGraf()}>
                    <>
                    <FontAwesome name="signal" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gráficos</Text>
                      
                      </> 
                 </TouchableHighlight> */}
                 {/* <TouchableHighlight style={{width:70, height:100, backgroundColor:"#840D8D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>ComprandoCash()}>
                     <>
                     <FontAwesome name="dollar"  size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Comprar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Cash</Text>
                      </>
                 </TouchableHighlight> */}
              </View>
                    
                   
                    <View  style={styles.AreaBtn}>
          <RNPickerSelect
           placeholder={placeholder}
            onValueChange={(value) =>setDia(value)}
            items={[
                { label: 'Recebeu Comissões', value: 'Recebeu Comissões' },
                { label: 'Recebeu Aposta', value: 'Recebeu Aposta' },
                { label: 'Pagou Prêmio', value: 'Pagou Prêmio' },
                { label: 'Pagou Aposta', value: 'Pagou Aposta' },
                { label: 'Pagou Comissões', value: 'Pagou Comissões' },
                { label: 'Pagou Taxa Serviços', value: 'Pagou Taxa Serviços' },
                { label: 'Pagou Ativação da Conta', value: 'Pagou Ativação da Conta' },
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


          {/* <View  style={styles.AreaBtnLiga}>
        
  
            <TouchableHighlight onPress={()=>AbrirCriar()} style={{backgroundColor:"#00A859", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:50, borderRadius:5, marginRight:10, paddingLeft:5, paddingRight:5,}} >
            <>
          <Text  style={{fontSize:25, color:"#fff", margin:10}}>Criar Jogo Para Cliente</Text>
          </>     
                
          </TouchableHighlight>
              
          
       
        </View> */}
       <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: "#fff",}}>
            <FontAwesome name="" size={30} color="black" />
            <Text  style={{  fontWeight:"bold",  fontSize:17, color:"#000"  }}>Extrato da Conta</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:15, color:"#000"  }}>Total R$ {QVal.toFixed(2)} </Text>
            </View>

        <ScrollView>
          {Carre === false ?
          <>
       
          {Lista.map((item, key)=>(
           <>
            <TouchableHighlight onPress={()=>ComprandoCash(item)} key={key}  style={styles.Post}>
              <View style={{ padding:5, flexDirection:"row",  alignItems:"center", justifyContent:"space-around", height:40, width:400, borderBottomWidth:2, borderColor:"#ccc", backgroundColor: item.Nivel === "1"? "#E36A6A": "#5594DB",}}>
               <View  style={styles.CaixaNome}>
              
               
                <Text style={styles.Time}>Data:</Text>
                <Text style={styles.Time}>{item.DataReal}</Text>
 
                </View> 
                <View  style={styles.CaixaNome}>
                  
                  <>
                  {/* {item.Status === "Transferiu" || item.Status === "Recebeu"?
                  <Text style={styles.Time}>Tel: {item.IdInf}</Text>
                  :
                  <>
                  <Text style={styles.Time}>Nivel {item.Nivel}</Text>
                  </>
                  } */}
                  
                  <Text style={styles.Time}>{item.Status} </Text>
              
                  
                  </>
                
                </View> 
    
                <View  style={styles.CaixaNome}>
              
               
              <Text style={styles.Time}>Valor</Text>
              <Text style={styles.Time}>R$ {item.Valor.toFixed(2)}</Text>

              </View> 



              </View >
       
             
           


            </TouchableHighlight>
           
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