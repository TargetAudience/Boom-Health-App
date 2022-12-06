import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: (width, height, backgroundColor, disabled) => ({
    backgroundColor,
    flex: 0,
    height,
    justifyContent: 'center',
    ...(disabled && { opacity: disabled ? 0.5 : 1 }),
    width
  })
});

export default styles;
