import { base, API_PATHS } from '../index';

export const findBicycleById = async (
  id: number | undefined,
  lat: number,
  lng: number,
) => {
  const result = await base.get(API_PATHS.FIND_BICYCLE_BY_ID(id, lat, lng));
  return result.data;
};
