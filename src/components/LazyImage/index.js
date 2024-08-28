import React from 'react'
import { View, Text, Animated } from 'react-native'

import { Small, Original } from './styles';



const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  smallSource,
  source,
  aspectRatio,
  shouldLoad
}) {

const opacity = new Animated.Value(0);

const handleAnimate  = ()=>{
 Animated.timing(opacity, {
     toValue:1,
     duration: 500,
     useNativeDriver: true,

 }).start();

}

    return (
     <Small 
     source={smallSource} 
     ratio={aspectRatio} 
     resizeMode="contain" 
     blurRadius={3}
     >

         <OriginalAnimated 
         style={{ opacity }}
          source={source} 
          ratio={aspectRatio} 
          resizeMode="contain"
          //realiza uma função quando a imagem acaba de ser carregada
          onLoadEnd={handleAnimate} 
         />

     </Small>
    )
}
