import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    UserImage,
    Box,
    BoxFoto,
    LoadingIcon,
    Box2,
    BoxSessao,
    SessaoCriar,
    Box10,
    Boxando,
     Desativo,
     Box1,
} from './styles';
import { AppRegistry, ScrollView, View, FlatList, Image, Text, Button, StyleSheet } from 'react-native';
import PainelTeu from '../PainelTeu';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import Fotos from '../../assets/camera.svg';
import Produto from '../../assets/novo-produto.svg';
import Api from '../../Api';
import { isStyledComponent } from 'styled-components';
var impar = 150;
var par = 90;
var res = [];
var list= [];
export default ({IdRo}) => {
  const navigation = useNavigation();
  const [Refreshin, setRefreshin] = useState(false);
    const [Infor, setInfor] = useState(null);
    const [Info, setInfo] = useState([]);
    const [Page, setPage] = useState(1);
    const [Load, setLoad] = useState(false);
    const [IdUser, setIdUser] = useState("");
    const [date, setdate] = useState([]);
    const [Vend, setVend] = useState("");
   const [Carreg, setCarreg] = useState(false);
   const [Ativo, setAtivo] = useState(true);
  
  useEffect(() => {
    PegarInfo();
   }, []); 

   useEffect(() => {

   }, [Infor]); 

    useEffect(() => {
        ListandoFoto();
      }, [Page, Vend, Ativo]);

      const PegarInfo = ()=>{
        Api.PegarSessao(IdRo, Info, setInfo)
      }

    useEffect(() => {
     console.log(Vend)
      }, [Vend]);

      useEffect(() => {
        MudarIdUser();
        }, [])

      const  onPressButton= ()=>{  
         setAtivo(!Ativo) 
      } 

        const MudarIdUser = async  ()=>{
          var IdUse = await AsyncStorage.getItem('Id');
          setIdUser(IdUse)
          }

      const Pesquisa = async (item)=>{
        setVend(item);

      }

    const Entrar = (item)=>{
      navigation.navigate("Produto", {
        item:item,
        idRo: IdRo,
    })
    }
    
    const ListandoFoto = async ()=>{
      setCarreg(true);
      var IdUser = IdRo;
      Api.ListCatalogo(IdUser, Ativo, Page, Vend, setInfor, setCarreg);
    }
 
    const IrFoto = ()=>{
      navigation.navigate("CatCol");
     }

     const IrSessao = ()=>{
      navigation.navigate("CriarSessao");
     }

     const loadPage = (pageNumber = Page)=>{
      setPage(pageNumber + 1)
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
  
   
    await setRefreshin(false);
  }

const mudar = ()=>{
  list = Info
}

 

    return ( 
        <Container>
          
          {IdRo === IdUser &&
          <>
          <Box1>
         
          <BoxSessao onPress={()=>IrSessao()}>
            <SessaoCriar>
             Criar Sessão
            </SessaoCriar>
          </BoxSessao>
          <BoxFoto onPress={()=>IrFoto()}>
          <Produto width="60" height="60" />
          </BoxFoto>
          {Ativo === true ?
          <BoxSessao onPress={()=>onPressButton()}>
          <Desativo>
            Desativados
          </Desativo>
          </BoxSessao>
          :
          <BoxSessao onPress={()=>onPressButton()}>
            <SessaoCriar>
            Ativados
            </SessaoCriar>
        </BoxSessao>

          }
         
          </Box1>
          </>
          }
    {/* <Boxando>
      {Info.map((item)=>{
                return (
            
             <Text style={{"color":"#fff"}}>{item.nome}</Text>
     
                );
          })

          }
      </Boxando>      */}

           


        <FlatList
         showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          horizontal
          data={Info}
          keyExtractor={post=> String(post.id)}
          renderItem={({item}) => (
           
            <Box10 onPress={()=>Pesquisa(item.id)} style={{"backgroundColor": Vend===item.id ? "#FFE767":"#fff"}}>
                 <Text>{item.Nome}</Text>
            </Box10>
              
          )}
        />
        {Infor === null ?
         <View style={styles.container}>
           <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
          </View>
        :
        <View style={IdRo === IdUser? styles.container : styles.container4}>
        <MasonryList
            onLongPressImage={()=>Entrar()}
                  data={Infor}
                  keyExtractor={post=> String(post.id)}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, key}) =>(
                  <>
                      <Box key={item.id}  onPress={()=>Entrar(item)} >
                      <UserImage key={item.id} source={{uri: item.imageUrl }} style={{width:85, height: 85, borderColor:item.ativo === true?"#fff":"red"}} resizeMode="cover" />
                      </Box>
                      {item.Desconto === true ?
                      <Box2><Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:"red"}}>R$ {item.Valor}</Text></Box2>
                      :
                      <Box2><Text style={{color:"#fff"}}>R$ {item.Valor}</Text></Box2>
                      }
                     
                    </>
                  )}
                  onEndReachedThreshold={0.1}
                  onEndReached={()=>loadPage()}
                  ListFooterComponent={ Load &&   <LoadingIcon size="large" color="#FFFFFF" /> }
                  onRefresh={refreshList}
                  refreshing={Refreshin}
                  /> 
        </View>     

        }
       
        </Container>

    )
}

const styles = StyleSheet.create({
  container1:{  
    flex: 1,  
},  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    width:"100%",
    marginTop: -300,
  },

  container4: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    width:"100%",
    marginTop: -400,
  },
  flatList: {
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
  scrollView: {
    width: 300,
    height: 30,
    flexDirection:'row',
    flex:1,
  },
  ImageVer2:{
    width:200,
    height:100,
    marginTop: 10,
    marginBottom: -70,
   
  }, 
});
