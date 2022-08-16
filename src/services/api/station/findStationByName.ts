import { base, API_PATHS } from '../index';

export const findStationByName = async (
  lat: number,
  lng: number,
  name: string,
) => {
  const result = await base.get(API_PATHS.FIND_STATION_BY_NAME(lat, lng, name));
  return result.data;
};
