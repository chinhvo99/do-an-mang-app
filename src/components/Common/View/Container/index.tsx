import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView, { QuickViewProps } from '../QuickView';

export interface ContainerProps extends QuickViewProps {
  scroll?: boolean;
  theme?: any;
  secondary?: boolean;
  primary?: boolean;
}

class Container extends PureComponent<ContainerProps> {
  static defaultProps = {
    scroll: false,
    primary: true,
  };

  render() {
    const {
      scroll,
      backgroundColor: backgroundColorProp,
      secondary,
      theme,
      style,
      children,
      ...otherProps
    } = this.props;

    const backgroundColor = backgroundColorProp
    || (secondary ? theme.colors.bgColorSecondary : theme.colors.bgColor);
    const containerStyle = StyleSheet.flatten([
      { flex: 1, backgroundColor },
      style,
    ]);

    if (scroll) {
      return (
        <ScrollView testID="ContainerScrollView" style={{ backgroundColor, flex: 1 }}>
          <QuickView {...otherProps} style={containerStyle}>
            {children}
          </QuickView>
        </ScrollView>
      );
    }
    return (
      <QuickView {...otherProps} style={containerStyle}>
        {children}
      </QuickView>
    );
  }
}

export default withTheme(Container as React.ComponentType<ContainerProps & ThemeProps<any>>);
