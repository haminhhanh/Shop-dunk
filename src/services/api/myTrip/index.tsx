import { base, API_PATHS, privateRequestGetDelete } from '../index';

export const myTrip = async (page: number, pageSize: number) => {
  const result = await privateRequestGetDelete(
    base.get,
    API_PATHS.MY_TRIP(page, pageSize),
  );

  return result.data;
};
