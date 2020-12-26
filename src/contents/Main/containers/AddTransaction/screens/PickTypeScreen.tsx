import React, { Component, PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header, Body, QuickView, Button,
} from '@components';
import { Color } from '@themes/Theme';
import NavigationService from '@utils/navigation';
import addTransactionStack from '../routes';

const styles = StyleSheet.create({
  buttonPick: {
    height: 200,
  },
  titleButton: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconButtonUp: {
    color: Color.green,
    marginRight: 10,
  },
  iconButtonDown: {
    color: Color.red,
    marginRight: 10,

  },
});

class PickTypeScreen extends PureComponent {
  componentDidMount() {
    //
  }

  handleIncome = () => {
    NavigationService.navigate(addTransactionStack.income, {});
  };

  handleOutcome = () => {
    NavigationService.navigate(addTransactionStack.outcome, {});
  };

  render() {
    return (
      <Container>
        <Header title="Thêm giao dịch" />
        <Body>
          <QuickView column height="100%" justifyContent="space-around">
            <Button
              success
              outline
              title="Thu nhập"
              buttonStyle={styles.buttonPick}
              titleStyle={styles.titleButton}
              icon={
                {
                  name: 'caretup', type: 'antdesign', color: Color.green, style: { marginRight: 10 },
                }
              }
              iconContainerStyle={styles.iconButtonUp}
              onPress={this.handleIncome}
            />
            <Button
              error
              outline
              title="Chi tiêu"
              buttonStyle={styles.buttonPick}
              titleStyle={styles.titleButton}
              icon={
                {
                  name: 'caretdown', type: 'antdesign', color: Color.red, style: { marginRight: 10 },
                }
              }
              iconContainerStyle={styles.iconButtonDown}
              onPress={this.handleOutcome}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}
export default PickTypeScreen;
