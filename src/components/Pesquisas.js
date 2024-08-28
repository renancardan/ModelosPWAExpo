import React from 'react';
import styled from 'styled-components/native';
//52 -criando o os inputs padronizados para usar em varios lugares
const InputArea = styled.View`
    width: 70%;
    height: 40px;
    background-color: #fff;
    flex-direction: row;
    border-radius:10px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 5px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 14px;
    color: #000;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password, autoCapitalize, keyboardType}) => {
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