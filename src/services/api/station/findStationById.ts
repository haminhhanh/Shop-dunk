import { base, API_PATHS } from '../index';

export const findStationById = async (id: number, lat: number, lng: number) => {
  const result = await base.get(API_PATHS.FIND_STATION_BY_ID(id, lat, lng));
  return result.data;
};
