import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import firebaseConfig from './services/firebase';

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();

var URL_SITE = "apostacentral.netlify.app";
export default {

      checkToken: async (tel, cod, time, setIrHome, setIrLogin,  setId, ) => {

            var tele =  await tel.toString();
            var codig = await parseInt(cod);
            var temp = await parseInt(time);
                  console.log("tele "+tele)
                  console.log("Temp "+temp)
                  await firestore.collection("users")
                  .where("Telefone", "==", tele)
                  .where("DataEntCel", "==", temp)
                  .get().then( async(querySnapshot) => {
                 
                    if(querySnapshot.size !== 0){
                      querySnapshot.forEach( async (doc) => {
                       
                        await setId(doc.id);
                        await setIrHome(true);
                        });
                     
               
                    } else {
                      await AsyncStorage.setItem('Tel', "");
                      await AsyncStorage.setItem('@entrada', "");
                      setIrLogin(true);
                    }
                  
               })
               .catch((error) => {
                  
               });
            
                },


          VerWhats: async (Tel, setTelMsg, setNome, setBtn,  setLoading) => {


            var ver = Tel.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
            {
                  method: 'GET',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  
                });
        
            
              
                const json = await req.json(); 
                setTelMsg(json.exists);
              
        
                if(json.exists === true){
                  
                  setBtn(true);
                } else{
                  setBtn(false);
                }
              
        
              
                await setLoading(false)
          },

    AnaliseTel: async (Tel, setTe1, setNome) => {
      console.log("Nome ")
      await firestore.collection("users")
      .where("Telefone", "==", Tel)
      .get().then((querySnapshot) => {
       
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
           
            setTe1(true);
            setNome(doc.data().Nome)
            
          })
      
        }
          });
    
    
    },

    VerWhatsInd: async (TelCli, LinWhats, setTelMsg, setNomeCli, setBtn,  setLoading) => {


      var ver = TelCli.replace("(", "55");
      var par1 = ver.replace(")", "");
      var par3 = par1.replace("-", "");
      const req = await fetch(`${LinWhats}/phone-exists/${par3}`, 
      {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            },
           
          });
  
      
        
          const json = await req.json(); 
          setTelMsg(json.exists);
        
  
          if(json.exists === true){
           
            setBtn(true);
          } else{
            setBtn(false);
          }
       
  
       
          await setLoading(false)
    },

    AnaliseTelIndic: async (TelCli, setTe1, setNomeCli, setBtn1,  setTe2, setBtn2, setDateInd) => {
      var tim = new Date().getTime();
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)

      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){


      await firestore.collection("users")
      .where("Telefone", "==", TelCli)
      .where("Funcionario", "==", true)
      .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
            setTe1(true);
            setBtn1(false);
            setNomeCli(doc.data().Nome)
          })
      
        } else {
          setTe1(false);
          setBtn1(true);
    
        }
         });
    
         await firestore.collection("BancoWhats")
        .where("Telefone", "==", TelCli)
        .where("DataFin", ">", tim)
        .where("Aprovado", "==", false)
        .get().then((querySnapshot) => {
          console.log("Existe aqui")
        if(querySnapshot.size !== 0){
       
          querySnapshot.forEach((doc) => {
            let currentDate = '';
            let now =new Date(doc.data().DataFin);
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
            setTe2(true);
            setBtn2(false);
            setDateInd(currentDate)
          })
      
        } else {
          setTe2(false);
          setBtn2(true);
    
        }
         });

        }
      });
    
    
    
    },

    VerWhatsTransf: async (TelCli, setMsgErro1, setCarre) => {


      // var ver = TelCli.replace("(", "55");
      // var par1 = ver.replace(")", "");
      // var par3 = par1.replace("-", "");
      // const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
      // {
      //       method: 'GET',
      //       headers:{
      //         'Content-Type': 'application/json'
      //       },
            
      //     });
  
      
        
      //     const json = await req.json(); 
      //     setTelMsg(json.exists);
        
  
      //     if(json.exists === true){
            
      //       setMsgErro1(true);
      //     } else{
      //       setMsgErro1(false);
      //     }
        
  
        
        
    },

AnaliseTelTransf: async (TelCli, setMsgErro2, setNome, setLoad, setBtn, setIdTrans) => {

await firestore.collection("users")
.where("Telefone", "==", TelCli)
.get().then((querySnapshot) => {
 
  if(querySnapshot.size !== 0){
    querySnapshot.forEach((doc) => {
     
      setIdTrans(doc.id)
      setNome(doc.data().Nome)
      setBtn(true);
    })

  } else {
    setMsgErro2(true);
  }
    });

    setLoad(false)


},

AnaliseTelMudar: async (Tel, setMsgErro,  setBtn1, setCarre) => {

  await firestore.collection("users")
  .where("Telefone", "==", Tel)
  .get().then((querySnapshot) => {
   
    if(querySnapshot.size !== 0){
      querySnapshot.forEach((doc) => {
       
        setMsgErro("Já Existe Uma Conta Com Esse Whatsapp!");
       
      })
  
    } else {
       setBtn1(true);
      setMsgErro("")
    }
      });
  
      setCarre(false)
  
  
  },

    AnaliseTel: async (Tel, setTe1, setNome) => {

      await firestore.collection("users")
      .where("Telefone", "==", Tel)
      .get().then((querySnapshot) => {
        if(querySnapshot.size !== 0){
          querySnapshot.forEach((doc) => {
            setTe1(true);
            setNome(doc.data().Nome)
            
          })
      
        }
          });
    
    
    },

    QuantiWhats: async (Inicio, setPos, setWhats, setTele) => {

      await firestore.collection("TelefonesWhats")
      .where("Interesse", "array-contains", 4)
      .onSnapshot((querySnapshot) => {
        setWhats(querySnapshot.size) 
        // if(querySnapshot.size !== 0){
        //   querySnapshot.forEach((doc) => {
        //     setTe1(true);
        //     setNome(doc.data().nome)
            
        //   })
      
        // }
          });
    
    
    },

    CriandoW: async (Inicio, setPos, setWhats, setTele) => {
      var Posi= 0;
      var Num = 0;
      var Tel = parseInt(Inicio);
      var Numeros = '+55 11 5197-3568, +55 11 5461-1585, +55 11 91161-3786, +55 11 94168-8111, +55 11 94527-3499, +55 11 95303-8849, +55 11 95793-0066, +55 11 96166-0166, +55 11 96431-0722, +55 11 96571-4900, +55 11 96804-8087, +55 11 96914-3746, +55 11 97429-1423, +55 11 97431-7078, +55 11 97486-5964, +55 11 97628-6636, +55 11 97741-6987, +55 11 97756-5825, +55 11 97959-4668, +55 11 98115-2830, +55 11 98149-0190, +55 11 98266-2374, +55 11 98476-7056, +55 11 98585-1990, +55 11 98754-0266, +55 11 98947-4063, +55 11 99150-0056, +55 11 99202-0436, +55 11 99291-0826, +55 11 99315-8986, +55 11 99638-6036, +55 11 99699-6764, +55 11 99737-8170, +55 11 99787-1222, +55 11 99849-8988, +55 11 99900-6225, +55 11 99948-9057, +55 12 98125-7790, +55 12 99121-9140, +55 13 99759-1094, +55 14 99121-1020, +55 14 99826-9292, +55 15 98803-3349, +55 16 98803-6850, +55 16 99175-6100, +55 16 99255-0263, +55 17 99110-5866, +55 17 99777-7778, +55 18 99168-0045, +55 18 99703-3270, +55 18 99793-0110, +55 19 97420-8833, +55 19 98163-4105, +55 19 99556-3478, +55 19 99644-1851, +55 21 97602-4174, +55 21 97731-2073, +55 21 97993-7098, +55 21 98238-3089, +55 21 98303-9333, +55 21 98353-8951, +55 21 98392-1055, +55 21 98626-2059, +55 21 98680-9051, +55 21 98853-0314, +55 21 98897-9207, +55 21 99398-0569, +55 21 99427-2847, +55 21 99531-1410, +55 21 99760-6266, +55 24 98841-2372, +55 24 99871-2627, +55 24 99939-7148, +55 27 98153-4721, +55 27 99764-0312, +55 27 99798-5946, +55 28 99884-0690, +55 28 99967-3406, +55 31 8597-9823, +55 31 8809-6986, +55 31 9228-2783, +55 31 9267-6924, +55 31 9314-9761, +55 31 9779-9335, +55 31 9822-0004, +55 31 9880-2470, +55 31 9883-0893, +55 32 9198-6175, +55 35 9848-8008, +55 37 9836-3385, +55 41 9780-8436, +55 41 9853-5077, +55 41 9890-6043, +55 42 9942-9526, +55 42 9963-3449, +55 43 9871-6513, +55 44 9976-4304, +55 47 8436-3236, +55 47 9600-7372, +55 48 8493-6836, +55 48 9822-3183, +55 48 9943-3749, +55 49 9139-8067, +55 51 9106-6667, +55 53 9137-9935, +55 54 8113-2214, +55 54 9271-4172, +55 54 9368-3538, +55 55 9216-8336, +55 61 3686-2230, +55 61 8101-8261, +55 61 8133-2675, +55 61 8161-7014, +55 61 8324-6233, +55 61 8418-7666, +55 61 8469-1575, +55 61 8474-5021, +55 61 9105-2009, +55 61 9204-8761, +55 61 9214-9760, +55 61 9376-3883, +55 61 9411-1050, +55 61 9618-0911, +55 61 9653-1005, +55 61 9842-5106, +55 61 9944-5500, +55 61 9995-7042, +55 62 8100-9894, +55 62 8151-0101, +55 62 8189-6336, +55 62 8426-7576, +55 62 9632-7166, +55 62 9924-7727, +55 63 8129-2369, +55 63 9208-2825, +55 63 9972-1290, +55 65 9951-0772, +55 66 9219-5464, +55 67 9815-0498, +55 67 9903-6655, +55 68 9239-0551, +55 69 9346-1955, +55 69 9397-1457, +55 71 8685-7840, +55 71 8687-1645, +55 71 9186-2334, +55 71 9251-3240, +55 71 9605-5856, +55 71 9669-3364, +55 71 9670-4453, +55 71 9709-3212, +55 71 9944-5908, +55 73 8887-0969, +55 73 8895-9045, +55 73 9155-6776, +55 74 8805-9274, +55 75 8118-6737, +55 75 8141-3006, +55 75 8202-6994, +55 75 8701-2004, +55 75 9178-9364, +55 75 9283-3008, +55 75 9818-1568, +55 75 9934-2127, +55 77 8822-8556, +55 77 9104-3730, +55 77 9129-0536, +55 77 9134-7838, +55 77 9150-0512, +55 77 9812-9369, +55 79 8864-7279, +55 79 9876-6867, +55 79 9900-2175, +55 79 9966-1869, +55 79 9972-0542, +55 81 8257-7227, +55 81 8957-1424, +55 81 9320-0708, +55 81 9400-1541, +55 81 9724-3486, +55 81 9755-0250, +55 81 9805-9589, +55 81 9884-3261, +55 81 9964-7381, +55 81 9981-7684, +55 82 8873-9896, +55 82 9101-2269, +55 82 9174-3164, +55 82 9627-0369, +55 82 9830-9284, +55 82 9910-0187, +55 82 9955-2539, +55 83 8614-2587, +55 83 9100-0682, +55 83 9317-6743, +55 83 9350-4656, +55 83 9696-8008, +55 83 9877-0003, +55 84 8602-6513, +55 84 8734-1905, +55 84 8879-5251, +55 84 9807-3083, +55 84 9837-6575, +55 84 9981-9178, +55 85 9162-8235, +55 85 9739-7999, +55 85 9776-5034, +55 85 9857-8286, +55 85 9925-8140, +55 85 9956-3468, +55 86 8830-8783, +55 86 9903-8496, +55 86 9983-5706, +55 87 8822-2703, +55 87 9648-4343, +55 88 8112-6789, +55 88 9354-9497, +55 88 9735-6059, +55 88 9908-2958, +55 88 9984-3618, +55 91 8431-1999, +55 91 8563-7143, +55 91 8575-5594, +55 91 8606-7643, +55 91 9113-8194, +55 91 9225-6291, +55 91 9233-8551, +55 91 9240-8300, +55 92 8279-3400, +55 92 9507-9860, +55 94 9180-2369, +55 94 9908-5782, +55 97 8111-2708, +55 97 9144-5396, +55 98 8420-2037, +55 98 8459-2691, +55 98 8470-5496, +55 98 8734-8820, +55 98 9112-1359, +55 99 8446-2657, +55 99 8539-2407, +55 99 9120-3530';
      console.log(Numeros)
      var Telefones = Numeros.split(', ');

     for(let i in Telefones){
      Posi = Posi+1
      console.log(Posi)

    var ver = Telefones[i].replace("+", "");
    var par1 = ver.replace(" ", "");
    var par3 = par1.replace(" ", "");
    var par4 = par3.replace("-", "");
    console.log(par4);
              await firestore.collection("TelefonesWhats")
                .where("Telefone", "==", par4)
                .get()
                .then(async (querySnapshot) => {
            
                  if(querySnapshot.size  === 0){
                   console.log("Sim")
                    await firestore.collection("TelefonesWhats").add({
                      Telefone:par4,
                      Cidade:"",
                      Estado:"",
                      Interesse:[4],
                      Ativo:true,
                 
                   })
                   .then((docRef) => {
                 
                    })
                 
            
                  } else {
                   // Mudar Algo
                    querySnapshot.forEach(async (doc) => {
                      
                      // await firestore.collection("TelefonesWhats").doc(doc.id)
                      // .update({
                      //   Ativo:true,
                      //   }).then((docRef) => {
                      //     console.log("Pronto")
                      //   });
                  
                      });
                 
                }
                });

               }
   



    
      // 82 ao 83
    //   for  (var i = Tel; i < 5599983000000; i++) {
        
    //     setTele(i)
    //       Posi = Posi+1;
    //       setPos(Posi)
    //       const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${i}`, 
    //         {
    //               method: 'GET',
    //               headers:{
    //                 'Content-Type': 'application/json'
    //               },
                
    //             });
    //             const json = await req.json(); 
    //             if(json.exists){

                 
    //               console.log("Sim")
             
    //               await firestore.collection("WhatsAtomatico")
    //             .where("Telefone", "==", i)
    //             .get()
    //               .then(async (querySnapshot) => {
            
    //               if(querySnapshot.size  === 0){
            
    //                 await firestore.collection("WhatsAtomatico").add({
    //                   Telefone:i,
    //                   Cidade:"",
    //                   Estado:"Maranhão",
                 
    //                })
    //                .then((docRef) => {
    //                 Num = Num+1;
    //                 setWhats(Num);
    //                 firestore.collection("NumeroWhats").doc("5uqO4Zwh6uj10bHsd2cQ")
    //                 .update({
    //                   PosiNotBook: Posi,
    //                   WhatsNotBook: Num,
    //               })
    //               })
                 
            
    //               }
    //             });

    //             }else {

    //               console.log("Não")
    //             firestore.collection("NumeroWhats").doc("5uqO4Zwh6uj10bHsd2cQ")
    //               .update({
    //                 PosiNotBook: Posi
    //             })

    //             }
         
  
  
  
      
      
        
    //  }

     
   

    },

    signIn: async (Tel, Nome, IdInd2, VerSite2, setIrCad, setIrEnt, setLoading) => {
      let temp = new Date().getTime();
      let temp10 = new Date().getTime()+864000000;
      var tele = Tel.toString();
   
      await AsyncStorage.setItem('Tel', tele);
  
   
      var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
  
        await firestore.collection("users")
        .where("Telefone", "==", Tel)
        .get().then( async (querySnapshot) => {
          console.log(querySnapshot.size);
     if(querySnapshot.size !== 0){
      querySnapshot.forEach(async (doc) => {
          
            let time = new Date().getTime();
            firestore.collection("users")
            .doc(doc.id)
            .update({
              CodigEnt: last,
          })
          .then( async() => {
            var ver = Tel.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
            var data={
              "phone": par3,
              "message": "Código de entrada: "+last,
            }   
            const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
            {
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
                });
              
                const json = await req.json(); 
              
                  await setIrEnt(true);
                  await setLoading(false);
                
                
          })
          .catch((error) => {
          
            
          });
    
         
  
      
      
    
      
    });
  
     } else {
  
      var time = new Date().getTime();
      var Forms = ["off", "off", "off"]
      await firestore.collection("users").add({
        Filial:true,
        Funcionario:false,
        Comissao:0,
        PorcenPremio:0,
        QuanApos:0,
        Ativo:true,
        LogoEmp: "",
        ConfigEmp: {NomeEmp:"",  ValMin:"", ValMax:"", PalMin:"", PalMax:"", PorcCom:"", LinkMp:"", LinkWhats:"", MaxAposta:"", PremioMax:"",  PorPremParaCam:""},
        CodigEnt: last,
        Telefone:Tel,
        DataEntCel:0,
        Nome:Nome,
        Indicados:[],
        Extrato:[],
        DataCadas: temp,
        Cash:0,
        Dinheiro:0,
        DataVenc:temp10,
        ADM:false,
        Nivel3:0,
        Nivel4:0,
        mensagem:[
          {
            date:new Date().getTime(),
            autor:"Sistema",
            body:"Aqui você terá total atenção da empresa Bet Franquias, Fique a vontade, e Bom uso do Sistema!",
            nome:"Bet Franquias",
            type:"text"

          }
        ],
        DigiS:false,
        DigiV:false,
        vizualS:0,
        vizualV:0,
        ultimaMsg:{
          data:new Date().getTime(),
          id:"Sistema",
          msg:"Aqui você terá total atenção da empresa Bet Franquias, Fique a vontade, e Bom uso do Sistema!",
          nome:"Bet Franquias"
        },
        userchat:[{}],
    })
    .then( async (docRef) => {
   
      var id = docRef.id
   
  
    var ver = Tel.replace("(", "55");
    var par1 = ver.replace(")", "");
    var par3 = par1.replace("-", "");
    var data={
      "phone": par3,
      "message": "Código de entrada: "+last,
    }   
    const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
    {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
      
        const json = await req.json();
        var IdBanco = "";
        var IdInd = "";

        // await firestore.collection("BancoWhats")
        // .where("Telefone", "==", Tel)
        // .where("DataFin", ">=", temp)
        // .get().then((querySnapshot2) => {
        
        //   if(querySnapshot2.size !== 0){
        //   querySnapshot2.forEach(async (doc2) => {
        //     IdBanco = doc2.id;
        //     IdInd = doc2.data().IdUser;
        //   });
        //     firestore.collection("users")
        //     .doc(IdInd)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })
  
        //     firestore.collection("BancoWhats")
        //     .doc(IdBanco)
        //     .update({
        //       Aprovado:true, 
        //       })

        //   firestore.collection("users")
        //   .where("Indicados", "array-contains", IdInd)
        //   .get()
        //   .then((querySnapshot) => {
        //     var IdNive3 = "";
        //     var Nive3Q = 0;
        //     if(querySnapshot.size !== 0){

        //       querySnapshot.forEach((doc) => {
        //         IdNive3 = doc.id;
        //         Nive3Q =  doc.data().Nivel3;                 
        //        });
        //        firestore.collection("users")
        //        .doc(IdNive3)
        //        .update({
        //         Nivel3: Nive3Q + 1
        //       })

        //       firestore.collection("users")
        //       .where("Indicados", "array-contains", IdNive3)
        //       .get()
        //       .then((querySnapshot3) => {
        //         var IdNive4 = "";
        //         var Nive4Q = 0;
        //         if(querySnapshot3.size !== 0){
    
        //           querySnapshot3.forEach((doc3) => {
        //             IdNive4 = doc3.id;
        //             Nive4Q =  doc3.data().Nivel4;                 
        //            });
        //            firestore.collection("users")
        //            .doc(IdNive4)
        //            .update({
        //             Nivel4: Nive4Q + 1
        //           })
    
                  
    
    
        //         }
                 
        //       })



        //     }
             
        //   })
          
          
        // } else{
        //   if(VerSite2 === "indicacao"){

        //     firestore.collection("users")
        //     .doc(IdInd2)
        //     .update({
        //       Indicados: firebase.firestore.FieldValue.arrayUnion(id)
        //      })

        //      firestore.collection("users")
        //      .where("Indicados", "array-contains", IdInd2)
        //      .get()
        //      .then((querySnapshot) => {
        //        var IdNive3 = "";
        //        var Nive3Q = 0;
        //        if(querySnapshot.size !== 0){
   
        //          querySnapshot.forEach((doc) => {
        //            IdNive3 = doc.id;
        //            Nive3Q =  doc.data().Nivel3;                 
        //           });
                 
        //           firestore.collection("users")
        //           .doc(IdNive3)
        //           .update({
        //            Nivel3: Nive3Q + 1
        //          })
   
        //          firestore.collection("users")
        //          .where("Indicados", "array-contains", IdNive3)
        //          .get()
        //          .then((querySnapshot3) => {
        //            var IdNive4 = "";
        //            var Nive4Q = 0;
        //            if(querySnapshot3.size !== 0){
       
        //              querySnapshot3.forEach((doc3) => {
        //                IdNive4 = doc3.id;
        //                Nive4Q =  doc3.data().Nivel4;                 
        //               });
        //               console.log(Nive4Q)
        //               console.log(Nive4Q.length)
        //               firestore.collection("users")
        //               .doc(IdNive4)
        //               .update({
        //                Nivel4: Nive4Q + 1
        //              })
       
                     
       
       
        //            }
                    
        //          })
   
   
   
        //        }
                
        //      })

             
  
   
        //   }

        // }
  
        // });
        
  
  
  
  
    
        await setIrEnt(true);
        await setLoading(false);
  
      var res = [];
  
      // for(let i in Forms ) {
       
      //     await firestore().collection("users").add({
      //       nameComp: "",
      //       nome:"",
      //       FotoPerfil:"",
      //       telefone: Forms[i],
      //       DataEnt:0,
      //       conta:"Dependente",
      //       Dependo: docRef.id,
      //       entrada:false,
      //       Tipo:"Pessoal",
      //       DataCadas: time,
      //       redeSocial:{cidade:"", estado:""},
      //   }).then((docRef2) => {
      //     res.push(docRef2.id)
      // })
      //   }
  
      //   await firestore().collection("users").doc( docRef.id)
      //   .update({
      //     dependentes: res,
      // }).then((def)=>{
         
      // })
     
    
    })
    .catch((error) => {
        
    });
  
  
     
      
     }
   
  })
  .catch((error) => {
   
  });
  
       
    },
    
    signIn3: async (Tel, code, Tentativa, setIrpre, setLoading, setModalAlert, setModalText, setTentativa) => {
      var tel = await AsyncStorage.getItem('Tel');
      var codig = await parseInt(code); 
      console.log(codig)
   await firestore.collection("users")
   .where("Telefone", "==", tel)
   .where("CodigEnt", "==", codig)
   .get().then((querySnapshot) => {
     if(querySnapshot.size !== 0){
      querySnapshot.forEach(async (doc) => {
       
            await AsyncStorage.setItem('Id', doc.id);
  
            let time = new Date().getTime();
            firestore.collection("users")
            .doc(doc.id)
            .update({
              DataEntCel: time,
          })
          .then( async() => {
           
            let temp = await time.toString();
            
            await AsyncStorage.setItem('@entrada', temp);
            await AsyncStorage.setItem('@Id', doc.id);
            await setIrpre(true);
          })
          .catch((error) => {
          
            
          });
    
       
      
    
      
    });
  
     } else {
      setLoading(false);
      setTentativa(Tentativa+1)
       setModalAlert(true)
       setModalText("Código Errado "+(Tentativa+1)+"° tentativa de 3")
     }
   
  })
  .catch((error) => {
   
  });
  
  
  
       
    },

    VariacaoTemp: async(Id)=> {
      var IdUser = Id;
    console.log(IdUser)
      let now = new Date()
     
      const dados = await firestore.collection('TempVariacao').doc(IdUser)
      .set({
        Servidor:firebase.firestore.FieldValue.serverTimestamp(),
        Sitema: now,
    })
  
  
  },
  
  VarTempPegar: async(Id, setVaria)=> {
  
    var IdUser = Id;
     
      const dados = await firestore.collection('TempVariacao')
      .doc(IdUser).onSnapshot(async (doc) => {
        if(doc.data().Servidor){
       
          let Vari = doc.data().Servidor.seconds - doc.data().Sitema.seconds;
          setVaria(Vari);
          var stVari= Vari.toString();
          await AsyncStorage.setItem('varia', stVari);
        }
       
    });
  
  
  },

    
    ListJogos: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
      let time = new Date().getTime();
      let Antes = Dat/1000;
      let Depois = Dat2/1000;
      console.log(Antes);
      console.log(Depois);
      console.log(firebase.firestore.FieldValue.serverTimestamp()); 
             await firestore.collection("JogosCirados")
              .where("DiaJogo", ">=", Antes)
              .where("DiaJogo", "<=", Depois)
               .get().then((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().DiaJogo*1000);
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
                currentDate += hours+':'+minutes;
                 
                   res.push({
                     id: doc.id,
                     dataJogo: doc.data().DiaJogo,
                     Analisado:doc.data().Analisado,
                     AtualApi:doc.data().AtualApi,
                     Atualizei:doc.data().Atualizei,
                     Best:doc.data().Best,
                     Casa:doc.data().Casa,
                     CasaDeAposta:doc.data().CasaDeAposta,
                     Estadio:doc.data().Estadio,
                     Fora:doc.data().Fora,
                     dataCriacao:doc.data().dataCriacao,
                     fixture:doc.data().fixture,
                     liga:doc.data().liga,
                     LinkResu:doc.data().LinkResu,
                     dataForm:currentDate,
   
                    
                   });    
                 
                 
               });
               
               res.sort((a,b)=>{
                 if(a.dataJogo > b.dataJogo) {
                   return 1;
                 } else {
                   return -1;
                 }
               });
               if(res[0]){
                setListOc(res);
              } else {
                setListOc("nada");
              }
               setCarreg(false);  
       
                 });
   
             
             
           
      
        
       
       
     },
     AnaliseOldsBole: async(SimAp, IdApos,  setAnliAp,  setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)=> {
      var res = [];
      var rever=[]
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
    
        
            console.log(SimAp)
            for(let i in SimAp){

           await  firestore.collection("CasaOlds")
            .doc(SimAp[i].IdCasa)
            .get().then((doc) => {

            console.log(doc.id)

            res.push({
              id:doc.id,
              Resultado:doc.data().Resultado,
            })

            rever.push(doc.data().Resultado)
         
          
            });
          }
          console.log(res)
          console.log(rever)
          setStatusAp(res);
          setAnliAp(true);
          setCarre(false);
          if(rever.includes("Em Analise")){
            
            await firestore.collection("CompApostas").doc(IdApos)
              .update({
                AnaliTotal:false,
                Aprovado:false,

              });
      
   

          } else if(rever.includes("Reprovado") ){
            
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              AnaliTotal:true,
              Aprovado:false,

            });

          } else {
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              AnaliTotal:true,
              Aprovado:true,

            });
            setAproPag(true);
    

          }


   
              
             
           
      
        
       
       
     },

     AnaliseOlds: async( DadosBet, DadoTitu, DadoFili, SimAp, IdApos,  setAnliAp,  setAproPag, setStatusAp, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setCarre)=> {
      var res = [];
      var rever=[]
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id,
            Nome = doc.data().Nome
            });
            console.log(SimAp)
            for(let i in SimAp){

           await  firestore.collection("CasaOlds")
            .doc(SimAp[i].IdCasa)
            .get().then((doc) => {

            console.log(doc.id)

            res.push({
              id:doc.id,
              Resultado:doc.data().Resultado,
            })

            rever.push(doc.data().Resultado)
         
          
            });
          }
          console.log(res)
          console.log(rever)
          setStatusAp(res);
          setAnliAp(true);
          setCarre(false);
          if(rever.includes("Em Analise")){
            
            await firestore.collection("CompApostas").doc(IdApos)
              .update({
                AnaliTotal:false,
                Aprovado:false,

              });
      
   

          } else if(rever.includes("Reprovado") ){
            
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              AnaliTotal:true,
              Aprovado:false,

            });






          } else {
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              AnaliTotal:true,
              Aprovado:true,

            });
            setAproPag(true);
    

          }


   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },

     AnaliseOldsGeral: async(Lista, DadosBet, DadoTitu, DadoFili, setQJogos, setPgCash, setAlert, setAlertTipo, setModalCalend, setVerNotajogo)=> {
      
   
     
    
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id,
            Nome = doc.data().Nome
            });

            for(let j in Lista){

              var Qt = Lista.length;
              var Qa = parseInt(j)+1;
              setQJogos(parseInt((Qa/Qt)*100))
            
              var res = [];
              var rever=[];
              for(let i in Lista[j].SimAp){

                await  firestore.collection("CasaOlds")
                 .doc(Lista[j].SimAp[i].IdCasa)
                 .get().then((doc) => {
     
                 console.log(doc.id)
     
                 res.push({
                   id:doc.id,
                   Resultado:doc.data().Resultado,
                 })
     
                 rever.push(doc.data().Resultado)
              
               
                 });
               }
               console.log(res)
               console.log(rever)
              
               if(rever.includes("Em Analise")){
                 
                 await firestore.collection("CompApostas").doc(Lista[j].id)
                   .update({
                     AnaliTotal:false,
                     Aprovado:false,
     
                   });
           
        
     
               } else if(rever.includes("Reprovado") ){
                 
                 await firestore.collection("CompApostas").doc(Lista[j].id)
                 .update({
                   AnaliTotal:true,
                   Aprovado:false,
     
                 });

                 var ver = Lista[j].TelCli.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");

                 if(DadoTitu.Funcionario === true){

                  var data1={
                    "phone": par3,
                    "message": `Olá, sua aposta feita na Empresa ${DadoFili.ConfigEmp.NomeEmp}, Foi analisada e Você Não Ganhou o Prêmio!`,
                    "image": DadoFili.LogoEmp,
                    "linkUrl": `${URL_SITE}/boleto/${Lista[j].id}`,
                    "title": "Link para Entrar No Boleto",
                    "linkDescription": `lhe enviamos Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, para você poder Conferir o Resultado!`
                  }
                  var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
                  const req2 = await fetch(`${LinWha}/send-link`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data1),
                      });

                 } else {
                  var data1={
                    "phone": par3,
                    "message": `Olá, sua aposta feita na Empresa ${DadoTitu.ConfigEmp.NomeEmp}, Foi analisada e Você Não Ganhou o Prêmio!`,
                    "image": DadoFili.LogoEmp,
                    "linkUrl": `${URL_SITE}/boleto/${Lista[j].id}`,
                    "title": "Link para Entrar No Boleto",
                    "linkDescription": `lhe enviamos Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, para você poder Conferir o Resultado!`
                  }
                  var LinWha = DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";

                  const req2 = await fetch(`${LinWha}/send-link`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data1),
                      });

                 }


              
     
               } else {
                 await firestore.collection("CompApostas").doc(Lista[j].id)
                 .update({
                   AnaliTotal:true,
                   Aprovado:true,
     
                 });

                 var ver = Lista[j].TelCli.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");

                 if(DadoTitu.Funcionario === true){

                  var data1={
                    "phone": par3,
                    "message": `Olá, sua aposta feita na Empresa ${DadoFili.ConfigEmp.NomeEmp}, Foi analisada e Você Ganhou o Prêmio, parabéns, estamos preparando para lhe pagar!`,
                    "image": DadoFili.LogoEmp,
                    "linkUrl": `${URL_SITE}/boleto/${Lista[j].id}`,
                    "title": "Link para Entrar No Boleto",
                    "linkDescription": `lhe enviamos Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, para você poder Conferir o Resultado!`
                  }
                  var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
                  const req2 = await fetch(`${LinWha}/send-link`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data1),
                      });

                 } else {

                  var data1={
                    "phone": par3,
                    "message": `Olá, sua aposta feita na Empresa ${DadoTitu.ConfigEmp.NomeEmp}, Foi analisada e Você Ganhou o Prêmio, parabéns, estamos preparando para lhe pagar!`,
                    "image": DadoFili.LogoEmp,
                    "linkUrl": `${URL_SITE}/boleto/${Lista[j].id}`,
                    "title": "Link para Entrar No Boleto",
                    "linkDescription": `lhe enviamos Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, para você poder Conferir o Resultado!`
                  }
                  var LinWha = DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";

                  const req2 = await fetch(`${LinWha}/send-link`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data1),
                      });

                 }


                 
         
     
               }

             
            
     
              
            }

            setModalCalend(false)
            setPgCash(false)
            setVerNotajogo(false)
           
         

   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },


     Enviandopaga: async(ValPremi, DadosBet, DadoTitu, DadoFili, IdApos, ValPreDemos, setPremio, setCarre)=> {
      var res = [];
      var rever=[]
      var IdUser = ""
      var Nome = ""
      var Dinheiro = 0;
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      var tempReal = new Date().getTime()
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id;
            Nome = doc.data().Nome;
            Dinheiro = doc.data().Dinheiro;
            });
            
           var din =  ValPreDemos.replace(",", ".");
           var diner = parseFloat(din);
        
          
            await firestore.collection("CompApostas").doc(IdApos)
            .update({
              PremioPago:true,
            });

         
            await firestore.collection("CompApostas")
            .doc(IdApos)
            .get().then(async(doc) => {
              var DadosApo = doc.data()
              await firestore.collection("users")
              .doc(IdUser)
              .update({
                Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Pagou Prêmio", Nivel:"1", Valor:ValPremi, Moeda:"Real", IdInf:[DadosApo] })
              })

            if(DadoTitu.Funcionario === false){

              let currentDate25 = '';
              let now25 =new Date(doc.data().DataApost);
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

                var Msg = ""

                Msg = Msg + `----- Informação ${DadoTitu.ConfigEmp.NomeEmp} -----\n`
                Msg = Msg + `Estamos preparando para pagar seu Prêmio\n`;
                Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
               
                Msg = Msg + `----------------------------------------------\n`
                Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                Msg = Msg + `Data da Aposta: ${currentDate25}\n`
               
                Msg = Msg + `Cambista: --------------------\n`;
                Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
               
                


                var ver = doc.data().TelComp.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");

                var data={
                  "phone": par3,
                  "message": Msg,
                }
                var LinWha =DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";   
                const req = await fetch(`${LinWha}/send-messages`, 
                {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                   });

                   var data1={
                    "phone": par3,
                    "message": `Olá ${doc.data().NomeComp}, Acesse Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, Para você acopanhar Sua Aposta!`,
                    "image": DadoTitu.LogoEmp,
                    "linkUrl": `${URL_SITE}/boleto/${IdApos}`,
                    "title": "Link para Entrar No Boleto",
                    "linkDescription": ` lhe enviamos Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, para você poder entrar de maneira mais facil!`
                  }
                  const req2 = await fetch(`${LinWha}/send-link`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data1),
                      });
                

              } 
              })
           
          
            setPremio(true)
            setCarre(false);
          


   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },

    

     MeusJogos: async(Jogos, Page, setListOc, setCarreg, setInd, Dat, Dat2,)=> {
   
      let Antes = Dat;
      let Depois = Dat2;
      console.log(Antes);
      console.log(Depois);
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
     
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
      

        if(querySnapshot.size !== 0){
          var N2Q = [];

          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id;
            Nome = doc.data().Nome;
            N2Q = doc.data().Indicados;
            });
            var ListUser =[]
            for(let i in N2Q){
              await firestore.collection("users")
              .doc(N2Q[i])
              .get()
              .then((doc23)=>{
                 ListUser.push({
                  Id:doc23.id,
                  Nome:doc23.data().Nome,
                 })
              })
            }

            setInd(ListUser)

          
     
            if(Jogos === 'Meus Jogos'|| Jogos === null ){
                 await firestore.collection("CompApostas")
               .where("DataApost", ">=", Antes)
               .where("DataApost", "<=", Depois)
               .where("IdCri", "==", IdUser)
               .onSnapshot(async (querySnapshot1) => {
             
                var res = []; 
               console.log("q "+querySnapshot1.size)

               querySnapshot1.forEach((doc1) => {
              
                let currentDate = moment(doc1.data().DataApost).format("DD/MM/YYYY HH:mm");
               console.log(doc1.id)
                 
                   res.push({
                   IdCri:doc1.data().IdCri,
                   id: doc1.id,
                   dataJogo:doc1.data().DataApost,
                   NomeCam:doc1.data().Nome,
                   TelCam :doc1.data().Tel,
                   Nome:doc1.data().NomeComp,
                   TelCli:doc1.data().TelComp,
                   Pago:doc1.data().Pago,
                   Aprovado:doc1.data().Aprovado,
                   PremioPago:doc1.data().PremioPago,
                   AnaliTotal:doc1.data().AnaliTotal,
                   ValPreDemos:doc1.data().ValorPremio,
                   ValorReal:doc1.data().ValorAposta,
                   SimAp:doc1.data().Bets,
                   ValCambis:doc1.data().ValCambis,
                   VaToCo:doc1.data().CotaGeral,
                   ValApos:doc1.data().valorAposSimb,
                   Cash:doc1.data().CashGanha, 
                   dataForm:currentDate,
                  Cambista:doc1.data().Cambista,
                  Mp:doc1.data().PgMp?doc1.data().PgMp:false,
   
                    
                   });    
                 
                 
               });

               res.sort((a,b)=>{
                if(a.dataJogo > b.dataJogo) {
                  return 1;
                } else {
                  return -1;
                }
              });
              if(res[0]){
                setListOc(res);
              } else {
                setListOc("nada");
              }
              
              setCarreg(false); 
              
              });

            } else if(Jogos === 'Cambistas'){
              console.log(N2Q)
              var resList = []; 

              
               for(let i in N2Q ){
                var res = []; 
                console.log(N2Q[i])
            await firestore.collection("CompApostas")
            .where("DataApost", ">=", Antes)
            .where("DataApost", "<=", Depois)
            .where("IdCri", "==", N2Q[i])
            .onSnapshot(async(querySnapshot12) => {
             
            
          console.log("q "+querySnapshot12.size)
            
           await querySnapshot12.forEach((doc12) => {
           
             let currentDate = moment(doc12.data().DataApost).format("DD/MM/YYYY HH:mm");
            console.log(doc12.id)
              console.log(doc12.data().IdCri)
                res.push({
                IdCri:doc12.data().IdCri,
                id: doc12.id,
                dataJogo:doc12.data().DataApost,
                NomeCam:doc12.data().Nome,
                TelCam :doc12.data().Tel,
                Nome:doc12.data().NomeComp,
                TelCli:doc12.data().TelComp,
                Pago:doc12.data().Pago,
                Aprovado:doc12.data().Aprovado,
                PremioPago:doc12.data().PremioPago,
                AnaliTotal:doc12.data().AnaliTotal,
                ValPreDemos:doc12.data().ValorPremio,
                ValorReal:doc12.data().ValorAposta,
                SimAp:doc12.data().Bets,
                ValCambis:doc12.data().ValCambis,
                VaToCo:doc12.data().CotaGeral,
                ValApos:doc12.data().valorAposSimb,
                Cash:doc12.data().CashGanha, 
                dataForm:currentDate,
               Cambista:doc12.data().Cambista,
               Mp:doc12.data().PgMp?doc12.data().PgMp:false,

                 
                });    
              
              
            });
      
           

          
        
          

           });
          

            }
 
         
            console.log(res)
            res.sort((a,b)=>{
              if(a.dataJogo > b.dataJogo) {
                return 1;
              } else {
                return -1;
              }
            });
            if(res[0]){
              setListOc(res);
            } else {
              setListOc("nada");
            }
            setCarreg(false); 

        
           
            
          


            } else {
             
              await firestore.collection("CompApostas")
              .where("DataApost", ">=", Antes)
              .where("DataApost", "<=", Depois)
              .where("IdCri", "==", Jogos)
              .onSnapshot(async (querySnapshot1) => {
            
               var res = []; 
              console.log("q "+querySnapshot1.size)

              querySnapshot1.forEach((doc1) => {
             
               let currentDate = moment(doc1.data().DataApost).format("DD/MM/YYYY HH:mm");
              console.log(doc1.id)
                
                  res.push({
                  IdCri:doc1.data().IdCri,
                  id: doc1.id,
                  dataJogo:doc1.data().DataApost,
                  NomeCam:doc1.data().Nome,
                  TelCam :doc1.data().Tel,
                  Nome:doc1.data().NomeComp,
                  TelCli:doc1.data().TelComp,
                  Pago:doc1.data().Pago,
                  Aprovado:doc1.data().Aprovado,
                  PremioPago:doc1.data().PremioPago,
                  AnaliTotal:doc1.data().AnaliTotal,
                  ValPreDemos:doc1.data().ValorPremio,
                  ValorReal:doc1.data().ValorAposta,
                  SimAp:doc1.data().Bets,
                  ValCambis:doc1.data().ValCambis,
                  VaToCo:doc1.data().CotaGeral,
                  ValApos:doc1.data().valorAposSimb,
                  Cash:doc1.data().CashGanha, 
                  dataForm:currentDate,
                 Cambista:doc1.data().Cambista,
                 Mp:doc1.data().PgMp?doc1.data().PgMp:false,
  
                   
                  });    
                
                
              });

              res.sort((a,b)=>{
               if(a.dataJogo > b.dataJogo) {
                 return 1;
               } else {
                 return -1;
               }
             });
             if(res[0]){
              setListOc(res);
            } else {
              setListOc("nada");
            }
             setCarreg(false); 
             
             });

           
            }


          

           
              

               
             
       
                
              

               

                }
              });
   
           
             
           
      
        
       
       
     },

     DadosGraficos: async( Page, setLisCam, setApos, setNiveis, setJogos, setGanhos,  setCarreg,  Dat, Dat2, )=> {
   
      let Antes = Dat ;
      let Depois = Dat2;
      let Indicados = [];
      let Extrato = [];
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          var res = []
          var resList = []
          var QC = 0;
          var LisApos =[];

          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id;
            Nome = doc.data().Nome;
            res = doc.data().Indicados
          
            });
          var resLoa = 0;
          var LisApos =[];
          var LisQ = [];
          for(let i in res){
           
            var Rend = 0;
            await firestore.collection("CompApostas")
            .where("IdCri", "==", res[i])
            .where("DataApost", ">=", Dat)
            .where("DataApost", "<=", Dat2)
            .get()
            .then(async (querySnapshot)=>{
             
              LisQ.push(querySnapshot.size)
               Rend = 0;
                querySnapshot.forEach( async (doc1) => {
                 
                    resLoa = resLoa +  doc1.data().ValorAposta;
                    Rend = Rend +  doc1.data().ValorAposta;
                    
                  });
                  console.log(Rend)
                  LisApos.push(Rend)
            });
        
           
            

            await firestore.collection("users")
             .doc(res[i])
             .get()
             .then((dec)=>{

              
             
              resList.push(dec.data().Nome.substring(0,6))
               ;
             })
           
          }    
                
                 
                 
          console.log(LisApos)
          console.log(resList)
               
            setLisCam(resList)
            setGanhos(LisApos) 
            setApos(LisQ)
              
               setCarreg(false);  
       
          
   
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              })  
             
           
      
        
       
       
     },

     MeusIndicados: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat ;
      let Depois = Dat2;
    
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var IdUser = await AsyncStorage.getItem('@Id');
      var temp = parseInt(time)
    
       
       console.log(IdUser)
             await firestore.collection("BancoWhats")
               .where("IdUser", "==", IdUser)
               .orderBy("Aprovado", "desc")
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().DataFin);
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
      
                  res.push({
                    id:doc.id,
                    Nome:doc.data().NomeConv,
                    Telefone:doc.data().Telefone,
                    Data:currentDate,
                    DataFin:doc.data().DataFin,
                    Aprovado:doc.data().Aprovado,
                  })
                 
                
                 
                 
               });
               
            
              
               setListOc(res);
               setCarreg(false);  
       
                 });
   
              
             
           
      
        
       
       
     },


     ListJogosCambis: async(Page, setListOc, setCarreg,  Dat, Dat2,)=> {
   
      let Antes = Dat;
      let Depois = Dat2;
      console.log(Antes);
      console.log(Depois);
      var Nome = ""
      var IdUser = await AsyncStorage.getItem('@Id');
     
      
       
             await firestore.collection("NotaCambista")
               .where("dataCriar", ">=", Antes)
               .where("dataCriar", "<=", Depois)
               .where("IdCri", "==", IdUser)
               .onSnapshot((querySnapshot) => {

               var res = []; 
               console.log("q "+querySnapshot.size)
               querySnapshot.forEach((doc) => {

                let currentDate = '';
                let now =new Date(doc.data().dataCriar);
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
                currentDate += hours+':'+minutes;
                 
                   res.push({
                    id: doc.id,
                   dataJogo:doc.data().dataCriar,
                   NomeCam:doc.data().Nome,
                   TelCam :doc.data().Tel,
                   Nome:doc.data().NomeComp,
                   TelCli:doc.data().TelComp,
                   Pago:doc.data().Pago,
                   Concluir:doc.data().Conscluido,
                   ValPreDemos:doc.data().ValorPremio,
                   ValorReal:doc.data().ValorAposta,
                   SimAp:doc.data().Bets,
                   ValCambis:doc.data().ValCambis,
                   VaToCo:doc.data().CotaGeral,
                   ValApos:doc.data().valorAposSimb,
                   Cash:doc.data().CashGanha, 
                   dataForm:currentDate,
                   JogosId: doc.data().JogosId,
                   JogoFeito: doc.data().JogoFeito? doc.data().JogoFeito: false, 
   
                    
                   });    
                 
                 
               });
               
               res.sort((a,b)=>{
                 if(a.dataJogo > b.dataJogo) {
                   return 1;
                 } else {
                   return -1;
                 }
               });
             
               if(res[0]){
                setListOc(res);
              } else {
                setListOc("nada");
              }
               setCarreg(false);  
       
                 });
   
              
             
           
      
        
       
       
     },

     JogoCriadoCamb: async(id,  setJogoFeito, setJogosBet, setLogo, setNomeEmp, setVaToCo, setValPreDemos, setValorReal, setSimAp, setValApos,setNome, setTelCli, setNomeCam, setTelCam, setConcluir, setPago, setValCambis, setQCash,  )=> {
   
      await firestore.collection("NotaCambista").doc(id)
      .get()
      .then((doc) => {
          
  
  
          setNomeCam(doc.data().Nome);
          setTelCam(doc.data().Tel);
          setNome(doc.data().NomeComp);
          setTelCli(doc.data().TelComp);
          setPago(doc.data().Pago);
          setConcluir(doc.data().Conscluido);
          setValPreDemos(doc.data().ValorPremio);
          setValorReal(doc.data().ValorAposta);
          setSimAp(doc.data().Bets);
          setValCambis(doc.data().ValCambis);
          setVaToCo(doc.data().CotaGeral);
          setValApos(doc.data().valorAposSimb); 
          setNomeEmp(doc.data().NomeEmp)
          setLogo(doc.data().LogoEmp)
          setJogosBet(doc.data().JogosId?doc.data().JogosId: [] )
          setJogoFeito(doc.data().JogoFeito? doc.data().JogoFeito:false)
        });
      
    },

    BoleCri: async(id, setAnal,  setTokenMp, setApor, setLogo, setNomeEmp, setVaToCo, setValPreDemos, setValorReal, setSimAp, setValApos,setNome, setTelCli, setNomeCam, setTelCam, setConcluir, setPago, setValCambis, setQCash,  )=> {
   
      await firestore.collection("CompApostas").doc(id)
      .onSnapshot((doc) => {
          
  
  
          setNomeCam(doc.data().Nome);
          setTelCam(doc.data().Tel);
          setNome(doc.data().NomeComp);
          setTelCli(doc.data().TelComp);
          setPago(doc.data().Pago);
          setConcluir(doc.data().Conscluido);
          setValPreDemos(doc.data().ValorPremio);
          setValorReal(doc.data().ValorAposta);
          setSimAp(doc.data().Bets);
          setValCambis(doc.data().ValCambis);
          setVaToCo(doc.data().CotaGeral);
          setValApos(doc.data().valorAposSimb); 
          setNomeEmp(doc.data().NomeEmp)
          setLogo(doc.data().LogoEmp)
          setAnal(doc.data().AnaliTotal)
          setApor(doc.data().Aprovado)
          setTokenMp(doc.data().TokenMp)
      });
      
    },

    ConcluirApost: async(id, setConcluir, setPago, setJogoFeito )=> {
   
   
      await firestore.collection('NotaCambista')
        .doc(id).onSnapshot((doc) => {
         setConcluir(doc.data().Conscluido)
         setPago(doc.data().Pago)
         setJogoFeito(doc.data().JogoFeito? doc.data().JogoFeito:false)
         
      });
   
   
  },

  AtuComb: async( IdApos )=> {
  
    await firestore.collection("NotaCambista").doc(IdApos)
    .update({
        
    JogoFeito:true,
       

  
    });
    
  },


    EnviadoAposCam: async(JogosBet, id, VaToCo, ValPreDemos, ValorReal, SimAp, ValApos, Nome, TelCli, NomeCam, TelCam, Concluir, Pago, ValCambis, QCash)=> {
      console.log(SimAp)
      await firestore.collection("NotaCambista").doc(id)
      .update({
          
          Pago:Pago,
          Conscluido:Concluir,
          ValorPremio:ValPreDemos,
          ValorAposta:ValorReal,
           Bets:SimAp,
          ValCambis:ValCambis,
           CotaGeral:VaToCo,
           valorAposSimb:ValApos,
           CashGanha:QCash,
           JogosId: JogosBet,
  
    
      });
      
    },

    TiraConcluidoApos: async(IdApos, Concluir)=> {
 
      await firestore.collection("NotaCambista").doc(IdApos)
      .update({
  
        Conscluido:Concluir,
  
      }).then(()=>{
       
      });
      
    },

     Apostando: async(QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)=> {
      var Msg = ""
      var IdUser = ""
      var Nome = ""
      var tel = await AsyncStorage.getItem('Tel');
      var time = await AsyncStorage.getItem('@entrada');
      var temp = parseInt(time)
      await firestore.collection("users")
      .where("Telefone", "==", tel)
      .where("DataEntCel", "==", temp)
      .get().then( async(querySnapshot) => {
     
        if(querySnapshot.size !== 0){
          querySnapshot.forEach( async (doc) => {
            IdUser = doc.id,
            Nome = doc.data().Nome

            });

            if(Cambis === false){
     
              await firestore.collection("CompApostas")
              .add({
      
              Nome:Nome,
              Tel:tel,
              IdCri:IdUser,
              Cambista:Cambis,
              NomeComp:NomeCli,
              TelComp:TelCli,
              Pago:false,
              PremioPago:false,
              AnaliTotal:false,
              Aprovado:false,
              DataApost:new Date().getTime(),
              ValorPremio: ValPreDemos,
              ValorAposta: ValorReal,
              Bets:SimAp,
              ValCambis:ValCambis,
              CotaGeral:VaToCo,
              valorAposSimb:ValApos,
      
           
              }).then(async (def) => {
              
               var data = new URLSearchParams();
                 data.append('Valor', ValorReal);
                 data.append('Nome', Nome);
                 data.append('Tel', tel);
                 data.append('IdApos', def.id);
           
             const req = await fetch(" https://us-central1-pixbetcash.cloudfunctions.net/api/criarPagamento", {
               method: 'POST',
               headers:{
                 'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: data.toString(),
               json: true,
             });
            
             const json = await req.json();
           
             if(json){
              
               setLinkEnv(json.resposta.response.init_point);
               setCarre(false);
               setAlert("Aposta Criada Com Sucesso!");
               setAlertTipo("success");
               setVerNotajogo(false);
               setModalCalend(true)
               setSimAp([]);
               setValCambis("");
               setValorReal(0);
               setValPremi(0);
               setTelCli("");
               setNomeCli("");
               setCambis(false);
               setValPreDemos("");
               setVaToCo(0)
      
              
              }
           
           
              
           
             
           
           })
            .catch((error) => {
                console.error("Error adding document: ", error);
            }); 
           
           
          } else {
      
            
            var ver = TelCli.replace("(", "55");
            var par1 = ver.replace(")", "");
            var par3 = par1.replace("-", "");
         
            const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
            {
                  method: 'GET',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                 
                });
        
            
              
                const json = await req.json(); 
                
                if(json.exists === true){
      
                  await firestore.collection("CompApostas")
                  .add({
          
                  Nome:Nome,
                  Tel:tel,
                  IdCri:IdUser,
                  Cambista:Cambis,
                  NomeComp:NomeCli,
                  TelComp:TelCli,
                  Pago:false,
                  PremioPago:false,
                  Aprovado:false,
                  AnaliTotal:false,
                  DataApost:new Date().getTime(),
                  ValorPremio: ValPreDemos,
                  ValorAposta: ValorReal,
                  Bets:SimAp,
                  ValCambis:ValCambis,
                  CotaGeral:VaToCo,
                  valorAposSimb:ValApos,
          
               
                  }).then(async (def) => {
                    console.log(def.id)
                   var data = new URLSearchParams();
                     data.append('Valor', ValorReal);
                     data.append('Nome', Nome);
                     data.append('Tel', tel);
                     data.append('IdApos', def.id);
               
                 const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/criarPagamento", {
                   method: 'POST',
                   headers:{
                     'Content-Type': 'application/x-www-form-urlencoded',
                   },
                   body: data.toString(),
                   json: true,
                 });
                
                 const json = await req.json();
               
                 if(json){
                   console.log(json.resposta.response.init_point)
                   setLinkEnv(json.resposta.response.init_point);
                   setCarre(false);
                   setAlert("Aposta Criada Com Sucesso!");
                   setAlertTipo("success");
                   setVerNotajogo(false)
                   setModalCalend(true)
                   setSimAp([]);
                   setValCambis("");
                   setValorReal(0);
                   setValPremi(0);
                   setTelCli("");
                   setNomeCli("");
                   setCambis(false);
                   setValPreDemos("");
                   setVaToCo(0)
          
                  
                  }
               
               
                  
               
                 
               
               })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                }); 
      
                
                } else {
      
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setAlert("O Telefone do Cliente Não é um Whatsapp!");
                  setAlertTipo("danger");
                  setCarre(false);
               
               
               
                }
          
          
          
          
          
          
          
          }
      

          } else {
            setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
            setAlertTipo("danger")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
          }
        });
       
       },

       TesteHtml: async()=> {
        var data = new URLSearchParams();
        data.append('Valor', "ValorReal");
       
  
    const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/testandoHtml", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString(),
      json: true,
    });
   
    const json = await req.json();
  
    if(json){
     
      console.log(json)
     
     }
         
         },


       PagandoJogo: async(DadoFili, DadoTitu, IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)=> {
        var Msg = ""
        var IdUser = ""
        var Nome = ""
        var tel = await AsyncStorage.getItem('Tel');
        var time = await AsyncStorage.getItem('@entrada');
        var temp = parseInt(time)
        await firestore.collection("users")
        .where("Telefone", "==", tel)
        .where("DataEntCel", "==", temp)
        .get().then( async(querySnapshot) => {
       
          if(querySnapshot.size !== 0){
            querySnapshot.forEach( async (doc) => {
              IdUser = doc.id,
              Nome = doc.data().Nome
  
              });
  
              if(DadoTitu.Funcionario === true){

                await firestore.collection("CompApostas").doc(IdApos)
                .update({
                  TokenMp:DadoFili.ConfigEmp.LinkMp,
                });
              
                
                 var data = new URLSearchParams();
                   data.append('Valor', ValorReal);
                   data.append('Nome', Nome);
                   data.append('Tel', tel);
                   data.append('IdApos', IdApos);
                   data.append('tokey', DadoFili.ConfigEmp.LinkMp);
             
               const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoAposta", {
                 method: 'POST',
                 headers:{
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 body: data.toString(),
                 json: true,
               });
              
               const json = await req.json();
             
               if(json){
                
                 setLinkEnv(json.resposta.response.init_point);
                 setCarre(false);
                 setAlert("Iniciando Pagamento!");
                 setAlertTipo("success");
                 setVerNotajogo(false);
                 setModalCalend(true)
                 setSimAp([]);
                 setValCambis("");
                 setValorReal(0);
                 setValPremi(0);
                 setTelCli("");
                 setNomeCli("");
                 setCambis(false);
                 setValPreDemos("");
                 setVaToCo(0)
        
                
                }
             
             
                
             
               
             
         
             
             
            } else {

              await firestore.collection("CompApostas").doc(IdApos)
              .update({
                TokenMp:DadoTitu.ConfigEmp.LinkMp,
              });
        
              
              var data = new URLSearchParams();
              data.append('Valor', ValorReal);
              data.append('Nome', Nome);
              data.append('Tel', tel);
              data.append('IdApos', IdApos);
              data.append('tokey', DadoTitu.ConfigEmp.LinkMp);
        
          const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoAposta", {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString(),
            json: true,
          });
         
          const json = await req.json();
        
          if(json){
           
            setLinkEnv(json.resposta.response.init_point);
            setCarre(false);
            setAlert("Iniciando Pagamento!");
            setAlertTipo("success");
            setVerNotajogo(false);
            setModalCalend(true)
            setSimAp([]);
            setValCambis("");
            setValorReal(0);
            setValPremi(0);
            setTelCli("");
            setNomeCli("");
            setCambis(false);
            setValPreDemos("");
            setVaToCo(0)
   
           
           }
            
            
            
            
            
            
            
            }
        
  
            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")
              setVerNotajogo(false)
              setModalCalend(true)
              setCarre(false);
            }
          });
         
         },

         PagandoJogoCliente: async(TokenMp, IdApos, QuanJog, ValApos, ValPreDemos,  ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo)=> {
          var Msg = ""
          var IdUser = ""
          var Nome = ""
      
    
              
  
                 
                
                  
                   var data = new URLSearchParams();
                     data.append('Valor', ValorReal);
                     data.append('IdApos', IdApos);
                     data.append('tokey', TokenMp);
               
                 const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoAposta", {
                   method: 'POST',
                   headers:{
                     'Content-Type': 'application/x-www-form-urlencoded'
                   },
                   body: data.toString(),
                   json: true,
                 });
                
                 const json = await req.json();
               
                 if(json){
                  
                   setLinkEnv(json.resposta.response.init_point);
                   setCarre(false);
                   setAlert("Iniciando Pagamento!");
                   setAlertTipo("success");
                   setVerNotajogo(false);
                   setModalCalend(true)
                   setSimAp([]);
                   setValCambis("");
                   setValorReal(0);
                   setValPremi(0);
                   setTelCli("");
                   setNomeCli("");
                   setCambis(false);
                   setValPreDemos("");
                   setVaToCo(0)
          
                  
                  }
               
               
                  
               
                 
               
           
               
               
              
          
    
            
           
           },


         CompCash: async( QCash,  NomeCli, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend,)=> {
          var ValorReal = (NomeCli/100).toFixed(2);
          var ValorCash = parseInt(NomeCli)
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
    
                });
    
             
                firestore.collection("NotaCash").add({
                  IdUser: IdUser,
                  Valor: ValorReal,
                  ValorCash:ValorCash,
                  Pago:false,
              })
              .then(async (docRef) => {

                 var idNot = docRef.id
                  var data = new URLSearchParams();
                  data.append('Valor', ValorReal);
                  data.append('IdApos', idNot);
            
              const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoCash", {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString(),
                json: true,
              });
             
              const json = await req.json();
            
              if(json){
               
                setLinkEnv(json.resposta.response.init_point);
                setLoad(false);
                setAlert("Iniciando Pagamento!");
                setAlertTipo("success");
                setVerNotajogo(false);
                setModalCalend(true)
                setNomeCli("");
               
            
            
           } 
              
              
                })
              .catch((error) => {
                  console.error("Error adding document: ", error);
              });
                
                  
                 
          
    
              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            });
           
           },

           PgAsApostas: async(ValCom, ValPa, DadoFili, DadoTitu, DadosBet, ValToP, AposTot, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash, setCriarCli, setValToP, setAposTot )=> {
            var IdUser = ""
            var Nome = ""
            var tel = await AsyncStorage.getItem('Tel');
            var time = await AsyncStorage.getItem('@entrada');
            var temp = parseInt(time)
            await firestore.collection("users")
            .where("Telefone", "==", tel)
            .where("DataEntCel", "==", temp)
            .get().then( async(querySnapshot) => {
              var res = []
              var resList = []
              var QC = 0;
              var LisApos =[];
              var Rend = 0;
              var resLoa = 0;
           
              if(querySnapshot.size !== 0){
                querySnapshot.forEach( async (doc) => {
                  IdUser = doc.id,
                  Nome = doc.data().Nome
                  res = doc.data().Indicados
                  });


               
                  await firestore.collection("CompPg").add({
                    IdUser: IdUser,
                    Valor: ValToP,
                    ValorApos:ValPa,
                    ValorCom:ValCom,
                    Apostas: AposTot,
                    Pago:false,
                    TokenPg:DadoFili.ConfigEmp.LinkMp,
                })
                .then(async (docRef) => {
  
                   var idNot = docRef.id
                   console.log(docRef.id)
                    var data = new URLSearchParams();
                    data.append('Valor', ValToP);
                    data.append('IdApos', idNot);
                    data.append('tokey', DadoFili.ConfigEmp.LinkMp);
              
                const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoComApos", {
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: data.toString(),
                  json: true,
                });
               
                const json = await req.json();
              
                if(json){
                 
                  setLinkEnv(json.resposta.response.init_point);
                  setLoad(false);
                  setAlert("Iniciando Pagamento!");
                  setAlertTipo("success");
                  setVerNotajogo(false);
                  setModalCalend(true)
                  setPgCash(false)
                 
                 
           
                 
              
              
             } 
                
                
                  })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
                  
                    
                   
            
      
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              });
             
             },

           PgSaldoDev: async(SalDev, QDias, DatFut, ValorDat, setDatFutDemo, setDatFut, setValorDat, setQDias, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash, setCriarCli, setSalDev )=> {
            var IdUser = ""
            var Nome = ""
            var tel = await AsyncStorage.getItem('Tel');
            var time = await AsyncStorage.getItem('@entrada');
            var temp = parseInt(time)
            await firestore.collection("users")
            .where("Telefone", "==", tel)
            .where("DataEntCel", "==", temp)
            .get().then( async(querySnapshot) => {
              var res = []
              var resList = []
              var QC = 0;
              var LisApos =[];
              var Rend = 0;
              var resLoa = 0;
           
              if(querySnapshot.size !== 0){
                querySnapshot.forEach( async (doc) => {
                  IdUser = doc.id,
                  Nome = doc.data().Nome
                  res = doc.data().Indicados
                  });


                     await firestore.collection("CompApostas")
                     .where("IdCri", "==", IdUser)
                     .where("ComissaoEmp.Pago", "==", false)
                     .where("Pago", "==", true)
                     .get()
                     .then(async (querySnapshot)=>{
                      
                       if(querySnapshot.size !== 0){
                     
                         querySnapshot.forEach( async (doc1) => {
                             LisApos.push({
                               id: doc1.id,
                               Pago: doc1.data().Pago,
                               ComissaoEmp: doc1.data().ComissaoEmp,
                               ComissaoFun: doc1.data().ComissaoFun,
                               Nome: doc1.data().NomeComp,
                               valorAposSimb: doc1.data().valorAposSimb,
                               DataApost: doc1.data().DataApost,
                               PgMp: doc1.data().PgMp?doc1.data().PgMp:false,
                               ValorAposta: doc1.data().ValorAposta,
                             });
                              Rend = Rend +  doc1.data().ValorAposta;
                           });
                       }
                     });

                         for(let i in res){
                         
                          
                           await firestore.collection("CompApostas")
                           .where("IdCri", "==", res[i])
                           .where("ComissaoEmp.Pago", "==", false)
                           .where("Pago", "==", true)
                           .get()
                           .then(async (querySnapshot)=>{
                            
                             if(querySnapshot.size !== 0){
                           
                               querySnapshot.forEach( async (doc1) => {
                                   LisApos.push({
                                     id: doc1.id,
                                     Pago: doc1.data().Pago,
                                     ComissaoEmp: doc1.data().ComissaoEmp,
                                     ComissaoFun: doc1.data().ComissaoFun,
                                     Nome: doc1.data().NomeComp,
                                     valorAposSimb: doc1.data().valorAposSimb,
                                     DataApost: doc1.data().DataApost,
                                     PgMp: doc1.data().PgMp?doc1.data().PgMp:false,
                                     ValorAposta: doc1.data().ValorAposta,
                                   });
                                   Rend = Rend +  doc1.data().ValorAposta;
                                 });
                             }
                           });
         
                         }
         
                         console.log(Rend)
                         console.log(LisApos)
                         console.log(SalDev)
               
                  await firestore.collection("CompPg").add({
                    IdUser: IdUser,
                    Valor: SalDev,
                    ValorReal:Rend,
                    Apostas:LisApos ,
                    Pago:false,
                })
                .then(async (docRef) => {
  
                   var idNot = docRef.id
                    var data = new URLSearchParams();
                    data.append('Valor',SalDev);
                    data.append('IdApos', idNot);
              
                const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoSaldoDev", {
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: data.toString(),
                  json: true,
                });
               
                const json = await req.json();
              
                if(json){
                 
                  setLinkEnv(json.resposta.response.init_point);
                  setLoad(false);
                  setAlert("Iniciando Pagamento!");
                  setAlertTipo("success");
                  setVerNotajogo(false);
                  setModalCalend(true)
                  setNomeCli("");
                  setPgCash(false)
                  setDatFutDemo("")
                  setDatFut(0)
                  setValorDat(0)
                  setQDias(0)
                 
              
              
             } 
                
                
                  })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
                  
                    
                   
            
      
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              });
             
             },



          
           PgDatven: async(QDias, DatFut, ValorDat, setDatFutDemo, setDatFut, setValorDat, setQDias, setNomeCli, setQCash, setLoad, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setPgCash   )=> {
            var IdUser = ""
            var Nome = ""
            var tel = await AsyncStorage.getItem('Tel');
            var time = await AsyncStorage.getItem('@entrada');
            var temp = parseInt(time)
            await firestore.collection("users")
            .where("Telefone", "==", tel)
            .where("DataEntCel", "==", temp)
            .get().then( async(querySnapshot) => {
           
              if(querySnapshot.size !== 0){
                querySnapshot.forEach( async (doc) => {
                  IdUser = doc.id,
                  Nome = doc.data().Nome
      
                  });
      
               
                  firestore.collection("CompPg").add({
                    IdUser: IdUser,
                    Valor: ValorDat,
                    DatFut: DatFut,
                    QDias: QDias,
                    Pago:false,
                })
                .then(async (docRef) => {
  
                   var idNot = docRef.id
                    var data = new URLSearchParams();
                    data.append('Valor', ValorDat);
                    data.append('IdApos', idNot);
              
                const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoDat", {
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: data.toString(),
                  json: true,
                });
               
                const json = await req.json();
              
                if(json){
                 
                  setLinkEnv(json.resposta.response.init_point);
                  setLoad(false);
                  setAlert("Iniciando Pagamento!");
                  setAlertTipo("success");
                  setVerNotajogo(false);
                  setModalCalend(true)
                  setNomeCli("");
                  setPgCash(false)
                  setDatFutDemo("")
                  setDatFut(0)
                  setValorDat(0)
                  setQDias(0)
                 
              
              
             } 
                
                
                  })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
                  
                    
                   
            
      
                } else {
                  setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                  setAlertTipo("danger")
                  setVerNotajogo(false)
                  setModalCalend(true)
                  setCarre(false);
                }
              });
             
             },

         EnviandoNota: async(DadosBet, DadoTitu, DadoFili, IdApos, setPago, setRobo,  setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos)=> {
       
          var Msg = ""
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });

              await firestore.collection("CompApostas")
              .doc(IdApos)
              .get().then(async(doc) => {
            


            if(DadoTitu.Funcionario === true){

                let currentDate25 = '';
                let now25 =new Date(doc.data().DataApost);
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

                  var Msg = ""

                  Msg = Msg + `----- Boleto de Aposta ${DadoFili.ConfigEmp.NomeEmp} -----\n`
                  Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                  Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                  Msg = Msg + `Data: ${currentDate25}\n`
                  Msg = Msg + `----------------------------------------------\n`
                  
                  for(let i in doc.data().Bets){

                  let currentDate = '';
                  let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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


                  Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                  }

                  Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                  Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
                  Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                  Msg = Msg + `Cambista: --------------------\n`;
                  Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                  Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
                  Msg = Msg + `Cambista Ganhará ${DadoTitu.PorcenPremio}% em Cima do Prêmio.\n`;
                  Msg = Msg + `Quando Terminar todos os Jogos, analisaremos sua aposta, e enviaremos para seu WhatsApp se você ganhou ou perdeu o prêmio\n`;
                  Msg = Msg + `Caso Ganhe o Prêmio, entraremos em contato com você via WhatsApp, para efetuarmos o Pagamento do Prêmio\n`;
                  Msg = Msg + `WhatsApp da ${DadoFili.ConfigEmp.NomeEmp}: ${DadoFili.Telefone} `;
                  


                  var ver = doc.data().TelComp.replace("(", "55");
                  var par1 = ver.replace(")", "");
                  var par3 = par1.replace("-", "");

                  var data={
                    "phone": par3,
                    "message": Msg,
                  }
                  var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";   
                  const req = await fetch(`${LinWha}/send-messages`, 
                  {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                     });

                     var data1={
                      "phone": par3,
                      "message": `Olá ${doc.data().NomeComp}, ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, Para você acopanhar!`,
                      "image": DadoFili.LogoEmp,
                      "linkUrl": `${URL_SITE}/boleto/${IdApos}`,
                      "title": "Link para Entrar No Boleto",
                      "linkDescription": ` ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, para você poder entrar de maneira mais facil!`
                    }
                    const req2 = await fetch(`${LinWha}/send-link`, 
                    {
                          method: 'POST',
                          headers:{
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data1),
                        });
                  

                } else {
                  
                  let currentDate25 = '';
                  let now25 =new Date(doc.data().DataApost);
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
  
                    var Msg = ""
  
                    Msg = Msg + `----- Boleto de Aposta ${DadoTitu.ConfigEmp.NomeEmp} -----\n`
                    Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                    Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                    Msg = Msg + `Data: ${currentDate25}\n`
                    Msg = Msg + `----------------------------------------------\n`
                    
                    for(let i in doc.data().Bets){
  
                    let currentDate = '';
                    let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
  
  
                    Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                    }
  
                    Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                    Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
                    Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                    Msg = Msg + `Cambista: --------------------\n`;
                    Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                    Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
                    Msg = Msg + `Cambista Ganhará ${DadoTitu.PorcenPremio}% em Cima do Prêmio.\n`;
                    Msg = Msg + `Quando Terminar todos os Jogos, analisaremos sua aposta, e enviaremos para seu WhatsApp se você ganhou ou perdeu o prêmio\n`;
                    Msg = Msg + `Caso Ganhe o Prêmio, entraremos em contato com você via WhatsApp, para efetuarmos o Pagamento do Prêmio\n`;
                    Msg = Msg + `WhatsApp da ${DadoTitu.ConfigEmp.NomeEmp}: ${DadoTitu.Telefone} `;
                    
  
  
                    var ver = doc.data().TelComp.replace("(", "55");
                    var par1 = ver.replace(")", "");
                    var par3 = par1.replace("-", "");
  
                    var data={
                      "phone": par3,
                      "message": Msg,
                    }
                    var LinWha =  DadoTitu.ConfigEmp.LinkWhats !== "" ?  DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";   
                    const req = await fetch(`${LinWha}/send-messages`, 
                    {
                          method: 'POST',
                          headers:{
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data),
                       });
  
                       var data1={
                        "phone": par3,
                        "message": `Olá ${doc.data().NomeComp}, ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, Para você acopanhar!`,
                        "image": DadoTitu.LogoEmp,
                        "linkUrl": `${URL_SITE}/boleto/${IdApos}`,
                        "title": "Link para Entrar No Boleto",
                        "linkDescription": ` ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, para você poder entrar de maneira mais facil!`
                      }
                      const req2 = await fetch(`${LinWha}/send-link`, 
                      {
                            method: 'POST',
                            headers:{
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data1),
                          });
            

                  



                  }

           setAlert("Link Enviado Com Sucesso!")
            setAlertTipo("sucess")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
            setCriarCli(false);
            setEnviLin(false)
            setRobo(true)
            setIdApos("");
            setPago(false);
                
              });
          } else {
            setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
            setAlertTipo("danger")
            setVerNotajogo(false)
            setModalCalend(true)
            setCarre(false);
            setCriarCli(false);
            setEnviLin(false)
            setRobo(true)
            setIdApos("");
            setPago(false);
          }
        })



       
       },

       ApostandoPgLink: async(id, JogosBet, DadosBet, DadoTitu, DadoFili,  QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setValApos, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setVCash, setRobo, setCodG, setTentativa, setSenha, setBtnSimAp, setJogosBet)=> {
     
        var Msg = ""
        var IdUser = ""
        var Nome = ""
        var tel = await AsyncStorage.getItem('Tel');
        var time = await AsyncStorage.getItem('@entrada');
        var temp = parseInt(time)

              console.log(typeof({}))
              console.log(ValPreDemos)
              console.log(ValorReal)
              console.log(VaToCo)
              console.log(typeof(VaToCo))
              console.log(SimAp)
              if(DadoTitu.Funcionario === true){
               
                var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");
             
                
            
                
                 
                    
                  
                      //await firestore.collection("users").add({
                      await firestore.collection("CompPg").add({
                      Tipo:"ApostaLink",
                      Nome:DadoTitu.Nome,
                      Tel:DadoTitu.Telefone,
                      IdCri:id,
                      Cambista:true,
                      NomeComp:NomeCli,
                      TelComp:TelCli,
                      Pago:false,
                      PremioPago:false,
                      Aprovado:false,
                      AnaliTotal:false,
                      DataApost:new Date().getTime(),
                      ValorPremio: ValPreDemos,
                      ValorAposta: ValorReal,   
                      Bets: SimAp,
                      CotaGeral:VaToCo,
                      valorAposSimb:ValApos,
                      ComissaoFun:{Valor:DadoTitu.Comissao, Pago:false},
                      ComissaoEmp:{Valor:DadosBet.ComissaoAp, Pago:false},
                      LogoEmp:DadoFili.LogoEmp,
                      NomeEmp:DadoFili.ConfigEmp.NomeEmp,
                      TokenMp:DadoFili.ConfigEmp.LinkMp,
                      JogosId: JogosBet,
                      ConfigFili:DadoFili,
                      ConfigTitu:DadoTitu,
                      
                      }).then(async (def) => {
                        console.log(def.id)

                        var data = new URLSearchParams();
                        data.append('Valor', ValorReal);
                        data.append('IdApos', def.id);
                        data.append('tokey', DadoFili.ConfigEmp.LinkMp);
                  
                    const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoComLink", {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      body: data.toString(),
                      json: true,
                    });
                   
                    const json = await req.json();
                  
                    if(json){
                     
                      setLinkEnv(json.resposta.response.init_point);
 
                       setCarre(false);
                       setAlert("Você Será Enviado Para o Mercado Pago!");
                       setAlertTipo("success");
                       setModalCalend(true);
                       setVerNotajogo(false);
                       setSimAp([]);
                       setValCambis("");
                       setValorReal(0);
                       setValPremi(0);
                       setTelCli("");
                       setNomeCli("");
                       setValPreDemos("");
                       setVaToCo(0)
                       setIdAposta("");
                       setPgCash(false);
                       setDCash(0);
                       setValApos("R$000,00")
                       setVCash(0);
                       setCodG(false)
                       setTentativa(0)
                       setSenha("")
                       setRobo(true)
                       setBtnSimAp([])
                       setJogosBet([])

                    }
                     
                   
                   })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    }); 
          
                    
                
             
             
            } else {
        
            
            
                
                  
                   
                     
                        console.log("entrou 2")
                      await firestore.collection("CompPg").add({
                      Tipo:"ApostaLink",
                      Nome:DadoTitu.Nome,
                      Tel:DadoTitu.Telefone,
                      IdCri:id,
                      Cambista:true,
                      NomeComp:NomeCli,
                      TelComp:TelCli,
                      Pago:false,
                      PremioPago:false,
                      Aprovado:false,
                      AnaliTotal:false,
                      DataApost:new Date().getTime(),
                      ValorPremio: ValPreDemos,
                      ValorAposta: ValorReal,   
                      Bets: SimAp,
                      CotaGeral:VaToCo,
                      valorAposSimb:ValApos,
                      ComissaoFun:{Valor:0, Pago:false},
                      ComissaoEmp:{Valor:DadosBet.ComissaoAp, Pago:false},
                      LogoEmp:DadoTitu.LogoEmp,
                      NomeEmp:DadoTitu.ConfigEmp.NomeEmp,
                      TokenMp:DadoTitu.ConfigEmp.LinkMp,
                      JogosId: JogosBet,
                      ConfigFili:DadoTitu,
                      ConfigTitu:DadoTitu,
                      
                      }).then(async (def) => {
                        console.log(def.id)
                        var data = new URLSearchParams();
                        data.append('Valor', ValorReal);
                        data.append('IdApos', def.id);
                        data.append('tokey', DadoTitu.ConfigEmp.LinkMp);
                  
                    const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoComLink", {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      body: data.toString(),
                      json: true,
                    });
                   
                    const json = await req.json();
                  
                    if(json){
                     
                      setLinkEnv(json.resposta.response.init_point);
         
                        setCarre(false);
                         setAlert("Você Será Enviado Para o Mercado Pago!");
                         setAlertTipo("success");
                         setModalCalend(true);
                         setVerNotajogo(false);
                         setSimAp([]);
                         setValCambis("");
                         setValorReal(0);
                         setValPremi(0);
                         setTelCli("");
                         setNomeCli("");
                         setValPreDemos("");
                         setVaToCo(0)
                         setIdAposta("");
                         setPgCash(false);
                         setDCash(0);
                         setValApos("R$000,00")
                         setVCash(0);
                         setCodG(false)
                         setTentativa(0)
                         setSenha("")
                         setRobo(true)
                         setBtnSimAp([])
                      
                    }

                       

                       

                      

    
                        
                     



                       
                     
                   
                   }).catch((error) => {
                        console.error("Error adding document: ", error);
                    }); 
          
                    
                  
             
            
            
            
            
            
            
            
            }



           
          


  
         
         },

       ApostandoCASH: async(JogosBet, DadosBet, DadoTitu, DadoFili,  QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setValApos, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setVCash, setRobo, setCodG, setTentativa, setSenha, setBtnSimAp, setJogosBet)=> {
     
        var Msg = ""
        var IdUser = ""
        var Nome = ""
        var tel = await AsyncStorage.getItem('Tel');
        var time = await AsyncStorage.getItem('@entrada');
        var temp = parseInt(time)
        await firestore.collection("users")
        .where("Telefone", "==", tel)
        .where("DataEntCel", "==", temp)
        .get().then( async(querySnapshot) => {
       
          if(querySnapshot.size !== 0){
            querySnapshot.forEach( async (doc) => {
              IdUser = doc.id,
              Nome = doc.data().Nome
              });
              console.log(typeof({}))
              console.log(ValPreDemos)
              console.log(ValorReal)
              console.log(VaToCo)
              console.log(typeof(VaToCo))
              console.log(SimAp)
              if(DadoTitu.Funcionario === true){
               
                var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");
             
                const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
                {
                      method: 'GET',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                     
                    });
            
                
                  
                    const json = await req.json(); 
                    
                    if(json.exists === true){
                      //await firestore.collection("users").add({
                        console.log("entrou 2")
                      await firestore.collection("CompApostas").add({
                      Nome:Nome,
                      Tel:tel,
                      IdCri:IdUser,
                      Cambista:true,
                      NomeComp:NomeCli,
                      TelComp:TelCli,
                      Pago:false,
                      PremioPago:false,
                      Aprovado:false,
                      AnaliTotal:false,
                      DataApost:new Date().getTime(),
                      ValorPremio: ValPreDemos,
                      ValorAposta: ValorReal,   
                      Bets: SimAp,
                      CotaGeral:VaToCo,
                      valorAposSimb:ValApos,
                      ComissaoFun:{Valor:DadoTitu.Comissao, Pago:false},
                      ComissaoEmp:{Valor:DadosBet.ComissaoAp, Pago:false},
                      LogoEmp:DadoFili.LogoEmp,
                      NomeEmp:DadoFili.ConfigEmp.NomeEmp,
                      TokenMp:DadoFili.ConfigEmp.LinkMp,
                      JogosId: JogosBet,
                      }).then(async (def) => {
                        console.log(def.id)
                    
                        
                        
                     

                      

    
                        
                      let currentDate25 = '';
                      let now25 =new Date();
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
      
                        var Msg = ""
                       
                        Msg = Msg + `----- Boleto de Aposta ${DadoFili.ConfigEmp.NomeEmp} -----\n`
                        Msg = Msg + `Codigo: ${def.id}\n`
                        Msg = Msg + `Nome: ${NomeCli}\n`
                        Msg = Msg + `Telefone: ${TelCli}\n`
                        Msg = Msg + `Data: ${currentDate25}\n`
                        Msg = Msg + `----------------------------------------------\n`
                        
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
      
      
                        Msg = Msg + `⚽${SimAp[i].CasaTime.name.substr(0, 15)} X  ${SimAp[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${SimAp[i].Casa} | Cota: ${SimAp[i].Olds} \n 🥅 (${SimAp[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                        }
      
                        Msg = Msg + `Cota Total: ${VaToCo}\n`;
                        Msg = Msg + `Valor Prêmio: R$ ${ValPreDemos}\n`;
                        Msg = Msg + `Valor Pago: ${ValApos}\n`;
                        Msg = Msg + `Cambista: --------------------\n`;
                        Msg = Msg + `Nome: ${Nome}\n`;
                        Msg = Msg + `Telefone: ${tel}\n`;
                        Msg = Msg + `Cambista Ganhará ${DadoTitu.PorcenPremio}% em Cima do Prêmio.\n`;
                        Msg = Msg + `Quando Terminar todos os Jogos, analisaremos sua aposta, e enviaremos para seu WhatsApp se você ganhou ou perdeu o prêmio\n`;
                        Msg = Msg + `Caso Ganhe o Prêmio, entraremos em contato com você via WhatsApp, para efetuarmos o Pagamento do Prêmio\n`;
                        Msg = Msg + `WhatsApp da ${DadoFili.ConfigEmp.NomeEmp}: ${DadoFili.Telefone} `;
      
      
                        var ver = TelCli.replace("(", "55");
                        var par1 = ver.replace(")", "");
                        var par3 = par1.replace("-", "");
      
                        var data={
                          "phone": par3,
                          "message": Msg,
                        }   

                        var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
                        const req = await fetch(`${LinWha}/send-messages`, 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data),
                        });
                       
                      
                       
              
                        var data1={
                          "phone": par3,
                          "message": `Olá ${NomeCli}, ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, Para você acopanhar!`,
                          "image": DadoFili.LogoEmp,
                          "linkUrl": `${URL_SITE}/boleto/${def.id}`,
                          "title": "Link para Entrar No Boleto",
                          "linkDescription": ` ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoFili.ConfigEmp.NomeEmp}, para você poder entrar de maneira mais facil!`
                        }
                        const req2 = await fetch(`${LinWha}/send-link`, 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data1),
                            });
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                     
                       setCarre(false);
                       setAlert("Aposta Criada com Sucesso!");
                       setAlertTipo("success");
                       setModalCalend(true);
                       setVerNotajogo(false);
                       setSimAp([]);
                       setValCambis("");
                       setValorReal(0);
                       setValPremi(0);
                       setTelCli("");
                       setNomeCli("");
                       setValPreDemos("");
                       setVaToCo(0)
                       setIdAposta("");
                       setPgCash(false);
                       setDCash(0);
                       setValApos("R$000,00")
                       setVCash(0);
                       setCodG(false)
                       setTentativa(0)
                       setSenha("")
                       setRobo(true)
                       setBtnSimAp([])
                       setJogosBet([])

                       
                     
                   
                   })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    }); 
          
                    
                    } else {
          
                      setVerNotajogo(false)
                      setModalCalend(true)
                      setAlert("O Telefone do Cliente Não é um Whatsapp!");
                      setAlertTipo("danger");
                      setCarre(false);
                   
                   
                   
                    }
             
             
            } else {
        
              var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");
             
                const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
                {
                      method: 'GET',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                     
                    });
            
                
                  
                    const json = await req.json(); 
                    
                    if(json.exists === true){
                      //await firestore.collection("users").add({
                        console.log("entrou 2")
                      await firestore.collection("CompApostas").add({
                      Nome:Nome,
                      Tel:tel,
                      IdCri:IdUser,
                      Cambista:true,
                      NomeComp:NomeCli,
                      TelComp:TelCli,
                      Pago:false,
                      PremioPago:false,
                      Aprovado:false,
                      AnaliTotal:false,
                      DataApost:new Date().getTime(),
                      ValorPremio: ValPreDemos,
                      ValorAposta: ValorReal,   
                      Bets: SimAp,
                      CotaGeral:VaToCo,
                      valorAposSimb:ValApos,
                      ComissaoFun:{Valor:0, Pago:false},
                      ComissaoEmp:{Valor:DadosBet.ComissaoAp, Pago:false},
                      LogoEmp:DadoTitu.LogoEmp,
                      NomeEmp:DadoTitu.ConfigEmp.NomeEmp,
                      TokenMp:DadoTitu.ConfigEmp.LinkMp,
                      JogosId: JogosBet,
                      }).then(async (def) => {
                        console.log(def.id)
                    
                        let currentDate25 = '';
                        let now25 =new Date();
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
        
                          var Msg = ""
                         
                          Msg = Msg + `----- Boleto de Aposta ${DadoTitu.ConfigEmp.NomeEmp} -----\n`
                          Msg = Msg + `Codigo: ${def.id}\n`
                          Msg = Msg + `Nome: ${NomeCli}\n`
                          Msg = Msg + `Telefone: ${TelCli}\n`
                          Msg = Msg + `Data: ${currentDate25}\n`
                          Msg = Msg + `----------------------------------------------\n`
                          
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
        
        
                          Msg = Msg + `⚽${SimAp[i].CasaTime.name.substr(0, 15)} X  ${SimAp[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${SimAp[i].Casa} | Cota: ${SimAp[i].Olds} \n 🥅 (${SimAp[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                          }
        
                          Msg = Msg + `Cota Total: ${VaToCo}\n`;
                          Msg = Msg + `Valor Prêmio: R$ ${ValPreDemos}\n`;
                          Msg = Msg + `Valor Pago: ${ValApos}\n`;
                          Msg = Msg + `Cambista: --------------------\n`;
                          Msg = Msg + `Nome: ${Nome}\n`;
                          Msg = Msg + `Telefone: ${tel}\n`;
                          Msg = Msg + `Cambista Ganhará ${DadoTitu.PorcenPremio}% em Cima do Prêmio.\n`;
                          Msg = Msg + `Quando Terminar todos os Jogos, analisaremos sua aposta, e enviaremos para seu WhatsApp se você ganhou ou perdeu o prêmio\n`;
                          Msg = Msg + `Caso Ganhe o Prêmio, entraremos em contato com você via WhatsApp, para efetuarmos o Pagamento do Prêmio\n`;
                          Msg = Msg + `WhatsApp da ${DadoTitu.ConfigEmp.NomeEmp}: ${DadoTitu.Telefone} `;
        
        
                          var ver = TelCli.replace("(", "55");
                          var par1 = ver.replace(")", "");
                          var par3 = par1.replace("-", "");
        
                          var data={
                            "phone": par3,
                            "message": Msg,
                          }   
  
                          var LinWha = DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
                          const req = await fetch(`${LinWha}/send-messages`, 
                          {
                                method: 'POST',
                                headers:{
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                          });
                         
                        
                         
                
                          var data1={
                            "phone": par3,
                            "message": `Olá ${NomeCli}, ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, Para você acopanhar!`,
                            "image": DadoTitu.LogoEmp,
                            "linkUrl": `${URL_SITE}/boleto/${def.id}`,
                            "title": "Link para Entrar No Boleto",
                            "linkDescription": ` ${Nome} lhe enviou Esse Link do Boleto da Aposta da ${DadoTitu.ConfigEmp.NomeEmp}, para você poder entrar de maneira mais facil!`
                          }
                          const req2 = await fetch(`${LinWha}/send-link`, 
                          {
                                method: 'POST',
                                headers:{
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data1),
                              });
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        setCarre(false);
                         setAlert("Aposta Criada com Sucesso!");
                         setAlertTipo("success");
                         setModalCalend(true);
                         setVerNotajogo(false);
                         setSimAp([]);
                         setValCambis("");
                         setValorReal(0);
                         setValPremi(0);
                         setTelCli("");
                         setNomeCli("");
                         setValPreDemos("");
                         setVaToCo(0)
                         setIdAposta("");
                         setPgCash(false);
                         setDCash(0);
                         setValApos("R$000,00")
                         setVCash(0);
                         setCodG(false)
                         setTentativa(0)
                         setSenha("")
                         setRobo(true)
                         setBtnSimAp([])
                      
                     

                       

                       

                      

    
                        
                     



                       
                     
                   
                   }).catch((error) => {
                        console.error("Error adding document: ", error);
                    }); 
          
                    
                    } else {
          
                      setVerNotajogo(false)
                      setModalCalend(true)
                      setAlert("O Telefone do Cliente Não é um Whatsapp!");
                      setAlertTipo("danger");
                      setCarre(false);
                   
                   
                   
                    }
             
            
            
            
            
            
            
            
            }



            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")
              setVerNotajogo(false)
              setModalCalend(true)
              setCarre(false);
            }
          })


  
         
         },

         PagandoJogoCASH: async(IdApos, QuanJog, ValApos, ValPreDemos, ValorReal, SimAp, ValPremi, Cambis, TelCli, NomeCli, ValCambis, setCarre, setLinkEnv, setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash)=> {
       
          var Msg = ""
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                setDCash(doc.data().Cash)
                });
  
                if(Cambis === false){
         
  
                 
                   setCarre(false);
                   setIdAposta(IdApos);
                   setPgCash(true);
  
               
              } else {
          
                
                var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");
             
                const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
                {
                      method: 'GET',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                     
                    });
            
                
                  
                    const json = await req.json(); 
                    
                    if(json.exists === true){
          
                 
                       setCarre(false);
                       setIdAposta(IdApos);
                       setPgCash(true);
                     
                   
                 
          
                    
                    } else {
          
                      setVerNotajogo(false)
                      setModalCalend(true)
                      setAlert("O Telefone do Cliente Não é um Whatsapp!");
                      setAlertTipo("danger");
                      setCarre(false);
                   
                   
                   
                    }
              
              
              
              
              
              
              
              }
  
  
  
              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })
  
  
    
           
           },

         DadosCli:async (Venc, setJogApos, setVersBanc, setVenc, setRec, setDatVenc, setNotif, setNomeComp, setTel, setNi2, setNi3, setNi4)=>{
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
         
          
                let currentDate = '';
                let now =new Date(doc.data().DataVenc);
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
                 setVenc(currentDate)
                 setRec(doc.data().Dinheiro)
                 setDatVenc(doc.data().DataVenc)
                 setNotif(doc.data().mensagem.length - doc.data().vizualV)
                 setNomeComp(doc.data().Nome)
                 setTel(doc.data().Telefone)
                 setNi2(doc.data().Indicados.length)
                 setNi4(doc.data())
                 if(doc.data().Funcionario === true){

                  firestore.collection("users")
                  .where("Indicados", "array-contains", IdUser)
                  .onSnapshot(async (querySnapshot1) => {

                    if(querySnapshot1.size !== 0){
                      querySnapshot1.forEach( async (doc1) => {
                        setNi3(doc1.data());                    
                        });

                    }
        
                })

                firestore.collection("CompApostas")
                  .where("IdCri", "==", IdUser)
                  .where("Pago", "==", false)
                  .onSnapshot(async (querySnapshot1) => {
                        console.log(querySnapshot1.size)
                        setJogApos(querySnapshot1.size);                    
        
                })
                  
                 }
              
            })

            await firestore.collection("Vesao")
            .doc("jCzDYjLxyhae1FJE3KS9")
             .onSnapshot((doc2) => {
              setVersBanc(doc2.data())

             })
             
                
           
        },
        
        PegarDadosLink:async (id, setDadoFili, setDadoTitu, setDadosBet )=>{
       
          await firestore.collection("users")
         .doc(id)
          .onSnapshot((doc) => {
         
          
                let currentDate = '';
                let now =new Date(doc.data().DataVenc);
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
                 setDadoTitu(doc.data())
                 if(doc.data().Funcionario === true){

                  firestore.collection("users")
                  .where("Indicados", "array-contains", id)
                  .onSnapshot(async (querySnapshot1) => {

                    if(querySnapshot1.size !== 0){
                      querySnapshot1.forEach( async (doc1) => {
                        setDadoFili(doc1.data());                    
                        });

                    }
        
                })

               
                  
                 } else {
                  setDadoFili({});
                 }
              
            })

            await firestore.collection("Vesao")
            .doc("jCzDYjLxyhae1FJE3KS9")
             .onSnapshot((doc2) => {
              setDadosBet(doc2.data())

             })
             
                
           
        },
        
        SairFun: async (IdApos, setSairCAm,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2) => {
          let tempVenc = new Date().getTime() + 86400000;
          var IdUser = ""
          var Nome = ""
          var IdCli = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {

            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });

          firestore.collection("users")
          .where("Indicados", "array-contains", IdUser)
          .get()
          .then(async (querySnapshot1) => {
          var IdInd = '';
          var Indq=[];


            if(querySnapshot1.size !== 0){
              querySnapshot1.forEach( async (doc1) => {
                IdInd = doc1.id;
                Indq =  doc1.data().Indicados;
                });


               var Ind2 = Indq.filter(filter => filter !== IdUser)
              
               await firestore.collection("users")
               .doc(IdInd)
               .update({
                Indicados: Ind2,
                
               })

               await firestore.collection("users")
               .doc(IdUser)
               .update({
                 Funcionario: false,
                 Comissao:0,
                 PorcenPremio:0,
                 QuanApos:0, 
               })
               setNomeCli("");
               setTelCli("");
               setIdTrans("");
               setCarre(false);
               setAlert("Feito com Sucesso!");
               setAlertTipo("success");
               setModalCalend(true);
               setVerNotajogo(false);
               setPgCash(false);
               setCodG(false)
               setTentativa(0)
               setSenha("")
               setRobo(true)
               setNome("");
               setBtn(false);
               setMsgErro2(false);
               setSairCAm(false)

              setCarre(false)
            }

        })

      }

          });

        },

        AprovandoApos: async (Cab, DadosBet, ValPa, AposTot, Siarnota, setPagCont, setQJogos, setSairCAm, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  ) => {
          let tempVenc = new Date().getTime() ;
          var ValApos = ValPa
          var ValBet = ValPa*(DadosBet.ComissaoAp/100)
          var ComEmp = ValBet
          var IdUser = ""
          var Nome = ""
          var IdCli = ""
          var Dinheiro =0
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {

            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                Dinheiro = doc.data().Dinheiro+ComEmp
                });

       
              
               var res = [];
                for(let i in AposTot){
                   setQJogos(parseInt(((parseInt(i)+1)/AposTot.length)*100))
                  if(AposTot[i].Pago === false){
                   
                    res.push(AposTot[i])

                    await firestore.collection("CompApostas")
                    .doc(AposTot[i].id)
                    .update({
                      Pago: true,
                     
                    })

                  }
               
                }
            
              if(Cab.id !== IdUser){
                await firestore.collection("users")
                .doc(Cab.id)
                .update({
                 Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempVenc, Status:"Pagou Aposta", Nivel:"1", Valor: ValApos, Moeda:"Real", IdInf:res })
                })
              }
               
              if(ValApos > 0) {
                await firestore.collection("users")
                .doc(IdUser)
                .update({
                 Dinheiro: Dinheiro,
                 Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempVenc, Status:"Recebeu Aposta", Nivel:"2", Valor: ValApos, Moeda:"Real", IdInf:res })
                })
                
              }
              
               
               setNomeCli("");
               setTelCli("");
               setIdTrans("");
               setCarre(false);
               setAlert("Feito com Sucesso!");
               setAlertTipo("success");
               setModalCalend(true);
               setVerNotajogo(false);
               setPgCash(false);
               setCodG(false)
               setTentativa(0)
               setSenha("")
               setRobo(true)
               setNome("");
               setBtn(false);
               setMsgErro2(false);
               setSairCAm(false)
              setLoad(false)
              setCarre(false)
              setPagCont(false)
              Siarnota()

      }

          });

        },

        PgComi: async (Cab, ValCom, AposTot, Siarnota, setPagCom, setQJogos, setSairCAm, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad  ) => {
          let tempVenc = new Date().getTime() ;
          var ValApos = ValCom
          var IdUser = ""
          var Nome = ""
          var IdCli = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {

            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });

       
              
               var res = [];
                for(let i in AposTot){
                   setQJogos(parseInt(((parseInt(i)+1)/AposTot.length)*100))
                  if(AposTot[i].ComissaoFun.Pago === false &&  AposTot[i].Pago === true){
                   
                    res.push(AposTot[i])

                    await firestore.collection("CompApostas")
                    .doc(AposTot[i].id)
                    .update({
                      ComissaoFun: {Pago: true, Valor:AposTot[i].ComissaoFun.Valor },
                     
                    })

                  }
               
                }
              
                await firestore.collection("users")
               .doc(Cab.id)
               .update({
                Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempVenc, Status:"Recebeu Comissões", Nivel:"2", Valor: ValApos, Moeda:"Real", IdInf:res })
               })

               await firestore.collection("users")
               .doc(IdUser)
               .update({
                Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempVenc, Status:"Pagou Comissões", Nivel:"1", Valor: ValApos, Moeda:"Real", IdInf:res })
               })
               
               setNomeCli("");
               setTelCli("");
               setIdTrans("");
               setCarre(false);
               setAlert("Feito com Sucesso!");
               setAlertTipo("success");
               setModalCalend(true);
               setVerNotajogo(false);
               setPgCash(false);
               setCodG(false)
               setTentativa(0)
               setSenha("")
               setRobo(true)
               setNome("");
               setBtn(false);
               setMsgErro2(false);
               setSairCAm(false)
              setLoad(false)
              setCarre(false)
              setPagCom(false)
              Siarnota()
       

      }

          });

        },



        EnviadoApp: async (NomeCli, QMAp, PorPremi,  PorComis, LinWhats, Logo, TelCli, setAlertTipo, setAlert, setLoading, setModalCalend, setBtn, setBtn1, setBtn2, setCodG, setSenha, setTentativa, setRobo, setNomeCli, setTelCli, setCodLast, setDateInd, setTelMsg, setTe1, setTe2) => {
          let tempVenc = new Date().getTime() + 86400000;
          var IdUser = ""
          var Nome = ""
          var IdCli = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             

        await firestore.collection("users")
      .where("Telefone", "==", TelCli)
      .get().then( async (querySnapshot1) => {
        if(querySnapshot1.size !== 0){
        querySnapshot1.forEach(async (doc1) => {
          IdCli = doc1.id
          firestore.collection("users")
          .doc(doc1.id)
          .update({
            Funcionario: true,
            Comissao:parseInt(PorComis),
            PorcenPremio:parseInt(PorPremi),
            QuanApos:parseInt(QMAp),
          })
        .then( async() => {
          firestore.collection("users")
            .doc(IdUser)
            .update({
              Indicados: firebase.firestore.FieldValue.arrayUnion(doc1.id)
             })


             
          var ver = TelCli.replace("(", "55");
          var par1 = ver.replace(")", "");
          var par3 = par1.replace("-", "");

          var data={
            "phone": par3,
            "message": `Olá ${NomeCli}, ${Nome} lhe enviou Esse Link da ${Logo.ConfigEmp.NomeEmp}, Para você ser funcionario da empresa!`,
            "image": Logo.LogoEmp,
            "linkUrl": `${URL_SITE}`,
            "title": "Link para Entrar",
            "linkDescription": ` ${Nome} lhe enviou Esse Link, para você poder entrar de maneira mais facil!`
          }
          const req = await fetch(`${LinWhats}/send-link`, 
          {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
  
       
        
              const json = await req.json();  
             if(json){
              setLoading(false)
              setAlert("Criação Realizada!")
              setAlertTipo("Sucesss")
              setModalCalend(true)
              setBtn(false);
              setBtn1(false)
              setBtn2(false);
              setNomeCli("");
              setTelCli("");
              setCodG(false);
              setCodLast(0);
              setSenha("");
              setTentativa(0);
              setRobo(true)
              setTe1(false)
              setTe2(false)
              setTelMsg(true)
              setDateInd(0)

             }


        })


        })





          
      
        } else {

    var time = new Date().getTime();
    await firestore.collection("users").add({
      Filial:true,
      Funcionario:true,
      PorcenPremio:parseInt(PorPremi),
      QuanApos:parseInt(QMAp),
      Ativo:true,
      LogoEmp: "",
      Comissao:parseInt(PorComis),
      ConfigEmp: {NomeEmp:"",  ValMin:"", ValMax:"", PalMin:"", PalMax:"", PorcCom:"", LinkMp:"", LinkWhats:"", MaxAposta:"", PremioMax:"",  PorPremParaCam:""},
      CodigEnt: 0,
      Telefone:TelCli,
      DataEntCel:0,
      Nome:NomeCli,
      Indicados:[],
      Extrato:[],
      DataCadas: time,
      Cash:0,
      Dinheiro:0,
      DataVenc:0,
      ADM:false,
      Nivel3:0,
      Nivel4:0,
      mensagem:[
        {
          date:new Date().getTime(),
          autor:"Sistema",
          body:"Aqui você terá total atenção da empresa Bet Franquias, Fique a vontade, e Bom uso do Sistema!",
          nome:"Bet Franquias",
          type:"text"

        }
      ],
      DigiS:false,
      DigiV:false,
      vizualS:0,
      vizualV:0,
      ultimaMsg:{
        data:new Date().getTime(),
        id:"Sistema",
        msg:"Aqui você terá total atenção da empresa Bet Franquias, Fique a vontade, e Bom uso do Sistema!",
        nome:"Bet Franquias"
      },
      userchat:[{}],
  })
  .then( async (docRef) => {
          firestore.collection("users")
            .doc(IdUser)
            .update({
              Indicados: firebase.firestore.FieldValue.arrayUnion(docRef.id)
             })

             var ver = TelCli.replace("(", "55");
             var par1 = ver.replace(")", "");
             var par3 = par1.replace("-", "");
   
             var data={
              "phone": par3,
              "message": `Olá ${NomeCli}, ${Nome} lhe enviou Esse Link da ${Logo.ConfigEmp.NomeEmp}, Para você ser funcionario da empresa!`,
              "image": Logo.LogoEmp,
              "linkUrl": `${URL_SITE}`,
              "title": "Link para Entrar",
              "linkDescription": ` ${Nome} lhe enviou Esse Link, para você poder entrar de maneira mais facil!`
            }
             const req = await fetch(`${LinWhats}/send-link`, 
             {
                   method: 'POST',
                   headers:{
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(data),
                 });
     
          
           
                 const json = await req.json();  
                if(json){
                 setLoading(false)
                 setAlert("Criação Realizada!")
                 setAlertTipo("Sucesss")
                 setModalCalend(true)
                 setBtn(false);
                 setBtn1(false)
                 setBtn2(false);
                 setNomeCli("");
                 setTelCli("");
                 setCodG(false);
                 setCodLast(0);
                 setSenha("");
                 setTentativa(0);
                 setRobo(true)
                 setTe1(false)
                 setTe2(false)
                 setTelMsg(true)
                 setDateInd(0)
   
                }



            });

         
         
    
        }
        });

        
        
      }
    });
        
          
        
        
        },

        EditandoCam: async (IdCam, NomeCli, QMAp, PorPremi,  PorComis, LinWhats, Logo, TelCli, setAlertTipo, setAlert, setLoading, setModalCalend, setBtn, setBtn1, setBtn2, setCodG, setSenha, setTentativa, setRobo, setNomeCli, setTelCli, setCodLast, setDateInd, setTelMsg, setTe1, setTe2) => {
          let tempVenc = new Date().getTime() + 86400000;
          var IdUser = ""
          var Nome = ""
          var IdCli = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             
          firestore.collection("users")
          .doc(IdCam)
          .update({
            Funcionario: true,
            Comissao:parseInt(PorComis),
            PorcenPremio:parseInt(PorPremi),
            QuanApos:parseInt(QMAp),
          })
        .then( async() => {
        

             
      
       
        
            
              setLoading(false)
              setAlert("Edição Realizada!")
              setAlertTipo("Sucesss")
              setModalCalend(true)
              setBtn(false);
              setBtn1(false)
              setBtn2(false);
              setNomeCli("");
              setTelCli("");
              setCodG(false);
              setCodLast(0);
              setSenha("");
              setTentativa(0);
              setRobo(true)
              setTe1(false)
              setTe2(false)
              setTelMsg(true)
              setDateInd(0)

             


        })


        





          
      
         
        

        
        
      }
    });
        
          
        
        
        },

        PegarConversas: async (Ocorre, setTmpMsg, setOcorre, setTemUlt, setCont, setDig, setVizuS) => {
          let tempVenc = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
              setOcorre(doc.id);
              setTmpMsg(doc.data().mensagem);
              setCont(doc.data().mensagem.length);
              setTemUlt(doc.data().ultimaMsg.data);
              setDig(doc.data().DigiS);
              setVizuS(doc.data().vizualS);
                
            });
        
         

            
          
          
    
           
  },

  enviandoMsg: async (Msg) => {
    let tempVenc = new Date().getTime() + 86400000;
    var IdUser = ""
    var Nome = ""
    var tel = await AsyncStorage.getItem('Tel');
    var time = await AsyncStorage.getItem('@entrada');
    var temp = parseInt(time)
    await firestore.collection("users")
    .where("Telefone", "==", tel)
    .where("DataEntCel", "==", temp)
    .get().then( async(querySnapshot) => {
   
      if(querySnapshot.size !== 0){
        querySnapshot.forEach( async (doc) => {
          IdUser = doc.id,
          Nome = doc.data().Nome
          });

    let temp = new Date().getTime();
    let now = temp 
    firestore.collection("users")
    .doc(IdUser).update({
      mensagem: firebase.firestore.FieldValue.arrayUnion ({
        autor:IdUser,
        nome: Nome,
        body: Msg,
        date: now,
        type:"text"
      }),
      'ultimaMsg':{id:IdUser, nome: Nome, data:now, msg:Msg} 
  });

    var Add = firestore.collection("users").doc(IdUser);
    return firestore.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(Add).then((sfDoc) => {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add one person to the city population.
          // Note: this could be done without a transaction
          //       by updating the population using FieldValue.increment()
          var Vizual = sfDoc.data().vizualV + 1;
          transaction.update(Add, {vizualV : Vizual });
      });
  }).then(() => {
   
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });

    }
});      

      
        
  },

  enviandoImgMsg: async (Img, setImg, setModalCalend, setVerImg, setCarre) => {
    let tempVenc = new Date().getTime() + 86400000;
    var IdUser = ""
    var Nome = ""
    var Imagem = Img.split(',');
    var tel = await AsyncStorage.getItem('Tel');
    var time = await AsyncStorage.getItem('@entrada');
    var temp = parseInt(time)
    await firestore.collection("users")
    .where("Telefone", "==", tel)
    .where("DataEntCel", "==", temp)
    .get().then( async(querySnapshot) => {
   
      if(querySnapshot.size !== 0){
        querySnapshot.forEach( async (doc) => {
          IdUser = doc.id,
          Nome = doc.data().Nome
          });

          var Url1 = "";
        
    
          
            const fileName = await Date.now() + Math.random()*100;
            const storageRef = await storage.ref();
            const fileRef = await storageRef.child(`arquivo/${fileName}`);
            await await fileRef.putString(Imagem[1], 'base64').then((doc)=> {
              
            });
            Url1 =  await fileRef.getDownloadURL();
          

    let temp = new Date().getTime();
    let now = temp 
    firestore.collection("users")
    .doc(IdUser).update({
      mensagem: firebase.firestore.FieldValue.arrayUnion ({
        autor:IdUser,
        nome: Nome,
        body: Url1,
        date: now,
        type:"image"
      }),
      'ultimaMsg':{id:IdUser, nome: Nome, data:now, msg:"image"} 
  });

    var Add = firestore.collection("users").doc(IdUser);
    return firestore.runTransaction((transaction) => {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(Add).then((sfDoc) => {
          if (!sfDoc.exists) {
              throw "Document does not exist!";
          }
  
          // Add one person to the city population.
          // Note: this could be done without a transaction
          //       by updating the population using FieldValue.increment()
          var Vizual = sfDoc.data().vizualV + 1;
          transaction.update(Add, {vizualV : Vizual });
      });
  }).then(() => {
    setModalCalend(false);
    setImg("");
    setVerImg("");
    setCarre(false);
  }).catch((error) => {
      console.log("Transaction failed: ", error);
  });

    }
});      

      
        
  },

  VizualVit: async (Ocorre, Cont) => {
   
    await firestore.collection("users")
    .doc(Ocorre)
    .update({
     vizualV: Cont,
  });
      

     
},

      CriandoCli:async (DadosBet, DadoTitu, DadoFili, NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli)=>{
         
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             
                if(DadoTitu.Funcionario === true){

                  var ver = TelCli.replace("(", "55");
                  var par1 = ver.replace(")", "");
                  var par3 = par1.replace("-", "");
               
                  const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
                  {
                        method: 'GET',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                       
                      });
              
                  
                    
                      const json = await req.json(); 
                      
                      if(json.exists === true){
          
           
                         firestore.collection("NotaCambista").add({
                          
          
                           Nome:Nome,
                           Tel:tel,
                           IdCri:IdUser,
                           Cambista:true,
                           NomeComp:NomeCli,
                           TelComp:TelCli,
                           Pago:false,
                           Conscluido:false,
                           dataCriar: new Date().getTime(),
                           ValorPremio: 0,
                           ValorAposta: 0,
                           Bets:[],
                           ValCambis:"",
                           CotaGeral:"",
                           valorAposSimb:"R$000,00",
                           CriarJogoCambio:0,
                           LogoEmp:DadoFili.LogoEmp,
                           NomeEmp:DadoFili.ConfigEmp,
                           JogosId:[],
                           JogoFeito:false,
                          
          
                           }).then(async (doc)=>{
          
                             var res= doc.id;
                            
                            var data={
                               "phone": par3,
                               "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da ${DadoFili.ConfigEmp.NomeEmp}, para você criar uma aposta, registre o numero da ${DadoFili.ConfigEmp.NomeEmp} em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${res}`,
                               "image": DadoFili.LogoEmp,
                               "linkUrl": `${URL_SITE}/links/${res}`,
                               "title": "Link para Palpites de Aposta",
                               "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link Link da ${DadoFili.ConfigEmp.NomeEmp}, para você construir sua aposta, clique nesse Link e construa sua aposta!`
                             }
                             var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";

                             const req = await fetch(`${LinWha}/send-link`, 
                             {
                                   method: 'POST',
                                   headers:{
                                     'Content-Type': 'application/json'
                                   },
                                   body: JSON.stringify(data),
                                 });
                     
                                 const json = await req.json();
          
                             setRobo(true)
                            setCarre(false);
                             setAlert("Criado com Sucesso, O Link Foi enviado Para Seu Cliente!");
                             setAlertTipo("success");
                             setCriarCli(false)
                             setVerNotajogo(false)
                             setModalCalend(true)
                             setTelCli("")
                             setNomeCli("")
                           });
                         
                          } else {
                            setAlert("Esse Whatsapp Não Existe!")
                            setAlertTipo("danger")
                            setCarre(false);
                            setRobo(true);
                          }


                }else {

                  var ver = TelCli.replace("(", "55");
                  var par1 = ver.replace(")", "");
                  var par3 = par1.replace("-", "");
               
                  const req = await fetch(`https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/phone-exists/${par3}`, 
                  {
                        method: 'GET',
                        headers:{
                          'Content-Type': 'application/json'
                        },
                       
                      });
              
                  
                    
                      const json = await req.json(); 
                      
                      if(json.exists === true){
          
           
                         firestore.collection("NotaCambista").add({
                          
          
                           Nome:Nome,
                           Tel:tel,
                           IdCri:IdUser,
                           Cambista:true,
                           NomeComp:NomeCli,
                           TelComp:TelCli,
                           Pago:false,
                           Conscluido:false,
                           dataCriar: new Date().getTime(),
                           ValorPremio: 0,
                           ValorAposta: 0,
                           Bets:[],
                           ValCambis:"",
                           CotaGeral:"",
                           valorAposSimb:"R$000,00",
                           CriarJogoCambio:0,
                           LogoEmp:DadoTitu.LogoEmp,
                            NomeEmp:DadoTitu.ConfigEmp,
          
          
                           }).then(async (doc)=>{
          
                             var res= doc.id;
                            
                            var data={
                               "phone": par3,
                               "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da ${DadoTitu.ConfigEmp.NomeEmp}, para você criar uma aposta, registre o numero da ${DadoTitu.ConfigEmp.NomeEmp} em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${res}`,
                               "image": DadoTitu.LogoEmp,
                               "linkUrl": `${URL_SITE}/links/${res}`,
                               "title": "Link para Palpites de Aposta",
                               "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link Link da ${DadoTitu.ConfigEmp.NomeEmp}, para você construir sua aposta, clique nesse Link e construa sua aposta!`
                             }
                             var LinWha = DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";

                             const req = await fetch(`${LinWha}/send-link`, 
                             {
                                   method: 'POST',
                                   headers:{
                                     'Content-Type': 'application/json'
                                   },
                                   body: JSON.stringify(data),
                                 });
                     
                                 const json = await req.json();
          
                             setRobo(true)
                            setCarre(false);
                             setAlert("Criado com Sucesso, O Link Foi enviado Para Seu Cliente!");
                             setAlertTipo("success");
                             setCriarCli(false)
                             setVerNotajogo(false)
                             setModalCalend(true)
                             setTelCli("")
                             setNomeCli("")
                           });
                         
                          } else {
                            setAlert("Esse Whatsapp Não Existe!")
                            setAlertTipo("danger")
                            setCarre(false);
                            setRobo(true);
                          }

                }



                
     

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },

        PegarDados:async (QCash , setListOc, setQCash, setCarre)=>{
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          await firestore.collection("users")
         .doc(IdUser)
          .onSnapshot((doc) => {
                
                IdUser = doc.id,
                Nome = doc.data().Nome
                setListOc(doc.data().Extrato)
                setQCash(doc.data().Cash)

                });
                setCarre(false)
               

       

           
             
                
           
        },
        PegarDadosIndiq:async (DadoTitu, DadoFili, QCash , setId, setListOc, setQCash, setCarre,  Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var IdUser = await AsyncStorage.getItem('@Id');
          var temp = parseInt(time)
          setId(IdUser)
          if(DadoTitu.Funcionario === false){
          
            await firestore.collection("users")
            .doc(IdUser)
            .onSnapshot(async(doc) => {
               var res = []
               var resList = []
               var QC = 0;
               var LisApos =[];
               var Rend = 0;
               var resLoa = 0;
                   
                 
               res = doc.data().Indicados
              
               await firestore.collection("CompApostas")
               .where("IdCri", "==", IdUser)
               .where("DataApost", ">=", Dat)
               .where("DataApost", "<=", Dat2)
               .get()
               .then(async (querySnapshot)=>{
                
                 if(querySnapshot.size !== 0){
                  Rend = 0;
                   querySnapshot.forEach( async (doc1) => {
                       LisApos.push({
                         id: doc1.id,
                         Pago: doc1.data().Pago,
                         ComissaoEmp: doc1.data().ComissaoEmp,
                         ComissaoFun: doc1.data().ComissaoFun,
                         Nome: doc1.data().NomeComp,
                         valorAposSimb: doc1.data().valorAposSimb,
                         DataApost: doc1.data().DataApost,
                         PgMp: doc1.data().PgMp?doc1.data().PgMp:false,
                         ValorAposta: doc1.data().ValorAposta,
                       });
                       console.log(doc1.data())
                       resLoa = resLoa +  doc1.data().ValorAposta;
                       Rend = Rend +  doc1.data().ValorAposta;
                     });
                 }
               });
               console.log(LisApos)
               console.log(Rend)


               await firestore.collection("users")
                .doc(IdUser)
                .get()
                .then((dec)=>{

                 
                
                 resList.push({
                  id:dec.id,
                  Extrato:dec.data().Extrato,
                  Nome:dec.data().Nome,
                  Telefone:dec.data().Telefone,
                  dataCadas:dec.data().DataCadas,
                  Indicados:dec.data().Indicados,
                  Rendeu:Rend,
                  Apos:LisApos,
                  EditCam:false,
                 })
                  ;
                })
                  
                  
   
                   for(let i in res){
                     var LisApos =[];
                    
                     await firestore.collection("CompApostas")
                     .where("IdCri", "==", res[i])
                     .where("DataApost", ">=", Dat)
                     .where("DataApost", "<=", Dat2)
                     .get()
                     .then(async (querySnapshot)=>{
                      Rend = 0;
                       if(querySnapshot.size !== 0){
                       
                         querySnapshot.forEach( async (doc1) => {
                             LisApos.push({
                               id: doc1.id,
                               Pago: doc1.data().Pago,
                               ComissaoEmp: doc1.data().ComissaoEmp,
                               ComissaoFun: doc1.data().ComissaoFun,
                               Nome: doc1.data().NomeComp,
                               valorAposSimb: doc1.data().valorAposSimb,
                               DataApost: doc1.data().DataApost,
                               PgMp: doc1.data().PgMp?doc1.data().PgMp:false,
                               ValorAposta: doc1.data().ValorAposta,
                             });
                             console.log(doc1.data())
                             resLoa = resLoa +  doc1.data().ValorAposta;
                             Rend = Rend +  doc1.data().ValorAposta;
                           });
                       }
                     });
                     console.log(LisApos)
                     console.log(Rend)
   
   
                     await firestore.collection("users")
                      .doc(res[i])
                      .get()
                      .then((dec)=>{
   
                       
                      
                       resList.push({
                        id:dec.id,
                        Extrato:dec.data().Extrato,
                        Nome:dec.data().Nome,
                        Telefone:dec.data().Telefone,
                        dataCadas:dec.data().DataCadas,
                        Indicados:dec.data().Indicados,
                        Rendeu:Rend,
                        Apos:LisApos,
                        EditCam:true,
                        Comissao:dec.data().Comissao,
                        PorcenPremio:dec.data().PorcenPremio,
                        QuanApos:dec.data().QuanApos,
                       })
                        ;
                      })
                    
                   }
   
                   setListOc(resList)
                   setQCash(resLoa)
                   console.log(resList)
   
   
   
   
                   setCarre(false)
   
   
                 });  
   

          } else {
            var res = []
               var resList = []
               var QC = 0;
               var LisApos =[];
            var resLoa = 0;
   
                 
                     var LisApos =[];
                     var Rend = 0;
                     await firestore.collection("CompApostas")
                     .where("IdCri", "==", IdUser)
                     .where("DataApost", ">=", Dat)
                     .where("DataApost", "<=", Dat2)
                     .get()
                     .then(async (querySnapshot)=>{
                      
                       if(querySnapshot.size !== 0){
                        Rend = 0;
                         querySnapshot.forEach( async (doc1) => {
                             LisApos.push({
                               id: doc1.id,
                               Pago: doc1.data().Pago,
                               ComissaoEmp: doc1.data().ComissaoEmp,
                               ComissaoFun: doc1.data().ComissaoFun,
                               Nome: doc1.data().NomeComp,
                               valorAposSimb: doc1.data().valorAposSimb,
                               DataApost: doc1.data().DataApost,
                               PgMp: doc1.data().PgMp?doc1.data().PgMp:false,
                               ValorAposta: doc1.data().ValorAposta,
                             });
                             console.log(doc1.data())
                             resLoa = resLoa +  doc1.data().ValorAposta;
                             Rend = Rend +  doc1.data().ValorAposta;
                           });
                       }
                     });
                     console.log(LisApos)
                     console.log(Rend)
   
   
                     await firestore.collection("users")
                      .doc(IdUser)
                      .get()
                      .then((dec)=>{
   
                       
                      
                       resList.push({
                        id:dec.id,
                        Extrato:dec.data().Extrato,
                        Nome:dec.data().Nome,
                        Telefone:dec.data().Telefone,
                        dataCadas:dec.data().DataCadas,
                        Indicados:dec.data().Indicados,
                        Rendeu:Rend,
                        Apos:LisApos,
                        EditCam:false,
                       })
                        ;
                      })
                    
                   
   
                   setListOc(resList)
                   setQCash(resLoa)
                   console.log(resList)
   
   
   
   
                   setCarre(false)
          }
        
       

            

             
                
           
        },

        PegarDadosIndiq3:async (item , setList3, setQcash3, setCarre, setNive3, Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get()
          .then(async (querySnapshot)=>{
            var res = []
            var resList = []
            var QC = 0;
            if(querySnapshot.size !== 0){
            
              
               
                for(let i in item){
                  await firestore.collection("users")
                   .doc(item[i])
                   .get()
                   .then((dec)=>{

                    var resLoa = 0;
                    console.log(Dat)
                    for(let j in dec.data().Extrato){
                    
                      if(dec.data().Extrato[j].Nivel === "1" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat  ){
                         var Div = (dec.data().Extrato[j].Valor/9)*3;
                         resLoa = resLoa + Div; 
                      } else  if(dec.data().Extrato[j].Nivel === "2" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat ){
                        var Div = (dec.data().Extrato[j].Valor/6)*1;
                        resLoa = resLoa + Div;
                     } 
                  }
                   
                    resList.push({
                     id:dec.id,
                     Extrato:dec.data().Extrato,
                     Nome:dec.data().Nome,
                     Telefone:dec.data().Telefone,
                     dataCadas:dec.data().DataCadas,
                     Indicados:dec.data().Indicados,
                     Rendeu:resLoa,
                    })
                    QC= QC + resLoa;
                   })
                 
                }

                setList3(resList)
                setQcash3(QC)
                console.log(resList)



                setNive3(true)
                setCarre(false)


               

       

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },

        PegarDadosIndiq4:async (item , setList4, setQcash4, setCarre, setNive4, Dat, Dat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get()
          .then(async (querySnapshot)=>{
            var res = []
            var resList = []
            var QC = 0;
            if(querySnapshot.size !== 0){
            
              
               
                for(let i in item){
                  await firestore.collection("users")
                   .doc(item[i])
                   .get()
                   .then((dec)=>{

                    var resLoa = 0;
                    console.log(Dat)
                    for(let j in dec.data().Extrato){
                    
                      if(dec.data().Extrato[j].Nivel === "1" && dec.data().Extrato[j].Status === "Ganhou" && dec.data().Extrato[j].Moeda === "Cash" && dec.data().Extrato[j].Data >= Dat  ){
                         var Div = (dec.data().Extrato[j].Valor/9)*1;
                         resLoa = resLoa + Div; 
                      } 
                  }
                   
                    resList.push({
                     id:dec.id,
                     Extrato:dec.data().Extrato,
                     Nome:dec.data().Nome,
                     Telefone:dec.data().Telefone,
                     dataCadas:dec.data().DataCadas,
                     Indicados:dec.data().Indicados,
                     Rendeu:resLoa,
                    })
                    QC= QC + resLoa;
                   })
                 
                }

                setList4(resList)
                setQcash4(QC)
                console.log(resList)



                setNive4(true)
                setCarre(false)


               

       

              } else {
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })

             
                
           
        },


        EnviarLink:async (DadosBet, DadoTitu, DadoFili, IdApos, NomeCli,  TelCli, setRobo, setNomeCli, setTelCli, setCarre,  setAlert, setAlertTipo, setVerNotajogo, setModalCalend, setCriarCli, setEnviLin, setIdApos)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             

                
        var ver = TelCli.replace("(", "55");
        var par1 = ver.replace(")", "");
        var par3 = par1.replace("-", "");
    
                
        if(DadoTitu.Funcionario === true){
          var ver = TelCli.replace("(", "55");
          var par1 = ver.replace(")", "");
          var par3 = par1.replace("-", "");
      
                  
          var data={
            "phone": par3,
            "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da ${DadoFili.ConfigEmp.NomeEmp}, para você criar uma aposta, registre o numero da ${DadoFili.ConfigEmp.NomeEmp} em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${IdApos}`,
            "image": DadoFili.LogoEmp,
            "linkUrl": `${URL_SITE}/links/${IdApos}`,
            "title": "Link para Palpites de Aposta",
            "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link Link da ${DadoFili.ConfigEmp.NomeEmp}, para você construir sua aposta, clique nesse Link e construa sua aposta!`
          }
          var LinWha = DadoFili.ConfigEmp.LinkWhats !== "" ? DadoFili.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";

          const req = await fetch(`${LinWha}/send-link`, 
                     {
                           method: 'POST',
                           headers:{
                             'Content-Type': 'application/json'
                           },
                           body: JSON.stringify(data),
                         });
             
                         const json = await req.json();
                         setEnviLin(false)
                         setRobo(true)
                         setAlert("Link Enviado Com Sucesso!")
                         setAlertTipo("sucess")
                         setCriarCli(false)
                         setVerNotajogo(false)
                         setModalCalend(true)
                         setCarre(false);
                         setNomeCli("");
                         setTelCli("");
                         setIdApos("")

        }else {

          var ver = TelCli.replace("(", "55");
          var par1 = ver.replace(")", "");
          var par3 = par1.replace("-", "");
      
                  
          var data={
            "phone": par3,
            "message": `Olá ${NomeCli}, O Cambista ${Nome} lhe enviou Esse Link da ${DadoTitu.ConfigEmp.NomeEmp}, para você criar uma aposta, registre o numero da ${DadoTitu.ConfigEmp.NomeEmp} em sua lista de contato para ter acesso a entrada do link de forma facil. ${URL_SITE}/links/${IdApos}`,
            "image": DadoTitu.LogoEmp,
            "linkUrl": `${URL_SITE}/links/${IdApos}`,
            "title": "Link para Palpites de Aposta",
            "linkDescription": `O Cambista ${Nome} lhe enviou Esse Link Link da ${DadoTitu.ConfigEmp.NomeEmp}, para você construir sua aposta, clique nesse Link e construa sua aposta!`
          }
          var LinWha = DadoTitu.ConfigEmp.LinkWhats !== "" ? DadoTitu.ConfigEmp.LinkWhats :"https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
         console.log(LinWha)

          const req = await fetch(`${LinWha}/send-link`,
                     {
                           method: 'POST',
                           headers:{
                             'Content-Type': 'application/json'
                           },
                           body: JSON.stringify(data),
                         });
             
                         const json = await req.json();
                         setEnviLin(false)
                         setRobo(true)
                         setAlert("Link Enviado Com Sucesso!")
                         setAlertTipo("sucess")
                         setCriarCli(false)
                         setVerNotajogo(false)
                         setModalCalend(true)
                         setCarre(false);
                         setNomeCli("");
                         setTelCli("");
                         setIdApos("")
        }
                 
               
             

              } else {
                setEnviLin(false)
                setRobo(true)
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado, Saia e entre Novamente!")
                setAlertTipo("danger")
                setCriarCli(false)
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
                setNomeCli("");
                setTelCli("");
                setIdApos("")
              }
            })

             
                
           
        },

        GeradorCodLink:async (TelCli, Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
        
         
            
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = TelCli.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");
     
                 var data={
                   "phone": par3,
                   "message": "Código de entrada: "+last,
                 }   
                 const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                 {
                       method: 'POST',
                       headers:{
                         'Content-Type': 'application/json'
                       },
                       body: JSON.stringify(data),
                    });
                   setCarre(false)                 
                    setCodG(true)


         
             
                
           
        },

         GeradorDeCod:async (Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setVerNotajogo, setModalCalend)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = tel.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");
     
                 var data={
                   "phone": par3,
                   "message": "Código de entrada: "+last,
                 }   
                 const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                 {
                       method: 'POST',
                       headers:{
                         'Content-Type': 'application/json'
                       },
                       body: JSON.stringify(data),
                    });
                   setCarre(false)                 
                    setCodG(true)


              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setVerNotajogo(false)
                setModalCalend(true)
                setCarre(false);
              }
            })
             
                
           
        },

        GeradorDeCod22:async (Robo, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = tel.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");
     
                 var data={
                   "phone": par3,
                   "message": "Código de entrada: "+last,
                 }   
                 const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                 {
                       method: 'POST',
                       headers:{
                         'Content-Type': 'application/json'
                       },
                       body: JSON.stringify(data),
                    });
                   setCarre(false)                 
                    setCodG(true)


              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setModalVer(true)
                setCarre(false);
              }
            })
             
                
           
        },

        GeradorDeCod44:async (Tel, setCarre, setCodLast, setCodG, setAlert, setAlertTipo, setModalVer, setWhat2)=>{
          var temp = new Date().getTime();
          var IdUser = ""
          var Nome = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                });
             
                var last = Math.floor((Math.random() * (9999 - 1000)) + 1000);
                setCodLast(last); 
                var ver = Tel.replace("(", "55");
                 var par1 = ver.replace(")", "");
                 var par3 = par1.replace("-", "");
     
                 var data={
                   "phone": par3,
                   "message": "Código de entrada: "+last,
                 }   
                 const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                 {
                       method: 'POST',
                       headers:{
                         'Content-Type': 'application/json'
                       },
                       body: JSON.stringify(data),
                    });
                   setCarre(false)                 
                    setCodG(true)
                  setWhat2(true)

              } else {
                setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                setAlertTipo("danger")
                setModalVer(true)
                setCarre(false);
              }
            })
             
                
           
        },

        SacarCash: async(NomeCli, TelCli, IdTrans,  setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad,  setCriarCli  )=> {
          console.log(NomeCli);
          var res = parseFloat(NomeCli)/100;
          var rever=[]
          var IdUser = ""
          var Nome = ""
          var Dinheiro = 0;
          var CashBn = 0;
          var CashTran = parseInt(NomeCli);
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          var tempReal = new Date().getTime();
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                Nome = doc.data().Nome;
                Dinheiro = doc.data().Dinheiro;
                CashBn = doc.data().Cash;
                });
                var CashAt = CashBn - CashTran ;  
               var din =  res;
               var diner = parseFloat(din) + Dinheiro;
            
               await firestore.collection("users")
               .doc(IdUser)
               .update({
                 Cash: CashAt,
                 Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Sacou", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:"" })
               })
               
            
                await firestore.collection("users").doc(IdUser)
                .update({
                  Dinheiro:diner,
                  DateDinheiro:new Date().getTime(),
                });

                await firestore.collection("Cash")
                .add({
                  IdUser: IdUser,
                  Tel:tel,
                  DateDinheiro:new Date().getTime(),
                  Valor:din,
              })
              .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
              })
            
              
                  setNomeCli("");
                  setTelCli("");
                  setIdTrans("");
                  setCarre(false);
                  setAlert("Saque feita com Sucesso, Seu dinheiro foi pra Lista de transferência da pixbetcash!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setPgCash(false);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                  setLoad(false);
                  setNome("");
                  setBtn(false);
                  setMsgErro2(false);
                  setCriarCli(false);
              
    
    
       
                    } else {
                      setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
                      setAlertTipo("danger")
                      setVerNotajogo(false)
                      setModalCalend(true)
                      setCarre(false);
                      setLoad(false);
                    }
                  })  
                 
               
          
            
           
           
         },

        TranfCash: async(NomeCli, TelCli,  IdTrans, setIdTrans, setNome, setCarre,  setAlert, setAlertTipo, setModalCalend, setVerNotajogo,   setTelCli, setNomeCli,  setPgCash,   setRobo, setCodG, setTentativa, setSenha, setBtn, setMsgErro2, setLoad )=> {
          var Msg = ""
          var CashBn = 0;
          var CashTran = parseInt(NomeCli);
          var IdUser = ""
          var Nome = ""
          var tempReal = new Date().getTime();
          var Time =(new Date().getTime());
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                CashBn = doc.data().Cash;
                });
                var CashAt = CashBn - CashTran ;

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Cash: CashAt,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Transferiu", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:TelCli })
                })

              var sfDocRef = firestore.collection("users").doc(IdTrans);

               firestore.runTransaction((transaction) => {
             
              return transaction.get(sfDocRef).then((sfDoc) => {
                 
                  var newPopulation = sfDoc.data().Cash + CashTran;
                  transaction.update(sfDocRef, {
                    Cash: newPopulation, 
                    Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Recebeu", Nivel:"1", Valor:CashTran, Moeda:"Cash", IdInf:tel })
                  });
              });
              }).then(async () => {

                var ver = TelCli.replace("(", "55");
                var par1 = ver.replace(")", "");
                var par3 = par1.replace("-", "");

                var data={
                  "phone": par3,
                  "message": `${Nome} Transferiu ${NomeCli} Cash Para Você`,
                }   
                const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                {
                      method: 'POST',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                   });



                  setNomeCli("");
                  setTelCli("");
                  setIdTrans("");
                  setCarre(false);
                  setAlert("Transferência feita com Sucesso!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setPgCash(false);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                  setLoad(false);
                  setNome("");
                  setBtn(false);
                  setMsgErro2(false);

                  


              }).catch((error) => {
                  console.log("Transaction failed: ", error);
              });
              

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")
              setVerNotajogo(false)
              setModalCalend(true)
              setCarre(false);
              setLoad(false);
            }

          })
        },

        BaixandoMar: async(Nome, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
              console.log("ent")
               
                //const url = await storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/marketing%2FUntitled.mp4?alt=media&token=c4e52d02-1d05-4920-8169-330daf78aff9').getDownloadURL();
               //var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/pixbetcash.appspot.com/o/marketing%2FUntitled.mp4?alt=media&token=c4e52d02-1d05-4920-8169-330daf78aff9');
               const storageRef = storage.ref();

               // [START storage_download_via_url]
               storageRef.child('marketing/Untitled.mp4').getDownloadURL()
                 .then((url) => {
                   // `url` is the download URL for 'images/stars.jpg'
                 
                   // This can be downloaded directly:
                   var xhr = new XMLHttpRequest();
                   xhr.responseType = 'blob';
                   xhr.onload = (event) => {
                     var blob = xhr.response;
                   };
                   xhr.open('GET', url);
                   xhr.send();
                 
                   // Or inserted into an <img> element
                   var img = document.getElementById('myimg');
                   img.setAttribute('src', url);
                 })
                 .catch((error) => {
                   // Handle any errors
                 });
               
                  setCarre(false);
                  setAlert("Nome Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        EditandoEmp: async(IrImg, ConfigEmp, Img, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });

                var Url1 = ""; 
            
               if(IrImg === true){
                var Imagem = Img.split(',');

                    
                const fileName = await Date.now() + Math.random()*100;
                const storageRef = await storage.ref();
                const fileRef = await storageRef.child(`arquivo/${fileName}`);
                await await fileRef.putString(Imagem[1], 'base64').then((doc)=> {
                  
                });
                Url1 =  await fileRef.getDownloadURL();

               } else {
                Url1 = Img;
               }
               

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  LogoEmp: Url1,
                  ConfigEmp: ConfigEmp,
                 
                })

                

               
                  setCarre(false);
                  setAlert("Cofiguração Salva com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        TrocandoNome: async(Nome, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
            

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Nome: Nome,
                 
                })

                

               
                  setCarre(false);
                  setAlert("Nome Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        TrocandoWhats: async(Tel, setAlert, setAlertTipo, setCarre )=> {
          var IdUser = ""
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){

              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id;
                
                });
            

                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Telefone: Tel,
                 
                })


                await AsyncStorage.setItem('Tel', Tel);
               
                  setCarre(false);
                  setAlert("Whatsapp Trocado com Sucesso!");
                  setAlertTipo("success");
               

                  


             

            } else {
              setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
              setAlertTipo("danger")   
              setCarre(false);

            }

          })
        },

        PgCshAti: async( VCash, IdAposta, setCarre, setLinkEnv, setAlert, setAlertTipo, setModalCalend, setVerNotajogo, setSimAp, setValorReal,  setValPremi, setCambis, setTelCli, setNomeCli, setValCambis, setValPreDemos, VaToCo, setVaToCo, setPgCash, setIdAposta, setDCash, setValApos, setVCash, setRobo, setCodG, setTentativa, setSenha   )=> {
          var Msg = ""
          var CashBn = 0;
          var IdUser = ""
          var Nome = ""
          var tempReal = new Date().getTime();
          var Time =(new Date().getTime());
          var tel = await AsyncStorage.getItem('Tel');
          var time = await AsyncStorage.getItem('@entrada');
          var temp = parseInt(time)
          await firestore.collection("users")
          .where("Telefone", "==", tel)
          .where("DataEntCel", "==", temp)
          .get().then( async(querySnapshot) => {
         
            if(querySnapshot.size !== 0){
              querySnapshot.forEach( async (doc) => {
                IdUser = doc.id,
                Nome = doc.data().Nome
                CashBn = doc.data().Cash;
                });

                if(CashBn >= VCash){
                  var CashAt = CashBn-VCash;
                await firestore.collection("users")
                .doc(IdUser)
                .update({
                  Cash: CashAt,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Pagou", Nivel:"1", Valor:VCash, Moeda:"Cash", IdInf:IdAposta })
                })
                .then(async () => {
      
                  await firestore.collection("CompApostas")
                  .doc(IdAposta)
                  .update({
                    Pago: true,
                    DatePago:tempReal,
                    PgCash:true,
                  })
                  .then(async () => {
                    var Id1nivel = "";
                    var Id2nivel = "";
                    var Id3nivel = "";
                    var Id4nivel = "";
                    var ValorApo = 0;
      
                    await firestore.collection("CompApostas")
                    .doc(IdAposta)
                    .get().then(async(doc) => {
                    Id1nivel = doc.data().IdCri;
                    ValorApo =parseInt(doc.data().ValorAposta);
      
      
                if(Id1nivel === IdUser){
      
                  if(doc.data().Pago === true){
      
                  if(doc.data().Cambista === true){
      
                      let currentDate25 = '';
                      let now25 =new Date(Time);
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
      
                        var Msg = ""
      
                        Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                        Msg = Msg + `Nome: ${doc.data().NomeComp}\n`
                        Msg = Msg + `Telefone: ${doc.data().TelComp}\n`
                        Msg = Msg + `Pagamento Aprovado\n`
                        Msg = Msg + `Data: ${currentDate25}\n`
                        Msg = Msg + `----------------------------------------------\n`
                        
                        for(let i in doc.data().Bets){
      
                        let currentDate = '';
                        let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
      
      
                        Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                        }
      
                        Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                        Msg = Msg + `Valor Prêmio: R$ ${doc.data().ValorPremio}\n`;
                        Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                        Msg = Msg + `Cambista: --------------------\n`;
                        Msg = Msg + `Nome: ${doc.data().Nome}\n`;
                        Msg = Msg + `Telefone: ${doc.data().Tel}\n`;
                        Msg = Msg + `Cambista Ganhará 10% em Cima do Prêmio:\n`;
                        Msg = Msg + `Valor: R$ ${doc.data().ValCambis}\n`;
                        
      
      
                        var ver = doc.data().TelComp.replace("(", "55");
                        var par1 = ver.replace(")", "");
                        var par3 = par1.replace("-", "");
      
                        var data={
                          "phone": par3,
                          "message": Msg,
                        }   
                        const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data),
                           });
      
      
                      } else {
      
                      let currentDate25 = '';
                            let now25 =new Date(Time);
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
      
                        var Msg = ""
      
                        Msg = Msg + `----- Boleto de Aposta PixBetCash -----\n`
                        Msg = Msg + `Nome: ${doc.data().Nome}\n`
                        Msg = Msg + `Telefone: ${doc.data().Tel}\n`
                        Msg = Msg + `Pagamento Aprovado\n`
                        Msg = Msg + `Data: ${currentDate25}\n`
                        Msg = Msg + `----------------------------------------------\n`
                        
                        for(let i in doc.data().Bets){
      
                        let currentDate = '';
                        let now =new Date((doc.data().Bets[i].dataJogo) * 1000);
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
      
      
                        Msg = Msg + `⚽${doc.data().Bets[i].CasaTime.name.substr(0, 15)} X  ${doc.data().Bets[i].ForaTime.name.substr(0, 15)} \n ☝🏽 Palpite: ${doc.data().Bets[i].Casa} | Cota: ${doc.data().Bets[i].Olds} \n 🥅 (${doc.data().Bets[i].Grupo}) \n ⌚️ ${currentDate}\n ---------------------------------------------\n`
                        }
      
                        Msg = Msg + `Cota Total: ${doc.data().CotaGeral}\n`;
                        Msg = Msg + `Valor Premio: R$ ${doc.data().ValorPremio}\n`;
                        Msg = Msg + `Valor Pago: ${doc.data().valorAposSimb}\n`;
                        
      
      
                        var ver = doc.data().Tel.replace("(", "55");
                        var par1 = ver.replace(")", "");
                        var par3 = par1.replace("-", "");
      
                        var data={
                          "phone": par3,
                          "message": Msg,
                        }   
                        const req = await fetch("https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE/send-messages", 
                        {
                              method: 'POST',
                              headers:{
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data),
                           });
      
                        
      
      
      
                        }
      
      
      
      
          //1° nivel ------
          
          var cash1 = 0;
          var TemV1 = 0;
          var NewTemV1 = 0;
          var NewCash1 = 0;
          
          await firestore.collection("users")
          .doc(Id1nivel)
          .get().then((doc11) => {
           cash1 = doc11.data().Cash; 
           TemV1 = doc11.data().DataVenc;
          });
          
          if(TemV1 < tempReal){
          
           NewTemV1 = tempReal+(86400000*ValorApo);
           NewCash1 = cash1 + (9*ValorApo);
          
          }else {
          
          NewTemV1 = TemV1+(86400000*ValorApo);
          NewCash1 = cash1 + (9*ValorApo);
          
          }
          
          await firestore.collection("users")
          .doc(Id1nivel)
          .update({
              Cash:NewCash1,
              DataVenc:NewTemV1,
              Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:"Ganhou", Nivel:"1", Valor:(9*ValorApo), Moeda:"Cash", IdInf: IdAposta })
          })
      
      
           //2° Nivel ----
           var cash2 = 0;
           var TemV2 = 0;
           var NewTemV2 = 0;
           var NewCash2 = 0;
           var Status2 = "";
           
           await firestore.collection("users")
           .where("Indicados", "array-contains", Id1nivel)
           .get().then(async (querySnapshot12) => {
             if(querySnapshot12.size  !== 0){
           
           
            await querySnapshot12.forEach((doc12) => {
                 Id2nivel = doc12.id;
               })
           
           await firestore.collection("users")
           .doc(Id2nivel)
           .get().then((doc13) => {
            cash2 = doc13.data().Cash; 
            TemV2 = doc13.data().DataVenc;
           });
           
           if(TemV2 < tempReal){
               NewCash2 = cash2;
               Status2 = "Perdeu";
              
              }else {
              
              NewCash2 = cash2 + (6*ValorApo);
              Status2 = "Ganhou";
              
              }
           
              await firestore.collection("users")
              .doc(Id2nivel)
              .update({
                  Cash:NewCash2,
                  Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status2, Nivel:"2", Valor:(6*ValorApo), Moeda:"Cash", IdInf:IdAposta })
              })
              
           
       
           
           
             } 
           })
          
         
      
      
          
      
             //3° Nivel ----
             var cash3 = 0;
             var TemV3 = 0;
             var NewTemV3 = 0;
             var NewCash3 = 0;
             var Status3 = "";
      
             await firestore.collection("users")
             .where("Indicados", "array-contains", Id2nivel)
             .get().then(async (querySnapshot13) => {
               if(querySnapshot13.size  !== 0){
             
             
              await querySnapshot13.forEach((doc131) => {
                   Id3nivel = doc131.id;
                 })
             
             await firestore.collection("users")
             .doc(Id3nivel)
             .get().then((doc132) => {
              cash3 = doc132.data().Cash; 
              TemV3 = doc132.data().DataVenc;
             });
             
             if(TemV3 < tempReal){
                 NewCash3 = cash3;
                 Status3 = "Perdeu";
                }else {
                
                NewCash3 = cash3 + (3*ValorApo);
                Status3 = "Ganhou";
                }
             
                await firestore.collection("users")
                .doc(Id3nivel)
                .update({
                    Cash:NewCash3,
                    Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status3, Nivel:"3", Valor:(3*ValorApo), Moeda:"Cash", IdInf:IdAposta })
                })
            
                
             
             
               } 
             })
      
      
      
      
      
      
              
                //4° Nivel ----
                var cash4 = 0;
                var TemV4 = 0;
                var NewTemV4 = 0;
                var NewCash4 = 0;
                var Status4 = "";
                
                await firestore.collection("users")
                .where("Indicados", "array-contains", Id3nivel)
                .get().then(async (querySnapshot14) => {
                  if(querySnapshot14.size  !== 0){
                
                
                 await querySnapshot14.forEach((doc141) => {
                      Id4nivel = doc141.id;
                    })
                
                await firestore.collection("users")
                .doc(Id4nivel)
                .get().then((doc142) => {
                 cash4 = doc142.data().Cash; 
                 TemV4 = doc142.data().DataVenc;
                });
                
                if(TemV4 < tempReal){
                    NewCash4 = cash4;
                    Status4 = "Perdeu";
                   }else {
                   
                   NewCash4 = cash4 + (1*ValorApo);
                   Status4 = "Ganhou";
                   }
                
                   await firestore.collection("users")
                   .doc(Id4nivel)
                   .update({
                       Cash:NewCash4,
                       Extrato: firebase.firestore.FieldValue.arrayUnion({Data:tempReal, Status:Status4, Nivel:"4", Valor:(1*ValorApo), Moeda:"Cash", IdInf:IdAposta })
                   })
                   
                
                
                  } 
                })
      
      
                  }
      
      
                  }
      
                  });
                 
                  setCarre(false);
                  setAlert("Aposta Paga com Sucesso!");
                  setAlertTipo("success");
                  setModalCalend(true);
                  setVerNotajogo(false);
                  setSimAp([]);
                  setValCambis("");
                  setValorReal(0);
                  setValPremi(0);
                  setTelCli("");
                  setNomeCli("");
                  setCambis(false);
                  setValPreDemos("");
                  setVaToCo(0)
                  setIdAposta("");
                  setPgCash(false);
                  setDCash(0);
                  setValApos("R$000,00")
                  setVCash(0);
                  setCodG(false)
                  setTentativa(0)
                  setSenha("")
                  setRobo(true)
                 
                 
                 
                 
                  })
      
      
                  
              //     var data = new URLSearchParams();
              //     data.append('DataEnt', DataEnt);
              //     data.append('Tel', Tel);
              //     data.append('IdApos', IdAposta);
            
              // const req = await fetch("https://us-central1-pixbetcash.cloudfunctions.net/api/PagamentoCash", {
              //   method: 'POST',
              //   headers:{
              //     'Content-Type': 'application/x-www-form-urlencoded'
              //   },
              //   body: data.toString(),
              //   json: true,
              // });
             
              // const json = await req.json();
            
              // if(json){
            
             
      
                
       
               
              //  }
                })
                 
                 
      
              
             } 
         

         
         
         
        } else {
          setAlert("Ouve um erro na Sua Conta Você Não Esta Logado")
          setAlertTipo("danger")
          setVerNotajogo(false)
          setModalCalend(true)
          setCarre(false);
        }
      })
         
         
           
           },
           
  

}