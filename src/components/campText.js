import React from 'react';
import styled from 'styled-components/native';
//52 -criando o os inputs padronizados para usar em varios lugares
const InputArea = styled.View`
    width: 100%;
   
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
    color: #000;
    margin-left: 10px;
`;

export default ({ placeholder, value, onChangeText, password, autoCapitalize, keyboardType, Line, Qline}) => {
    return (
        <InputArea>
        
            <Input
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                 multiline={Line}
                    numberOfLines={Qline}
            />
        </InputArea>
    );
}