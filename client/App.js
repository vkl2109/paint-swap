
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './components/Login';
import LandingPage from './components/LandingPage';
import ChoosePublic from './components/ChoosePublic';
import CreateRoom from './components/CreateRoom';
import EnterPrivate from './components/EnterPrivate';
import SignUp from './components/SignUp';
import PaintRoom from './components/PaintRoom';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='LandingPage' component={LandingPage} />
          <Stack.Screen name='ChoosePublic' component={ChoosePublic} />
          <Stack.Screen name='CreateRoom' component={CreateRoom} />
          <Stack.Screen name='EnterPrivate' component={EnterPrivate} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='PaintRoom' component={PaintRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}