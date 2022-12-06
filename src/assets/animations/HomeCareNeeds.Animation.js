import React from 'react'
import { StyleSheet } from 'react-native'
import { MotiView, MotiImage } from 'moti';
import { IsSmallScreen } from '@assets/util/dimensions';

export const Animation = (() => {
  return (
    <MotiView 
        style={styles.animationContainer}
        from={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1.2}}
        transition={{type:'timing', duration:800, delay:300}}
        >
      <MotiImage style={styles.animatedImage} source={require('@assets/imagesAnim/home-care-needs.png')} />
    </MotiView>
  );
});


const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top:0,
    paddingLeft: IsSmallScreen ? 15 : 10,
    height:'100%',
    flex: 1,
    alignSelf:'center',
  },
  animatedImage: {
    resizeMode: 'contain',
    maxWidth: IsSmallScreen ? '95%' : '100%',
    flex:1
  }
});
