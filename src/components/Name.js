import React from 'react';
import styled from 'styled-components/native';
import  {  TextInputMask  }  from  'react-native-masked-text';
import { StyleSheet } from 'react-native';
//52 -criando o os inputs padronizados para usar em varios lugares
const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #DCD0F2;
    flex-direction: row;
    border-radius: 5px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #5D0BF7;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password, autoCapitalize, keyboardType}) => {
    const Styles = StyleSheet.create ({
        masked :{
            flex: 1,
            fontSize: 16,
            color: '#5D0BF7',
            marginLeft: 10,
        }
    });

    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#5D0BF7" />
            <TextInputMask
                 type = { 'custom' } 
                 options = { { 
                   mask : 'SSSSSSSSSSSSSSS' 
                 } }
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#5D0BF7"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                style = {Styles.masked}
            />
        </InputArea>
    );
}