import { base, API_PATHS, privateRequestPostPut } from './../index';
export const Lock = async (params: { bicycleId: number }) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.BICYCLE_TEMPORARYLOCK,
    params,
  );
  return result.data;
};
