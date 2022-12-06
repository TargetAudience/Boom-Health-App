import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { MotiView, MotiImage } from 'moti';

import COLORS from '@assets/util/colors';
import { IsSmallScreen } from '@assets/util/dimensions';

export const Animation = (() => {
  const [animationState, setAnimationState] = useState(IsSmallScreen ? 1 : 0);
  return (
    <View 
        style={styles.animationContainer}
        >
        {
          !IsSmallScreen &&
          <MotiView 
            style={[styles.featureBoxContainer,  animationState >= 1 && styles.featureBoxContainerVisible]}
            >
              <MotiImage 
                style={[styles.featureBox, animationState < 2 && styles.featureBoxActive]}
                source={require('@assets/imagesAnim/share-cost-1.png')}
                from={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{type:'timing', duration:800, delay:200}}
                onDidAnimate={
                  (styleProp, didAnimationFinish, maybeValue, {attemptedValue}) => {
                    if(animationState == 0 && styleProp == 'opacity' && didAnimationFinish) {
                      setAnimationState(1);
                    }
                  }
                }
                >
              </MotiImage>
          </MotiView>
        }
        <MotiView 
          style={[styles.featureBoxContainer,  animationState > 1 && styles.featureBoxContainerVisible]}
          >
          { animationState >= 1 ?
            <MotiImage 
              style={[styles.featureBox, animationState == 2 && styles.featureBoxActive]}
              source={require('@assets/imagesAnim/share-cost-2.png')}
              from={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{type:'timing', duration:800, delay:0}}
              onDidAnimate={
                (styleProp, didAnimationFinish, maybeValue, {attemptedValue}) => {
                  if(animationState == 1 && styleProp == 'opacity' && didAnimationFinish) {
                    setAnimationState(2);
                  }
                }
              }
              >
            </MotiImage>
            : <></>
          }
        </MotiView>
        <MotiView 
          style={[styles.featureBoxContainer, animationState > 2 && styles.featureBoxContainerVisible]}
          >
          { animationState >= 2 ?
          <MotiImage 
            style={[styles.featureBox, animationState > 2 && styles.featureBoxActive]}
            source={require('@assets/imagesAnim/share-cost-3.png')}
            from={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{type:'timing', duration:1000, delay:0}}
            onDidAnimate={
              (styleProp, didAnimationFinish, maybeValue, {attemptedValue}) => {
                if(animationState == 2 && styleProp == 'opacity' && didAnimationFinish) {
                  setAnimationState(3);
                }
              }
            }
            >
          </MotiImage>
          : <></>
          }
        </MotiView>
    </View>
  );
});


const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: 'space-between',
    alignItems:'center',
    position: 'absolute',
    top:0,
    alignSelf:'center',
    flex: 1,
    elevation: 3,
    marginTop: IsSmallScreen ? -20 : -45,
  },
  featureBoxContainer: {
    flex: 1,
    marginBottom: IsSmallScreen ? 20 : 10,
    shadowOffset: {
              width: 0,
              height: 4
            },
    shadowOpacity: 0.25,
    shadowRadius:2,
    elevation:2,
  },
  featureBoxContainerVisible: {
    backgroundColor: COLORS.white //to render elevation on Android
  },
  featureBox: {
    flex: 1,
    width:216,
    height: 104,
  },
  featureBoxActive: {
    borderColor: COLORS.pink,
    borderWidth:1
  }
});
