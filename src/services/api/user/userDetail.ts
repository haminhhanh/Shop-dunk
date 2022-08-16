import { base, API_PATHS, privateRequestGetDelete } from '../index';

export const userDetail = async () => {
  const result = await privateRequestGetDelete(
    base.get,
    API_PATHS.USER_PROFILE,
  );

  return result.data;
};
