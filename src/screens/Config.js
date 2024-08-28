
import React, { Component, useState,  useContext, useEffect, useRef } from 'react'
import {Modal, Text, Linking, View, StyleSheet, ImageBackground, Image, Button, TouchableHighlight, KeyboardAvoidingView, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome} from "@expo/vector-icons";
import SignInput from '../components/SignInputIni';
import SignInputCod from '../components/SignInput';
import Telefone from '../components/NumberTel';
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import Api from '../Api';
import { Video, AVPlaybackStatus } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);

  const captcha = useRef(null)
  const [ModalVer, setModalVer] = useState(false);
  const [P1, setP1] = useState(false);
  const [P2, setP2] = useState(false);
  const [P3, setP3] = useState(false);
  const [P4, setP4] = useState(false);
  const [P5, setP5] = useState(false);
  const [P6, setP6] = useState(false);
  const [P7, setP7] = useState(false);
  const [LinkEnv, setLinkEnv] = useState("nulo");
  const [Nome, setNome] = useState(userState.nomeCompleto);
  const [Tel, setTel] = useState(userState.telefone);
  const [Robo, setRobo] = useState(true);
  const [Tentativa, setTentativa] = useState(0);
  const [CodLast, setCodLast] = useState(0);
  const [CodG, setCodG] = useState(false);
  const [Senha, setSenha] = useState("");
  const [Alert, setAlert] = useState("");
  const [AlertTipo, setAlertTipo] = useState(null);
  const [Carre, setCarre] = useState(false);
  const [MsgErro, setMsgErro] = useState("");
  const [MsgErro1, setMsgErro1] = useState("");
  const [Btn1, setBtn1] = useState(false);
  const [What2, setWhat2] = useState(false);
  const [Listu, setListu] = useState([
    {id:0, Titulo:"Como Entrar e Cadastrar na Bet Franquias.", Link:"https://www.youtube.com/watch?v=qFG1t50bR0E&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=1"},
    {id:0, Titulo:"Como Transforma o Sistema Bet Franquias Num Aplicativo Android", Link:"https://www.youtube.com/watch?v=PwjzYcqspsg&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=2"},
    {id:1, Titulo:"Como Transforma o Sistema Bet Franquias num App para IPHONE", Link:"https://www.youtube.com/watch?v=Q1u-iZ1Or5U&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=3"},
    {id:2, Titulo:"Como Funciona A Estrutura do Sistema Bet Franquias", Link:"https://www.youtube.com/watch?v=b3ya1a7hkQI&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=4"},
    {id:3, Titulo:"Como Configurar Sua Empresa No Sistema", Link:"https://www.youtube.com/watch?v=Hi9WgQ8DB-8&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=5"},
    {id:4, Titulo:"Como Criar Um Cambista", Link:"https://www.youtube.com/watch?v=z_boyLjNxKQ&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=6"},
    {id:5, Titulo:"Como Criar Uma Aposta", Link:"https://www.youtube.com/watch?v=iTLAqJ3E5pc&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=7"},
    {id:6, Titulo:"Como Criar Uma Aposta Por Meio de Ticket", Link:"https://www.youtube.com/watch?v=KE_hg_jvIcQ&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=8"},
    {id:7, Titulo:"Modelos de Boletos que o Cliente Irá Receber no WhatsApp", Link:"https://www.youtube.com/watch?v=CsoT4lXdYgM&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=9"},
    {id:8, Titulo:"Como Imprimir o Boleto Para o Cliente", Link:"https://www.youtube.com/watch?v=scvUWmc2pMo&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=10"},
    {id:9, Titulo:"Como Analisar os Jogos Feitos por Você e pelos Cambistas", Link:"https://www.youtube.com/watch?v=sZqpQ-cMui4&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=11"},
    {id:10, Titulo:"Com Será Pago As Apostas Com o Mercado Pago", Link:"https://www.youtube.com/watch?v=UieZu5pcFpM&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=12"},
    {id:11, Titulo:"Como Aprovar os Pagamentos das Apostas e Comissões dos Cambistas", Link:"https://www.youtube.com/watch?v=JI1lotC-_LE&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=13"},
    {id:12, Titulo:"Como Analisar As Apostas, Aprovando e Reprovando.", Link:"https://www.youtube.com/watch?v=MuU9VSf2wBw&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=14"},
    {id:13, Titulo:"Como Gerenciar o Financeiro", Link:"https://www.youtube.com/watch?v=F6M4HkhCaz4&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=15"},
    {id:14, Titulo:"Como Interligar a sua Conta do Mercado Pago com o Sistema", Link:"https://www.youtube.com/watch?v=74rfBi3W3vE&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=16"},
    {id:15, Titulo:"Como Criar uma Conta do Mercado Pago", Link:"https://www.youtube.com/watch?v=Phx42WWT6IM&list=PLqVrle-vma-PYVPcUqkY0A6CxHhq-_vFn&index=17"},
    // {id:16, Titulo:"Como Ver Se Sua Conta está Vencida", Link:"https://www.youtube.com/watch?v=s8WqN5G_xqg"},
    // {id:17, Titulo:"Como Criar Um Ticket de Cambista para Produzir uma aposta", Link:"https://www.youtube.com/watch?v=nn2IlrkXIRY"},
    // {id:18, Titulo:"Como trocar o Nome", Link:"https://www.youtube.com/watch?v=9uyJgER1JDg"},
    // {id:19, Titulo:"Como Trocar o Whatsapp", Link:"https://www.youtube.com/watch?v=K2Z5USc-oU8"},
    // {id:20, Titulo:"Como Corrigir o Erro de Pagamento", Link:"https://www.youtube.com/watch?v=y56F4hmPlJE"},
  ])
  const [NomeEmp, setNomeEmp] = useState("");
  const [LogoEmp, setLogoEmp] = useState("");
  const [LinkMp, setLinkMp] = useState("");
  const [LinkZapi, setLinkZapi] = useState("");
  const [ValMIn, setValMIn] = useState("");
  const [ValMax, setValMax] = useState("");
  const [PlaMin, setPlaMin] = useState("");
  const [PlaMax, setPlaMax] = useState("");
  const [PorComis, setPorComis] = useState("")
  const [Img, setImg] = useState("");
  const [ConfigEmp, setConfigEmp] = useState({NomeEmp:"",  ValMin:"", ValMax:"", PalMin:"", PalMax:"", PorcCom:"", LinkMp:"", LinkWhats:""})
const [IrImg, setIrImg] = useState(false);
const [DadoTitu, setDadoTitu] = useState(userState.QN4)
const [DadoFili, setDadoFili] = useState(userState.QN3)
const [DadosBet, setDadosBet] = useState(userState.versaoBanco)
const [QMAp, setQMAp] = useState(0);
const [PorPremi, setPorPremi] = useState(0);
const [QMPre, setQMPre] = useState(0)

  useEffect(() => {
    setConfigEmp({NomeEmp:NomeEmp, ValMin:parseInt(ValMIn), ValMax:parseInt(ValMax), PalMin:parseInt(PlaMin) , PalMax:parseInt(PlaMax) , MaxAposta:parseInt(QMAp) , PremioMax:parseInt(QMPre) , PorPremParaCam:parseInt(PorPremi) , PorcCom:parseInt(PorComis) , LinkMp:LinkMp, LinkWhats:LinkZapi})
   }, [NomeEmp,  ValMax, ValMIn, PlaMax, PlaMin, PorComis, LinkMp, LinkZapi, QMAp, QMPre, PorPremi ])


   useEffect(() => {
    setDadoTitu(userState.QN4)
     setDadoFili(userState.QN3)
     setDadosBet(userState.versaoBanco)
  }, [userState.QN4, userState.QN3, userState.versaoBanco])

   const Saindo = async()=>{
    await AsyncStorage.setItem('Tel', "");
    await AsyncStorage.setItem('@entrada', "");
    await AsyncStorage.setItem('@Id', "");
    navigation.reset({
      routes:[{name:"Preload"}]
  });
   }

   const Voltar = ()=>{
    navigation.goBack();
  }

  useEffect(() => {
    if(Tel !== "" && Tel.length === 14 ){
  
        TelWhats();
    
    } else {
      setMsgErro("")
    } 
    


   }, [Tel])

   useEffect(() => {
    VerConfi()
   }, [])

   useEffect(() => {
   setNome(userState.nomeCompleto)
  setTel(userState.telefone)

   }, [userState.nomeCompleto, userState.telefone])

   const TelWhats = ()=>{
   setCarre(true)
    Api.AnaliseTelMudar(Tel, setMsgErro,  setBtn1, setCarre) 
   
 }

 const VerConfi = ()=>{
  setPorComis(userState.QN4.ConfigEmp.PorcCom)
  setImg(userState.QN4.LogoEmp);
  setNomeEmp(userState.QN4.ConfigEmp.NomeEmp);
  setValMIn(userState.QN4.ConfigEmp.ValMin);
  setValMax(userState.QN4.ConfigEmp.ValMax);
  setPlaMax(userState.QN4.ConfigEmp.PalMax);
  setPlaMin(userState.QN4.ConfigEmp.PalMin);
  setLinkMp(userState.QN4.ConfigEmp.LinkMp);
  setLinkZapi(userState.QN4.ConfigEmp.LinkWhats);
  setQMAp(userState.QN4.ConfigEmp.MaxAposta)
  setQMPre(userState.QN4.ConfigEmp.PremioMax)
  setPorPremi(userState.QN4.ConfigEmp.PorPremParaCam)
  
 }

   const AbrirModalP1 = ()=>{
    setModalVer(true)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    
   }

   const onChangeRec = ()=> {
    if(captcha.current.getValue()){
      setRobo(false)
    } else {
      setRobo(true)
    }
  }

  const GerarCod =  async ()=> {
          
    if(Robo === false){
      setMsgErro("");
      setCarre(true)
      Api.GeradorDeCod22(Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer);
    } else {
      
      setMsgErro("Por Favor Clique em NÃO SOU ROBÔ!");
      
    }
   
      
   
     
    }

    const GerarCod2 =  async ()=> {
          
     
      if(Tel.length === 14){
        if(parseInt(Senha)  === CodLast){
          setSenha("")
          setTentativa(0)
          setCodLast(0)
          setMsgErro1("")
        setCarre(true)
        Api.GeradorDeCod44(Tel, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer, setWhat2);
      } else {
        setTentativa(Tentativa +1)
        setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
       
      }
        } else {
        
          setMsgErro1("O Telefone Está Errado!");
        
        }
        
     
       
      }

   const AbrirModalP2 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    
   }

   const AbrirModalP3 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(false)
    setP4(false)
    setP5(false)
    setNome(userState.nomeCompleto)
    setMsgErro("")
    setP6(false)
    setP7(false)
   }

   const AbrirModalP4 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(false)
    setP5(false)
    setTel(userState.telefone)
    setP6(false)
    setP7(false)
    setMsgErro("")
   }

   const AbrirModalP5 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(false)
    setP6(false)
    setP7(false)
    setMsgErro("")
    
   }

   const AbrirModalP6 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(false)
    setP7(false)
    setMsgErro("")
    
   }

   const AbrirModalP7 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(true)
    setP7(false)
    setMsgErro("")
    
   }

   const AbrirModalP8 = ()=>{
    setModalVer(true)
    setP1(true)
    setP2(true)
    setP3(true)
    setP4(true)
    setP5(true)
    setP6(true)
    setP7(true)
    
   }



   const FecharModal = ()=>{
    setModalVer(false)
    setP1(false)
    setP2(false)
    setP3(false)
    setP4(false)
    setP5(false)
    setP6(false)
    setP7(false)
    setAlert("")
    setAlertTipo(null)
    setMsgErro(false)
    setMsgErro1(false)
    setSenha("")
    setCodG(false)
    setNome("")
    setTel("")
    setCodG(false)
    setTentativa(0);
    setBtn1(false);
    setRobo(true)
   }

   const AbrirLink = (Link)=>{
    Linking.openURL(Link);
   }

   const ExcluirImg = ()=>{
    setImg("")
    setIrImg(false)
  }


   const BaixarVideo = ()=>{
  
     Api.BaixandoMar(Nome, setAlert, setAlertTipo, setCarre )
 
   }

   const Trocardenome = ()=>{
   if(Nome !== ""){
    if(parseInt(Senha)  === CodLast){
    setCarre(true)
    Api.TrocandoNome(Nome, setAlert, setAlertTipo, setCarre )
  } else {
    setTentativa(Tentativa +1)
    setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
   
  }
    } else {
    
      setMsgErro1("O Nome Não Pode Está Vazio!");
    
    }
  }
 
  const EditarEmp = ()=>{
    
     if(parseInt(Senha)  === CodLast){
     setCarre(true)
     Api.EditandoEmp(IrImg, ConfigEmp, Img, setAlert, setAlertTipo, setCarre )
   } else {
     setTentativa(Tentativa +1)
     setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
    
   }
    
   }


  const openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImg(pickerResult.uri);
    setIrImg(true)
    console.log(pickerResult.uri.split(','))
  }

  const TrocardeNumero = ()=>{
    if(Tel.length === 14){
     if(parseInt(Senha) === CodLast){
     setCarre(true)
     Api.TrocandoWhats(Tel, setAlert, setAlertTipo, setCarre )
   } else {
     setTentativa(Tentativa +1)
     setMsgErro1("Código Errado "+(Tentativa+1)+"° tentativa de 3");
    
   }
     } else {
     
       setMsgErro1("O Telefone Está Errado!");
     
     }
   }

  const RenviarCod = ()=>{
    setCodG(false);
    setTentativa(0);
    setSenha("");
    setMsgErro1("");
  }


    return (
      <View style={styles.Container}>
         <Modal
            transparent={true}
            animationType="slide"
            visible={ModalVer}
            >
          <View style={styles.viewCalend}>
          {Carre === true ?
                      <>
                <Image source={require('../assets/carreg.gif')}  style={styles.ImageVer3 } />
                <Image source={require('../assets/futebol.gif')}  style={styles.ImageVer5 } />     
                      
                      
                      </>

                      :
                      <>
          
              {Alert !== "" ?
              <>
               <View  style={styles.ModVie}>
              {AlertTipo === "danger" ?
              <>
               <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext2}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>FecharModal()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
              
              </>

              :
              <>

              <View  style={styles.ModVieTex}>
                <Text style={styles.Avitext}>{Alert}</Text>
                </View>
                <View  style={styles.ModVieBtn}>
                 {/* <TouchableHighlight style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexNao}>Não</Text>
                 </TouchableHighlight> */}
                 <TouchableHighlight onPress={()=>FecharModal()} style={styles.ModVieBtnBtn}>
                  <Text style={styles.ModVieTexSim}>Ok</Text>
                 </TouchableHighlight>
                </View>
              
              </>

              }
              </View>
              </>

              :
              <>
              <View style={styles.QuadNota} >
            <ScrollView>
               {P1 === false ?
              <>
          <View  style={styles.CaixadeapostaTitulo}  >         
          <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Regras Bet Franquias</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
          </View>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Pagamentos</Text>
          <Text  style={{ marginLeft:10, fontSize:18  }}> Taxas de Serviços  </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}> - A Taxa de Serviços está no Valor de {DadosBet.ComissaoAp}% do valor das apostas  </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}> - Valor Maximo que poderá atingir, para não Bloquear a sua Conta são R${DadosBet.ValMinSalDev}</Text>
          
          <Text  style={{ marginLeft:10, fontSize:18  }}> Ativação da Conta  </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}> - A cada {DadosBet.DiariaValor} reais pago, aumenta mais 1 dia na data de Vencimento.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}> -Se sua Conta está vencida A Contagem dos dias pagos vai ser encima do dia atual (Hoje) e não na data de vencimento que já está registrado no sistema. Mais se sua Conta Não está vencida, A Contagem dos dias pagos vai ser encima da data de vencimento que já está registrado no sistema. </Text>
         
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Analise dos resultados do jogo</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}> - O sistema tem até 12 horas após o término do jogo, para liberar a análise do palpite daquele determinado jogo. Com a análise liberada pelo sistema, Você já poderá analisar os resutados das apostas.</Text>
          {/* <Text  style={{ marginLeft:10, fontSize:15  }}>- Para que você possa ganha comissões da sua Rede de Indicação é necessário que sua conta da PixBetCash não esteja vencida.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Você acompanhará o Vencimento da sua Conta clicando no Calendário que está no topo do Aplicativo do lado Direito. Se o calendário estive com V vermelho ela está vencida.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Para não deixar sua conta vencida, você tem que atualizar sua conta fazendo apostas na sua conta PixBetCash.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- A cada 1 real apostado, a data de vencimento da conta aumentará um dia.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Exemplo:  A sua data de vencimento é: 02/10/2017 --- Se você apostou R$ 20,00, a sua Data de Vencimento da Conta vai aumentar mais 20 dias, no entanto a data de vencimento ficará em 22/10/2017</Text>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Aposta</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Na Aposta da PixBetCash tem os Jogos e as Cotações de cada Jogo.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Você só poderá apostar em uma cotação por jogo</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Você não poderá apostar em jogos que já começaram</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Você só poderá concluir a aposta se escolher no mínimo 3 palpites </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Mínimo do valor apostado são R$ 5,00 </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Máximo do valor apostado são R$ 1000,00  </Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Todos os jogos com suas Cotações estarão analisados até as 12 horas do dia seguinte em que foi realizado o jogo do determinado Campeonato. Sendo assim o Botão para receber o prêmio só será liberado depois das analises das cotações dos jogos. </Text>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Cambista</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Cada aposta feita por cambista você receberá os ganhos do Nível 1 da Rede de Indicação, mais informações nas Regras de Indicação.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- A Nota da Aposta feita pelo Cambista será enviado para o WhatsApp do Cliente</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Cambista terá direito de 10% do prêmio ganhado pela aposta do cliente, essa regra será informada na nota enviada para o WhatsApp do Cliente. </Text>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras do Recebimento de Pagamentos</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- No topo do Aplicativo estará informando o Valor que será transferido via Pix para sua conta do Banco.</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- Em 72 horas o Dinheiro estará em sua conta</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Valor Mínimo para Saque é de R$ 10,00</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Nome da Sua Conta da PixBetCash tem que ser o mesmo nome que aparecerá na sua conta de transferência Pix, quando efetuarmos a transferência via Pix com segurança</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>- O Número do WhatsApp que está Registrado da sua Conta PixBetCash tem que ser o Mesmo da Chave Pix, para que a empresa possa transferir com segurança.</Text>
          <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras de Notificações</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>-O tempo De resposta de Suas Perguntas nas notificações do Aplicativo será de até no Máximo 24 horas.</Text> */}
         
          
              </>
              :
              <>
              {P2 === false ?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Tutoriais Bet Franquias</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              {Listu.map((item, key)=>( 
                <>
                <TouchableHighlight  style={{margin:10}} onPress={() =>AbrirLink(item.Link)}>
                  <>
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>{item.Titulo}</Text>
                  <Text style={{ marginLeft:10, fontSize:15, color:"blue"  }}>Clique Aqui...</Text>
                  </>
                  </TouchableHighlight>

                </>

              ))}
              </>
              :
              <>
              {P3 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Nome</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras para Trocar O Nome:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>1° - Coloque seu Nome Completo</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>2° - Esse Nome tem que ser o mesmo nome que aparecerá na sua conta, quando efetuarmos a transferência via Pix</Text>
              <View  style = {styles.InputAra}>
                            <FontAwesome name="user" size={24} color="black" />
                             <SignInput
                                placeholder="Nome do Cliente" 
                                value={Nome}
                                onChangeText={t=>setNome(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={1000}
                            /> 
                   </View>
                   {CodG === false?
                        <>
                        
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {MsgErro !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                            }
                        
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código Segurança</Text>
                          </TouchableHighlight>
                              

                        </>

                        
                      

              
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
                   {MsgErro1 !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro1}</Text>    
                            }
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Trocardenome()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar de Nome</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }
              </>
              :
              <>
              {P4 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Trocar Whatsapp</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Regras para Trocar de Whatsapp:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>1° - Digite Um Número de Whatsapp</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>2° - O Número Não Pode está registrado no Sistema</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>3° - O Número do Whatsapp Que está Registrando Tem que Ser o Mesmo Da Chave Pix, aonde A Empresa fará a trasnferencia dos seus pagamentos.</Text>
              {CodG === false?
              <View  style = {styles.InputAra}>
              <FontAwesome name="phone-square" size={24} color="black" />
               <Telefone                      
                   placeholder="Whatsapp do Cliente" 
                   value={Tel}
                   onChangeText={t=>setTel(t)}
                   autoCapitalize="none"
                   keyboardType={"phone-pad"}
               
               /> 
               </View>

              :
              <View  style = {styles.InputAra}>
                           <FontAwesome name="phone-square" size={24} color="black" />
                           <View  style={{width:250 , height:50 }}>
                           <Text  style={{ marginLeft:10, fontSize:20}}>{Tel}</Text>
                           </View>
                            </View>

              }
              
                      {MsgErro !== "" &&
                      <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                      }
                      {Btn1 === true &&
                      <>
                       {CodG === false ?
                        <>
                        
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {MsgErro !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                            }
                        
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código Segurança</Text>
                          </TouchableHighlight>
                              

                        </>

                        
                      

              
                     </>
                         :
                        

                        <>
                        {Tentativa >= 3 &&
                        <>
                         <Text  style={{ marginLeft:10, fontSize:15  }}>Você atingiu a quantidade máxima de erros</Text> 
                        
                        </>
                        }
                       
                      {Tentativa < 3 &&
                                  <>
                                  {What2 === false ?
                                  <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o seu Whatsapp Antigo</Text> 
                                  :
                                  <Text  style={{ marginLeft:10, fontSize:15  }}>Seu Código foi enviado para o seu Whatsapp Novo</Text> 
                                  }
                                 
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
                   {MsgErro1 !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro1}</Text>    
                            }
                            {What2 === false ?
                          <TouchableHighlight style={{width:250, height:50, backgroundColor:"#840D8D", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod2()}>
                          <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Codigo de Segurança Para O Novo WhatsApp</Text>
                        </TouchableHighlight>
                            :
                            <TouchableHighlight style={{width:250, height:50, backgroundColor:"#840D8D", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>TrocardeNumero()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar o Whatsapp</Text>
                          </TouchableHighlight>

                            }
                  
                      
                      
                        </>
                        }

                        </>

                          }

                      </>

                      }
                     
              </>
              :
              <>
              {P5 === false?
              <>
              <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA ANDROID</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Primeiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Com o Sistema Aberto no navegador do Google,  clique nos 3 pontos no topo do lado direito.</Text>
               <Image source={require('../assets/PrimeiroAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Segundo Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Agora Clique em Adicionar à tela  Inicial.</Text>
               <Image source={require('../assets/SegundoAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Terceiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Clique no Adicionar na Caixa de Dialogo.</Text>
               <Image source={require('../assets/TerceiroAndroid.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Quarto Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>- Seu aplicativo vai aparecer na sua tela inicial.</Text>
               <Image source={require('../assets/QuartoAndroid.png')}  style={{width:300, height:600}} />
              </>
              
              :
              <>
              {P6 === false ?
              <>
                 <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>APP PARA IPHONE</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Primeiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Com o Sistema Aberto no navegador do  Safari, clique no menu abaixo.</Text>
               <Image source={require('../assets/Primeiro.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Segundo Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Agora Clique em Adicionar à tela  de Início.</Text>
               <Image source={require('../assets/Segundo.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Terceiro Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>Clique no Adicionar na Caixa de Dialogo.</Text>
               <Image source={require('../assets/Terceiro.png')}  style={{width:300, height:600}} />
               <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>Quarto Passo:</Text>
               <Text  style={{ marginLeft:10, fontSize:15  }}>- Seu aplicativo vai aparecer na sua tela inicial.</Text>
               <Image source={require('../assets/Quarto.png')}  style={{width:300, height:600}} />

              </>

              :
              <>
              {P7 === false ?
              <>
               <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Configurações da Empresa</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View>
              {CodG === false?
                        <>
                        
                        <>
                         <ReCAPTCHA
                          ref={captcha}
                          sitekey="6LdDVDIiAAAAAM8Z3lsWD6qE2o2w94YfwDM7mRf7"
                          size="normal"
                          hl="pt"
                          theme="dark"
                          onChange={onChangeRec}
                            />
                            {MsgErro !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro}</Text>    
                            }
                        
                            <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>GerarCod()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Gerar Código Segurança</Text>
                          </TouchableHighlight>
                              

                        </>

                        
                      

              
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
                   {MsgErro1 !== "" &&
                            <Text  style={{color:"red", marginLeft:10, fontSize:17  }}>{MsgErro1}</Text>    
                            }
                    <TouchableHighlight style={{width:150, height:50, backgroundColor:"#1ED31A", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>EditarEmp()}>
                        <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Salvar</Text>
                      </TouchableHighlight>
                      
                      
                        </>
                        }

                        </>

                          }
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20, margin:30  }}>Logo Marca da Empresa</Text>
              {Img !== ""?
                     <>
                     
                     <Image  source={{uri:Img }}  style={{ width:200, height:200 }} />
                      <TouchableHighlight style={{width:250, height:50, backgroundColor:"red", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>ExcluirImg()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Excluir</Text>
                        </TouchableHighlight>
                       
                     </>
                     :
                      <>
                      <View style={{ width:300, height:200, flex:1, display:"flex", margin:10, justifyContent:"center", alignItems:"center", }}>
                      <FontAwesome name="camera" size={100} color="black" />
                      </View>
                      <TouchableHighlight style={{width:250, height:50, backgroundColor:"#00A859", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>openImagePickerAsync()}>
                              <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Procurar Imagem</Text>
                        </TouchableHighlight>
                     </>
                     }
   
              <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Nome da Empresa</Text>
              <View  style = {styles.InputAra}>
                            <FontAwesome name="home" size={24} color="black" />
                             <SignInput
                                placeholder="Nome da Empresa" 
                                value={NomeEmp}
                                onChangeText={t=>setNomeEmp(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={1000}
                            /> 
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Valor Máximo da Aposta:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite o valor Máximo que os clientes pode aposta.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="dollar" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Valor da Aposta" 
                              value={ValMax}
                              onChangeText={t=>setValMax(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Valor Mínimo da Aposta:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite o valor Mínimo que os clientes pode aposta.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="dollar" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Valor da Aposta" 
                              value={ValMIn}
                              onChangeText={t=>setValMIn(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>

                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Quantidade Máxima de Palpites:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite a Quantidade Máxima de palpites por apostas.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="plus" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Quantidade de Palpites" 
                              value={PlaMax}
                              onChangeText={t=>setPlaMax(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                 
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Quantidade Mínima de Palpites:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite a Quantidade Mínima de palpites por apostas.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="minus" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Quantidade de Palpites" 
                              value={PlaMin}
                              onChangeText={t=>setPlaMin(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Valor Máximo do Prêmio:</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite o Valor Máximo do prémio, que a empresa pode pagar.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="plus" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite o Valor" 
                              value={QMPre}
                              onChangeText={t=>setQMPre(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>

                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Porcentagem de Comissão(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite a Porcentagem padrão de Comissão para Cambista por aposta.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="deviantart" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Porcentagem" 
                              value={PorComis}
                              onChangeText={t=>setPorComis(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>

                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Quantidade Máxima de Aposta(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite a quantidade Limite Máxima de aposta que o Cambista pode fazer sem dar Baixa nos pagamentos. Contudo ele dando Baixa é liberado para ele fazer mais apostas.</Text>
                   <View  style = {styles.InputAra}>
                   <FontAwesome name="plus" size={24} color="black" />           
                          <SignInputCod
                              placeholder="Digite a Quantidade" 
                              value={QMAp}
                              onChangeText={t=>setQMAp(t)}
                              autoCapitalize="none"
                              keyboardType={"numeric"}
                          />
                   </View>
                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Porcentagem do Prêmio(Cambista):</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Digite a porcentagem que o Cambista terá direito sobre o prêmio do seu cliente.</Text>
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
                  


                   <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15 , marginTop:20  }}>Codificação de Pagamento:(Desenvolvedor)</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Essa Codificação serve para você receber pagamentos via Mercado Pago</Text>
              <View  style = {styles.InputAra}>
                            <FontAwesome name="unlink" size={24} color="black" />
                             <SignInput
                                placeholder="Codig. Mercado Pago" 
                                value={LinkMp}
                                onChangeText={t=>setLinkMp(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={1000}
                            /> 
                   </View>
                 
              
                   {/* <Text  style={{fontWeight:"bold", marginLeft:10, fontSize:15, marginTop:20  }}>Codificação de Whatsapp:(Desenvolvedor)</Text>
          <Text  style={{ marginLeft:10, fontSize:15  }}>Essa Codificação serve para você enviar mensagens via Z-api</Text>
              <View  style = {styles.InputAra}>
                            <FontAwesome name="tags" size={24} color="black" />
                             <SignInput
                                placeholder="Codig. Z-API" 
                                value={LinkZapi}
                                onChangeText={t=>setLinkZapi(t)}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                posi={1000}
                            /> 
                   </View> */}
                   
            

              </>

              :
              <>
               <View  style={styles.CaixadeapostaTitulo}  >         
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:20  }}>Baixar O Marketing</Text> <TouchableHighlight  style={styles.fechaModal} onPress={() =>FecharModal()}><Text>X</Text></TouchableHighlight>
              </View >
              <View  style={{ margin:10,}}  >
              <Text style={{fontWeight:"bold", marginLeft:10, fontSize:22  }}>Instruções de Como Baixar</Text>
              <Text style={{ marginLeft:10, fontSize:17  }}>1° passo: Segure o clique na foto ou no vídeo por 5 segundos</Text>
              <Text style={{ marginLeft:10, fontSize:17  }}>2° passo: Aparecerá um menu, clique em fazer download </Text>
              </View>
              {userState.versaoBanco.MarkLink.reverse().map((item, key)=>( 
                <>
                <View  style={{margin:10}} >
                  <>
                  <Text style={{fontWeight:"bold", marginLeft:10, fontSize:15  }}>{item.Titulo}</Text>
                
                  {item.Tipo === "imagem" ?
                 <Image source={{uri:item.Link}}  style={{ width:item.L, height:item.H}} />  
                  :
                 
                  <Video
                  style={{ width:item.L, height:item.H}}
                  source={{
                    uri: item.Link,
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  
                />
                  }
                 
                  </>
                  </View>

                </>

              ))}
              </>

              }
               

              </>

              }
           
              </>
              }
              </>
              }
              </>
              }
               
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
             Configuração
             </Text>
              </TouchableHighlight>
             
            </View >
            <ScrollView>
              
            <View style={{ backgroundColor:"#fff", margin:10, borderRadius: 5, padding:5  }} >
      
            <Text  style={{  fontWeight:"bold",  fontSize:20, color:"#000",}}>Nome: {userState.nomeCompleto}</Text>
            <Text  style={{  fontWeight:"bold",  fontSize:20, color:"#000",}}>Telefone: {userState.telefone}</Text>
            </View>
            {userState.QN4.Funcionario === false &&
            <View  style={styles.AreaBtnCima}>
            <TouchableHighlight style={{width:70, height:100, backgroundColor:"#03B775", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP7()}>
                    <>
                    <FontAwesome name="home"  size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Configuração</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Empresa</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#DDBE0D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP1()}>
                    <>
                    <FontAwesome name="book"  size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Regras</Text>
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>BetFranquias</Text>
                      </> 
                 </TouchableHighlight>
              
              </View>
              }
              <View  style={styles.AreaBtnCima}>
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#009DFF", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP2()}>
                     <>
                     <FontAwesome name="youtube-square" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Tutoriais</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>BetFranquias</Text>
                      </>
                 </TouchableHighlight>
             
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#261A9D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP8()}>
                    <>
                    <FontAwesome name="download"  size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Baixar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Marketing</Text>
                      </> 
                 </TouchableHighlight>
                
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#30B72D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP3()}>
                    <>
                    <FontAwesome name="user" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Nome</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#840D8D", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP4()}>
                     <>
                     <FontAwesome name="phone-square" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Trocar</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Whatsapp</Text>
                      </>
                 </TouchableHighlight>
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#E19807", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP5()}>
                    <>
                    <FontAwesome name="android" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>APP PARA</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>ANDROID</Text>
                      </> 
                 </TouchableHighlight>
                 <TouchableHighlight style={{width:70, height:100, backgroundColor:"#86E107", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>AbrirModalP6()}>
                     <>
                     <FontAwesome name="apple" size={40} color="#FFF" />
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>APP PARA</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>IPHONE</Text>
                      </>
                 </TouchableHighlight>
              </View>
              <View  style={styles.AreaBtnCima}>
              
              <TouchableHighlight style={{width:70, height:100, backgroundColor:"#F96868", borderRadius:10, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Saindo()}>
                    <>
                    <FontAwesome name="power-off" size={40} color="#fff" />
                      <Text  style={{ fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sair Do</Text>
                      <Text  style={{  fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sistema</Text>
                      </> 
                 </TouchableHighlight>
                
              </View>
              </ScrollView>
        {/* <TouchableHighlight style={{width:150, height:50, backgroundColor:"#F96868", borderRadius:5, margin:20, flex:1, justifyContent:"center", alignItems:"center" }} onPress={()=>Saindo()}>
                            <Text  style={{ margin:10, fontWeight:"bold",  fontSize:16, color:"#FFF"  }}>Sair da Conta</Text>
                          </TouchableHighlight> */}
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
          ImageVer10: {
            width:  300,
            height: 160, 
          },  
});