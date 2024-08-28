import React, { useState } from 'react';
import {
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
} from './styles';
import { Text } from 'react-native';



export default () => {
    const [ActiveMenu, setActiveMenu] = useState('Fotos')
    return ( 
        <Container>
          
            <Menu>
                    <MenuItem active={ActiveMenu === 'Fotos'} onPress={()=>setActiveMenu('Fotos')}>
                    <MenuItemText>
                    Fotos
                    </MenuItemText>
                    </MenuItem>
                    <MenuItem active={ActiveMenu === 'Catalogo'} onPress={()=>setActiveMenu('Catalogo')}>
                    <MenuItemText >
                    Catalogo
                    </MenuItemText>
                    </MenuItem>
                    <MenuItem active={ActiveMenu === 'Anuncio'} onPress={()=>setActiveMenu('Anuncio')}>
                    <MenuItemText >
                    Anúncio
                    </MenuItemText>
                    </MenuItem>
                    <MenuItem active={ActiveMenu === 'Posicao'} onPress={()=>setActiveMenu('Posicao')}>
                    <MenuItemText >
                    Posição
                    </MenuItemText>
                    </MenuItem>

                </Menu>
              
        </Container>

    )
}