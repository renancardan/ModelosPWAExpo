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
margin-bottom:4px;
margin-top:10px;
`;

export const Box1 = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom:20px;
margin-top:20px;
`;


export const Boxando = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-bottom:5px;
width: 300px;

height: 30px;
`;

export const Box10 = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border: 2px solid #282A36;
    margin-right: 15px;
    border-radius:10px;
    background-color: #FFF;
    padding-left:10px;
    padding-right:10px;
`;

export const BoxSessao = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-left: 30px;
margin-right: 30px;
height:40px;
`;

export const SessaoCriar = styled.Text`
    font-size: 18px;
    color: #fff;
    margin:5px;
    font-weight: bold;
    margin-top: 10px;
`;

export const Desativo = styled.Text`
    font-size: 18px;
    color: red;
    margin:5px;
    font-weight: bold;
    margin-top: 10px;
`;

export const Box2 = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-top:-45px;
background-color: rgba(0,0,0,0.3);
margin-bottom:5px;
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

`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 10px;
    margin-bottom: 30px;
`;