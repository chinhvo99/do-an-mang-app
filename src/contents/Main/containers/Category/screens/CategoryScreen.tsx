import React, { Component, PureComponent } from 'react';
import {
  StyleSheet, FlatList, ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  Container, Header, Body, QuickView, Text, ListCheckBox, Button,
} from '@components';
import { Color } from '@themes/Theme';
import NavigationService from '@utils/navigation';
import { get } from '@utils/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  mainBanner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerInside: {
    padding: 30,
    fontSize: 26,
    marginVertical: 15,
    color: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
});

class CategoryScreen extends PureComponent {
  state={
    categories: [],
    categoryOut: [],
    categoryIn: [],
    checkValue: [1],
    datasCheckbox: [{ id: 1, name: 'Thu nhập' },
      { id: 2, name: 'Chi tiêu' }],
  };

  async componentDidMount() {
    try {
      const response1 = await get('http://192.168.1.186:3000/api/v1/categories?filter={"type":1}');

      this.setState({
        categoryIn: response1.results,
        categories: response1.results,
      });
      const response2 = await get('http://192.168.1.186:3000/api/v1/categories?filter={"type":2}');
      this.setState({
        categoryOut: response2.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleNavigate = (item: any) => {
    console.log('111', item.id);

    NavigationService.navigate('CategoryDetailStack', { categoryId: item.id });
  };

  render() {
    const {
      categories, categoryIn, categoryOut, datasCheckbox, checkValue,
    } = this.state;
    return (
      <Container>
        <Header title="Chuyên mục" />
        <Body>
          <ListCheckBox
            row
            widthElement="42%"
            data={datasCheckbox}
            single
            defaultValue={checkValue}
            onChange={(value: any) => (value === 2 ? this.setState({ categories: categoryOut }) : this.setState({ categories: categoryIn }))}
          />
          <ScrollView>
            <FlatList
              keyExtractor={(item:any) => item.id + item.name}
              data={categories}
              renderItem={({ item }) => (
                <QuickView onPress={() => this.handleNavigate(item)}>
                  <LinearGradient
                    style={styles.bannerInside}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={item.type === 1 ? ['#37bc04', '#5bec88'] : ['#cc0e3b', '#b39197']}
                  >
                    <QuickView row justifyContent="space-around">
                      <Text bold color="#fff">
                        {item.name}
                        :
                      </Text>
                      <Text bold color="#fff">
                        {item.description}
                      </Text>
                    </QuickView>
                  </LinearGradient>
                </QuickView>
              )}
            />
          </ScrollView>
        </Body>
      </Container>
    );
  }
}

export default CategoryScreen;
