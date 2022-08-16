import { base, API_PATHS, privateRequestPostPut } from './../index';
export const rating = async (params: {
  rating: number;
  rentId: number;
  message: string;
}) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.RATING,
    params,
  );
  return result.data;
};
