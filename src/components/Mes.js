import React from 'react';
import styled from 'styled-components/native';
import  {  TextInputMask  }  from  'react-native-masked-text';
import { StyleSheet } from 'react-native';
import Api from '../Api';
//52 -criando o os inputs padronizados para usar em varios lugares
const InputArea = styled.View`
    width: 70px;
    height: 40px;
    background-color: #fff;
    flex-direction: row;
    padding-left: 5px;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 15px;
    margin-right: 5px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #000;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password, autoCapitalize, keyboardType, setTelPesAna}) => {


  

 

    return (
        <InputArea>
         <IconSvg width="24" height="24" fill="#000" />
         <Input
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
               
            />
        </InputArea>
    );
}