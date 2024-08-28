import React, {useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    CaixaDados, 
    CaixaTitulo,
    TextInfo,
    BtnModal,
    Post,
    Post2, 
    Header, 
    Avatar,
    Avatar2,
    Name,
    PostImage, 
    Description,
    Loadin,
    Moldi,
    Moldi2,
    Botoes,
    Button,
    Titulo,
    Status,
    Participar, 
    NameBtn,
    Description2,
    NameComen,
    CustomButton1,
    CustomButtonText,
    CustomSubTituloText,
    BarraAtu,
    BarraCity,
    NameAtu,
    Moldi3,
    Titulo3,
    Header3,
    Participar3,
    NameBtn3,
    Menu,
    MenuItem,
    MenuItemText,
    Box10,
    NameTex,
    CustomButton,
    CustomEstButton,
    CustomButtonText1,
    StatusCat,
    NameSimp,
} from './styles';
import { Text, FlatList, View, StyleSheet,  ImageBackground, Modal, Image, Linking, StatusBar, } from 'react-native';
import CalenIcon from '../../assets/calendario.svg';
import DataInput from '../Data';
import { useNavigation } from '@react-navigation/native'; 
import Api from '../../Api';
import Datand from '../datando';
import { UserContext } from '../../contexts/UserContext';
import CityLogo from '../../assets/logomarca.svg';
import Config from '../../assets/configuracoes.svg';
import Fotos from '../../assets/camera.svg';
import LazyImage from '../LazyImage';
import Estrela from '../../assets/estrela.svg';
import Comentarios from '../../assets/comentarios.svg';
import Compartilhar from '../../assets/compartilhar.svg';
import EstrelaOuro from '../../assets/estrelaOuro.svg';
import EstrelaRouxa from '../../assets/estrelaroxa.svg';
import Pesquisa from '../../assets/search.svg';
import Promocao from '../../assets/promocao.svg';
import { ModalDatePicker } from "react-native-material-date-picker";
import { ModalSelectList } from 'react-native-modal-select-list';

export default ({Cid, Estad}) => {
  const navigation = useNavigation(); 
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);
  const [ActiveMenu, setActiveMenu] = useState('Anuncios')
  const [Id, setId] = useState(userState.id);
  const [Varia, setVaria] = useState('');
  const [ModalIr, setModalIr] = useState(false);
  const [Est, setEst] = useState(false);
  const [Page, setPage] = useState(1);
  const [Total, setTotal] = useState(20);
  const [Loading, setLoading] = useState(false);
  const [Refreshin, setRefreshin] = useState(false);
  const [Changed, setChanged] = useState([]);
  const [EntVizu, setEntVizu] = useState("");
  const [SaidaVizu, setSaidaVizu] = useState("");
  const [AnaliCont, setAnaliCont] = useState(true);
  const [AnaliAtu, setAnaliAtu] = useState(true);
  const [versao, setversao] = useState(userState.versao)
  const [Vend, setVend] = useState("");
  const [Info, setInfo] = useState(userState.SegAnun);
  const [List, setList] = useState(null);
  const [MarcaEmp, setMarcaEmp] = useState()
  const [LsitSegPes, setLsitSegPes] = useState(userState.SegPes);
  const [ListSubSegP, setListSubSegP] = useState(userState.SubSegPes);
  const [IdTipAnun, setIdTipAnun] = useState(null);
  const [ListCat, setListCat] = useState(null);
  const [Cat, setCat] = useState(null);
  const [IdCat, setIdCat] = useState(null);
  const [ListSubCat, setListSubCat] = useState(null);
  const [SubCat, setSubCat] = useState(null);
  const [IdSubCat, setIdSubCat] = useState(null);
  const [ListPro, setListPro] = useState([{label:"Toda a loja", value:"Toda a loja" }, {label:"Um só item", value:"Um só item" }  ]);
  const [ListDesc, setListDesc] = useState([
    {label:"10%", value:"10%" }, 
    {label:"20%", value:"20%" },
    {label:"30%", value:"30%" },
    {label:"40%", value:"40%" },
    {label:"50%", value:"50%" },
    {label:"60%", value:"60%" },
    {label:"70%", value:"70%" },
    {label:"80%", value:"80%" },
    {label:"90%", value:"90%" },
     ]);
  const [Desconto, setDesconto] = useState(null);
  const [PromoTip, setPromoTip] = useState(null);
  const [ListEvent, setListEvent] = useState([{label:"Público", value:"Público" },{label:"Privado", value:"Privado" } ]);
  const [TipEven, setTipEven] = useState(null);
  const [TimeEve, setTimeEve] = useState(null);
  const [DataEve, setDataEve] = useState(null);
  const [Estado, setEstado] = useState(Estad);
  const [Cidade, setCidade] = useState(Cid);
  


  useEffect(() => {
    ListandoAnun();
  }, [Page, IdTipAnun, Cidade, Estado, IdCat, IdSubCat, Desconto, PromoTip, TipEven, TimeEve,]);
 
  useEffect(() => {
    LevarTemp();
  }, [])

  useEffect(() => {
   setCidade(Cid);
   setEstado(Estad)
   setList(null);
  }, [Cid, Estad])



  useEffect(() => {
    
    if(userState.InforUsers !== null){
      AnalisandoConta();
    }
  }, [userState.InforUsers])

  useEffect(() => {
    
    if(userState.ConfigApp !== null){
      AnalisandoAtua();
    }
  }, [userState.ConfigApp])

  
  useEffect(() => {
    LevarTemp();
  }, [])

  useEffect(() => {
    ListandoCat();
  }, [])

  useEffect(() => {
    if(Cat !== null){
      PegandoIdCat();
    } 
  }, [Cat])

  useEffect(() => {
    if(SubCat !== null){
      PegandoIdsubCat();
    } 
  }, [SubCat])

  useEffect(() => {
    if(IdCat !== null){
      console.log(IdCat)
      console.log(IdTipAnun);
      ListandoSubCat();
      setIdSubCat(null);
      setSubCat(null);
    }
  
  }, [IdCat]);

  useEffect(() => {
    if(IdSubCat !== null){
      console.log(IdCat)
      console.log(IdTipAnun);
      console.log(IdSubCat);
    }
  
  }, [IdSubCat]);

 

 
  useEffect( ()=>{
    GuardaVari(); 
   }, [Varia]);

   function ListandoCat() {
    var list = [];
    userState.SegPes.forEach(result => {
          list.push({
            label: result.nome,
            id: result.id,
            value: result.nome,
          });   
    });
    setListCat(list);
  }

  let modalRef;
   let valor;
     const openModal = (num) =>{
         valor=num;
         modalRef.show();
     }
     const saveModalRef = ref => modalRef = ref;
   
     const onSelectedOption = (value, id)=> {
       
        setCat(value); 
         };


         function PegandoIdCat() {
          for(let i in ListCat ) {
            
              if(ListCat[i].value === Cat) {
              setIdCat(ListCat[i].id);
                };
             
              }
          }
     function ListandoSubCat() {
          let listanha = [];
            for(let i in userState.SubSegPes ) {
                
                if(userState.SubSegPes[i].idSeg === IdCat) {
                 
                    listanha.push({
                      value: userState.SubSegPes[i].nome,
                      label: userState.SubSegPes[i].nome, 
                      id: userState.SubSegPes[i].id, 
                  });   
                
                 
                }
                setListSubCat(listanha);
            }
          }


          let modalRef2;
          let valor2;
            const openModal2 = (num) =>{
                valor2=num;
                modalRef2.show();
            }
            const saveModalRef2 = ref => modalRef2 = ref;
          
            const onSelectedOption2 = (value, id)=> {
              
               setSubCat(value); 
                };
       
       
                function PegandoIdsubCat() {
                 for(let i in ListSubCat ) {
                   
                     if(ListSubCat[i].value === SubCat) {
                     setIdSubCat(ListSubCat[i].id);
                       };
                    
                     }
                 }

                 let modalRef3;
                 let valor3;
                   const openModal3 = (num) =>{
                       valor3=num;
                       modalRef3.show();
                   }
                   const saveModalRef3 = ref => modalRef3 = ref;
                 
                   const onSelectedOption3 = (value, id)=> {
                     
                      setDesconto(value); 
                       };

                       let modalRef4;
                       let valor4;
                         const openModal4 = (num) =>{
                             valor4=num;
                             modalRef4.show();
                         }
                         const saveModalRef4 = ref => modalRef4 = ref;
                       
                         const onSelectedOption4 = (value, id)=> {
                           
                            setPromoTip(value); 
                             };

                             let modalRef5;
                             let valor5;
                               const openModal5 = (num) =>{
                                   valor5=num;
                                   modalRef5.show();
                               }
                               const saveModalRef5 = ref => modalRef5 = ref;
                             
                               const onSelectedOption5 = (value, id)=> {
                                 
                                  setTipEven(value); 
                                   };



   const ListandoAnun = async ()=>{
    Api.ListAnuncioPesq( Page, Cidade, Estado, IdTipAnun, IdCat, IdSubCat, Desconto, PromoTip, TipEven, TimeEve, setList );
  }

   const GuardaVari = ()=>{
    userDispatch({
      type: 'setVari',
      payload:{
        variTemp: Varia, 
      }
  });
  }

  const Pesquisa = async (item)=>{
    setVend(item);
    setIdTipAnun(item.id);
    setIdCat(null);
    setCat(null);
    setIdSubCat(null);
    setSubCat(null)
    setDesconto(null);
    setPromoTip(null); 
    setTipEven(null); 
    setTimeEve(null);
    setDataEve(null)

  }
  const Entrar = (item)=>{
    var IdRo =item.IdUser;
    navigation.navigate("Anuncio", {
      item:item,
      idRo: IdRo,
  })
  }

  const EntrarEvento = (item)=>{
    var IdRo =item.IdUser;
    navigation.navigate("Evento", {
      item:item,
      idRo: IdRo,
  })
  }

  const LevarTemp = async ()=>{
    await Api.VariacaoTemp(Id);
    await Api.VarTempPegar(Id, setVaria);
   }
  
  const AnalisandoConta = async ()=>{
    var time = await AsyncStorage.getItem('@entrada');
    var tem = parseInt(time)
    if(userState.InforUsers.DataEnt !== tem){
      console.log("entende ave")
      setAnaliCont(false);
    }
  }

  const AnalisandoAtua = async ()=>{
    setMarcaEmp(userState.ConfigApp.FotoEmp)
    if(userState.ConfigApp.versao !== versao){
      setAnaliAtu(false);
    } else {
      setAnaliAtu(true);
    }
  }

 



   const FechModal = ()=>{
    setModalIr(false);
  }

  const IrConfig = async ()=>{
    var IdUser = await AsyncStorage.getItem('Id');
    var tipando = userState.InforUsers.Tipo;

    navigation.navigate("Perfilmeu", {
      id:IdUser,
      tipo:tipando,
      avatar:"",
      nome:"",
      estrelas:"",
    });
   }


  const loadPage = (pageNumber = Page)=>{
            setPage(pageNumber + 1)
        }

        const refreshList = async ()=>{
          await  setRefreshin(true);
          setPage(1);
          setIdTipAnun(null);
           setIdCat(null);
          setIdSubCat(null);
          setDesconto(null);
          setPromoTip(null); 
          setTipEven(null); 
          setTimeEve(null);
          setVend("");

          await setRefreshin(false);
        }
           
        const handleView = useCallback(({viewableItems, changed} )=>{
            //vai pegar o id dos posts que ficaram visiveis que antes não estavam 
            
            setChanged(changed.map(({ item, isViewable })=> {

              console.log(item.id);
           console.log(isViewable);
            
            
            }));
            
        }, []);

       

         useEffect(() => {
            console.log(Page)
           }, [Page])
 
        const sair = async () => {
          await AsyncStorage.setItem('Tel', "");
          await AsyncStorage.setItem('@codigo', "");
          await AsyncStorage.setItem('@entrada', "");
          await AsyncStorage.setItem('varia', "");
          
          await  userDispatch({
            type: 'setInforUsers',
            payload:{
              InforUsers: null 
            }
          });
          await userDispatch({
            type: 'setInforArea',
            payload:{
              InforArea: null
            }
          });
          await  userDispatch({
            type: 'setInforEmp',
            payload:{
              InforEmp: null
            }
          });
          await userDispatch({
            type: 'setInforConf',
            payload:{
              InforConf: null
            }
        });
        userDispatch({
          type: 'setConfigApp',
          payload:{
            ConfigApp: null
          }
        });
          await navigation.reset({
            routes:[{name:'Preload'}]
        });
        Api.SaindoConta(Id);
           
    }

    const whats = async () => {
        Linking.openURL (`whatsapp://enviar?Texto=Renan`);
      
   }

   const IrParaAtu = async () => {
    Linking.openURL (userState.ConfigApp.LinkApp);
  
}
  
    const EntrarPerfil = ()=>{
      // navigation.navigate('PerfilTeu', {
      //     id:"4564",
      //     nome:"Renan",
      // })
      }

      const ColocarEstrela = ()=>{
        setEst(true);
    }

    const TirarEstrela = ()=>{
        setEst(false);
    }
    const Mudedate = (date)=>{
      let currentDate = "";
      let now25 =date.getTime();
      let Dia = date.getDate();
      let Mes = (date.getMonth()+1);
      let Ano = date.getFullYear();
      Dia = Dia < 10 ? '0'+Dia : Dia;
      Mes = Mes < 10 ? '0'+Mes : Mes;
      currentDate = Dia+'/'+Mes+'/'+Ano;
      let currentDate1 = Ano+'-'+Mes+'-'+Dia;
      let CompDat1 = new Date(currentDate1+"T23:59:59.000").getTime();
      let CompDat3 = CompDat1+10800000;
     setDataEve(currentDate);
     setTimeEve(CompDat3);
    }



    return ( 
<Container>

   <Modal
           animationType="slide"
           visible={ModalIr}
          >
    <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText1}>Tem Certeza que Deseja Sair da Conta?</Text>
          <BtnModal onPress={()=>saindo()}>
          <Text style={styles.modalText2}>Sim</Text>
          </BtnModal>
          <BtnModal onPress={()=>FechModal()}>
          <Text style={styles.modalText3}>Não</Text>
          </BtnModal>
          </View>
          </View>


          </Modal>
        
   
       
             
          <BarraCity>
          <NameComen>Filtro</NameComen>
          <FlatList
         showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          horizontal
          data={Info}
          keyExtractor={post=> String(post.id)}
          renderItem={({item}) => (
           
            <Box10 onPress={()=>Pesquisa(item)} style={{"backgroundColor": Vend===item? "#FFE767":"#fff"}}>
                 <NameTex>{item.nome}</NameTex>
            </Box10>
              
          )}
        />
        {Vend.nome === "Itens Usados" &&
          <StatusCat>
          <CustomEstButton onPress={openModal} >
            {Cat !== null ?
            <>
              <CustomButtonText1> {Cat} </CustomButtonText1>
            </>
            :
            <>
             <CustomButtonText1> Escolha a Categoria </CustomButtonText1>
             
            </>
            }   
                          
          </CustomEstButton>
          {Cat !== null &&
          <>
            <CustomEstButton onPress={openModal2} >
              {SubCat !== null ?
                <CustomButtonText1> {SubCat}</CustomButtonText1>
              :
            <CustomButtonText1> Escolha a Sub-Categoria </CustomButtonText1>
              }
                            
          </CustomEstButton>
         
          
          </>

          }
         </StatusCat>

        }

            <ModalSelectList
                      ref={saveModalRef}
                      placeholder={"Pesquisar..."}
                      closeButtonText={"X"}
                      options={ListCat}
                      onSelectedOption={(value, id)=>{onSelectedOption(value, id)}}
                      disableTextSearch={false}
                      numberOfLines={6}
                  />

                <ModalSelectList
                      ref={saveModalRef2}
                      placeholder={"Pesquisar..."}
                      closeButtonText={"X"}
                      options={ListSubCat}
                      onSelectedOption={(value, id)=>{onSelectedOption2(value, id)}}
                      disableTextSearch={false}
                      numberOfLines={6}
                  />

                  <ModalSelectList
                      ref={saveModalRef3}
                      placeholder={"Pesquisar..."}
                      closeButtonText={"X"}
                      options={ListDesc}
                      onSelectedOption={(value, id)=>{onSelectedOption3(value, id)}}
                      disableTextSearch={false}
                      numberOfLines={6}
                  />

                    <ModalSelectList
                      ref={saveModalRef4}
                      placeholder={"Pesquisar..."}
                      closeButtonText={"X"}
                      options={ListPro}
                      onSelectedOption={(value, id)=>{onSelectedOption4(value, id)}}
                      disableTextSearch={false}
                      numberOfLines={6}
                  />

                  <ModalSelectList
                      ref={saveModalRef5}
                      placeholder={"Pesquisar..."}
                      closeButtonText={"X"}
                      options={ListEvent}
                      onSelectedOption={(value, id)=>{onSelectedOption5(value, id)}}
                      disableTextSearch={false}
                      numberOfLines={6}
                  />
                 

          {Vend.nome === "Itens Novos" &&
          <StatusCat>
          <CustomEstButton onPress={openModal} >
            {Cat !== null ?
            <>
              <CustomButtonText1> {Cat} </CustomButtonText1>
            </>
            :
            <>
             <CustomButtonText1> Escolha a Categoria </CustomButtonText1>
             
            </>
            }   
                          
          </CustomEstButton>
          {Cat !== null &&
          <>
            <CustomEstButton onPress={openModal2} >
              {SubCat !== null ?
                <CustomButtonText1> {SubCat}</CustomButtonText1>
              :
            <CustomButtonText1> Escolha a Sub-Categoria </CustomButtonText1>
              }
                            
          </CustomEstButton>
         
          
          </>

          }
         </StatusCat>

        }

        {Vend.nome === "Eventos" &&
          <StatusCat>
          <CustomEstButton onPress={openModal5} >
            {TipEven !== null ?
          <CustomButtonText1>{TipEven}</CustomButtonText1>
            :
          <CustomButtonText1>Tipo de Evento</CustomButtonText1>
            } 
                   </CustomEstButton> 
                   <ModalDatePicker
                button={ <View style={styles.modalView3}><Text  style={styles.modalText6}> {DataEve === null ? "Data do Evento" : DataEve} </Text></View>} 
                locale="en" 
                onSelect={(date) =>Mudedate(date) }
                isHideOnSelect={true}
                initialDate={new Date()}
                language={require('../../JSONS/locales.json')}
                  />              
               
          </StatusCat>

        }
        {Vend.nome === "Promoções" &&
          <StatusCat>
          <CustomEstButton onPress={openModal3} >
            {Desconto !== null ?
            <CustomButtonText1>{Desconto}</CustomButtonText1>
            :
            <CustomButtonText1>Porcentagem de Desconto</CustomButtonText1>
            }   
                           
          </CustomEstButton>
          <CustomEstButton onPress={openModal4} >
            {PromoTip !== null ?
            <CustomButtonText1>{PromoTip}</CustomButtonText1>
            :
            <CustomButtonText1>Tipo de Promoção</CustomButtonText1>
            }   
                           
          </CustomEstButton>
          </StatusCat>

        }
                     
                   
      
          </BarraCity>
        
        {List === null ?
        <>
       <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
        </>

        :
        <>
           <FlatList 
       data={List}
      //essa função é pra carregar mais listas quando chegar no final da lista faltando 10%
        onEndReached={()=>loadPage()}
        //essa função é para dizer quantos porcento final da lista tem que tá para carregar a função de carregar mais lista
        onEndReachedThreshold={0.1}
       keyExtractor={post=> String(post.id)}
       // colocar o loading no final da lista para carregar mais conteudo 
       ListFooterComponent={ Loading &&  <Loadin /> }
       //realizar uma função quando puxar pra cima 
       onRefresh={refreshList}
       //boleano quando a função de refresh acabou 
       refreshing={Refreshin}
       //dipara uma função quando os intens que estiver vizivel mudarem
      //  onViewableItemsChanged={handleView}
       // quando o item chegar a 50 porcento carrega a outra imagem
       viewabilityConfig={{ minimumViewTime:2000, viewAreaCoveragePercentThreshold:75 }}
       showsVerticalScrollIndicator={false}
       renderItem={({ item }) => (
         <>
         {item.tipo === "AiBlUlfbFp9ium9jbQ9C" ?
         <Post onPress={()=>EntrarEvento(item)}>
         <Header >
             <Moldi >
             <Avatar source={{ uri: item.imageUrl}} />
             </Moldi>
             <Titulo  >
            
             <Name>{item.Nome.substring(0,18)}</Name>
             <NameSimp>Evento {item.TipoEve}</NameSimp>
             {item.ValorEv === true &&
           <NameSimp>Entrada: R${item.Valor}</NameSimp>
             }

             
            
             </Titulo>
          
             
         </Header>
 
     </Post>   

         :
         <Post onPress={()=>Entrar(item)}>
         <Header >
             <Moldi >
             <Avatar source={{ uri: item.imageUrl}} />
             </Moldi>
             <Titulo  >
             {item.tipo === "EIEMtUHNoSTbZVRmgrEM" &&
             <>
             <Name>{item.Nome.substring(0,18)}</Name>
             <NameSimp>Item Usado</NameSimp>
             <NameSimp>Valor: R${item.Valor}</NameSimp>
             </>

             }
             {item.tipo === "hE9AsRvNKFwi4M2BgC9o" &&
             <>
             <Name>{item.Nome.substring(0,18)}</Name>
             <NameSimp>Item Novo</NameSimp>
             <NameSimp>Valor: R${item.Valor}</NameSimp>
             </>

             }
              {item.tipo === "nniZYaejVLgPjvnQVizz" &&
             <>
             <Name>{item.Nome.substring(0,18)}</Name>
             <NameSimp>Promoção</NameSimp>
            
             {item.TipoDesc === "Um só item" ?
             <>
             <NameSimp style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:"red"}}>Valor: R${item.Valor}</NameSimp>
             <NameSimp>Desconto:{item.Desconto}</NameSimp>
             <NameSimp>Valor: R${(parseFloat(item.Valor)-(parseFloat(item.Valor)*(parseFloat(item.Desconto)/100))).toFixed(2).toString().replace("." , ",") }</NameSimp>
             </>
             :
             <>
             <NameSimp>{item.TipoDesc}</NameSimp>
             <NameSimp>Desconto:{item.Desconto}</NameSimp>
             </>
             }
           
             </>

             }

            
            
             </Titulo>
          
             
         </Header>
      
   
 
     </Post>   

         }
         </>
      
       )}
       />

        </>

        }
        
       
          
         
      
              

      </Container>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      width:"100%",
      height:50,
    },
    flatList: {
      marginTop: 10,
      paddingLeft: 15,
      paddingRight: 15, // THIS DOESN'T SEEM TO BE WORKING
      // marginRight: 15   I can't use marginRight because it cuts off the box with whitespace
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: 80,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 15,
      marginRight: 15,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    image: {
      width: '100%',
      height: '100%',
       flex: 1 ,
       alignItems:"center"
    },
    image2: {
      width: '100%',
      height: '100%',
       flex: 1 ,
       alignItems:"center",
       justifyContent:"center",
       margin: 5,

    },
    centeredView: {
      backgroundColor: "#000",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    modalText: {
      fontSize: 30,
      textAlign: "center",
      fontWeight:'bold',
    },
    modalText1: {
      fontSize: 20,
      textAlign: "center",
      color:"#000",
      fontWeight:'bold',
    },
    modalText2: {
      fontSize: 20,
      textAlign: "center",
      color:"blue"
    },
    modalText3: {
      width: '100%',
      height: 30,
      margin: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView3: {
      width: 150,
      height: 30,
      backgroundColor: "#fff",
      borderRadius: 10,
     paddingTop:3,
     borderWidth:2,
     marginBottom:5,

    },
    modalText6: {
      fontSize: 12,
      textAlign: "center",
      color:"#000"
    },
    ImageVer2:{
      width:200,
    height:100,
    marginTop: 10,
    marginBottom: -70,
    },

    flatList: {
     // THIS DOESN'T SEEM TO BE WORKING
      // marginRight: 15   I can't use marginRight because it cuts off the box with whitespace
    },
  });