import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
display: flex;
align-items: center;
flex:1;
    
`;

export const Box = styled.TouchableOpacity`
width: 320px;
height: 170px;
display: flex;
margin-top:30px;
justify-content: center;
align-items: center;
background-color: #000;
flex-direction: column;
border-radius: 10px;
align-items: center;
`;

export const Texto1 = styled.Text`
font-size: 10px;
color: #fff;

    
`;
export const Texto2 = styled.Text`
font-size: 18px;
color: #fff;
margin-left: 10px;
font-weight:bold;
font-style: italic;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;

export const Areatitulo = styled.View`

    width: 230px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
  
`;
export const Areatitulo2 = styled.View`
    margin-left: 20px;
    margin-right: 10px;
    width: 50px;
    height: 140px;
    display: flex;
    align-items: center;

   
`;
export const AreaBoty = styled.View`
  
    width: 190px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:row;
    padding:10px;
  
`;
export const CustomButton = styled.TouchableOpacity`
    width: 200px;
    height: 40px;
    background-color: #000;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    
`;
export const CustomButton1 = styled.TouchableOpacity`
width: 300px;
height: 60px;
background-color: red;
border-radius: 10px;
justify-content: center;
align-items: center;
margin-top: 30px;
margin-bottom: 60px;
    
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;


export const AreaBtn = styled.View`
    margin-top: 5px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
`;


export const TextInfo = styled.Text`
    font-size: 13px;
    color: #FFF;
    margin-left: 10px;
   font-weight:bold;
   font-style:italic;
    
`;
export const BarraAtu = styled.TouchableOpacity`
background-color: red;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

export const BarraCity = styled.View`
    width: 100%;
   
    display: flex;
    margin-left:10px;
    justify-content: center;
    align-items: center;
`;

export const CaixaTitulo = styled.View`
    margin-top: 10px;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: #000;
    padding-left: 10px;
    padding-right: 10px;

   
`;
export const CaixaTitulo2 = styled.TouchableOpacity`
    margin-top: 10px;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: #000;
    padding-left: 30px;
    padding-right: 30px;

   
`;
export const CaixaDados = styled.TouchableOpacity`
        display: flex; 
        flex-direction: column;
        align-items: center;
        justify-content: center;
       
`;
export const BtnModal = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-between; 
    width: 70%;
    height: 50px;
    margin:5px;
    border-radius:10px;
    

`;

export const  Menu = styled.View`
flex-direction: row;
align-items: center;
justify-content: center
`;

export const MenuItem = styled.TouchableOpacity`
padding: 10px;
border-bottom-width:5px;
border-bottom-color:${props=>props.active?'#000':'#FFE767'};
`;


export const  MenuItemText = styled.Text`
color: #000;
font-size:17px;
`;
export const Button = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    margin-right:30px;
`;



export const Post = styled.TouchableOpacity`
width: 300px;
height: 130px;

margin-top:60px;
`;

export const Header = styled.View`
   padding: 5px;
   flex-direction: row;
   align-items: center;
   background-color: #000;
   width: 230px;
    height: 130px;
    margin-left:70px;
    border-radius: 20px;
`;


export const Titulo = styled.View`
width: 130px;
height: 120px;
display: flex;
margin-top:0px;
flex-direction: column;
justify-content: center

`;


export const Moldi = styled.View`
width: 150px;
height: 150px;
border-radius: 25px;
margin-right: 20px;
background-color: #fff;
margin-left:-80px;
margin-top:-70px;
display: flex;
padding-left:10px;
background-color: rgba(0,0,0,0.1);
`;

export const Avatar = styled.Image`
   width: 142px;
   height: 142px;
   border-radius: 20px;
`;

export const Name = styled.Text`
   color: #fff;
   font-weight: bold;
   margin-bottom:5px;
`;

export const NameSimp = styled.Text`
   color: #fff;
   font-size:12px;
`;


export const Status = styled.View`
width: 130px;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: row;


`;

export const StatusCat = styled.View`

display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: row;


`;


export const Header3 = styled.View`
   padding: 5px;
   flex-direction: row;
   justify-content: center;
   margin-bottom:-50px;
   z-index:99;
    
`;

export const Titulo3 = styled.TouchableOpacity`
width: 100px;
height: 50px;
display: flex;
justify-content: center
align-items: flex-start;
flex-direction: column;


`;
export const Participar3 = styled.View`
    width: 130px;
    height: 50px;
    border-radius: 5px;
    display: flex;
   justify-content: center;
   margin-top: -95px;
   
`;
export const NameBtn3 = styled.Text`
   color: #FD8121;
   font-weight: bold;
   font-size: 28px;
`;
export const Moldi3 = styled.View`
width: 250px;
height: 250px;
margin-right: 10px;
margin-top: -120px;
flex-direction: column;
align-items: center;
`;





export const Botoes = styled.View`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 15px;
    margin-top:-60px;
    background-color: rgba(0,0,0,0.3);
`;




export const Avatar2 = styled.Image`
   width: 50px;
   height: 50px;

`;

export const Moldi2 = styled.TouchableOpacity`
width: 60px;
height: 60px;
border-radius: 5px;
justify-content: center;
align-items: center;
border: 6px solid #282A36;
margin-right: 10px;
`;



export const Post2 = styled.View`
height: 100px;
padding-left:10px;
padding-top:0px;

`;

export const NameTex = styled.Text`
   color: #000;
   
  font-size:13px;
`;

export const NameAtu = styled.Text`
   color: #000;
   font-weight: bold;
   margin-left:5px;
`;
export const NameComen = styled.Text`
color: #000;
font-weight: bold;
font-size:10px;  
`;

export const NameBtn = styled.Text`
   color: #000;
   font-size:12px;
`;


export const Participar = styled.TouchableOpacity`
    width: 100px;
    height: 25px;
   
    background-color: #FFE767;
    border-radius: 5px;
    display: flex;
   justify-content: center
   align-items: center;
`;

export const PostImage = styled.Image`
width: 100%;
 aspect-ratio: ${props => props.ratio};  
`;

export const Description = styled.Text`
   padding-left: 15px;
   padding-right: 15px;
   line-height: 18px;
   color: #FFF;
`;
export const Description2 = styled.TouchableOpacity`
   padding-left: 15px;
   padding-right: 15px;
   padding-bottom: 15px;
   line-height: 18px;
   color: #FFF;
`;


export const Loadin = styled.ActivityIndicator.attrs({
   size: 'small',
   color: "#fff" 
})`
  margin: 30px 0;
`;
export const CustomSubTituloText = styled.Text`
    font-size: 18px;
    color: #000;
    margin:5px;
`;

export const Box10 = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border: 2px solid #282A36;
    margin-right: 10px;
    margin-bottom:5px
;    border-radius:10px;
    background-color: #FFF;
    padding-left:10px;
    padding-right:10px;
`;
export const CustomEstButton = styled.TouchableOpacity`
    background-color:  #fff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 30px;
    margin-bottom:5px;
    margin-right:10px;
    border: 2px solid #282A36;
    padding-left: 10px;
    padding-right: 10px;
    
`;
export const CustomButtonText1 = styled.Text`
    font-size: 12px;
    color: #000;
    
`;