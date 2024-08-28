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
    border-radius: 15px;
    padding-left: 30px;
    align-items: center;
    margin-bottom: 5px;
    border: 2px solid #282A36;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #999;
    margin-left: 20px;
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
            <IconSvg width="24" height="24" fill="#000" />
            <TextInputMask
                  type = { 'cel-phone' } 
                  options = { { 
                    maskType : 'BRL' , 
                    withDDD : true , 
                    dddMask : '(99)' 
                  } } 
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