import { base, API_PATHS, privateRequestPostPut } from './../index';
export const sharePoint = async (params: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.SHARE_POINT,
    params,
  );
  return result.data;
};
