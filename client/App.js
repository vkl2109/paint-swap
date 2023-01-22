
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import WaitingRoom from './components/WaitingRoom';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component = {Login} />
          <Stack.Screen name='WaitingRoom' component = {WaitingRoom} />
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}