import AsyncStorage from '@react-native-community/async-storage';

export const Global: any = global;

export async function viewAsyncStorageData() {
  const keys = await AsyncStorage.getAllKeys();
  const itemsArray = await AsyncStorage.multiGet(keys);
  const result: any = {};
  itemsArray.map((item) => {
    // eslint-disable-next-line prefer-destructuring
    result[`${item[0]}`] = item[1];
    return result;
  });
  return result;
}

export function getIdFromParam(props: any) {
  const {
    route,
  } = props;
  return route?.params?.id;
}

export function setIdIntoParam(item: any) {
  return { id: item.id };
}
