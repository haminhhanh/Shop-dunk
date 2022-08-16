import { base, API_PATHS, privateRequestPostPut } from './../index';
export const unLockBicycle = async (params: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.UNLOCK_BICYCLE,
    params,
  );
  return result.data;
};
