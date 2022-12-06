import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { CustomText } from './UI.CustomText';


const styles = StyleSheet.create({
  slide:{
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    height:'100%',
    maxHeight:266,
    width:undefined,
    aspectRatio: 2,
    alignSelf:'center',
    resizeMode:'contain',
  },
  imageContainer: {
    flex: 70,
    width:'100%',
    elevation: 1
  },
  title:{
    flex: 15,
    minHeight: 24,
    marginTop:20,
    marginHorizontal:30,
    textAlign:'center',
    justifyContent:'center',
  },
  text:{
    flex: 15,
    marginHorizontal:30,
    textAlign:'center',
    justifyContent:'center',
  }
});

export const Slide = ({title, image, text, ...props}) => {

  return (
  <View style={styles.slide}>
    <CustomText variant="large" style={styles.title}>{title}</CustomText>
    <View style={styles.imageContainer}>
      <Image 
        style={[styles.image]} 
        source={image}
        />
      {props.children}
    </View>
    <CustomText style={styles.text}>{text}</CustomText>
  </View>
  );
};