import React, { PureComponent } from 'react';
import {
  Dimensions,
  Keyboard, Platform, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import {
  Container, Header, Body, Text, Button, Input, QuickView,
} from '@components';
import { Icon, Overlay } from 'react-native-elements';
import { get, post } from '@utils/api';
import { vndPriceFormat } from '@utils/functions';
import { Color } from '@themes/Theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import NavigationService from '@utils/navigation';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  navigation: any
}
type AndroidMode = 'date' | 'time';
interface State {
  categories: Array<any>;
  moneyAmount: number;
  show: boolean;
  date:any;
  overlayIsVisible: boolean;
  selectedCate: number|null;
  mode: AndroidMode;
}
class AddScreen extends PureComponent<Props, State> {
  amount: any;

  note: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
      moneyAmount: 0,
      show: false,
      date: new Date(),
      overlayIsVisible: false,
      selectedCate: null,
      mode: 'date',
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
    const response = await get('http://192.168.1.186:3000/api/v1/categories?filter={"type":1}');
    this.setState({
      categories: response.results,
    });
    const { moneyAmount } = await get('http://192.168.1.186:3000/api/v1/users/me');
    this.setState({
      moneyAmount,
    });
  }

  handleAddTransaction = async () => {
    const { date, selectedCate } = this.state;
    const amount = this.amount.getText();
    const note = this.note.getText();
    const payload = {
      type: 1,
      categoryId: selectedCate,
      amount,
      description: note,
      createdAt: date,
    };
    try {
      const response = await post('http://192.168.1.186:3000/api/v1/transactions', payload);

      if (response.id) {
        this.note = '';
        this.amount = '';
        await this.setState({
          date: new Date(),
          selectedCate: null,
        });
        NavigationService.navigate('HistoryStack', { screen: 'WalletStackIndex' });
      }
    } catch (error) {
      showMessage({
        message: error.message ?? 'Có lỗi xảy ra. Vui lòng kiểm tra lại',
        type: 'danger',
      });
    }
  };

  onChange = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const currentDate = selectedDate || date;
    this.setState({ show: Platform.OS === 'ios', date: currentDate });
    // setDate(currentDate);
  };

  toggleOverlay = () => {
    this.setState((prevState: any) => ({ overlayIsVisible: !prevState.overlayIsVisible }));
  };

  render() {
    const {
      moneyAmount, show, date, overlayIsVisible, selectedCate, categories, mode,
    } = this.state;
    const titleCategory = selectedCate === null ? 'Chọn loại' : categories.filter((c) => c.id === selectedCate)[0].name;
    return (

      <Container activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <Overlay overlayStyle={{ width: Dimensions.get('window').width - 80 }} isVisible={overlayIsVisible}>
          <QuickView>
            <Text type="title" center>Categories</Text>
            <QuickView>
              {categories.map((item:any) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({ selectedCate: item.id });
                    this.toggleOverlay();
                  }}
                  key={`category${item.id}`}
                >
                  <Text>{item.name}</Text>
                  {selectedCate === item.id ? <Icon name="check" color={Color.violet} /> : null}
                </TouchableOpacity>
              ))}
            </QuickView>
          </QuickView>
        </Overlay>
        <Header title="Thêm thu nhập" backIcon />
        <Body scroll>
          <QuickView height="100%" column justifyContent="space-between">
            <QuickView row>
              <Text bold>Tổng: </Text>
              {moneyAmount && moneyAmount >= 0 ? (<Text success bold>{`${vndPriceFormat(moneyAmount)} VND`}</Text>)
                : <Text error bold>{`${vndPriceFormat(moneyAmount)} VND`}</Text>}
            </QuickView>
            <QuickView justifyContent="center" flex={1}>
              {/* input money */}
              <QuickView center width="50%" height="30%" row>
                <QuickView marginBottom={10} row>
                  <Text color={Color.green} fontSize={40} bold>+</Text>
                </QuickView>
                <Input
                  ref={(ref: any) => { this.amount = ref; }}
                  backgroundColor={Color.white}
                  autoFocus
                  height={100}
                  containerStyle={{
                    // flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.grey1,
                    borderRadius: 0,
                    marginBottom: 10,
                    marginLeft: 10,
                    paddingLeft: 0,
                  }}
                  // inputContainerStyle={{ paddingHorizontal: 0 }}
                  inputStyle={{
                    fontSize: 25, color: Color.green, fontWeight: 'bold', margin: 0, paddingLeft: 0,
                  }}
                  keyboardType="numeric"
                  placeholder="VND"
                />
              </QuickView>
              {/* categories picker */}
              <QuickView
                onPress={() => this.setState({ overlayIsVisible: true })}
                padding={15}
                marginVertical={10}
                alignItems="center"
                row
                style={{ borderWidth: 1, borderColor: Color.green }}
              >
                <QuickView flex={9}>
                  <Text color={Color.black}>{titleCategory}</Text>
                </QuickView>
                <QuickView flex={1}>
                  <Icon name="chevron-down" type="entypo" color={Color.green} />
                </QuickView>
              </QuickView>

              {/* date  picker */}
              <QuickView
                onPress={() => this.setState({ show: true })}
                padding={15}
                marginVertical={10}
                alignItems="center"
                row
                style={{ borderWidth: 1, borderColor: Color.green }}
              >
                <QuickView flex={9}>
                  <Text color={Color.black}>{moment(date).format('MMMM Do YYYY')}</Text>
                </QuickView>
                <QuickView flex={1}>
                  <Icon name="chevron-down" type="entypo" color={Color.green} />
                </QuickView>
              </QuickView>
              {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour
                display="default"
                onChange={this.onChange}
              />
              )}
              {Platform.OS === 'ios' && show && (
                <Button title="Close" onPress={() => this.setState({ show: false, mode: 'date' })} />
              )}

              {/*  time picker */}
              <QuickView
                onPress={() => this.setState({ show: true, mode: 'time' })}
                padding={15}
                marginVertical={10}
                alignItems="center"
                row
                style={{ borderWidth: 1, borderColor: Color.green }}
              >
                <QuickView flex={9}>
                  <Text color={Color.black}>{moment(date).format('HH:mm')}</Text>
                </QuickView>
                <QuickView flex={1}>
                  <Icon name="chevron-down" type="entypo" color={Color.green} />
                </QuickView>
              </QuickView>

              {/* note */}
              <Input
                ref={(ref: any) => { this.note = ref; }}
                backgroundColor={Color.grey1}
                marginVertical={10}
                height={50}
                placeholder="Note"
              />

            </QuickView>
            <QuickView>
              <Button
                success
                outline
                paddingVertical={20}
                title="Thêm thu nhập"
                icon={{ name: 'plus', type: 'antdesign', color: Color.green }}
                onPress={this.handleAddTransaction}
              />

            </QuickView>
          </QuickView>
        </Body>
        <FlashMessage position="top" />

      </Container>
    );
  }
}

export default AddScreen;
