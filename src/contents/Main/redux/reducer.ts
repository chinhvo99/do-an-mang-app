import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import wallet from '@contents/Main/containers/Wallet/redux/slice';

const persistConfig = {
  key: 'main',
  storage: AsyncStorage,
  whitelist: [],
};
const main = persistReducer(
  persistConfig,
  combineReducers({
    wallet,
  }),
);
export default main;
