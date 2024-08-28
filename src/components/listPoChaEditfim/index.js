import React, {useState, useContext, useEffect} from 'react';
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
import { UserContext } from '../../contexts/UserContext';
import SignInput from '../Pesquisas';
import Pesquisa from '../../assets/search1.svg';
var impar = 150;
var par = 90;

export default ({IdRo,  ChamandoAgora, setModalIr, Fim, IdOc, voltar }) => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: userState } = useContext(UserContext);

  const [Refreshin, setRefreshin] = useState(false);
  const [Infor, setInfor] = useState(null);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  // const [IdUser, setIdUser] = useState("");
  const [ModalCri, setModalCri] = useState(Fim);
  const [NomeEd, setNomeEd] = useState(null);
  const [nomeEd2, setnomeEd2] = useState(null);
  const [IdEd, setIdEd] = useState("");
  const [Log, setLog] = useState(userState.InforContaUser.localizacao.lng);
  const [Lat, setLat] = useState(userState.InforContaUser.localizacao.lat);
  const [WatchID, setWatchID] = useState(null);
  const [Estado, setEstado] = useState(userState.InforContaUser.AreaLoc.estado);
  const [Cidade, setCidade] = useState(userState.InforContaUser.AreaLoc.cidade);
  const [Cidade2, setCidade2] = useState("");
  const [Estado2, setEstado2] = useState("");
  const [Carreg, setCarreg] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [IdPos, setIdPos] = useState("");
  const [Distn, setDistn] = useState(null);
  const [Dist2, setDist2] = useState(null);
  const [Dist3, setDist3] = useState(null)
  const [LocV1, setLocV1] = useState(null)
  const [LocV2, setLocV2] = useState(null)
  const [NomePes, setNomePes] = useState("");


    useEffect(() => {
        ListandoInfor();
      }, [NomePes]);

     

      useEffect(() => {
        // MudarIdUser();
        }, [])

        useEffect(() => {
          if(Distn !== null){
           IrChamar()
          }
          }, [Distn])

          useEffect(() => {
            if(Dist3 !== null){
             IrChamar2()
            }
            }, [Dist3])

          useEffect(() => {
            if(Dist2!== null){
             IrFinal()
            }
            }, [Dist2])

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

     

        // const AbrirModalCri = ()=>{
        //   inicial()
        //   setModalCri(!ModalCri);
        // }

        const FechaModalCri = ()=>{
          setModalIr(false);
          setModalCri(false);
          setNomeEd(null)
          setnomeEd2(null)
        }

        const IrChamar = ()=>{
           if(Distn <= userState.InforArea.RaioServ ){
             console.log("Entrou Cham")
            Api.TrocaLocIni(IdOc, LocV1)
             FechaModalCri();
             voltar()
            // ChamandoAgora();
            setCarreg(false);
            
           } else{
            alert(
              "AVISO",
              "Essa Posição não está na área de Atendimento da Empresa Contratada!")
           }
           setCarreg(false)
        }
        const IrChamar2 = ()=>{
          if(Dist3 <= userState.InforArea.RaioServ ){
          
           //  console.log();
           Api.TrocaLocFim(IdOc, LocV2)
           FechaModalCri();
           voltar()
          // ChamandoAgora();
          setCarreg(false);
           
          } else{
           alert(
             "AVISO",
             "Essa Posição não está na área de Atendimento da Empresa Contratada!")
          }
          setCarreg(false)
       }

        const IrFinal = ()=>{
          if(Dist2 <= userState.InforArea.RaioServ ){
            console.log("Entrou Cham")
           setModalCri(true);
           
          } else{
           alert(
             "AVISO",
             "Essa Posição não está na área de Atendimento da Empresa Contratada!")
          }
          setCarreg(false)
       }

        const IniciandoChamda = () =>{
        
          if(NomeEd !== null){
            setCarreg(true);
            var distancia = (getDistanceFromLatLonInKm(
              userState.InforArea.loc,
              LocV1,
           ));
           console.log(distancia);
           setDistn(distancia);
            
          } else{
            alert(
              "AVISO",
              "Escolha Uma Posição para atendimento!")
          }
         
        }

        const IniciandoChamda2 = () =>{
        
          if(nomeEd2 !== null){
            setCarreg(true);
            var distancia = (getDistanceFromLatLonInKm(
              userState.InforArea.loc,
              LocV2,
           ));
           console.log(distancia);
           setDist3(distancia);
            
          } else{
            alert(
              "AVISO",
              "Escolha Uma Posição para atendimento!")
          }
         
        }

        const IndoParaFinal = () =>{
        
          if(NomeEd !== null){
            setCarreg(true);
            var distancia = (getDistanceFromLatLonInKm(
              userState.InforArea.loc,
              LocV1,
           ));
           console.log(distancia);
           setDist2(distancia);
            
          } else{
            alert(
              "AVISO",
              "Escolha Uma Posição para atendimento!")
          }
         
        }

        function getDistanceFromLatLonInKm(position1, position2) {
          "use strict";
          var deg2rad = function (deg) { return deg * (Math.PI / 180); },
              R = 6371,
              dLat = deg2rad(position2.lat - position1.lat),
              dLng = deg2rad(position2.lng - position1.lng),
              a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                  + Math.cos(deg2rad(position1.lat))
                  * Math.cos(deg2rad(position1.lat))
                  * Math.sin(dLng / 2) * Math.sin(dLng / 2),
              c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return ((R * c *1000).toFixed());
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

        const MinhaPosi = ()=>{
          setNomeEd("Minha Posição Atual Localizada")
          setLocV1({lat:userState.lat, lng:userState.log});
          setCidade(userState.cidade);
          setEstado(userState.estado);
        }

        const MinhaPosi2 = ()=>{
          setnomeEd2("Minha Posição Atual Localizada")
          setLocV2({lat:userState.lat, lng:userState.log});
          setCidade2(userState.cidade);
          setEstado2(userState.estado);
        }
        
      
      

        // const MudarIdUser = async  ()=>{
        //   var IdUse = await AsyncStorage.getItem('Id');
        //   setIdUser(IdUse)
        //   }

    const Entrar = (item)=>{
      navigation.navigate('FotoTeu', {
        item:item,
        idRo: IdRo,
    })
    }
    
    const ListandoInfor = async ()=>{
      var IdUser = await AsyncStorage.getItem('Id');
      console.log(IdUser)
      Api.ListPosicao(IdUser, NomePes, setInfor);
    }
 


     const loadPage = (pageNumber = Page)=>{
      setPage(pageNumber + 1)
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
  
   
    await setRefreshin(false);
  }
  const irEdit = (item)=>{
    setNomeEd(item.Nome)
    setLocV1({lat:item.loc.lat, lng:item.loc.lng})
    setCidade(item.Cidade);
   setEstado(item.Estado);
 
  }

  const irEdit2 = (item)=>{
    setnomeEd2(item.Nome)
    setLocV2({lat:item.loc.lat, lng:item.loc.lng})
    setCidade2(item.Cidade);
   setEstado2(item.Estado);
 
  }

  const Mreside = ()=>{
    setNomeEd("Minha Residência")
    setLocV1({lat:userState.InforContaUser.localizacao.lat, lng:userState.InforContaUser.localizacao.lng})
    setCidade(userState.InforContaUser.AreaLoc.cidade);
    setEstado(userState.InforContaUser.AreaLoc.estado)
  }

  const Mreside2 = ()=>{
    setnomeEd2("Minha Residência")
    setLocV2({lat:userState.InforContaUser.localizacao.lat, lng:userState.InforContaUser.localizacao.lng})
    setCidade2(userState.InforContaUser.AreaLoc.cidade);
    setEstado2(userState.InforContaUser.AreaLoc.estado)
  }

  const FechaModEdit = ()=>{
    setModalIr(false);
    setModalCri(false);
    setNomeEd(null);
    setnomeEd2(null);
   
  }

  const IrConfig = ()=>{
    navigation.navigate("Config");
   }


    return ( 
        <Container>
            {/* <Modal
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
             <CaixaArea6 onPress={()=>MinhaPosi()} >
             <CaixaTop></CaixaTop> 
             <Pink width="30px" height="30px" />
             <Textnome>Localizar</Textnome>
             </CaixaArea6>
          }
              
             <CustomButton2 onPress={()=>EditandoPosicao()} >
                               <CustomButtonText>SALVAR</CustomButtonText>
                       </CustomButton2>
          <BtnModal onPress={()=>ExcluindoPosicao()}>
          <Text style={styles.modalText3}>Excluir</Text>
          </BtnModal>
          
          </View>
          </View>


          </Modal>*/}

          <Modal
           animationType="slide"
           visible={ModalCri}
          >
       


          </Modal> 
         
           <View style={styles.centeredView1}>
        <BtnModal onPress={()=>FechaModEdit()}>
          <Text style={styles.modalText3}>
          <Fechar width="20" height="20" backgroundColor="#000"/>
          </Text>
          </BtnModal>
        <Text style={styles.modalText2}>Posição Final</Text>
        {nomeEd2 === null ?
          <CustomButton  >
          <CustomButtonText1>Escolha Uma Posição Abaixo ou Clique na Sua Posição Atual!</CustomButtonText1>
          
         </CustomButton>

         :
         <CustomButton style={{backgroundColor: "#FFE767"}} >
         <CustomButtonText1>{nomeEd2}</CustomButtonText1>
         <CustomButtonText6>Cidade: {Cidade2}</CustomButtonText6>
        <CustomButtonText6>Estado: {Estado2}</CustomButtonText6>      
        </CustomButton>

         }
          <Text style={styles.modalText2}>Me Localizar</Text>
          {Load === false ?
             <CaixaArea6 onPress={()=>MinhaPosi2()} >
             
             <Pink width="30px" height="30px" />
             <Textnome>Posição</Textnome>
             <Textnome>Atual</Textnome>
             </CaixaArea6>
             :
             <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
          }
                 
                 <Text style={styles.modalText2}>Minhas Posições</Text>
                 <SignInput
                        IconSvg={Pesquisa}
                        placeholder="Pesquise o Nome da Posição" 
                        value={NomePes}
                        onChangeText={t=>setNomePes(t)}
                        autoCapitalize="none"
                        keyboardType={"default"}
                        password={false}
                    /> 
                 <CustomButton onPress={()=>Mreside2()} >
                      <CustomButtonText1>Minha Residência</CustomButtonText1>
                      <CustomButtonText6>Cidade: {Cidade}</CustomButtonText6>
                     <CustomButtonText6>Estado: {Estado}</CustomButtonText6>
              </CustomButton>          
           
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
           
            <CustomButton onPress={()=>irEdit2(item)} >
                      <CustomButtonText1>{item.Nome}</CustomButtonText1>
                     <CustomButtonText6>Cidade: {item.Cidade}</CustomButtonText6>
                     <CustomButtonText6>Estado: {item.Estado}</CustomButtonText6>
              </CustomButton>
            
            </>
                      )} />

            }
             <CustomButton2 onPress={()=>IniciandoChamda2()} >
                    <CustomButtonText>Mudar</CustomButtonText>
            </CustomButton2> 
          
          </View>
          
            

        
            
           
         
            
            
            {/* </>
            :
            <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
            } */}

       
                       
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
  centeredView1: {
    backgroundColor: "#20AA55",
    flex: 1,
    width:500,
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
    color:"#fff",

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
  
   
  },  
});