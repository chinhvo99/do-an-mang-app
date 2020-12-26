import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { applyObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { QuickView } from '@components';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import { loginSelector } from '../redux/selector';
import { logout } from '../redux/slice';

interface Props extends AuthButtonProps {
  reduxLogout?: () => any;
  loginSelectorData: TObjectRedux;
}

class LogoutButton extends PureComponent<Props> {
  render() {
    const {
      reduxLogout,
      loginSelectorData: { data },
    } = this.props;
    const token = data.get('token');
    if (token) {
      return (
        <AuthButton
          t="auth:logout"
          onPress={reduxLogout}
        />
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
