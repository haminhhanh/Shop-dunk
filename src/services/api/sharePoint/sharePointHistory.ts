import { base, API_PATHS, privateRequestGetDelete } from '../index';

export const sharePointHistory = async () => {
  const result = await privateRequestGetDelete(
    base.get,
    API_PATHS.SHARE_POINT_HISTORY,
  );

  return result.data;
};
