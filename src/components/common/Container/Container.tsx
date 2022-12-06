import React, { FC } from 'react'
import { SafeAreaView, View } from 'react-native'
import styles from './Container.styles'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Container: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  )
}
export default Container;