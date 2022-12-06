import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import { getDistance, getScale } from './_helpers';

const PanContainer = ({
  children,
  close,
  setIsDragging,
}: {
  children: any;
  close: any;
  setIsDragging: any;
}) => {
  const translationXY = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  let _initialTouches: any = useRef().current;

  const onRelease = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ): void | boolean => {
    setIsDragging(false);
   

    Animated.parallel([

      Animated.timing(translationXY.x, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }),

    ]).start();
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const absDx = Math.abs(gestureState.dx);

        if (absDx > 0 && gestureState.numberActiveTouches <= 1) {
          return false;
        }
        return true;
      },
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt: GestureResponderEvent) => {
        setIsDragging(true);
        _initialTouches = evt.nativeEvent.touches;

        translationXY.setOffset({
          x: 0,
          y: 0,
        });
        return true;
      },
      onPanResponderMove: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {


        return true;
      },
      onPanResponderTerminationRequest: () => {
        return true;
      },
      onPanResponderRelease: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        onRelease(evt, gestureState);
        return true;
      },
      onPanResponderTerminate: () => true,
    })
  ).current;

  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            {
              translateX: translationXY.x,
            }
          ],
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default PanContainer;
