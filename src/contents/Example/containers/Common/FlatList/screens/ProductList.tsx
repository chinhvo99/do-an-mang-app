/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { parseArraySelector, applyArraySelector } from '@utils/selector';
import { TQuery, TArrayRedux } from '@utils/redux';
import {
  Container, Header, Body, QuickView, FlatList, Text,
} from '@components';
import { StyleSheet } from 'react-native';
import { ThemeEnum } from '@contents/Config/redux/constant';
import { createShadow } from '@utils/view';
import { Color } from '@themes/Theme';
import { compose } from 'redux';
import { withTheme, Card } from 'react-native-elements';
import { vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import { setIdIntoParam } from '@utils/appHelper';
import { productGetList } from '../redux/slice';
import { productListSelector } from '../redux/selector';
import productStack from '../routes';

interface Props {
  list: TArrayRedux;
  reduxGetList: (query?: TQuery) => any;
  theme?: any;
}
class ProductListScreen extends PureComponent<Props> {
  renderItem = ({ item, index }: {item: any; index: number}) => {
    const {
      theme,
    } = this.props;
    const containerStyle = StyleSheet.flatten([
      {
        borderRadius: 10,
        margin: 0,
        borderWidth: 0,
      },
      theme.key === ThemeEnum.LIGHT && createShadow(Color.grey3),
    ]);
    const wrapperStyle = StyleSheet.flatten([
      { borderRadius: 10 },
      {
        backgroundColor: theme.key === ThemeEnum.LIGHT
          ? theme.colors.white
          : theme.colors.grey8,
      },
    ]);
    return (
      <QuickView
        backgroundColor={
        theme.key === ThemeEnum.LIGHT
          ? '#E6EDFF'
          : theme.colors.bgColorSecondary
      }
        borderRadius={10}
        marginVertical={10}
        paddingHorizontal={theme.key === ThemeEnum.LIGHT ? 1 : 0}
        onPress={() => NavigationService.navigate(
          productStack.productDetail,
          setIdIntoParam(item),
        )}
      >
        <Card
          image={{
            uri: item.mainImage?.link,
          }}
          imageProps={{ borderRadius: 10 }}
          containerStyle={containerStyle}
          wrapperStyle={wrapperStyle}
        >
          <Text
            marginLeft={10}
            marginRight={35}
            bold
            fontSize={18}
            color={theme.colors.primary}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            marginLeft={10}
            marginRight={5}
            fontSize={12}
            color={theme.colors.primary}
          >
            {item.address}
          </Text>
        </Card>
        <QuickView
          row
          paddingHorizontal={20}
          paddingBottom={10}
          paddingVertical={10}
        >
          <QuickView flex={5}>
            <Text color={theme.colors.secondary} fontSize={12}>
              Phí hoa hồng
            </Text>
            <Text color={theme.colors.primary} fontSize={18}>
              {`${item.commissionRate} %`}
            </Text>
          </QuickView>
          <QuickView flex={5}>
            <Text color={theme.colors.secondary} fontSize={12}>
              Giá sản phẩm
            </Text>
            <Text color={theme.colors.primary} fontSize={18}>
              {vndPriceFormat(item.price)}
            </Text>
          </QuickView>
        </QuickView>
      </QuickView>
    );
  };

  render() {
    const { list, reduxGetList, theme } = this.props;
    const fields = ['id', 'name', 'commissionRate', 'address'];
    return (
      <Container>
        <Header backIcon title="FlatList" switchTheme />
        <Body>
          <QuickView>
            <FlatList
              list={list}
              getList={(query?: TQuery) => {
                reduxGetList({ ...query, fields });
              }}
              renderItem={this.renderItem}
              extraData={theme}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: parseArraySelector(applyArraySelector(productListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxGetList: (query?: TQuery) => dispatch(productGetList({ query })),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(ProductListScreen as any);
