import AsyncStorage from '@react-native-community/async-storage';
import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import { Global } from '@utils/appHelper';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import NavigationService from '@utils/navigation';
import exampleStack from '@contents/Example/routes';
import {
  loginSuccess, loginFail, login, logout,
} from './slice';
import { userLoginApi } from './api';

export function* userLoginSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(userLoginApi, payload.data);

    Global.token = response.token;
    yield put(loginSuccess(response));
    const requiredLogin = yield select((state) => requireLoginSelector(state));
    if (!requiredLogin) {
      yield call(NavigationService.goBack);
      // yield call(NavigationService.navigate, mainBottomTab.homeStack);
    }
    return true;
  } catch (error) {
    console.log(error);

    yield put(loginFail(yield* handleException(error)));
    return false;
  }
}

async function removeAsyncStorageData() {
  await AsyncStorage.removeItem('persist:auth');
  await AsyncStorage.removeItem('persist:root');
  return true;
}

export function* userLogoutSaga() {
  try {
    yield call(removeAsyncStorageData);
    yield put({ type: 'RESET_REDUX' });
    const requiredLogin = yield select((state) => requireLoginSelector(state));
    if (!requiredLogin) {
      yield call(NavigationService.navigate, exampleStack.exampleList);
    }
    return true;
  } catch (error) {
    return false;
  }
}

export default [
  takeLatest(login, userLoginSaga),
  takeLatest(logout, userLogoutSaga),
];
