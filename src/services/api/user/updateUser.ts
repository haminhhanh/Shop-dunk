import { base, API_PATHS, privateRequestPostPut } from '../index';

export const updateUserDetail = async (data: any) => {
  const result = await privateRequestPostPut(
    base.put,
    API_PATHS.ACCOUNT_UPDATE,
    data,
  );

  return result.data;
};
