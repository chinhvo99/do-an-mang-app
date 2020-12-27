import { get } from '@utils/api';

export const fetchTransactions = (queryString: string) => get(`http://192.168.1.186:3000/api/v1/users/me/transactions?${queryString}`);

export const fetchProductById = (id: number) => get(`/properties/${id}`);
