import React, { Component, PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Header, Body, QuickView, Text,
} from '@components';
import { Color } from '@themes/Theme';
import { get } from '@utils/api';

const styles = StyleSheet.create({
  mainBanner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerInside: {
    width: '33%',
  },
});

class CategoryOutScreen extends PureComponent {
  async componentDidMount() {
    try {
      const response = await get('http://192.168.1.3:3000/api/v1/categories?filter={"type":1}');
      this.setState({
        categoryOut: response.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <Body>
          <QuickView height={200} style={styles.mainBanner}>
            <QuickView backgroundColor={Color.green} borderRadius={10} style={styles.bannerInside}>
              <Text center color={Color.white} fontSize={22} bold style={{ paddingTop: 10 }}>Example Screen</Text>
              <Text center color={Color.white} fontSize={28} bold style={{ paddingTop: 20, paddingBottom: 20 }}>5,600,000 VND</Text>

            </QuickView>
          </QuickView>
          <QuickView height={200} style={styles.mainBanner}>
            <QuickView backgroundColor={Color.green} borderRadius={10} style={styles.bannerInside}>
              <Text center color={Color.white} fontSize={22} bold style={{ paddingTop: 10 }}>Example Screen</Text>
              <Text center color={Color.white} fontSize={28} bold style={{ paddingTop: 20, paddingBottom: 20 }}>5,600,000 VND</Text>

            </QuickView>
          </QuickView>

        </Body>
      </Container>
    );
  }
}

export default CategoryOutScreen;
