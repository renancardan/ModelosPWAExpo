import React, { useEffect, useContext, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    LoadingIcon,
    CustomButton1,
    CustomText1,
    CustomButtonText1,
    CustomEstButton,
    CustomButtonText2,
    CustomButtonText3,
    CustomButtonText6,
    CustomSubTituloText,
    Box10,
    NameTex,
} from './styles';
import { UserContext } from '../../contexts/UserContext';
import { StyleSheet, ImageBackground, FlatList, ScrollView, } from 'react-native';
import CityLogo from '../../assets/logomarca.svg';
import SignInput from '../../components/SignInput';
import Telefone from '../../components/Tel';
import Telefone1 from '../../components/Tel1';
import Codig from '../../assets/codigo.svg';
import TelIcon from '../../assets/telefone.svg';
import { ModalSelectList } from 'react-native-modal-select-list';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Api from '../../Api';
import CidadeJson from "../../JSONS/cidadejson";
import CampoText from '../../components/campText';
import Pessoa from '../../assets/person.svg';


export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: userState } = useContext(UserContext);
    const [Log, setLog] = useState(0);
    const [Lat, setLat] = useState(0);
    const navigation = useNavigation(); 
    const [Nome, setNome] = useState("");
    const [Tel, setTel] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState(null);
    const [Irpre, setIrpre] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [TelCadas, setTelCadas] = useState('');
    const [TelCadas1, setTelCadas1] = useState('');
    const [TelAna1, setTelAna1] = useState(false);
    const [TelAna2, setTelAna2] = useState(false);
    const [Contatipo, setContatipo] = useState(null);
    const [ListInf, setListInf] = useState(["Pessoal","Empresa"]);
    const [ListConta, setListConta] = useState([]);
    const [Estado, setEstado] = useState(null);
    const [Cidade, setCidade] = useState(null);
    const [EstCidJson, setEstCidJson] = useState({CidadeJson});
    const [ListaEstado, setListaEstado] = useState([]);
    const [ListaCidade, setListaCidade] = useState([]);
    const [Forms, setForms] = useState(["", "", ""])
    const [NomeConta, setNomeConta] = useState("");
    const [Info, setInfo] = useState(null);
    const [Vend1, setVend1] = useState("");
    const [Vend2, setVend2] = useState("");
    const [Vend3, setVend3] = useState("");

    useEffect( ()=>{                     
      PreencherTel()                       
    }, []);

    useEffect(() => {
      PrencheForms();
     }, [Vend1, Vend2, Vend3]);
  

    useEffect( ()=>{                     
     Segment()                       
    }, []);


    useEffect( ()=>{                     
        inicial()                       
      }, []);
      useEffect(() => {
        ListandoEstado();
      }, []);

      useEffect(() => {
        ListandoCidade();
        }, [ListaEstado, Estado]);

    useEffect(() => {
        if(Irpre === true){
            confirmCode();
        }
       }, [Irpre])

       useEffect(() => {
        ListandoTipo();
       }, [ListInf]);

       const Pesquisa1 = async (item)=>{
        setVend1(item);
       
       }
    
       const Pesquisa2 = async (item)=>{
        setVend2(item);
       
       }
    
       const Pesquisa3 = async (item)=>{
        setVend3(item);
       
       }
    
      
      const PrencheForms = ()=> {
        setForms([Vend1, Vend2, Vend3])
         
        }


       function ListandoEstado() {
        let list = [] ;
        EstCidJson.CidadeJson.estados.forEach(result => {
              list.push({
                  value: result.nome,
                  label: result.nome,
                  cidades: result,
              });   
        });
        setListaEstado(list);
      }

      function ListandoCidade() {
        for(let i in ListaEstado ) {
            let listanha = [];
            if(ListaEstado[i].cidades.nome === Estado) {
              ListaEstado[i].cidades.cidades.forEach(result => {
                listanha.push({
                  value: result,
                  label: result,  
              });   
              });
              setListaCidade(listanha);
            }
        }
      }

       const inicial = ()=>{    
        Geocoder.init('AIzaSyCQco-MYnTRSOfiLYjn0rMgzyVyCv_JzmM', {language:'pt-br'});
        handleLocationFinder();
    
      }

      const PreencherTel = async ()=>{    
        var tel = await AsyncStorage.getItem('Tel');
        setTel(tel);
       }

       const Segment = async ()=>{    
        Api.VerSegEmp(Info, setInfo)
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
            
           Geolocation.watchPosition( async (info)=>{ 
                const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude); 
               if(geo.results.length > 0) {

                 var filtered_array = geo.results[0].address_components.filter(function(address_component){
                                  return address_component.types.includes("administrative_area_level_2");
                              }); 
                              var county = filtered_array.length ? filtered_array[0].long_name: "";
                              setCidade(county);
                              userDispatch({
                                type: 'setCidade',
                                payload:{
                                  cidade: county
                                }
                            });
                            
                              
                              var filtered_array1 = geo.results[0].address_components.filter(function(address_component){
                                  return address_component.types.includes("administrative_area_level_1");
                              }); 
                              var county1 = filtered_array1.length ? filtered_array1[0].long_name: "";
                              setEstado(county1);
                              userDispatch({
                                type: 'setEstado',
                                payload:{
                                  estado: county1
                                }
                            });
                            
                            userDispatch({
                              type: 'setLat',
                              payload:{
                                  lat: info.coords.latitude
                              }
                          });

                            userDispatch({
                                type: 'setLog',
                                payload:{
                                    log: info.coords.longitude
                                }
                            });
                  
                            
                 setLat(info.coords.latitude);
                 setLog(info.coords.longitude);
                
               }
          },{
              enableHighAccuracy:true,
              distanceFilter:10,
              maximumAge: 0,
              
          });
  

        } 
      }


    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name:"SignIn"}]
        });
 
    }

    const confirmCode= ()=> {
        navigation.reset({
           routes:[{name:'Preload'}]
       });
     }

     function ListandoTipo() {
        var list = [];
        ListInf.forEach(result => {
              list.push({
                label: result,
                id: result,
                value: result,
              });   
        });
        setListConta(list);
      }


     let modalRef2;
     let valor2;
       const openModal2 = (num) =>{
           valor2=num;
           modalRef2.show();
       }
       const saveModalRef2 = ref => modalRef2 = ref;
 
       const onSelectedOption2 = (value, id)=> {
          setContatipo(value); 
          console.log(id);  
           };


           let modalRef;
           let valor;
             const openModal = (num) =>{
                 valor=num;
                 modalRef.show();
             }
             const saveModalRef = ref => modalRef = ref;
           
             const onSelectedOption = (value, id)=> {
               
                setEstado(value); 
                 };

  let modalRef1;
let valor1;
  const openModal1 = (num) =>{
      valor1=num;
      modalRef1.show();
  }
  const saveModalRef1 = ref => modalRef1 = ref;

  const onSelectedOption1 = (value, id)=> {
     setCidade(value); 
      };

      const Cadastrar = async () => {
        if(code !== ""){
          if(Estado !== null){
            if(Cidade !== null){
            if(Contatipo !== null){
             
                      
                    setLoading(true);
                        Api.signIn2(Tel, code, setLoading, Cidade, Estado, Contatipo, setIrpre, Forms);
      
                 
      
      
          
          } else {
            alert("Escolha o Tipo de conta!");
          }
        } else {
            alert("Escolha uma Cidade!");
          }
        } else {
            alert("Escolha um Estado!");
          }
        } else {
          alert(`Digite o Código que foi enviado para o Whatsapp ${Tel}`);
        }
    
  
      
      
    }
 

    return (
        <Container>
            <ImageBackground source={require("../../assets/fundo.png")} 
          resizeMode='cover' 
          style={styles.image} >
             <ScrollView style={styles.scrollView}>
           <CityLogo width="100%" height="100" />
      
           {Loading === false ? 
         
           <InputArea>
                        <CustomButtonText3>Digite o Código que a Empresa enviou para whatsapp {Tel}</CustomButtonText3>
            <SignInput
                        IconSvg={Codig}
                        placeholder="Digite o Código de Entrada" 
                        value={code}
                        onChangeText={t=>setCode(t)}
                        autoCapitalize="none"
                        keyboardType={"numeric"}
                    />
                  
                         <CustomEstButton onPress={()=>openModal2()} >
                           {Contatipo !== null ?
                           <CustomButtonText1>{Contatipo}</CustomButtonText1>
                           :
                           <CustomButtonText1> Tipo da Conta </CustomButtonText1>
                           }
                
                    </CustomEstButton>
                    {Contatipo === "Empresa" &&
                       <>
                             <CustomSubTituloText>Escolha A segmentação da Sua Empresa</CustomSubTituloText>
                                   <CustomButtonText6> 1° Segmento Da Empresa</CustomButtonText6>
                             <FlatList
                        showsHorizontalScrollIndicator={false}
                          style={styles.flatList}
                          horizontal
                          data={Info}
                          keyExtractor={post=> String(post.id)}
                          renderItem={({item}) => (
                          
                            <Box10 onPress={()=>Pesquisa1(item.id)} style={{"backgroundColor": Vend1===item.id ? "#FFE767":"#fff"}}>
                               <NameTex>{item.nome}</NameTex>
                            </Box10>
                              
                          )}
                        />
                                 <CustomButtonText6>2° Segmento Da Empresa(Opicional)</CustomButtonText6>
                             <FlatList
                        showsHorizontalScrollIndicator={false}
                          style={styles.flatList}
                          horizontal
                          data={Info}
                          keyExtractor={post=> String(post.id)}
                          renderItem={({item}) => (
                          
                            <Box10 onPress={()=>Pesquisa2(item.id)} style={{"backgroundColor": Vend2===item.id ? "#FFE767":"#fff"}}>
                               <NameTex>{item.nome}</NameTex>
                            </Box10>
                              
                          )}
                        />
                                 <CustomButtonText6>3° Segmento Da Empresa(Opicional)</CustomButtonText6>
                             <FlatList
                        showsHorizontalScrollIndicator={false}
                          style={styles.flatList}
                          horizontal
                          data={Info}
                          keyExtractor={post=> String(post.id)}
                          renderItem={({item}) => (
                          
                            <Box10 onPress={()=>Pesquisa3(item.id)} style={{"backgroundColor": Vend3===item.id ? "#FFE767":"#fff"}}>
                                <NameTex>{item.nome}</NameTex>
                            </Box10>
                              
                          )}
                        />
                       
                       
                       
                       
                       </>

                       }
                    <CustomEstButton onPress={()=>openModal()} >
                           {Estado !== null ?
                           <CustomButtonText1>{Estado}</CustomButtonText1>
                           :
                           <CustomButtonText1> Escolha o Estado </CustomButtonText1>
                           }
                      
                      
                       </CustomEstButton>
                       {Estado !== null &&
                       <>
                       <CustomEstButton onPress={()=>openModal1()} >
                           {Cidade !== null ?
                           <CustomButtonText1>{Cidade}</CustomButtonText1>
                           :
                           <CustomButtonText1> Escolha a Cidade </CustomButtonText1>
                           }
                             </CustomEstButton>
                           </>
                                 }
 
                           
                              <ModalSelectList
                           ref={saveModalRef2}
                           placeholder={"Pesquisar..."}
                           closeButtonText={"X"}
                           options={ListConta}
                           onSelectedOption={(value, id)=>{onSelectedOption2(value, id)}}
                           disableTextSearch={false}
                           numberOfLines={6}
                       />

                    <ModalSelectList
                           ref={saveModalRef}
                           placeholder={"Pesquisar..."}
                           closeButtonText={"X"}
                           options={ListaEstado}
                           onSelectedOption={(value, id)=>{onSelectedOption(value, id)}}
                           disableTextSearch={false}
                           numberOfLines={6}
                       />

                      <ModalSelectList
                           ref={saveModalRef1}
                           placeholder={"Pesquisar..."}
                           closeButtonText={"X"}
                           options={ListaCidade}
                           onSelectedOption={(value, id)=>{onSelectedOption1(value, id)}}
                           disableTextSearch={false}
                           numberOfLines={6}
                       />
   
                           
               <CustomButton onPress={Cadastrar} >
                        <CustomButtonText>ENTRAR</CustomButtonText>
                </CustomButton>
                <CustomButton1 onPress={handleMessageButtonClick} >
                        <CustomButtonText2>Voltar!</CustomButtonText2>
                </CustomButton1>
    
            </InputArea>
            :
        <LoadingIcon size="large" color="#000" />
                }

      </ScrollView>
        </ImageBackground> 
        </Container>
    )

}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
       flex: 1 ,
       alignItems:"center",
       justifyContent: "center",
    },
    flatList: {
      marginTop: 10,
      paddingLeft: 15,
      paddingRight: 15, // THIS DOESN'T SEEM TO BE WORKING
     marginBottom:10,
    },
    scrollView: {
      width: '100%',
      height: '100%',
      paddingTop: 20,
    },
});