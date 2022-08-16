import { base, API_PATHS, privateRequestPostPut } from './../index';
export const changePassword = async (params: any) => {
  const result = await privateRequestPostPut(
    base.post,
    API_PATHS.CHANGE_PASSWORD,
    params,
  );
  return result.data;
};
