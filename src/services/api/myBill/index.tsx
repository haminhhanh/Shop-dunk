import { base, API_PATHS, privateRequestGetDelete } from '../index';

export const myBill = async () => {
  const result = await privateRequestGetDelete(base.get, API_PATHS.MY_BILL);

  return result.data;
};
