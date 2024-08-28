import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    UserImage,
    Box,
    BoxFoto,
    LoadingIcon,
    CaixaArea6,
    CaixaTop,
    Textnome,
    CustomButton,
    CustomButton1,
    CustomButtonText,
    CustomButtonText1,
    CustomButtonText6,
    BtnModal,
    InputArea,
    CustomButton2,
    CustomButton6,
    CustomButtonText7,
    CustomButton7,

} from './styles';
import { Text, FlatList, View, StyleSheet, ImageBackground, Modal, Image } from 'react-native';
import PainelTeu from '../PainelTeu';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import Fotos from '../../assets/camera.svg';
import Api from '../../Api';
import Pink from '../../assets/my_location.svg';
import Fechar from '../../assets/fechar.svg';
import CampoText from '../../components/campTextPos';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { request, PERMISSIONS } from 'react-native-permissions';
var impar = 150;
var par = 90;

export default ({IdRo}) => {
  const navigation = useNavigation();
  const [Refreshin, setRefreshin] = useState(false);
  const [Infor, setInfor] = useState(null);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  const [IdUser, setIdUser] = useState("");
  const [ModalIr, setModalIr] = useState(false);
  const [ModalCri, setModalCri] = useState(false);
  const [NomeEd, setNomeEd] = useState("");
  const [IdEd, setIdEd] = useState("");
  const [Log, setLog] = useState(0);
  const [Lat, setLat] = useState(0);
  const [WatchID, setWatchID] = useState("");
  const [Estado, setEstado] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Carreg, setCarreg] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [IdPos, setIdPos] = useState("");


    useEffect(() => {
        ListandoInfor();
      }, [Page]);

      useEffect(() => {
       
      }, [Infor]);

      useEffect(() => {
        MudarIdUser();
        }, [])

        const FechModal = ()=>{
          setIdEd("");
          setNomeEd("");
          setModalIr(false);
        }
        const AbrirModal = ()=>{
          setModalIr(true);
        }

        const FecCord = ()=>{
          Geolocation.clearWatch(WatchID);
        }

        const AbrirModalCri = ()=>{
          inicial()
          setModalCri(!ModalCri);
        }

        const FechaModalCri = ()=>{
         FecCord()
          setModalCri(!ModalCri);
        }
        
        const CriandoPosicao = () =>{
          FechaModalCri();
          if(NomeEd !== ""){
            Api.CriarPosicao(NomeEd, Lat, Log, Estado, Cidade, setNomeEd, setCarreg, setLat, setLog, setCidade, setEstado );
          } else{
            alert("Preencha o Nome Da Posição!")
          }
         
        }

        const EditandoPosicao = () =>{
          FechaModEdit();
          if(NomeEd !== ""){
            Api.EditarPosicao(IdPos, NomeEd, Lat, Log, Estado, Cidade, setNomeEd, setCarreg, setLat, setLog, setCidade, setEstado );
          } else{
            alert("Preencha o Nome Da Posição!")
          }
         
        }

        const ExcluindoPosicao = () =>{
          FechaModEdit();
    
            Api.ExcluirPosicao(IdPos, setIdPos, setNomeEd, setCarreg, setLat, setLog, setCidade, setEstado );
         
         
        }
        
        const inicial = ()=>{
          setCarreg(true);
          Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
          handleLocationFinder();
        
        }
        const handleLocationFinder = async () => {
                    
          let result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              { 
                  title: "Permisão Localização!",
                  message: "Você deve permitir a localização para  funcionamento do APP",
                  buttonPositive:"Ok",
                  buttonNegative:"Permiti depois",
                  buttonNeutral: "Cancelar",
              }
              
          );
          
       
          if(result == 'granted') {
            
         
             const wahtchId = Geolocation.watchPosition( async (info)=>{ 
                    const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude); 
                   if(geo.results.length > 0) {
                     console.log(geo.results[0].formatted_address)
      
                     var filtered_array = geo.results[0].address_components.filter(function(address_component){
                                      return address_component.types.includes("administrative_area_level_2");
                                  }); 
                                  var county = filtered_array.length ? filtered_array[0].long_name: "";
                                  setCidade(county);
                                
                                  
                                  var filtered_array1 = geo.results[0].address_components.filter(function(address_component){
                                      return address_component.types.includes("administrative_area_level_1");
                                  }); 
                                  var county1 = filtered_array1.length ? filtered_array1[0].long_name: "";
                                  setEstado(county1);
                                
      
               
                     setLat(info.coords.latitude);
                     setLog(info.coords.longitude);
                     setCarreg(false);
                   }
              },{
                  enableHighAccuracy:true,
                  distanceFilter:10,
                  maximumAge: 0,
                  
              });
      
              setWatchID(wahtchId);
      
              } else {
                setCarreg(false);
              }
          
      
          } 

        const MudarIdUser = async  ()=>{
          var IdUse = await AsyncStorage.getItem('Id');
          setIdUser(IdUse)
          }

    const Entrar = (item)=>{
      navigation.navigate('FotoTeu', {
        item:item,
        idRo: IdRo,
    })
    }
    
    const ListandoInfor = async ()=>{
      var IdUser = IdRo;
      Api.ListParticipantesTodos(IdUser, Page, setInfor);
    }
 


     const loadPage = (pageNumber = Page)=>{
      setPage(pageNumber + 1)
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
  
   
    await setRefreshin(false);
  }
  const irEdit = (item)=>{
    setCarreg(false);
    setIdPos(item.id)
    setNomeEd(item.Nome);
    setLat(item.loc.lat);
    setLog(item.loc.lng);
    setCidade(item.Cidade);
    setEstado(item.Estado);
    setModalIr(true);
  }

  const FechaModEdit = ()=>{
    setCarreg(true);
    setModalIr(false);
    FecCord();
  }

  const IrConfig = ()=>{
    navigation.navigate("Config");
   }
   const EntrarPerfil = (item)=>{
    var IdUs = item.id;
    var Foto = item.FotoPerfil;
    var Estre = item.estrelas;
    var Nego = item.Negociacao;
    var Loc = item.loc;
    var nomeUser = item.nome;
    var tipo = item.tipo;
    navigation.navigate("Perfilmeu", {
      id:IdUs,
      tipo:tipo,
      avatar:Foto,
      nome:nomeUser,
      estrelas:Estre,
      Negocicao:Nego,
      Loc:Loc,
    });
  }

  const MsgAtivador = (idPar)=>{
    alert('ATIVAR',
    "Você deseja Ativar esse Participante?",
         {textConfirm: 'Ativar',
          textCancel: 'Agora Não!',
          onConfirm: () => Ativando(idPar),
          onCancel: () => null, 
         }
        );
  }
  const Ativando = (idPar)=>{
    
   Api.AtivandoPar(idPar)
  }

  const MsgDesativador = (idPar)=>{
    alert('DESATIVAR',
    "Você deseja Desativar esse Participante?",
         {textConfirm: 'Desativar',
          textCancel: 'Agora Não!',
          onConfirm: () => Desativando(idPar),
          onCancel: () => null, 
         }
        );
  }
  const Desativando = (idPar)=>{
  
   Api.DesativandoPar(idPar)
  }

    return ( 
        <Container>
            <Modal
           animationType="slide"
           visible={ModalIr}
          >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <BtnModal onPress={()=>FechaModEdit()}>
          <Text style={styles.modalText3}>
          <Fechar width="20" height="20" backgroundColor="#000"/>
          </Text>
          </BtnModal>
          <InputArea>
                         <CampoText
                                  
                                  placeholder="Digite o Nome da Sessão" 
                                  value={NomeEd}
                                  onChangeText={t=>setNomeEd(t)}
                                  autoCapitalize="none"
                                  keyboardType={"default"}
                                  posi={24}
                              />
            
                       {Carreg === true ?
                    <>
                      <Text style={styles.modalText2}>Procurando Posição</Text>
                    <LoadingIcon size="large" color="#fff" />
                    </>
                    
                    :
                    <>
                      <Text style={styles.modalText2}>Posição {NomeEd}</Text>
                      <Text style={styles.modalText2}>Latitude: {Lat}</Text>
                      <Text style={styles.modalText2}>Longitude: {Log}</Text>
                      <Text style={styles.modalText2}>Cidade: {Cidade}</Text>
                      <Text style={styles.modalText2}>Estado: {Estado}</Text>    
                    
                    </>

                              }
                            
                </InputArea>
                <Text style={styles.modalText2}>Mudar essa Posição</Text>
                    {IdRo === IdUser &&
             <CaixaArea6 onPress={()=>inicial()} >
             <CaixaTop></CaixaTop> 
             <Pink width="30px" height="30px" />
             <Textnome>Localizar</Textnome>
             </CaixaArea6>
          }
              
         
          <BtnModal onPress={()=>ExcluindoPosicao()}>
          <Text style={styles.modalText3}>Excluir</Text>
          </BtnModal>
          
          </View>
          </View>


          </Modal>

          <Modal
           animationType="slide"
           visible={ModalCri}
          >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <BtnModal onPress={()=>FechaModalCri()}>
          <Text style={styles.modalText3}>
          <Fechar width="20" height="20" backgroundColor="#000"/>
          </Text>
          </BtnModal>
          <InputArea>
                <CampoText
                        
                        placeholder="Digite o Nome da Posição" 
                        value={NomeEd}
                        onChangeText={t=>setNomeEd(t)}
                        autoCapitalize="none"
                        keyboardType={"default"}
                        posi={24}
                    />
                    {Carreg === true ?
                    <>
                      <Text style={styles.modalText2}>Procurando Posição</Text>
                    <LoadingIcon size="large" color="#fff" />
                    </>
                    
                    :
                    <>
                      <Text style={styles.modalText2}>Posição Encontrada</Text>
                      <Text style={styles.modalText2}>Latitude: {Lat}</Text>
                      <Text style={styles.modalText2}>Longitude: {Log}</Text>
                      <Text style={styles.modalText2}>Cidade: {Cidade}</Text>
                      <Text style={styles.modalText2}>Estado: {Estado}</Text>    
                    
                    </>

                              }
                       
                </InputArea>
               
               
            
        
          
          </View>
          </View>


          </Modal>
         
                 
            
                     
           
              {Infor === null?
         <>
         <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
         </>

         : 
         <FlatList 
              data={Infor}
            //essa função é pra carregar mais listas quando chegar no final da lista faltando 10%
              onEndReached={()=>loadPage()}
                //essa função é para dizer quantos porcento final da lista tem que tá para carregar a função de carregar mais lista
              onEndReachedThreshold={0.1}
            keyExtractor={post=> String(post.id)}
            // colocar o loading no final da lista para carregar mais conteudo 
            ListFooterComponent={ Loading &&  <LoadingIcon /> }
            //realizar uma função quando puxar pra cima 
            onRefresh={refreshList}
            //boleano quando a função de refresh acabou 
            refreshing={Refreshin}
            //dipara uma função quando os intens que estiver vizivel mudarem
            //  onViewableItemsChanged={handleView}
            // quando o item chegar a 50 porcento carrega a outra imagem
            viewabilityConfig={{ minimumViewTime:2000, viewAreaCoveragePercentThreshold:75 }}
            renderItem={({ item, key }) => (
            <>
           
            <CustomButton  >
              <CustomButton2>
            <Image  source={{uri:`${item.FotoPerfil}`}} style={styles.ImageVer3 } />
                      <CustomButtonText1>{item.nome}</CustomButtonText1>
                      </CustomButton2>
                      {item.ativo === true ?
                      <CustomButton7 onPress={()=>MsgDesativador(item.idPar)}><CustomButtonText6>DESATIVAR</CustomButtonText6></CustomButton7>
                      :
                      <CustomButton1 onPress={()=>MsgAtivador(item.idPar)}><CustomButtonText6>ATIVAR</CustomButtonText6></CustomButton1>
                      }
                     
                      <CustomButton6 onPress={()=>EntrarPerfil(item)}><CustomButtonText7>PERFIL</CustomButtonText7></CustomButton6>
              </CustomButton>
            
            </>
                      )} />
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
  scrollView: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  centeredView: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    width: '100%',
    height: '100%',
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
    color:"#fff"
  },
  modalText3: {
    fontSize: 20,
    textAlign: "center",
    color:"red",
  },
  ImageVer:{
    width:300,
    height:300,
    marginTop: 10,
    marginBottom: 10,
   
  },  
  ImageVer2:{
    width:200,
    height:100,
    marginTop: 10,
    marginBottom: -70,
   
  },  
  ImageVer3:{
    width:40,
    height:40,
    borderRadius: 10,
    marginLeft:10,
  },
});