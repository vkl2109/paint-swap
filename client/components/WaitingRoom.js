import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, Pressable, Text, ScrollView } from 'react-native';

export default function WaitingRoom({ navigation }) {
  const [ users, setUsers ] = useState()

  useEffect(()=>{
    const request = async () => {
      let req = await fetch('http://localhost:3001/users')
      let res = await req.json()
      if (req.ok) {
        setUsers(res)
      }
    }
    // request()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>Waiting Room</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A5A5A', // '#25292e'
    alignItems: 'center',
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    // backgroundColor: '#FFFFFF'
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});