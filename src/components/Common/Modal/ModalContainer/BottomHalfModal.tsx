import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Button, Text,
} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';

interface State {
  isVisible: boolean
}
interface Props {
  viewComponent?: any,
  isVisibleProps?: boolean,
  content?: String,
  title?: String,
  backgroundColor?: string,
  textColor?: string,
  onClickClose: any;
}
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
class BottomHalfModal extends PureComponent<Props, State> {
  render() {
    const {
      viewComponent, isVisibleProps, title, content, backgroundColor, textColor, onClickClose,
    } = this.props;
    const bgColor: any = StyleSheet.flatten([
      {
        backgroundColor,
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    ]);
    const textColors = StyleSheet.flatten([
      {
        color: textColor,
        fontSize: 20,
        marginBottom: 12,
      },
    ]);
    return (
      <View>
        <Modal
          testID="modal"
          isVisible={isVisibleProps}
          onSwipeComplete={onClickClose}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.view}
        >
          {!viewComponent ? (
            <View style={bgColor}>
              <Text style={textColors}>{title || 'Thông báo'}</Text>
              <Text style={textColors}>{content || ''}</Text>
              <Button
                testID="close-button"
                onPress={onClickClose}
                title="Close"
              />
            </View>
          ) : viewComponent}
        </Modal>
      </View>
    );
  }
}

export default BottomHalfModal;
