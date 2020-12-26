import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleStack from '@contents/Example/index.stack';
import homeStack from './routes';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={homeStack.index} component={HomeScreen} />
    </Stack.Navigator>
  );
}
