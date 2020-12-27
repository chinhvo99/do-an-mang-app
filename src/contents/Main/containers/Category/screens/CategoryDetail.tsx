import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Body, QuickView, Text, FlatList,
} from '@components';
import { Color } from '@themes/Theme';
import { vndPriceFormat } from '@utils/functions';
import { get } from '@utils/api';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { TArrayRedux, TObjectRedux, TQuery } from '@utils/redux';
import moment from 'moment';
import { walletListSelector } from '../../Wallet/redux/selector';
import { walletGetList } from '../../Wallet/redux/slice';

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

interface Props {
  loginSelectorData: TObjectRedux;
  list: TArrayRedux;
  reduxGetList: (query?: TQuery) => any;
  navigation: any;
  route?: any;
}

class CategoryDetail extends PureComponent<Props, any> {
  flatListRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      moneyAmount: 0,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('focus', async () => {
      const { moneyAmount } = await get('http://192.168.1.186:3000/api/v1/users/me');
      this.setState({
        moneyAmount,
      });
    });
    const { moneyAmount } = await get('http://192.168.1.186:3000/api/v1/users/me');
    this.setState({
      moneyAmount,
    });
  }

  renderItem = ({ item, index }: { item: any; index: number}) => {
    const operator = item?.type === 1 ? '+' : '-';
    const textColor = item?.type === 1 ? Color.green : Color.red;
    return (
    // <Swipeable renderRightActions={() => this.renderRightActions(item.id)}>
      <QuickView padding={5} row height={70}>
        {/* <QuickView flex={1}>
          <Image resizeMode="contain" width={50} height={50} source={{ uri: item?.category.image }} />
        </QuickView> */}
        <QuickView justifyContent="center" flex={3}>
          <Text bold>{item.category.name}</Text>
          <Text>{item.description}</Text>
          <Text>
            {moment(item?.createdAt).format('HH:mm')}
            {' | '}
            {moment(item?.createdAt).format('DD-MM-YYYY')}
          </Text>
        </QuickView>
        <QuickView flex={2} justifyContent="center" alignItems="flex-end">
          <Text color={textColor} bold fontSize={22}>
            {operator}
            {vndPriceFormat(item?.amount)}
          </Text>
        </QuickView>
      </QuickView>
    // </Swipeable>
    );
  };

  render() {
    const { list, reduxGetList, route: { params: { categoryId: id } } } = this.props;

    return (
      <Container>
        <Header backIcon title="Danh sách giao dịch" />
        <Body>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
            ref={(ref: any) => {
              this.flatListRef = ref;
            }}
            list={list}
            getList={(query?: TQuery) => {
              reduxGetList({ ...query, orderBy: '-createdAt', filter: { categoryId: id } });
            }}
            ItemSeparatorComponent={() => <QuickView height={1} backgroundColor={Color.grey5} />}
            renderItem={this.renderItem}
            keyExtractor={(item:any, index: number) => `${item.id}` || `${index}`}
          />

        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: parseArraySelector(applyArraySelector(walletListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxGetList: (query?: TQuery) => dispatch(walletGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
