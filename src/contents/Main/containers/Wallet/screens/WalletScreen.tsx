import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container, Header, Body, QuickView, Text, FlatList,
} from '@components';
import { Color } from '@themes/Theme';
import { get } from '@utils/api';
import { TArrayRedux, TObjectRedux, TQuery } from '@utils/redux';
import { applyArraySelector, applyObjectSelector, parseArraySelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import moment from 'moment';
import { walletGetList } from '../redux/slice';
import { walletListSelector } from '../redux/selector';

interface Props {
  loginSelectorData: TObjectRedux;
  list: TArrayRedux;
  reduxGetList: (query?: TQuery) => any;
  navigation: any;
}

class WalletScreen extends PureComponent<Props, any> {
  flatListRef:any;

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
      this.flatListRef.handleRefresh();
    });
    const { moneyAmount } = await get('http://192.168.1.3:3000/api/v1/users/me');
    this.setState({
      moneyAmount,
    });
  }

  // async componentDidMount() {
  //   const { loginSelectorData: { data } } = this.props;

  //   try {
  //     const response = await get('http://192.168.1.3:3000/api/v1/categories?filter={"type":1}');
  //     this.setState({
  //       wallets: response.results,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  longPressWalletHandler = () => {
    console.log('aaa');
  };

  handleAddWallet = () => {
    console.log('aaf');
    NavigationService.navigate('WalletStackCreate', {});
  };

  renderItem = ({ item, index }: { item: any; index: number}) => {
    const operator = item?.type === 1 ? '+' : '-';
    const textColor = item?.type === 1 ? Color.green : Color.red;
    return (
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
    );
  };

  renderHeader = () => (
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
      <Text bold fontSize={25} color={Color.white}>{`${vndPriceFormat(this.state.moneyAmount)} VND`}</Text>
    </QuickView>
  );

  render() {
    const { list, reduxGetList } = this.props;
    return (
      <Container>
        <Header title="Lịch sử" />
        <Body fullWidth>
          <FlatList

            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
            ref={(ref: any) => {
              this.flatListRef = ref;
            }}
            ListHeaderComponent={this.renderHeader}
            list={list}
            getList={(query?: TQuery) => {
              reduxGetList({ ...query, orderBy: '-createdAt' });
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
  loginSelectorData: applyObjectSelector(loginSelector, state),
  list: parseArraySelector(applyArraySelector(walletListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxGetList: (query?: TQuery) => dispatch(walletGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
