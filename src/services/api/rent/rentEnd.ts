import { base, API_PATHS, privateRequestPostPut } from './../index';
export const rentEnd = async (params: {
  bicycleId: number;
  location: {
    lat: number;
    long: number;
  };
}) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.RENT_END,
    params,
  );
  return result.data;
};
