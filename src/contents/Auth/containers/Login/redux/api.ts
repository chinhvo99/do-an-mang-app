/* eslint-disable import/prefer-default-export */
import { post } from '@utils/api';
import { ILogInInput } from './model';

export const userLoginApi = (data: ILogInInput) => post('http://192.168.1.3:3000/api/v1/auth/login', data);
