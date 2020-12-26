import { fromJS } from 'immutable';
import { createObjectInitialState, createArrayInitialState } from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = 'main';
export const NAME = 'wallet';

export const LIST = 'list';
export const DETAIL = 'detail';

/**
 * TYPE
 */
export type TList = {
  walletGetList: (state: any, action: any) => any;
  walletGetListSuccess: (state: any, action: any) => any;
  walletGetListFail: (state: any, action: any) => any;
};

export type TDetail = {
  productGetDetail: (state: any, action: any) => any;
  productGetDetailSuccess: (state: any, action: any) => any;
  productGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST),
  ...createObjectInitialState(DETAIL),
});
