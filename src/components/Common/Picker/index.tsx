/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  PickerProps as RNPickerProps, ActionSheetIOS, StyleSheet, Platform,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import _ from 'lodash';
import { Picker as RNPicker } from '@react-native-community/picker';
import { ThemeEnum } from '@contents/Config/redux/constant';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import Button, { ButtonProps } from '../Button/DefaultButton';
import QuickView from '../View/QuickView';

export interface PickerProps extends RNPickerProps, Omit<ButtonProps, 'style' >{
  labels?: Array<string>;
  values: Array<string>;
  placeholder?: string;
  width?: number | string;
  theme?: any;
}
interface State {
  selectedIndex: number | null;
}

class Picker extends PureComponent<PickerProps, State> {
  static defaultProps = {
    width: 100,
    height: 50,
    mode: 'dropdown',
    rounded: true,
  };

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  getDefaultIndex = () => {
    const { selectedValue, values } = this.props;
    let defaultIndex: number | null = null;
    if (typeof selectedValue === 'number') {
      defaultIndex = selectedValue;
    } else if (typeof selectedValue === 'string') {
      defaultIndex = _.indexOf(values, selectedValue);
    }
    return defaultIndex;
  };

  onPressActionSheetIOS = () => {
    const { labels, values } = this.props;
    const itemLabel = labels || values;
    const newLabel = [...itemLabel, 'Huỷ bỏ'];
    return (
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: newLabel,
          cancelButtonIndex: values.length,
        },
        (buttonIndex) => {
          if (buttonIndex !== values.length) {
            const { selectedIndex } = this.state;
            const { onValueChange } = this.props;
            if (selectedIndex !== buttonIndex) {
              this.setState({ selectedIndex: buttonIndex });
              if (onValueChange) { onValueChange(values[buttonIndex], buttonIndex); }
            }
          }
        },
      )
    );
  };

  getSelectedIndex = () => {
    const { placeholder } = this.props;
    const { selectedIndex } = this.state;
    if (selectedIndex === null) {
      const defaultIndex = this.getDefaultIndex();
      if (defaultIndex !== null) {
        return defaultIndex;
      }
      if (placeholder) {
        return null;
      } return 0;
    }
    if (Platform.OS === 'android' && selectedIndex < 0) return null;
    return selectedIndex;
  };

  getSelectedValue = () => {
    const { values } = this.props;
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === null) return null;
    return values[selectedIndex];
  };

  /**
   * Android
   */
  renderItemAndroid = () => {
    const {
      titleColor: titleColorProp, theme,
      primary, secondary, success, warning, error,
      labels: labelsProp, values: valuesProp, placeholder,
    } = this.props;

    let titleColor = titleColorProp || (theme.key === ThemeEnum.LIGHT ? theme.colors.dark : theme.colors.grey5);
    if (primary || secondary || success || warning || error) titleColor = theme.dark;

    let labels = labelsProp;
    let values = valuesProp;
    if (placeholder) {
      if (labels) labels = [placeholder, ...labels];
      values = [placeholder, ...values];
    }
    return values.map(
      (value, index) => (<RNPicker.Item key={index} color={titleColor} label={labels ? labels[index] : value} value={value} />),
    );
  };

  onValueChangeAndroid = (itemValue: ItemValue, itemIndex: number): void => {
    const { values, onValueChange, placeholder } = this.props;
    if (!placeholder) {
      this.setState({ selectedIndex: itemIndex });
      if (onValueChange) { onValueChange(values[itemIndex], itemIndex); }
    } else {
      this.setState({ selectedIndex: itemIndex - 1 });
      if (itemIndex >= 1) { if (onValueChange) { onValueChange(values[itemIndex - 1], itemIndex - 1); } }
    }
  };

  render() {
    const {
      labels,
      values,
      placeholder,
      itemStyle: itemStyleProp,
      icon: iconProp,
      titleStyle: titleStyleProp,
      titleProps: titlePropsProp,
      buttonStyle: buttonStyleProp,
      theme,
      ...otherProps
    } = this.props;
    const { width: widthProp, height: heightProp } = this.props;
    const { selectedIndex } = this.state;

    /**
     * IOS
     */

    /**
     * currentLabel
     */
    let currentLabel = '';
    const defaultIndex = this.getDefaultIndex();
    const itemLabel = labels || values;
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentLabel = itemLabel[defaultIndex];
      } else {
        currentLabel = placeholder || itemLabel[0];
      }
    } else {
      currentLabel = itemLabel[selectedIndex];
    }

    if (Platform.OS === 'ios') {
      /**
       * titleStyle, titleProps
       */
      const titleStyle: any = StyleSheet.flatten([
        { maxWidth: typeof widthProp === 'number' && widthProp > 50 ? widthProp - 50 : 50 },
        titleStyleProp,
      ]);
      const titleProps: any = _.merge(
        { numberOfLines: 1 },
        titlePropsProp,
      );

      /**
       * buttonStyle
       */
      const buttonStyle: any = StyleSheet.flatten([
        { justifyContent: 'space-between' },
        titleStyleProp,
      ]);

      /**
       * Icon
       */
      const defaultIcon = {
        name: 'caretdown',
        type: 'antdesign',
        size: 15,
      };
      const icon = _.merge(defaultIcon, iconProp);

      return (
        <Button
          testID="PickerIOS"
          onPress={this.onPressActionSheetIOS}
          title={currentLabel}
          buttonStyle={buttonStyle}
          icon={icon}
          titleStyle={titleStyle}
          titleProps={titleProps}
          iconRight
          {...otherProps}
        />
      );
    }

    /**
     * Android
     */

    /**
     * androidStyle
     */
    const colors = theme.colors.platform.android;
    const {
      backgroundColor: backgroundColorProp,
      primary, secondary, success, warning, error,
      style: StyleProp,
      mode,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      borderRadius: borderRadiusProp,
    } = this.props;
    let backgroundColor = backgroundColorProp || theme.Button.backgroundColor;
    if (primary) backgroundColor = colors.primary;
    if (secondary) backgroundColor = colors.secondary;
    if (success) backgroundColor = colors.success;
    if (warning) backgroundColor = colors.warning;
    if (error) backgroundColor = colors.error;

    // borderRadius
    let width = widthProp;
    let height = heightProp;

    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = theme.Button.roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }

    const androidStyle = StyleSheet.flatten([
      {
        height, width, backgroundColor, borderRadius,
      },
      StyleProp,
    ]);

    /**
     * currentValue
     */
    let currentValue = '';
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentValue = values[defaultIndex];
      } else {
        currentValue = placeholder || values[0];
      }
    } else {
      currentValue = values[selectedIndex];
    }
    return (
      <QuickView style={androidStyle} testID="PickerAndroid">
        <RNPicker
          selectedValue={currentValue}
          style={{ height, width }}
          mode={mode}
          onValueChange={this.onValueChangeAndroid}
        >
          {this.renderItemAndroid()}
        </RNPicker>
      </QuickView>
    );
  }
}

export default withTheme(Picker as unknown as React.ComponentType<PickerProps & ThemeProps<any>>);
