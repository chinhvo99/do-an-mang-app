import { call, put, takeLatest } from 'redux-saga/effects';
import { stringifyQuery } from '@utils/redux';
import { handleException } from '@utils/exception';
import {
  walletGetListSuccess,
  walletGetListFail,
  // productGetDetailSuccess,
  // productGetDetailFail,
  walletGetList,
  // productGetDetail,
}
  from './slice';
import { fetchTransactions, fetchProductById } from './api';

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchTransactions, stringifyQuery(payload.query));
    yield put(walletGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(walletGetListFail(yield* handleException(error)));
    return false;
  }
}

// export function* getDetailSaga({ payload }: { payload: any }) {
//   try {
//     const response = yield call(fetchProductById, payload.id);
//     yield put(productGetDetailSuccess(response));
//     return true;
//   } catch (error) {
//     yield put(productGetDetailFail(yield* handleException(error)));
//     return false;
//   }
// }

export default [
  takeLatest(walletGetList, getListSaga),
  // takeLatest(productGetDetail, getDetailSaga),
];
