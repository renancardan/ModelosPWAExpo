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