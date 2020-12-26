import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import categoryStack from './routes';
import CategoryHomeScreen from './screens/CategoryScreen';
import CategoryDetailScreen from './screens/CategoryDetail';

const Stack = createStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={categoryStack.index} component={CategoryHomeScreen} />
      <Stack.Screen name={categoryStack.categoryDetail} component={CategoryDetailScreen} />

    </Stack.Navigator>
  );
}
