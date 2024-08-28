
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text,FlatList, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView } from 'react-native'
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
import JsonBets from "../services/Bets";

export default ({route}) => {
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
  const [Varia, setVaria] = useState(0);
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
  const [NomeCam, setNomeCam] = useState("");
  const [TelCam, setTelCam] = useState("");
  const [Pago, setPago] = useState(false);
  const [id, setid] = useState(route.params.id);
  const [Concluir, setConcluir] = useState(false);
  const [open, setOpen] = useState(false);
  const [LisCot, setLisCot] = useState([])
  const [GrupCot, setGrupCot] = useState("")
  const [Dia, setDia] = useState("");
  const [Logo, setLogo] = useState("")
  const [NomeEmp, setNomeEmp] = useState("")
  const [BtnSimAp, setBtnSimAp] = useState([])
  const [JogosBet, setJogosBet] = useState([])
  const [JogoFeito, setJogoFeito] = useState(false)

  useEffect(() => {
    LevarTemp();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      tempo()
      console.log("Temp")
    }, 21600000);
   
  }, []);

  useEffect(() => {
    if(dataNasc !== null){
      ListandoOc();
    }
    
  }, [dataNasc, hr ]);

  useEffect(() => {
    PegaConcliur();     
   }, [])

  

  useEffect(() => {
    PegandoAposta();     
   }, [])

  useEffect(() => {
    tempo();
  }, [Dia])
  useEffect(() => {
    if(ListOc.length >= 1){
      PegandoLig()
    }
  

   }, [ListOc])
   useEffect(() => {
   
      
      PegandoGrupCot()
    

   }, [])

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
    if(LinkEnv !== "nulo"){
      vaiparala()
    }

   }, [LinkEnv])

   useEffect(() => {
    if( VaToCo !== 0 ){
    EnviarAposta()
    }
    //EnviarAposta()
   
   }, [JogosBet, VaToCo, ValPreDemos, ValorReal, SimAp, ValApos, Nome, TelCli, NomeCam, TelCam, Concluir, Pago, ValCambis, QCash])

  // useEffect( ()=>{ 
  //   if(Page !== 1){
  //     ListandoOc();  
  //   }            
  //  }, [Page]);
  const LevarTemp = async ()=>{
    const Id = id
    await Api.VariacaoTemp(Id);
    await Api.VarTempPegar(Id, setVaria);
   }

  
  const PegaConcliur= ()=>{
    Api.ConcluirApost(id, setConcluir, setPago, setJogoFeito)
   }

  const EnviarAposta = ()=>{
    Api.EnviadoAposCam(JogosBet, id, VaToCo, ValPreDemos, ValorReal, SimAp, ValApos, Nome, TelCli, NomeCam, TelCam, Concluir, Pago, ValCambis, QCash)
  }

  const onChangeRecp = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const PegandoGrupCot = ()=>{
    console.log("entrou awqui")
    var resli1 = [];
    for(let i in JsonBets.setor){
            
    

        resli1.push({
          label:JsonBets.setor[i].pt,
          value:JsonBets.setor[i].pt,
        })

      


   
 
      
      


    }

 
    
    setLisCot(resli1)
    console.log(resli1)
   }

  const PegandoAposta= ()=>{
    Api.JogoCriadoCamb( id, setJogoFeito, setJogosBet, setLogo, setNomeEmp, setVaToCo, setValPreDemos, setValorReal, setSimAp, setValApos,setNome, setTelCli, setNomeCam, setTelCam, setConcluir, setPago, setValCambis, setQCash, )
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
      label:ListOc[i].liga.country+" - "+ListOc[i].liga.name,
      value:ListOc[i].liga.name,
    })
      


    }

    resli = resli.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    
    setListLig(resli)
    setLista(resRev)
      }
   }

   const Pesquisa = async (Liga)=>{
    console.log(Liga)
    if(Liga !== null){
     var bet = ListOc.filter(word => word.liga.name === Liga);
     setLista(bet);
    }
    
   }

   const ListandoOc = ()=>{
    console.log("ent Lis")
  

    if(Dia === ""){
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
      let DatMud = moment(currentDate1+" 23:59:00.000").unix()*1000;
      let Dat2 = DatMud + (86400000*2);
      // if(Dat >= moment().unix()*1000 ){
        var Mart = moment().unix()*1000
         var Vet = Mart - 120000
        console.log(Dat)
        if(Dat > Vet){
          setCarreg(true)
          Api.ListJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
        } else {
          setModalCalend(true);
          setVerNotajogo(false);
          setAlert("Nessa Data Não Existe Mais Jogos!");
          setAlertTipo("danger")
        }
       
    } 

    if(Dia === "Hoje"){

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
  let Dat2 =moment(currentDate1+" 23:59:00.000").unix()*1000;
  // if(Dat >= moment().unix()*1000 ){
    var Mart = moment().unix()*1000
     var Vet = Mart - 120000
    console.log(Dat)
    if(Dat > Vet){
      setCarreg(true)
      Api.ListJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
    } else {
      setModalCalend(true);
      setVerNotajogo(false);
      setAlert("Nessa Data Não Existe Mais Jogos!");
      setAlertTipo("danger")
    }
   
    } 
    
    if(Dia === "Amanhã"){
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
 
  let CompDat = moment(currentDate1+" 00:00:00.000").unix();

  let Dat = CompDat * 1000;
  let Dat2 =moment(currentDate1+" 23:59:00.000").unix()*1000;
  // if(Dat >= moment().unix()*1000 ){
    var Mart = moment().unix()*1000

    console.log(Dat)
   
      setCarreg(true)
      Api.ListJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
    } 

    if(Dia === "Depois de Amanhã"){
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
    
      let CompDat = moment(currentDate1+" 00:00:00").unix();

      let Dat = CompDat * 1000;
      let Dat2 =moment(currentDate1+" 23:59:00.000").unix()*1000;
      // if(Dat >= moment().unix()*1000 ){
        var Mart = moment().unix()*1000

    console.log(Dat)
   
      setCarreg(true)
      Api.ListJogos( Page, setListOc, setCarreg,  Dat, Dat2, );
    } 
 
}

  const TirarEsse = (position) =>{
    setSimAp([...SimAp.filter((item, index) => index !== position)]);
    setBtnSimAp([...BtnSimAp.filter((item, index) => index !== position)])
    setJogosBet([...JogosBet.filter((item, index) => index !== position)])
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
    await ListandoOc();
    await setRefreshin(false);
  }
  const tempo = ()=>{
 
    if(Dia === ""){
      let Monme= (moment().unix()*1000)
      setdataNasc(moment(Monme).format("DD/MM/YYYY"))
      sethr(moment().format("HH:mm"))

    } else if(Dia === "Hoje"){
      let Monme= (moment().unix()*1000)
      setdataNasc(moment(Monme).format("DD/MM/YYYY"))
      sethr(moment().format("HH:mm"))

    } else if(Dia === "Amanhã"){
      let Monme= (moment().unix()*1000)+86400000
      setdataNasc(moment(Monme).format("DD/MM/YYYY"))
      sethr(moment().format("HH:mm"))

    } else if(Dia === "Depois de Amanhã"){
      let Monme= (moment().unix()*1000)+(86400000*2)
      setdataNasc(moment(Monme).format("DD/MM/YYYY"))
      sethr(moment().format("HH:mm"))

    }



    setDtEsc(moment().unix()*1000)
    setDataMin(moment().unix()*1000)
    setDataMax((moment().unix()*1000) + 604800000)
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
    if(item3.Olds){
 if(Concluir === false){
  function isCherries(fruit) {
    return fruit.IdCasa === item3.idCasaOlds;
}

function Vertr(frai) {
  return frai.IdJogo === item.id;
}
  var dei = new Date().getTime()/1000 + Varia
 if(dei < item.dataJogo){
  var ListSimu = {
    IdCasa:item3.idCasaOlds,  
    Casa: item3.Casa,
    Grupo:item3.Grupo,
    Olds:item3.Olds,
    CasaTime:item.Casa,
    ForaTime:item.Fora,
    dataJogo:item.dataJogo,
    liga:item.liga,
    IdJogo:item.id,
    LinkResu:item.LinkResu
  } 
  if(SimAp.find(isCherries)){
     
    setAlert("Cotação repetida não pode, você já escolheu essa Cotação!");
    setAlertTipo("danger");
    setModalCalend(true);
    setVerNotajogo(false);

  }else {

    if(SimAp.find(Vertr)){
   
      setAlert("Você já escolheu a uma contação desse jogo, e não pode escolher 2 cotações do mesmo jogo, caso queira escolher outra cotação do mesmo jogo apague a Cotação passada!");
      setAlertTipo("danger");
      setModalCalend(true);
      setVerNotajogo(false);

  }else {

    console.log(ListSimu)
    setSimAp([...SimAp, ListSimu ])
    setBtnSimAp([...BtnSimAp, ListSimu.IdCasa])
    setJogosBet([...JogosBet, ListSimu.IdJogo])
  }

  }
} else {
  setAlert("Esse Jogo não está mais disponivel !");
  setAlertTipo("danger");
  setModalCalend(true);
  setVerNotajogo(false);
}

 } else {
  setAlert("Essa Aposta já foi concluida !");
  setAlertTipo("danger");
  setModalCalend(true);
  setVerNotajogo(false);
}
} else {
  setAlert("Essa Cotação é Invalida, Escolha Outra!");
  setAlertTipo("danger");
  setModalCalend(true);
  setVerNotajogo(false);
}
  
  //  console.log(item3)
  //  console.log(item)
  }

  const Caulc = ()=>{
    var tre = 1;
    var IdVer = []
     for(let i in SimAp){
      tre = tre*SimAp[i].Olds;
      IdVer.push(SimAp[i].IdCasa)
     }
     setBtnSimAp(IdVer)
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
          setVerNotajogo(true);
        }

        const Siarnota = ()=>{
         
          setModalCalend(false);
          setVerNotajogo(false)
        }

        const AposCambis = ()=>{
          setCambis(!Cambis);
         }

         const PagandoPix = ()=>{
          var DateVw = parseInt((new Date().getTime() + 60000)/1000 + Varia);
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

           
  
                
  
               
              if(ValPremi <= NomeEmp.PremioMax){
                    if(ValorReal <= NomeEmp.ValMax){
                      if(ValorReal >= NomeEmp.ValMin){
                        if(SimAp.length >= NomeEmp.PalMin){
                          if(SimAp.length <= NomeEmp.PalMax){
                      
                      setConcluir(true)
                 
                    } else {
                      setModalCalend(true);
                    setVerNotajogo(false);
                      setAlert(`${NomeEmp.PalMax} palpites são o máximo para aprovar uma aposta`);
                      setAlertTipo("danger");
            
                    }
                   
                   
                   
                    } else {
                      setModalCalend(true);
                    setVerNotajogo(false);
                      setAlert(`${NomeEmp.PalMin} palpites são o minimo para aprovar uma aposta`);
                      setAlertTipo("danger");
            
                    }
          
                  } else {
                    setModalCalend(true);
                    setVerNotajogo(false);
                    setAlert(`R$ ${NomeEmp.ValMin} é o menor valor que você pode aposta!`);
                    setAlertTipo("danger");
          
          
                  } 
                } else {
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setAlert(`R$ ${NomeEmp.ValMax} é o Maior valor que você pode aposta!`);
                  setAlertTipo("danger");
        
        
                }

              } else {
                setModalCalend(true);
                setVerNotajogo(false);
                setAlert(`R$ ${NomeEmp.PremioMax} é o Valor Máximo que pode ser pago Pelo Prêmio!`);
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
              if(SimAp.length > 2){
  
                 if(Cambis === false){
                  setCarre(true);
                  Api.ApostandoCASH(JogosBet, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                } else {
  
                  if(NomeCli !== ""){
                  
                 
                      setCarre(true);
                      Api.ApostandoCASH(JogosBet, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)
                 
                  
  
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

          const AbrinoMoney = ()=>{
            setAbMoney(!AbMoney)
            setAbVenc(false)
          }

          const AbrindoVenc = ()=>{
            setAbVenc(!AbVenc)
            setAbMoney(false)
          }

          
          const placeholder = {
            label: 'Dia do Jogo',
            value: null,
            color: '#9EA0A4',
        };

            const placeholder2 = {
              label: 'Pais e Campeonato',
              value: null,
              color: '#9EA0A4',
          };
          const placeholder3 = {
            label: 'Grupo de Cotações',
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
                        {Concluir ?
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
                    
                     {/* <a className="btn btn-danger ExcluirJogo" onClick={()=>TirarEsse(index)}>
                            <i class="fas fa-trash"></i> 
                             </a>  */}
                     </View>             

                              ))}
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </Text>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</Text> 
           
                   
                    <View style={styles.InputHora}>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor:{ValApos}</Text> 
                   </View>
                 
                          <View style={styles.Valopre}>
                            <View style={styles.Titupre}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15  }}>Valor Do Prêmio: R$ {ValPreDemos}</Text>
                            </View>
              
                            <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:17, color:"green"  }}>Esperando o Pagamento Pelo Cambista, Você Receberá a Nota de Pagamento Pelo Whatsapp </Text>

                         
                          </View>
                        
                      
                       
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
                     <TouchableHighlight  style={styles.ExcluirJogo} onPress={()=>TirarEsse(index)}>
                     <FontAwesome name="trash" size={24} color="black" />
                      </TouchableHighlight>
                     {/* <a className="btn btn-danger ExcluirJogo" onClick={()=>TirarEsse(index)}>
                            <i class="fas fa-trash"></i> 
                             </a>  */}
                     </View>             

                              ))}
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Qtd. Jogo(s) {QuanJog} </Text>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}> Total Cota(s): {VaToCo}</Text> 

                   
                    <View style={styles.InputHora}>
                    <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Valor:</Text>  
                    <Money
                       
                       placeholder="Valor R$" 
                       value={ValApos}
                       onChangeText={t=>setValApos(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
        
                   />   
                   </View>
                 
                          <View style={styles.Valopre}>
                            <View style={styles.Titupre}>
                            <Text  style={{fontWeight:"bold", margin:10, fontSize:15  }}>Valor Do Prêmio: R$ {ValPreDemos}</Text>
                            </View>
                           
                          <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>PagandoPix()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Concluir a Aposta</Text>
                          </TouchableHighlight>

                         
                          </View>
                          
                        </>
                        }

                        </ScrollView>
                      </View>
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
              <Image source={{uri:Logo }}  style={styles.ImageVer2 } />
              </TouchableHighlight>
            
             

              <TouchableHighlight  style={styles.CaixaDados}>
             <Text style={styles.TextInfo} >
              {NomeEmp.NomeEmp}
             </Text>
              </TouchableHighlight>
              <View  style={styles.AreaBtnTopConf}>
              <Text style={{color:"#fff", fontSize:15}} >
              Cambista: {NomeCam.substring(0,15)}
             </Text>
             <Text style={{color:"#fff", fontSize:15}} >
              Tel: {TelCam}
             </Text>
             <Text style={{color:"#fff", fontSize:15}} >
              Cliente: {Nome.substring(0,15)}
             </Text>
             <Text style={{color:"#fff", fontSize:15}} >
              Tel: {TelCli}
             </Text>
              {/* <TouchableHighlight onPress={()=>AbrinoMoney() } style={styles.CaixaDados}>
              <>
              {userState.nome >0 &&
                <View style={{marginBottom:-15, marginRight:-20, width:20, height:20, backgroundColor:"green", borderRadius:10, flex:1, display:"flex", justifyContent:"center", alignItems:"center"}} ><Text style={{color:"#fff"}}>R</Text></View> 
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

              

              <TouchableHighlight onPress={()=>IrNoti()}  style={styles.CaixaDados}>
              <FontAwesome name="bell"  size={24} color="#fff" />
              </TouchableHighlight>

              <TouchableHighlight  onPress={()=>IrConfig()}  style={styles.CaixaDados}>
              <FontAwesome name="gear" size={24} color="#fff" />
              </TouchableHighlight> */}


           </View>
            </View >
            {AbMoney === true &&
             <View style={styles.TextInforma}>
             <Text style={{margin:10, fontSize:17, color:"green", fontWeight:"bold"}} >RECEBER: R${userState.nome.toFixed(2)}</Text>
             </View>


            }
             {JogoFeito === true?
              <>
               <TouchableHighlight  style={{width:370, marginBottom:5, height:120, backgroundColor:"#0094B9", borderRadius:10, padding:5, display:"flex", flexDirection:"row" }}>
             <>
             <FontAwesome name="hand-o-right" size={80} color="#fff" />
            <Text style={{margin:10, fontSize:20, color:"#fff"}} >Seu Jogo Foi Criado Pelo Cambsita, obrigado por escolher nossa empresa! </Text>
            </>
            </TouchableHighlight>
              </>
              :
              <></>
              }

            {AbVenc === true &&
            <View style={styles.TextInforma}>

          <Text style={{margin:10, fontSize:17, color:"#000", fontWeight:"bold"}} >VENCIMENTO: {userState.data_nasc}</Text>
            </View>

            }
           
           <View  style={styles.AreaBtn}>
          <RNPickerSelect
           placeholder={placeholder}
            onValueChange={(value) =>setDia(value)}
            items={[
                { label: 'Hoje', value: 'Hoje' },
                { label: 'Amanhã', value: 'Amanhã' },
                { label: 'Depois de Amanhã', value: 'Depois de Amanhã' },
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
          <RNPickerSelect
           placeholder={placeholder2}
            onValueChange={(value) => Pesquisa(value)}
            items={ListLig}
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
          <RNPickerSelect
           placeholder={placeholder3}
            onValueChange={(value) =>setGrupCot(value)}
            items={LisCot}
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


       
          
        <ScrollView style={{width:400}}>
          
          { Lista[0] && Lista !== "nada"?
          <>
        {Lista.map((item, key)=>(
           <>
            <View  style={styles.Post}>
            <View style={styles.Header}>
              <View style={styles.TimesDiv}>
               <View  style={styles.CaixaNomeRight}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                {/* <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View> */}
                <Text style={{fontSize:20, fontWeight:"bold", marginRight:10}}>X</Text>
                {/* <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View> */}
                <View  style={styles.CaixaNomeLeft}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                </View>
                <View  style={styles.TempDat}>
                {/* <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" /> */}
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View >
              {GrupCot === null?
              <>
               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"#fff", flexWrap:"wrap"}}>
               <Text style={{  margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Vencedor da partida</Text>
              <View style={styles.Botoes}>
              {item.Best.map((item3, key)=>( 
                
                  < >
                  
              {item3.Grupo === "Vencedor da partida" &&
               <TouchableHighlight onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>{item3.Casa}</Text>
                </View>
                {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
             
                </>
               </TouchableHighlight>
                }
                </>

                ))}



               <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>
             
              </View>
              </View>
              
              </>
              :
              <>
               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"#fff", flexWrap:"wrap"}}>
               <Text style={{  margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>{GrupCot}</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>
              {item.Best.map((item3, key)=>( 
                
                  < >
                  
              {item3.Grupo === GrupCot &&
               <TouchableHighlight onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                 <Text style={styles.TextTitu}>{item3.Casa}</Text>
                </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
                </>
               </TouchableHighlight>
                }
                </>

                ))}



               <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>
             
              </View>
              </ScrollView>
              </View>
              </>

              }
             
              {AdrirMais === item.id &&
               <>
               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}
               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"#fff", flexWrap:"wrap"}}>
               <Text style={{  margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Vencedor do segundo tempo</Text>
               
               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                <>
                
            {item3.Grupo === "Vencedor do segundo tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
               

               </View>
              
               </View>
              {/* Sessão Olds  Inicio*/}
              {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}
              <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Golos Acima/Abaixo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Golos Acima/Abaixo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

              {/* Sessão Olds  Inicio*/}
              {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}
              <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Gols Acima/Abaixo do Primeiro Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Gols Acima/Abaixo do Primeiro Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}


                {/* Sessão Olds  Inicio*/}
                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}
                

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Gols Acima/Abaixo - Segundo Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Gols Acima/Abaixo - Segundo Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}
              
                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado no Intervalo | Resultado Final</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado no Intervalo | Resultado Final" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}
               

                 {/* Sessão Olds  Inicio*/}

                 {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                 <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Time da Casa - Nenhum Gol Solfrido</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Time da Casa - Nenhum Gol Solfrido" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Time de Fora - Nenhum Gol Solfrido</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Time de Fora - Nenhum Gol Solfrido" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ambas as equipes marcam</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ambas as equipes marcam" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Placar Exato</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Placar Exato" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado Exato - Primeiro Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado Exato - Primeiro Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Chance dupla</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Chance dupla" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Vencedor do primeiro tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Vencedor do primeiro tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Equipe a marcar primeiro</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Equipe a marcar primeiro" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}
                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Equipe a marcar por último</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Equipe a marcar por último" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ganha o 1° e 2° Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ganha o 1° e 2° Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}
{/* 
                <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Total de Gols Time da Casa</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Total de Gols Time da Casa" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Total de Gols Time de Fora</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Total de Gols Time de Fora" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Chance dupla - No Primeiro Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Chance dupla - No Primeiro Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ambas as equipes marcam - No Primeiro Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ambas as equipes marcam - No Primeiro Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ambas as equipes marcam - No Segunda Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ambas as equipes marcam - No Segunda Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}
{/* 
                <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ganha Sem Levar Gol</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ganha Sem Levar Gol" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Soma do Resultado Final do Jogo Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Soma do Resultado Final do Jogo Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Soma de Gols No Primeiro Tempo Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Soma do Jogo No Primeiro Tempo Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

                {/* Sessão Olds  Inicio*/}

                {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado Final do Time da Casa Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado Final do Time da Casa Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}
               
                 {/* Sessão Olds  Inicio*/}

                 {/* <View style={styles.Header}>
                 <View style={styles.TimesDiv}>
               <View  style={styles.CaixaNomeRight}>
               
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
               
                <Text style={{fontSize:20, fontWeight:"bold", marginRight:10}}>X</Text>
              
                <View  style={styles.CaixaNomeLeft}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                </View>
                <View  style={styles.TempDat}>
             
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                 <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado Final do Time de Fora Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado Final do Time de Fora Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Número exato de Gols do jogo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Número exato de Gols do jogo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Ganha o 1° ou 2° Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Ganha o 1° ou 2° Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Número exato de Gols/ Time da Casa</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Número exato de Gols/ Time da Casa" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Número exato de Gols/Time de Fora</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Número exato de Gols/Time de Fora" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Número exato de gols do segundo tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Número exato de gols do segundo tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Time da casa marca um gol</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Time da casa marca um gol" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Time de Fora marca um gol</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Time de Fora marca um gol" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Quantidade De Escanteio</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Quantidade De Escanteio" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Número exato de gols - primeiro tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Número exato de gols - primeiro tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado do Segundo Tempo Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado do Segundo Tempo Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

               <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Time que Marca no 1° e 2° Tempo</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Time que Marca no 1° e 2° Tempo" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}

               {/* Sessão Olds  Inicio*/}

               {/* <View style={styles.Header}>
               <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Casa.name}</Text>
                </View> 
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Casa.logo}}  style={styles.ImageTime } />
                </View>
                <Text style={styles.Time}>X</Text>
                <View  style={styles.FotoTime}>
                <Image source={{uri:item.Fora.logo}}  style={styles.ImageTime } />
                </View>
                <View  style={styles.CaixaNome}>
                <Text style={styles.Time}>{item.Fora.name}</Text>
                </View>
                <View  style={styles.TempDat}>
                <Image source={{uri:item.liga.logo}}  style={styles.ImageCamp } resizeMode="contain" />
                <Text style={styles.TexMais}>{item.liga.country}</Text>
                <Text style={styles.TexMais}>{item.liga.name}</Text>
                <Text style={styles.Data}>{item.dataForm}</Text>
                </View>

              </View > */}

                 <View style={{width:"100%", display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"column",  backgroundColor:"fff", }}>
               <Text style={{margin:10, fontSize:17, fontWeight:"bold", fontStyle:"italic"}}>Resultado Final do Time de Fora Impar/par</Text>
               <ScrollView horizontal={true}>
               <View style={{width:"100%",  display:"flex", flex:1, justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:15,  backgroundColor:"rgba(0,0,0,0.3)", flexWrap:"wrap"}}>

               {item.Best.map((item3, key)=>( 
                
                < >
                
            {item3.Grupo === "Resultado Final do Time de Fora Impar/par" &&
             <TouchableHighlight key={key} onPress={()=>ColocarNota(item3, item)} style={styles.Btn}>
              <>
              <View style={styles.TituBtn}>
               <Text style={styles.TextTitu}>{item3.Casa}</Text>
              </View>

              {BtnSimAp.find( BA => BA === item3.idCasaOlds ) ?
               
               <View style={styles.BodyBtn25}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              :
              <>
              <View style={styles.BodyBtn}>
                 <Text style={styles.TextBody}>{item3.Olds}</Text>
                </View>
              </>
              }
              </>
             </TouchableHighlight>
              }
              </>

              ))}
                <TouchableHighlight onPress={()=>AbrindoMais(item.id)} style={styles.Btn}>
                <>
                <View style={styles.TituBtn}>
                  {AdrirMais === item.id?
                  <Text style={styles.TextTitu}>-</Text>
                  :
                  <Text style={styles.TextTitu}>+</Text>
                  }
                
                </View>

                <View style={{width:80, height:40, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:AdrirMais === item.id ? "#00A859":"#FFE767"}}>
                 
                 {AdrirMais === item.id?
                  <Text style={styles.TextBody}>-{item.Best.length}</Text>
                  :
                  <Text style={styles.TextBody}>+{item.Best.length}</Text>
                  }
                </View>
                </>
               </TouchableHighlight>

               </View>
               </ScrollView>
              </View>
              {/* Sessão Olds  Fim*/}
               
               </>

               }



            </View>
           
              </>

              ))}

              </>
              :
              <>
               {Lista === "nada"?
                <Text style={{fontSize:20, marginLeft:150, color:"red"}}>Não Existe Mais Jogos </Text>
              :
              <View style={{marginLeft:150, marginTop:100}}>
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
      {JogoFeito === false &&
              <>
         <TouchableHighlight style={styles.VerBole}  onPress={()=>Vernota()}>
         <>
         {SimAp.length > 0 &&
         <View style={styles.AvisoJgo}>
         <Text style={{color:"#fff", fontSize:15}}>{SimAp.length}</Text>
         </View>

         }
         
         <FontAwesome name="th-list" size={24} color="#fff" />
         <Text style={{color:"#fff", fontSize:10}}>Nota</Text>
         </>
          </TouchableHighlight>   
          </>
}
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
    margin:10,
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
    paddingTop:10,
    paddingBottom:10,
    marginBottom:5,
    width:300,
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
    height:20,
  },
  AreaBtnTopConf :{
    width:200,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    
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
      BodyBtn25: {
        width:80,
        height:40,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#B55FD3",
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
     fontSize:12,
     fontWeight:"bold"
  
       },
 
       TempDat: {
        width:"30%",
        height:40,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
       
        backgroundColor:"#FFF"
      
           },
    
           TimesDiv: {
            width:"70%",
            height:60,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"flex-start",
           
            backgroundColor:"#FFF",
            borderRightWidth:1,
          
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

     CaixaNomeRight: {
      width:100,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      paddingRight:5,
     
      },
 
      CaixaNomeLeft: {
       width:100,
       height:60,
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       flexDirection:"column",
       paddingLeft:5,
    
       },

       Post: {
        backgroundColor:"#FFF",
        width:"100%",
        marginBottom:20,
        borderColor:"#00A859",
        borderWidth:7,
        borderRadius:10,
         },

    Header: {
      padding:5,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-start",
      backgroundColor:"#FFF",
      height:70,
      width:370
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
           height:100,
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