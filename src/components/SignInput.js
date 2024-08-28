import React from 'react';
import { TextInput, StyleSheet } from 'react-native'
//52 -criando o os inputs padronizados para usar em varios lugares


export default ({IconSvg, placeholder, value, onChangeText, password, autoCapitalize, keyboardType}) => {
    const Styles = StyleSheet.create ({
        masked :{
            flex: 1,
            fontSize: 20,
            color: '#000',
            marginLeft: 1,
            outlineStyle: 'none',
            borderColor: "#fff",
           
        },
      
    });
    return (
     
        
        <TextInput
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                style = {Styles.masked}
            />
       
    );
}