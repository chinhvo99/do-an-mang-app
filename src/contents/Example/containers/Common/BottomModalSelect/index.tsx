import React, { PureComponent } from 'react';
import {
  Container, Header, QuickView, Body, Text,
} from '@components';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModalSelect from '@components/Common/BottomModalSelect';

interface Props {

}
interface State {
}

class BottomModalSelectExample extends PureComponent {
  private handleOpen: any;

  onClick = () => {
    this.handleOpen.handleOpenFilter();
  };

  render() {
    const data = [
      { id: '0', name: 'Mở bán dự án Residences Quy Nhơn' },
      { id: '17', name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
      { id: '3', name: 'Công bố dự án Century City Long Thành' },
      { id: '5', name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
      { id: '6', name: 'Mở bán dự án Red Dragon City Hà Nội' },
      { id: '7', name: 'Mở bán dự án Violet Dragon City Hải Phòng' },
      { id: '8', name: 'Mở bán dự án Black Dragon City Lào Cai' },
    ];
    return (
      <Container>
        <Header title="BottomModalSelect" backIcon switchTheme />
        <Body>
          <QuickView marginVertical={10}>
            <Text bold fontSize={14}>
              Chọn sự kiện
            </Text>
          </QuickView>
          <QuickView justifyContent="center" marginBottom={20}>
            <TouchableOpacity
              onPress={this.onClick}
              style={{
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                // textAlign: 'center',
                // alignContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 3,
              }}
            >
              <QuickView width="90%">
                <Text numberOfLines={1} fontSize={14} color="#727A8E">Chọn sự kiện đang diễn ra</Text>
              </QuickView>
              <QuickView center width="10%">
                <Icon name="chevron-down" size={16} color="#315DF7" />
              </QuickView>
            </TouchableOpacity>
          </QuickView>
        </Body>
        <BottomModalSelect
          ref={(ref) => {
            this.handleOpen = ref;
          }}
          data={data}
          // closeIcon={false}
          // titleConfirm="Done"
          // title="Choose"
          // titleStyles={{ color: 'red' }}
          // buttonConfirmStyles={{ backgroundColor: 'red' }}
          // titleConfirmStyles={{ color: 'yellow' }}
          // onChange={(val: string) => console.log('value', val)}
          // onConfirm={(valConfirm: string) => console.log('valueConfirm', valConfirm)}
          defaultVal={['17']}
          // multi
          // wrapStyles={{ backgroundColor: 'red' }}
          // headerContainerStyles={{ backgroundColor: 'red' }}
        />
      </Container>
    );
  }
}

export default BottomModalSelectExample;
