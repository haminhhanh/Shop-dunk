import { base, API_PATHS, privateRequestGetDelete } from '../index';

export const getUserByPhone = async (id: number) => {
  const result = await privateRequestGetDelete(
    base.get,
    API_PATHS.GET_NAME_BY_PHONE(id),
  );

  return result.data;
};
