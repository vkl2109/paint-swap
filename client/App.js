
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

  RNFetchBlob.fs.ls(imagesFolder)
    .then((files) => {
      console.log(files);
    })
    .catch((err) => {
      console.log(err);
    })

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' >
            {props => <Login {...props} loginData={loginData} setLoginData={setLoginData} setSocket={setSocket} />}
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
          <Stack.Screen name='ArtistSpace' component={ArtistSpace} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}