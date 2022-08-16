import { base, API_PATHS, privateRequestPostPut } from './../index';
export const unLock = async (params: { bicycleId: number }) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.BICYCLE_TEMPORARYUNLOCK,
    params,
  );
  return result.data;
};
