import { base, API_PATHS, privateRequestGetDelete } from '../index';
export const getRentingId = async (data: any) => {
  const result = await privateRequestGetDelete(
    base.get,
    `${API_PATHS.RENT_RENTING}?page=${data}&pageSize=10`,
  );
  return result.data;
};
