import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Body, QuickView, Text,
} from '@components';
import { Color } from '@themes/Theme';
import { vndPriceFormat } from '@utils/functions';
import { get } from '@utils/api';

interface Props {
  navigation: any;
}

const styles = StyleSheet.create({
  mainBanner: {
    flex: 1,
    flexDirection: 'row',
  },
  bannerInside: {
    width: 165,
    padding: 3,
  },
  topText: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class CategoryDetail extends PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      moneyAmount: 0,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', async () => {
      const { moneyAmount } = await get('http://192.168.1.3:3000/api/v1/users/me');
      this.setState({
        moneyAmount,
      });
    });
    const { moneyAmount } = await get('http://192.168.1.3:3000/api/v1/users/me');
    this.setState({
      moneyAmount,
    });
  }

  render() {
    return (
      <Container>
        <Header title="Quản lý chi tiêu" />
        <Body>
          <QuickView row paddingBottom={4}>
            <Text bold fontSize={18} color={Color.violet}>Tổng số tiền bạn đang có:</Text>
          </QuickView>

        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
