import React, { PureComponent } from 'react';
import {
  ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView, { QuickViewProps } from '../QuickView';

export interface BodyProps extends QuickViewProps {
  scroll?: boolean;
  theme?: any;
  secondary?: boolean;
  primary?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullView?: boolean;
}

class Body extends PureComponent<BodyProps> {
  static defaultProps = {
    scroll: false,
    primary: true,
  };

  render() {
    const {
      scroll,
      backgroundColor: backgroundColorProp,
      paddingHorizontal: paddingHorizontalProp,
      secondary,
      fullView,
      fullWidth,
      fullHeight,
      theme,
      style: styleProp,
      children,
      ...otherProps
    } = this.props;

    const backgroundColor = backgroundColorProp
    || (secondary ? theme.colors.bgColorSecondary : theme.colors.bgColor);
    const paddingHorizontal = (fullWidth || fullView) ? 0
      : (paddingHorizontalProp || theme.bodyPaddingHorizontal);

    const style = StyleSheet.flatten([
      { backgroundColor, paddingHorizontal },
      styleProp,
    ]);

    if (fullHeight || fullView) {
      if (scroll) {
        return (
          <ScrollView testID="BodyScrollView" style={{ backgroundColor, flex: 1 }}>
            <QuickView {...otherProps} style={style}>
              {children}
            </QuickView>
          </ScrollView>
        );
      }
      return (
        <QuickView testID="FullHeightBodyView" {...otherProps} style={style}>
          {children}
        </QuickView>
      );
    }

    if (scroll) {
      return (
        <SafeAreaView testID="SafeAreaBodyScrollView" style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor }}>
            <QuickView {...otherProps} style={style}>
              {children}
            </QuickView>
          </ScrollView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView testID="SafeAreaBodyView" style={{ flex: 1 }}>
        <QuickView {...otherProps} style={style}>
          {children}
        </QuickView>
      </SafeAreaView>
    );
  }
}

export default withTheme(Body as React.ComponentType<BodyProps & ThemeProps<any>>);
