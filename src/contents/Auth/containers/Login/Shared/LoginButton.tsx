import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { applyObjectSelector } from '@utils/selector';
import { QuickView } from '@components';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import { loginSelector } from '../redux/selector';
import authStack from '../../routes';

interface Props extends AuthButtonProps {
  requireLogin?: boolean;
  loginSelectorData?: any;
}

class LoginButton extends PureComponent<Props> {
  render() {
    const {
      requireLogin,
      loginSelectorData,
    } = this.props;
    if (!requireLogin && !loginSelectorData.data.get('token')) {
      return (
        <QuickView>
          <AuthButton
            t="auth:login"
            bold
            onPress={() => NavigationService.navigate(rootStack.authStack, {
              screen: authStack.loginScreen,
            })}
          />
        </QuickView>
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

export default connect(mapStateToProps, null)(LoginButton);
