import React, { PureComponent } from 'react';
import { TQuery, TArrayRedux } from '@utils/redux';
import {
  FlatList as RNFlatList, FlatListProps as RNFlatListProps, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/constant';
import { darkTheme, lightTheme } from '@themes';
import QuickView from '../../View/QuickView';
import Text from '../../Text';

interface FlatListProps extends Omit<RNFlatListProps<any>, 'data' | 'renderItem'> {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  renderItem: ({ item, index }: { item: any; index: number }) => any;
  renderEmpty?: () => any;
  loadingColor?: string;
  textColor?: string;
  language?: string;
  themeName?: string;
  ref?: any;
}
interface State {
  refreshing: boolean,
  page: number,
}

class FlatList extends PureComponent<FlatListProps, State> {
  static defaultProps = {
    showsVerticalScrollIndicator: false,
    onEndReachedThreshold: 0.5,
  };

  private flatListRef: any;

  constructor(props: FlatListProps) {
    super(props);
    this.state = {
      refreshing: false,
      page: 1,
    };
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  handleRefresh = () => {
    const { getList } = this.props;
    this.setState({ page: 1, refreshing: true }, () => { getList(); });
  };

  handleLoadMore = () => {
    const { getList } = this.props;
    const { list: { metadata, loading } } = this.props;
    const { page: currentPage, pageCount } = metadata;
    if (currentPage !== pageCount && !loading) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }), () => {
          const { page } = this.state;
          if (currentPage < pageCount) { getList({ page }); }
        },
      );
    }
  };

  rollToTop = () => {
    if (this.flatListRef) {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  renderFooter = () => {
    const { list, loadingColor: loadingColorProp, themeName } = this.props;
    const { refreshing } = this.state;
    const { metadata } = list;
    /**
     * Theme Handle
     */
    const theme: any = themeName === ThemeEnum.DARK ? darkTheme : lightTheme;
    const loadingColor = loadingColorProp || theme.colors.textColorSecondary;

    if (metadata.page === metadata.pageCount && !_.isEmpty(list.data)) {
      return (
        <QuickView marginBottom={10}>
          {/* <Icon
            name="up"
            type="antdesign"
            size={30}
            color={loadingColor}
            onPress={this.rollToTop}
          /> */}
        </QuickView>
      );
    }
    if (!list.loading || refreshing) return null;
    return (
      <QuickView marginVertical={5}>
        <ActivityIndicator animating color={loadingColor} size="small" />
      </QuickView>
    );
  };

  renderEmpty = () => {
    const {
      horizontal, list, language, themeName, textColor: textColorProp,
    } = this.props;
    const { list: { loading } } = this.props;
    /**
     * Language & Theme Handle
     */
    const emptyText = language === LanguageEnum.VI ? 'Danh sách rỗng' : 'Empty List';
    const theme: any = themeName === ThemeEnum.DARK ? darkTheme : lightTheme;
    const textColor = textColorProp || theme.colors.textColorSecondary;

    if (!horizontal && !loading) {
      return (
        <QuickView center>
          <QuickView marginVertical={10}>
            <Icon name="exclamationcircleo" color={textColor} type="antdesign" size={30} />
          </QuickView>
          <Text color={textColor}>
            {list.error?.messages || emptyText}
          </Text>
        </QuickView>
      );
    } return null;
  };

  render() {
    const {
      list, renderItem, renderEmpty, themeName, loadingColor: loadingColorProp, ...otherProps
    } = this.props;
    const { refreshing } = this.state;
    /**
     * Theme Handle
     */
    const theme: any = themeName === ThemeEnum.DARK ? darkTheme : lightTheme;
    const loadingColor = loadingColorProp || theme.colors.textColorSecondary;

    if (!list.loading) this.setState({ refreshing: false });
    return (
      <RNFlatList
        ref={(ref) => {
          this.flatListRef = ref;
        }}
        {...otherProps}
        ListEmptyComponent={renderEmpty || this.renderEmpty}
        data={list.data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={this.handleLoadMore}
        ListFooterComponent={this.renderFooter}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            tintColor={loadingColor}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null,
  { forwardRef: true })(FlatList as React.ComponentType<FlatListProps>);
