import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #000;
    flex: 1;
    padding-top: 5px;
    align-items: center;
`;

export const Box = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
`;
export const  UserImage = styled.Image`

border-radius: 10px;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 20px;
border-width: 1px;
border-color: #fff;
`;

export const BoxFoto = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;
export const CaixaArea6 = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center; 
    width: 70px;
    height: 70px;
    background-color: #fff;
    margin:20px;
    border-radius:10px;
`;
export const CaixaTop = styled.View`  
    width: 100px;
    height: 20px;
    display: flex;
    flex-direction: row;  
`;
export const Textnome = styled.Text`
    font-size: 10px;
    color: #000;
    margin-bottom: 10px;
`;
export const CustomButton = styled.View`
    width: 350px;
    height: 60px;
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #000;
   
    
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
`;
export const CustomButton1 = styled.TouchableOpacity`
height: 30px;
background-color: green;
display: flex; 
border-radius:5px;
margin-right: 10px;
justify-content: center;
align-items: center;   
padding-right:5px;
padding-left:5px;
`;

export const CustomButton6 = styled.TouchableOpacity`

height: 30px;
background-color: #FFE767;
display: flex; 
border-radius:5px;
margin-right: 10px;
justify-content: center;
align-items: center;   
padding-right:5px;
padding-left:5px;   
`;
export const CustomButton7 = styled.TouchableOpacity`

height: 30px;
background-color: red;
display: flex; 
border-radius:5px;
margin-right: 10px;
justify-content: center;
align-items: center;   
padding-right:5px;
padding-left:5px;   
`;
export const CustomButtonText1 = styled.Text`
    font-size: 14px;
    color: #000;
    margin-left: 5px;
`;

export const CustomButtonText6 = styled.Text`
    font-size: 14px;
    font-weight:bold;
    color: #fff;
`;
export const CustomButtonText7 = styled.Text`
    font-size: 14px;
    font-weight:bold;
    color: #000;
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
export const InputArea = styled.View`
    width: 100%;
    padding: 30px;
`;
export const CustomButton2 = styled.TouchableOpacity`
width: 180px;
height: 50px;
display: flex;
flex-direction: row;
align-items: center;

   
`;