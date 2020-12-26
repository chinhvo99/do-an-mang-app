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

class HomeScreen extends PureComponent<Props, any> {
  state = {
    moneyAmount: 0,
  };

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
    const { moneyAmount } = this.state;
    return (
      <Container>
        <Header title="Quản lý chi tiêu" />
        <Body>
          <QuickView row paddingBottom={4}>
            <Text bold fontSize={18} color={Color.violet}>Tổng số tiền bạn đang có:</Text>
          </QuickView>
          <QuickView
            borderRadius={10}
            marginBottom={10}
            row
            height={150}
            alignItems="center"
            justifyContent="center"
            backgroundColor={Color.violet}
          >
            {/* <Icon name="dollar" size={25} type="font-awesome" color={Color.white} /> */}
            <Text bold fontSize={25} color={Color.white}>{`${vndPriceFormat(moneyAmount)} VND`}</Text>
          </QuickView>
          <QuickView row paddingVertical={6}>
            <Text bold fontSize={18} color={Color.violet}>Thống kê hôm nay:</Text>
          </QuickView>
          <QuickView row justifyContent="space-between" height={200}>
            <QuickView backgroundColor={Color.green} borderRadius={10} style={styles.bannerInside}>
              <Text center color={Color.white} fontSize={22} bold style={{ paddingTop: 10 }}>Thu</Text>
              <Text center color={Color.white} fontSize={28} bold style={{ paddingTop: 20, paddingBottom: 20 }}>{`${vndPriceFormat(moneyAmount)} VND`}</Text>

            </QuickView>
            <QuickView backgroundColor={Color.red} borderRadius={10} style={styles.bannerInside}>
              <Text center color={Color.white} fontSize={22} bold style={{ paddingTop: 10 }}>Chi</Text>
              <Text center color={Color.white} fontSize={28} bold style={{ paddingTop: 20, paddingBottom: 20 }}>
                {`${vndPriceFormat(moneyAmount)} VND`}
              </Text>
            </QuickView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
