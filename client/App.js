
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { io } from "socket.io-client";
import { useEffect } from 'react';

import Login from './components/Login';
import LandingPage from './components/LandingPage';
import ChoosePublic from './components/ChoosePublic';
import CreateRoom from './components/CreateRoom';
import EnterPrivate from './components/EnterPrivate';
import PaintRoom from './components/PaintRoom';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const socket = io("http://172.31.172.106:5000/", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    socket.on("connect", (data) => {
      console.log(data);
    });

    // socket.on("data", (data) => {
    //   console.log(data);
    // });

    // socket.on("disconnect", (data) => {
    //   console.log(data);
    // });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='LandingPage' component={LandingPage} />
          <Stack.Screen name='ChoosePublic' component={ChoosePublic} />
          <Stack.Screen name='CreateRoom' component={CreateRoom} />
          <Stack.Screen name='EnterPrivate' component={EnterPrivate} />
          <Stack.Screen name='PaintRoom' component={PaintRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}