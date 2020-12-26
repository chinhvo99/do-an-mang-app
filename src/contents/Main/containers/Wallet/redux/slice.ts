import { createSlice } from '@reduxjs/toolkit';
import { createObjectReducer, createArrayReducer } from '@utils/redux';
import { REHYDRATE } from 'redux-persist';
import {
  INITIAL_STATE, TList, TDetail, NAME, LIST, DETAIL,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createArrayReducer<TList>(`${NAME}GetList`, LIST),
    // ...createObjectReducer<TDetail>(`${NAME}GetDetail`, DETAIL, LIST),
  },
  extraReducers: {
    // Redux Persist (REHYDRATE)
    [REHYDRATE]: (state, action) => {
      if (action.payload && action.payload.product) {
        const list = action.payload.product.get('list');
        return INITIAL_STATE.merge({
          list: INITIAL_STATE.get('list').merge({ data: list.get('data') }),
        });
      }
      return state;
    },
  },
});

export const {
  walletGetList,
  walletGetListSuccess,
  walletGetListFail,
  // productGetDetail,
  // productGetDetailSuccess,
  // productGetDetailFail,
} = slice.actions;

export default slice.reducer;
