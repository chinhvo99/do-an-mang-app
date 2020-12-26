import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { applyObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { Color } from '@themes/Theme';
import { withTheme } from 'react-native-elements';
import { QuickView, TextError } from '@components';
import AuthButton from '../../Shared/AuthButton';
import AuthInput from '../../Shared/AuthInput';
import { ILogInInput } from '../redux/model';
import { login } from '../redux/slice';
import { loginSelector } from '../redux/selector';

interface Props {
  loginData: TObjectRedux;
  reduxLogin: (data: ILogInInput) => any;
  theme?: any;
}
class LoginForm extends PureComponent<Props> {
  private email: any;

  private password: any;

  render() {
    const { loginData, reduxLogin } = this.props;
    return (
      <>
        <TextError error={loginData.error} color="#FA8072" />
        <AuthInput
          ref={(ref: any) => {
            this.email = ref;
          }}
          leftIconName="email-outline"
          placeholder="User@gmail.com"
          validationField="email"
          keyboardType="email-address"
        />
        <AuthInput
          ref={(ref: any) => {
            this.password = ref;
          }}
          leftIconName="lock-outline"
          textContentType="oneTimeCode"
          placeholder="Password"
          validationField="password"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
          secureTextEntry
          marginVertical={10}
        />
        <QuickView marginTop={20}>
          <AuthButton
            t="auth:login"
            color={Color.white}
            outline
            onPress={() => {
              reduxLogin({ email: this.email.getText(), password: this.password.getText() });
            }}
            loading={loginData.loading}
          />
        </QuickView>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: applyObjectSelector(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogin: (data: ILogInInput) => dispatch(login({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginForm as any));
