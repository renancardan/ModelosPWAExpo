import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
   
`;


export const  Header = styled.View`
    background-color: #3574CB;
   height:150px;
   align-items: center;
   padding-left: 20px;
`;

export const  HeaderTitle = styled.Text`
    color: #FFF;
   font-size:27px;
`;


export const  Menu = styled.View`
background-color: #000;
flex-direction: row;
align-items: center;
justify-content: center;


`;

export const MenuItem = styled.TouchableOpacity`
padding: 10px;
border-bottom-width:5px;
border-bottom-color:${props=>props.active?'#fff':'#000'};
`;


export const  MenuItemText = styled.Text`
color: #FFF;
font-size:16px;
   
`;