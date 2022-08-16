import { base, API_PATHS } from '../index';

export const searchStation = async (
  lat: number,
  long: number,
  latArea: number,
  longArea: number,
) => {
  const result = await base.get(
    API_PATHS.SEARCH_STATION(lat, long, latArea, longArea),
  );

  return result.data;
};
