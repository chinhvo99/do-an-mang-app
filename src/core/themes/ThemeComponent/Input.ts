import { darkComponentColor, lightComponentColor, roundedBorderRadius } from './Common/CommonProps';

/**
 * Input
 */
const sharpBorderBottomWidth = 0;
const roundedBorderBottomWidth = 0;
const underlineBorderBottomWidth = 0;
const sharpFontSize = 14;
const roundedFontSize = 14;
const underlineFontSize = 14;

export const darkInput = {
  sharp: {
    containerStyle: {
      backgroundColor: darkComponentColor.bgColorSecondary,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: darkComponentColor.textColor,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: darkComponentColor.bgColorSecondary,
      borderRadius: roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: darkComponentColor.textColor,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: darkComponentColor.textColor,
      fontSize: underlineFontSize,
    },
  },
};

export const lightInput = {
  sharp: {
    containerStyle: {
      backgroundColor: lightComponentColor.bgColorSecondary,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: lightComponentColor.textColor,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: lightComponentColor.bgColorSecondary,
      borderRadius: roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: lightComponentColor.textColor,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    containerStyle: {
      borderWidth: 0,
    },
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: lightComponentColor.textColor,
      fontSize: underlineFontSize,
    },
  },
};
