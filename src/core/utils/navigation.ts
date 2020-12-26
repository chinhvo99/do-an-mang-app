import * as React from 'react';
import { StackActions } from '@react-navigation/native';

interface IScreen {
  screen?: string;
  params?: any;
}

const navigationRef: any = React.createRef();

const navigate = (stack: string, screen?: any) => navigationRef.current?.navigate(stack, screen);

const goBack = () => navigationRef.current?.goBack();

// eslint-disable-next-line max-len
const push = (stack: string, screen?: any) => navigationRef.current?.dispatch(StackActions.push(stack, screen));

const pop = (count: number = 1) => navigationRef.current?.dispatch(StackActions.pop(count));

const popToTop = () => navigationRef.current?.dispatch(StackActions.popToTop());

const NavigationService = {
  navigationRef,
  navigate,
  goBack,
  push,
  pop,
  popToTop,
};
export default NavigationService;
