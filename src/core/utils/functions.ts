/* eslint-disable no-mixed-operators */
/* eslint-disable import/prefer-default-export */
export const globalAny:any = global;

export function enumToArray(enumme: any) {
  return Object.keys(enumme)
    .map((key: string) => enumme[key]);
}

export function vndPriceFormat(price: number) {
  if (price > 0 && price < 1000000) {
    return `${Math.round(price / 1000 * 100) / 100} ngàn`;
  }
  if (price >= 1000000 && price < 1000000000) {
    return `${Math.round(price / 1000000 * 100) / 100} triệu`;
  }
  if (price > 1000000000) {
    return `${Math.round(price / 1000000000 * 100) / 100} tỷ`;
  }
  return price;
}
