import { base, API_PATHS, privateRequestPostPut } from '../index';
export const payment = async (data: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.PAYMENT,
    data,
  );
  return result.data;
};
