import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    UserImage,
    Box,
    BoxFoto,
    LoadingIcon,

} from './styles';
import { Text, FlatList, Image, StyleSheet } from 'react-native';
import PainelTeu from '../PainelTeu';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import Fotos from '../../assets/camera.svg';
import Api from '../../Api';
var impar = 150;
var par = 90;

export default ({IdRo, Ocorre, Varia, Nome, Fechar, FechaQuadro, setModalLoad }) => {
  const navigation = useNavigation();
  const [Refreshin, setRefreshin] = useState(false);
    const [Infor, setInfor] = useState(null);
    const [Page, setPage] = useState(1);
    const [Load, setLoad] = useState(false);
    const [IdUser, setIdUser] = useState("")

    useEffect(() => {
        ListandoFoto();
      }, [Page]);

      useEffect(() => {
       console.log(Infor)
      }, [Infor]);

      useEffect(() => {
        MudarIdUser();
        }, [])

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

    const Enviando = async (item)=>{
      setModalLoad(true);
      FechaQuadro();
         Fechar()
        var Tip = "Foto"
        await  Api.enviandoElementos(IdUser, item , Nome, Ocorre, Varia, Tip );
        
      }
         

    
    const ListandoFoto = async ()=>{
      var IdUser = IdRo;
      Api.ListFoto(IdUser, Page, setInfor);
    }
 
    const IrFoto = ()=>{
      Fechar()
      navigation.navigate("FotoCol");
     }

     const loadPage = (pageNumber = Page)=>{
      setPage(pageNumber + 1)
  }

  const refreshList = async ()=>{
    await  setRefreshin(true);
  
   
    await setRefreshin(false);
  }



    return ( 
        <Container>
          {IdRo === IdUser &&
          <BoxFoto onPress={()=>IrFoto()}>
          <Fotos width="60" height="60" />
          </BoxFoto>
          }
         
         {Infor === null?
         <>
         <Image source={require('../../assets/loading-87.gif')}  style={styles.ImageVer2 } />
         </>

         :
         <MasonryList
          onLongPressImage={()=>Entrar()}
               data={Infor}
               keyExtractor={post=> String(post.id)}
               numColumns={4}
               showsVerticalScrollIndicator={false}
               renderItem={({item, key}) =>(
               
                   <Box key={item.id}  onPress={()=>Enviando(item)}>
                   <UserImage key={item.id} source={{uri: item.imageUrl }} style={{width:80, height: item.text}} resizeMode="cover" />
                   </Box>
               )}
               onEndReachedThreshold={0.1}
               onEndReached={()=>loadPage()}
               ListFooterComponent={ Load &&   <LoadingIcon size="large" color="#FFFFFF" /> }
               onRefresh={refreshList}
               refreshing={Refreshin}
               /> 

         }
             
                       
        </Container>

    )
}

const styles = StyleSheet.create({
  ImageVer2:{
    width:200,
    height:100,
    marginTop: 10,
    marginBottom: -70,
   
  },  
});