import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import addTransactionStack from './routes';
import IncomeScreen from './screens/IncomeScreen';
import PickTypeScreen from './screens/PickTypeScreen';
import OutcomeScreen from './screens/OutcomeScreen';

const Stack = createStackNavigator();

export default function AddTransactionStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={addTransactionStack.index} component={PickTypeScreen} />
      <Stack.Screen name={addTransactionStack.income} component={IncomeScreen} />
      <Stack.Screen name={addTransactionStack.outcome} component={OutcomeScreen} />
    </Stack.Navigator>
  );
}
