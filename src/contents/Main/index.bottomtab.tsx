/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomNavigationBarHeight } from '@themes/ThemeComponent/Common/CommonProps';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import { Color } from '@themes/Theme';
import mainBottomTab from './routes';
import HomeStack from './containers/Home/index.stack';
import MoreStack from './containers/More/index.stack';
import CategoryStack from './containers/Category/index.stack';
import HistoryStack from './containers/Wallet/index.stack';
import AddTransactionStack from './containers/AddTransaction/index.stack';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const { theme: { colors: { bgColorSecondary } }, t } = props;
  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        // activeTintColor: '#FDFDFD',
        // inactiveTintColor: '#B8CCFF',
        style: {
          height: bottomNavigationBarHeight,
          backgroundColor: bgColorSecondary,
        },
        tabStyle: {
          backgroundColor: bgColorSecondary,
          height: 55,
          paddingTop: 8,
          marginTop: -1,
        },
        labelStyle: {
          fontSize: 12,
          color: 'white',
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabs.Screen
        name={mainBottomTab.homeStack}
        component={HomeStack}
        options={{
          tabBarLabel: t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="foundation"
              color={Color.white}
              size={24}
            />
          ) : (
            <Icon name="home" type="foundation" color={color} size={20} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.historyStack}
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="history"
              type="font-awesome"
              color={Color.white}
              size={24}
            />
          ) : (
            <Icon name="history" type="font-awesome" color={color} size={20} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.addTransactionStack}
        component={AddTransactionStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="pluscircle"
              type="antdesign"
              color={Color.white}
              size={30}
            />
          ) : (
            <Icon name="pluscircle" type="antdesign" color={color} size={30} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.categoryStack}
        component={CategoryStack}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="list-thumbnails"
              type="foundation"
              color={Color.white}
              size={24}
            />
          ) : (
            <Icon name="list-thumbnails" type="foundation" color={color} size={20} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.moreStack}
        component={MoreStack}
        options={{
          tabBarLabel: t('bottom_tab:more'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon name="bars" type="font-awesome" color={Color.white} size={20} />
          ) : (
            <Icon name="bars" type="font-awesome" color={color} size={16} />
          )),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default compose(
  withTheme,
  withTranslation(),
)(MainBottomTab);
