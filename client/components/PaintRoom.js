import React, { Component } from 'react';
import Canvas from './Canvas.js'
import { SafeAreaView, StyleSheet, Text } from 'react-native'


export default function PaintRoom({ navigation, route }) {

  const { roomID } = route.params;
  // not sure if this is the right way to pass the room param 

  return (
    <SafeAreaView style={styles.container}>
      {/* <Canvas /> */}
      <Text>You are in Room: {roomID}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A5A5A', // '#25292e'
    alignItems: 'center',
    justifyContent: 'center'
  },
});