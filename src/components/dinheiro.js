import React from 'react';
import styled from 'styled-components/native';
import  {  TextInputMask  }  from  'react-native-masked-text';
import { StyleSheet } from 'react-native';
//52 -criando o os inputs padronizados para usar em varios lugares
const InputArea = styled.View`
    width: 100%;
    height: 50px;
    background-color: #fff;
    flex-direction: row;
    border-radius: 10px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #999;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password, autoCapitalize, keyboardType,}) => {
    const Styles = StyleSheet.create ({
        masked :{
            flex: 1,
            fontSize: 16,
            color: '#000',
            marginLeft: 10,
        }
    });

    return (
        <InputArea>
           
            <TextInputMask
               type={'money'}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                style = {Styles.masked}
             
            />
        </InputArea>
    );
}