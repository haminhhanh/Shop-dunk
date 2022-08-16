import { base, API_PATHS } from './../index';
export const paymentMethod = async () => {
  const result = await base.get(API_PATHS.PAYMENT_METHOD);
  return result.data;
};
