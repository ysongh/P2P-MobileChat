import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import DashboardScreen from './screens/Dashboard';
import ChatScreen from './screens/Chat';
import StreamScreen from './screens/Stream';
import AddChat from './screens/AddChat';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Stream" component={StreamScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
