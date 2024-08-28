import React from 'react';
import  {  TextInputMask  }  from  'react-native-masked-text';
import { StyleSheet } from 'react-native';
//52 -criando o os inputs padronizados para usar em varios lugares


export default ({placeholder, value, onChangeText, autoCapitalize, keyboardType}) => {
    const Styles = StyleSheet.create ({
        masked :{
            flex: 1,
            fontSize: 16,
            color: '#000',
            marginLeft: 10,
            outlineStyle: 'none'
        }
    });

    return (
     
          
            <TextInputMask
                 type = { 'datetime' } 
                 options = { { 
                   format : 'HH:mm' 
                 } } 
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                style = {Styles.masked}
            />
      
    );
}