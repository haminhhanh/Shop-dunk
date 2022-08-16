import { base, API_PATHS } from '../index';

export const nearStation = async (lat: number, lng: number) => {
  const result = await base.get(API_PATHS.NEAR_STATION(lat, lng));

  return result.data;
};
