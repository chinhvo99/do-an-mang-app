import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Body, QuickView, Text, Button,
} from '@components';
import { Color } from '@themes/Theme';
import { get } from '@utils/api';
import { TObjectRedux } from '@utils/redux';
import { applyObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { vndPriceFormat } from '@utils/functions';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bannerInside: {
    padding: 30,
    backgroundColor: Color.blue,
    fontSize: 26,
    marginVertical: 15,
    color: '#fff',
    borderRadius: 5,
  },
});

interface Props {
  loginSelectorData: TObjectRedux;
}

class WalletCreateScreen extends PureComponent<Props, any> {
  longPressWalletHandler = () => {
    console.log('aaa');
  };

  render() {
    return (
      <Container>
        <Header backIcon title="Tạo nguồn tiền" shadow />
        <Body>
          <QuickView height="100%" column justifyContent="space-between">
            <QuickView>
              <Button primary outline paddingVertical={20} title="Thêm nguồn tiền" icon={{ name: 'plus', type: 'antdesign' }} />

            </QuickView>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCreateScreen);
