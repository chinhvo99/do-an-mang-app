import { Color } from './Common/Color';
import { roundedBorderRadius } from './Common/CommonProps';

/**
 * Button
 */
const borderWidth = 0;
const titleFontSize = 16;
const marginVertical = 5;
const marginHorizontal = 0;
const outlineBorderWidth = 1;

export const darkButton = {
  /**
   * Normal
   */
  borderWidth,
  borderColor: Color.white,
  backgroundColor: Color.grey7,
  titleColor: Color.white,
  titleFontSize,
  marginVertical,
  marginHorizontal,
  roundedBorderRadius,
  /**
   * Outline
   */
  outlineBorderWidth,
  outlineBorderColor: Color.white,
  outlineTitleColor: Color.white,
  /**
   * Active
   */
  activeBackgroundColor: Color.blue,
  activeTitleColor: Color.white,
  activeOutlineTitleColor: Color.white,
  activeBorderColor: Color.blue,
  activeOutlineBorderColor: Color.blue,
};
export const lightButton = {
  /**
   * Normal
   */
  borderWidth,
  borderColor: Color.white,
  backgroundColor: Color.grey3,
  titleColor: Color.black,
  titleFontSize,
  marginVertical,
  marginHorizontal,
  roundedBorderRadius,
  /**
   * Outline
   */
  outlineBorderWidth,
  outlineBorderColor: Color.black,
  outlineTitleColor: Color.black,
  /**
   * Active
   */
  activeBackgroundColor: Color.blue,
  activeTitleColor: Color.white,
  activeOutlineTitleColor: Color.white,
  activeBorderColor: Color.blue,
  activeOutlineBorderColor: Color.blue,
};
