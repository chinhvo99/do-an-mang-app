import { createObjectSelector, createArraySelector } from '@utils/selector';
import {
  PARENT_NAME, NAME, LIST, DETAIL,
} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const walletListSelector = createArraySelector(root, LIST);

export const productDetailSelector = createObjectSelector(root, DETAIL);
