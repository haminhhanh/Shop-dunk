import { base, API_PATHS } from '../index';

export const findAllStation = async (lat: number, lng: number) => {
  const result = await base.get(API_PATHS.ALL_STATION_AROUND_30KM(lat, lng));

  return result.data;
};
