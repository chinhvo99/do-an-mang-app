/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container, ParallaxScrollView, Body, Image, Header, QuickView, Text,
} from '@components';
import { parseObjectSelector, applyObjectSelector } from '@utils/selector';
import { getIdFromParam } from '@utils/appHelper';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { itemWidth } from '@components/Common/Carouse/Component/SliderEntry';
import { withTheme } from 'react-native-elements';
import { productGetDetail } from '../redux/slice';
import { productDetailSelector } from '../redux/selector';

class ProductDetailScreen extends PureComponent<any> {
  componentDidMount() {
    const { getDetail } = this.props;
    getDetail(getIdFromParam(this.props));
  }

  renderForeground = () => {
    const height = 80;
    const marginTop = parallaxHeaderHeight - height;
    const {
      theme,
      detail: { data },
    } = this.props;
    return (
      <QuickView
        height={height}
        backgroundColor={theme.colors.bgColor}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginTop={marginTop}
      >
        <QuickView margin={20}>
          <Text type="header" numberOfLines={1}>{data.name}</Text>
          <Text icon={{ name: 'map-marker' }} numberOfLines={1}>
            {data.address}
          </Text>
        </QuickView>
      </QuickView>
    );
  };

  renderStickyHeader = () => {
    const {
      detail: { data },
    } = this.props;
    return <Header title={data.name} />;
  };

  render() {
    return (
      <Container>
        <ParallaxScrollView
          renderStickyHeader={this.renderStickyHeader}
          renderForeground={this.renderForeground}
        >
          <Body>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1000',
                cache: 'web',
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(
    applyObjectSelector(productDetailSelector, state),
  ),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (id: number) => dispatch(productGetDetail({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(ProductDetailScreen),
);
