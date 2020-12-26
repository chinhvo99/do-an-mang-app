/* eslint-disable import/prefer-default-export */
import exampleStack from './routes';
import commonStack from './containers/Common/routes';

export const exampleList = [
  {
    name: 'Text',
    subtitle: 'Support Theme',
    iconName: 'comment-text-outline',
    linearGradientColors: ['#FF9800', '#F44336'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.text,
  },
  {
    name: 'Header',
    subtitle: 'Support Theme',
    iconName: 'page-layout-header',
    linearGradientColors: ['#F44336', '#E91E63'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.header,
  },
  {
    name: 'Avatar',
    iconName: 'account',
    iconSize: 30,
    linearGradientColors: ['#9a16dd', '#009b9b'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.avatar,
  },
  {
    name: 'Button',
    subtitle: 'Support Theme',
    iconName: 'gesture-tap',
    iconSize: 35,
    linearGradientColors: ['#3F51B5', '#2196F3'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.button,
  },
  {
    name: 'Picker',
    subtitle: 'Support Theme',
    iconName: 'arrow-down-drop-circle-outline',
    iconSize: 35,
    linearGradientColors: ['#99121d', '#e69e5b'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.picker,
  },
  {
    name: 'Input',
    subtitle: 'Support Theme',
    iconName: 'format-letter-case',
    iconSize: 35,
    linearGradientColors: ['#37bc04', '#5bec88'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.input,
  },
  {
    name: 'FlatList',
    iconName: 'view-list',
    iconSize: 35,
    linearGradientColors: ['#7168c7', '#9edd14'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.flatList,
  },
  {
    name: 'Image',
    iconName: 'image',
    iconSize: 35,
    linearGradientColors: ['#a55f9b', '#ae011e'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.image,
  },
  {
    name: 'Badge',
    iconName: 'tag',
    linearGradientColors: ['#CD853F', '#FF9800'],
    stack: null,
    screen: null,
  },
  {
    name: 'Carousel',
    iconName: 'view-carousel',
    iconSize: 35,
    linearGradientColors: ['#4CAF50', '#8BC34A'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.carousel,
  },
  {
    name: 'Modal',
    iconName: 'alert-outline',
    linearGradientColors: ['#4CAF50', '#8BC34A'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.modal,
  },
  {
    name: 'ListCheckbox',
    subtitle: 'Support Theme',
    iconName: 'checkbox-multiple-marked',
    linearGradientColors: ['#FFA69E', '#861657'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.listCheckBox,
  },
  {
    name: 'BottomModalSelect',
    iconName: 'select',
    linearGradientColors: ['#000000', '#130F40'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.bottomModalSelect,
  }, {
    name: 'Dropdown',
    iconName: 'menu',
    subtitle: 'Support Theme',
    linearGradientColors: ['#FFFF45', '#FF5858'],
    stack: exampleStack.commonExampleStack,
    screen: commonStack.dropdown,
  },
];