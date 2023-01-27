
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

import Login from './components/Login';
import LandingPage from './components/LandingPage';
import ChoosePublic from './components/ChoosePublic';
import CreateRoom from './components/CreateRoom';
import EnterPrivate from './components/EnterPrivate';
import PaintRoom from './components/PaintRoom';
import ArtistSpace from './components/ArtistSpace';

const Stack = createNativeStackNavigator();

export default function App() {
  const [socket, setSocket] = useState(null)
  const [loginData, setLoginData] = useState({})
  const [toggle, setToggle] = useState(false)
  const [leaveMsg, setLeaveMsg] = useState(false)


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' >
            {props => <Login {...props} loginData={loginData} setLoginData={setLoginData} setSocket={setSocket} setToggle={setToggle} setLeaveMsg={setLeaveMsg} />}
          </Stack.Screen>
          <Stack.Screen name='LandingPage' component={LandingPage} />
          <Stack.Screen name='ChoosePublic'>
            {props => <ChoosePublic {...props} socket={socket} loginData={loginData} />}
          </Stack.Screen>
          <Stack.Screen name='CreateRoom'>
            {props => <CreateRoom {...props} socket={socket} loginData={loginData} />}
          </Stack.Screen>
          <Stack.Screen name='EnterPrivate'>
            {props => <EnterPrivate {...props} socket={socket} loginData={loginData} />}
          </Stack.Screen>
          <Stack.Screen name='PaintRoom' component={PaintRoom} />
          <Stack.Screen name='ArtistSpace'>
            {props => <ArtistSpace {...props} socket={socket} toggle={toggle} setToggle={setToggle} leaveMsg={leaveMsg} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}