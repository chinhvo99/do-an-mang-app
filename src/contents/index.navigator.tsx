import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainBottomTab from '@contents/Main/index.bottomtab';
import AuthStack from '@contents/Auth/containers/index.stack';
import { useSelector } from 'react-redux';
import { applyObjectSelector } from '@utils/selector';
import rootStack from './routes';
import ModalStack from './Modal/index.stack';
import ExampleStack from './Example/index.stack';
import { requireLoginSelector } from './Config/redux/selector';
import { loginSelector } from './Auth/containers/Login/redux/selector';

const Stack = createStackNavigator();

export default function RootStack() {
  const requireLogin = useSelector((state) => requireLoginSelector(state));
  const loginSelectorData = useSelector((state) => applyObjectSelector(loginSelector, state));
  const isNotLogin = !!(requireLogin && !loginSelectorData.data.get('token'));
  return (
    <Stack.Navigator headerMode="none">
      {
        isNotLogin ? (
          <Stack.Screen
            name={rootStack.authStack}
            component={AuthStack}
          />
        ) : (
          <Stack.Screen
            name={rootStack.mainBottomTab}
            component={MainBottomTab}
          />
        )
      }
      {
        !requireLogin ? (
          <Stack.Screen
            name={rootStack.authStack}
            component={AuthStack}
          />
        ) : null
      }
      <Stack.Screen
        name={rootStack.exampleStack}
        component={ExampleStack}
      />
      <Stack.Screen
        name={rootStack.modalStack}
        component={ModalStack}
      />
    </Stack.Navigator>
  );
}
