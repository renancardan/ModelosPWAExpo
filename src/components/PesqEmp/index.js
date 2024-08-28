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
import TelIcon from '../../assets/telefone.svg';
import Telefone from '../NumberTelPesq';
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
import Negocia from '../../assets/negociacao.svg';
import EstrelaRouxa from '../../assets/estrelaroxa.svg';
import Pesquisa from '../../assets/search.svg';
import Promocao from '../../assets/promocao.svg';
import ChatIcon from '../../assets/chat.svg';


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
  const [Info, setInfo] = useState(userState.SegEmp);
  const [IdSegEmp, setIdSegEmp] = useState(null);
  const [List, setList] = useState(null);
  const [MarcaEmp, setMarcaEmp] = useState();
  const [Tel, setTel] = useState("");
  const [Estado, setEstado] = useState(Estad);
  const [Cidade, setCidade] = useState(Cid);
  
  
  useEffect(() => {
    PegarList();
   }, [Page, IdSegEmp ,Cidade, Estado])

   useEffect(() => {
    console.log(Tel.length);
    if(Tel.length === 14){
     
      setVend("");
      PegarList();
    }
   }, [Tel])
 
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

 

 
  useEffect( ()=>{
    GuardaVari(); 
   }, [Varia]);




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
    setIdSegEmp(item.id);
    
  }

  const LevarTemp = async ()=>{
    // await Api.VariacaoTemp(Id);
    // await Api.VarTempPegar(Id, setVaria);
   }
  
  const AnalisandoConta = async ()=>{
    // var time = await AsyncStorage.getItem('@entrada');
    // var tem = parseInt(time)
    // if(userState.InforUsers.DataEnt !== tem){
    //   console.log("entende ave")
    //   setAnaliCont(false);
    // }
  }

  const AnalisandoAtua = async ()=>{
    setMarcaEmp(userState.ConfigApp.FotoEmp)
    // if(userState.ConfigApp.versao !== versao){
    //   setAnaliAtu(false);
    // } else {
    //   setAnaliAtu(true);
    // }
  }

 const PegarList = ()=>{
   Api.ListEmpresa(Page, Cidade, Estado, IdSegEmp, Tel, setList)
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
           setIdSegEmp(null);
           setPage(1);
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
   const Entrar = ()=>{
    // navigation.navigate('Comentarios', {
    //     id:"4564",
    //     nome:"Renan",
    // })
    }

    const EntrarPerfil = (item)=>{
      var IdUs = item.id;
      var Foto = item.FotoPerfil;
      var Estre = item.estrelas;
      var Nego = item.Negociacao;
      var Loc = item.loc;
      var nomeUser = item.nome;
      navigation.navigate("Perfilmeu", {
        id:IdUs,
        tipo:"Empresa",
        avatar:Foto,
        nome:nomeUser,
        estrelas:Estre,
        Negocicao:Nego,
        Loc:Loc,
        telefone:item.telefone,
      });
     }
     

      const ColocarEstrela = ()=>{
        setEst(true);
    }

    const TirarEstrela = ()=>{
        setEst(false);
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
        <StatusCat>
        <Telefone
                       IconSvg={TelIcon}
                       placeholder="Whatsapp da Empresa" 
                       value={Tel}
                       onChangeText={t=>setTel(t)}
                       autoCapitalize="none"
                       keyboardType={"phone-pad"}
                    
                    //    TelWhats={TelWhats}
                   />
      </StatusCat>
      
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
        <Post onPress={()=>EntrarPerfil(item)}>
            <Header >
                <Moldi >
                  {item.FotoPerfil !== "" &&
                  <Avatar source={{ uri: item.FotoPerfil}} />
                  }
               
                </Moldi>
                <Titulo  >
                <Name>{item.nome.substring(0,18)}</Name>
                 <Status>
                <EstrelaOuro  width="20" height="20"  />
                <Negocia  width="20" height="20"  />
                <ChatIcon  width="20" height="20"  />
              
                </Status>
                {/* <Status>
                <EstrelaOuro  width="20" height="20"  />
              
                <NameSimp>{item.estrelas} Estrelas</NameSimp>
                </Status>
                <Status>
                <Negocia  width="20" height="20"  />
              
                <NameSimp>{item.Negociacao} Negociações</NameSimp>
                </Status> */}
                </Titulo>
                {/* <Participar>
                <NameBtn>COMPRAR</NameBtn>
                </Participar>
                */}
                
            </Header>
         
      
        {/* <Botoes >
     
        {Est === false ?
            <Button onPress={()=>ColocarEstrela()} >
             <Estrela  width="30" height="30"  />
             </Button>
            :
            <Button onPress={()=>TirarEstrela()} >
            <EstrelaRouxa width="30" height="30"  />
            </Button>
            }
        
        <Button  onPress={()=>Entrar()} >
        <Comentarios  width="30" height="30"  />
        </Button>
        <Button >
        <Compartilhar  width="30" height="30"  />
        </Button>
      
        </Botoes> */}
        {/* <Description>
            <Name>{item.authorId.name}</Name> {item.description}
        </Description>
        <Description2 onPress={()=>Entrar()}>
            <NameComen>Ver todos os 3.100 Comentários</NameComen> 
        </Description2> */}
        </Post>   
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
      fontSize: 20,
      textAlign: "center",
      color:"red",
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