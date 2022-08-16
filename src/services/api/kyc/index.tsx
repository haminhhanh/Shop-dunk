import { base, API_PATHS, privateRequestPostPut } from './../index';
export const createKyc = async (params: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.CREATE_KYC,
    params,
  );
  return result.data;
};
