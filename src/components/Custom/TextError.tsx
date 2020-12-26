import React, { PureComponent } from 'react';
import { TError } from '@utils/redux';
import Text, { TextProps } from '../Common/Text';
import QuickView from '../Common/View/QuickView';

export interface TextErrorProps extends Omit<TextProps, 'error'> {
  error: null | TError
}
class TextError extends PureComponent<TextErrorProps> {
  renderMessage = () => {
    const { error, ...otherProps } = this.props;
    if (error) {
      return error?.messages.map((message, index) => (
        <Text
          key={index.toString()}
          {...otherProps}
          marginVertical={2}
          center
          error
        >
          {message}
        </Text>
      ));
    }
    return null;
  };

  render() {
    return (
      <QuickView marginVertical={2}>
        {this.renderMessage()}
      </QuickView>
    );
  }
}

export default TextError;
