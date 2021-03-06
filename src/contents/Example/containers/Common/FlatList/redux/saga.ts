import { call, put, takeLatest } from 'redux-saga/effects';
import { stringifyQuery } from '@utils/redux';
import { handleException } from '@utils/exception';
import {
  productGetListSuccess,
  productGetListFail,
  productGetDetailSuccess,
  productGetDetailFail,
  productGetList,
  productGetDetail,
}
  from './slice';
import { fetchProducts, fetchProductById } from './api';

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProducts, stringifyQuery(payload.query));
    yield put(productGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(productGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProductById, payload.id);
    yield put(productGetDetailSuccess(response));
    return true;
  } catch (error) {
    yield put(productGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(productGetList, getListSaga),
  takeLatest(productGetDetail, getDetailSaga),
];
