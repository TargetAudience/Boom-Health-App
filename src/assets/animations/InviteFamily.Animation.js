import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

import { CustomText } from '@components/common/OnBoarding/UI.CustomText';

import COLORS from '@assets/util/colors';
import { IsSmallScreen, SizeToDevice } from '@assets/util/dimensions';

export const Animation = (() => {
  const initialDelay = 500;
  const slideDuration = 600;
  return (
    <View 
        style={styles.animationContainer}
        >
        <MotiView 
          style={[styles.chat, styles.primaryChat]}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{type:'timing', duration:slideDuration, delay:initialDelay}}
          >
          <CustomText style={styles.primaryChatText}>How was mom&apos;s caregiver yesterday?</CustomText>
        </MotiView>
        <MotiView 
          style={[styles.chat, styles.secondaryChat]}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{type:'timing', duration:slideDuration, delay: (initialDelay+slideDuration+200)}}
          >
          <CustomText style={styles.secondaryChatText}>Mom said she was really great and wants her back again. Can we book her again next Thursday?</CustomText>
        </MotiView>
        <MotiView 
          style={[styles.chat, styles.primaryChat]}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{type:'timing', duration:(slideDuration+200), delay:(initialDelay+slideDuration*2+400)}}
          >
          <CustomText style={styles.primaryChatText}>That works for me. I can book it.</CustomText>
        </MotiView>
    </View>
  );
});


const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top:0,
    height:'100%',
    width: IsSmallScreen ? '70%' : '60%',
    flex: 1,
    alignSelf:'center',
    marginTop: IsSmallScreen ? -30 : -20,
  },
  chat: {
    paddingVertical: IsSmallScreen ? 15 : 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    shadowOffset: {
              width: 0,
              height: 4
            },
    shadowOpacity: 0.5,
    shadowRadius:6,
    elevation:3,
    width:'100%',
    borderRadius: 10,
  },
  primaryChat: {
    backgroundColor: COLORS.blue
  },
  primaryChatText: {
    fontSize: SizeToDevice(14),
    color: COLORS.white
  },
  secondaryChat: {
    backgroundColor: COLORS.white
  },
  secondaryChatText: {
    fontSize: SizeToDevice(14),
    color: COLORS.black
  }
});
