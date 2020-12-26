import React, { PureComponent } from 'react';
import {
  View,
  ImageBackgroundProps,
  ImageBackground,
  StyleSheet,
  ViewProps,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';

export interface QuickViewProps extends ViewProps, TouchableOpacityProps {
  width?: number | string;
  height?: number | string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  position?: 'absolute' | 'relative';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  center?: boolean;
  horizontalCenter?: boolean;
  verticalCenter?: boolean;
  style?: any;
  children?: any;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  justifyContent?:
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between';
  alignSelf?:
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
  alignItems?:
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
  backgroundColor?: string;
  flex?: number;
  backgroundImage?: ImageBackgroundProps;
  backgroundImageStyle?: any;
  testID?: string;
}

class QuickView extends PureComponent<QuickViewProps> {
  static defaultProps ={
    column: true,
  };

  render() {
    const {
      width,
      height,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      position,
      top,
      bottom,
      left,
      right,
      center,
      horizontalCenter,
      verticalCenter,
      style,
      children,
      row: rowProp,
      column: columnProp,
      rowReverse: rowReverseProp,
      columnReverse: columnReverseProp,
      justifyContent,
      alignSelf,
      alignItems,
      backgroundColor,
      flex,
      backgroundImage,
      backgroundImageStyle,
      ...otherProps
    } = this.props;
    const { onPress } = this.props;

    /**
     * containerStyle
     */
    let row = rowProp;
    let rowReverse = rowReverseProp;
    let column = columnProp;
    let columnReverse = columnReverseProp;
    if (row || rowReverse) {
      column = false;
      columnReverse = false;
    }
    if (column || columnReverse) {
      row = false;
      rowReverse = false;
    }
    const containerStyle = StyleSheet.flatten([
      {
        width,
        height,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingHorizontal,
        paddingVertical,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        position,
        top,
        bottom,
        left,
        right,
        justifyContent,
        alignSelf,
        alignItems,
        backgroundColor,
        flex,
      },
      center && {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ((horizontalCenter && !(row || rowReverse))
      || (verticalCenter && (row || rowReverse))) && {
        alignItems: 'center',
      },
      ((horizontalCenter && (row || rowReverse))
      || (verticalCenter && !(row || rowReverse))) && {
        justifyContent: 'center',
      },
      row && { flexDirection: 'row' },
      column && { flexDirection: 'column' },
      rowReverse && { flexDirection: 'row-reverse' },
      columnReverse && { flexDirection: 'column-reverse' },
      style,
    ]);

    const Component: any = onPress ? TouchableOpacity : View;

    if (backgroundImage) {
      const backgroundStyle: any = [
        {
          flex: 1,
          resizeMode: 'cover',
        },
        backgroundImageStyle,
      ];
      return (
        <ImageBackground
          style={backgroundStyle}
          {...backgroundImage}
        >
          <Component {...otherProps} style={containerStyle}>
            {children}
          </Component>
        </ImageBackground>
      );
    }
    return (
      <Component {...otherProps} style={containerStyle}>
        {children}
      </Component>
    );
  }
}

export default QuickView;
