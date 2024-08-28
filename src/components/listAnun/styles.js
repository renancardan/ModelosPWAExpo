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
export const Box1 = styled.TouchableOpacity`
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom:20px;
margin-top:20px;
`;