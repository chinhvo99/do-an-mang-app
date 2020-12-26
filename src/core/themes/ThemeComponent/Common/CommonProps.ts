import { Platform } from 'react-native';
import { Color } from './Color';

/**
 * Component Props
 */
export const bottomNavigationBarHeight = 75;
export const headerPaddingHorizontal = 18;
export const bodyPaddingHorizontal = 18;
export const roundedBorderRadius = 10;

export const shadowViewDark = Platform.select({
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: 'rgba(119, 119, 119, 0.5)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export const shadowViewLight = Platform.select({
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
  },
});

/**
 * Component Color
 */
export const darkComponentColor = {
  textColor: Color.white,
  textColorSecondary: Color.grey5,
  bgColor: Color.black,
  bgColorSecondary: Color.grey3,
};
export const lightComponentColor = {
  textColor: Color.violet,
  textColorSecondary: Color.grey5,
  bgColor: Color.white,
  bgColorSecondary: Color.violet,
};
