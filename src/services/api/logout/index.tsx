import { base, API_PATHS, privateRequestPostPut } from '../index';

export const logout = async () => {
  const result = await privateRequestPostPut(base.post, API_PATHS.LOG_OUT);

  return result.data;
};
