import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import walletStack from './routes';
import WalletHomeScreen from './screens/WalletScreen';
import WalletCreateScreen from './screens/CreateWalletScreen';

const Stack = createStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={walletStack.index} component={WalletHomeScreen} />
      <Stack.Screen name={walletStack.create} component={WalletCreateScreen} />

    </Stack.Navigator>
  );
}
